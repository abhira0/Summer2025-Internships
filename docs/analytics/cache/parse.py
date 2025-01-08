import json
import os
import datetime
from typing import Dict, List, Any
from geopy.geocoders import Nominatim
import time
import threading
import logging
import coloredlogs, collections

# Create a logger object
logger = logging.getLogger(__name__)

# Set the level of the logger to DEBUG
logger.setLevel(logging.DEBUG)

# Create a colored formatter and add it to the logger
coloredlogs.install(
    level="DEBUG",
    logger=logger,
    fmt="%(asctime)s - %(filename)s:%(lineno)d - %(levelname)s - %(message)s",
    field_styles={
        "asctime": {"color": "green"},
        "filename": {"color": "magenta"},
        "lineno": {"color": "magenta"},
        "levelname": {"color": "cyan", "bold": True},
        "message": {"color": "white"},
    },
)


class JSONFile:
    def __init__(self, file_path: str, auto_save: bool = True):
        self.file_path = file_path
        self.data = self.load()
        if auto_save:
            self.start_auto_save()

    def load(self) -> Any:
        if not os.path.exists(self.file_path):
            with open(self.file_path, "w") as f:
                json.dump([], f)
        with open(self.file_path, "r+") as f:
            return json.load(f)

    def save(self, data: Any = []) -> None:
        if data:
            self.data = data
        with open(self.file_path, "w") as f:
            json.dump(data or self.data, f, indent=2)
        return self

    def start_auto_save(self):
        def auto_save():
            while True:
                time.sleep(3)
                self.save()

        thread = threading.Thread(target=auto_save, daemon=True)
        thread.start()


LISTINGS_RAW = JSONFile(".github/scripts/listings.json", auto_save=False)
LISTINGS_PARSED = JSONFile("docs/analytics/cache/listings_parsed.json")
SIMPLIFY_TRACKER = JSONFile("docs/analytics/cache/simplify/raw.json", auto_save=False)
SIMPLIFY_TRACKER_PARSED = JSONFile(
    "docs/analytics/cache/simplify/parsed.json", auto_save=False
)
LOCATION_CACHE = JSONFile("docs/analytics/cache/locations.json")


class FilterByDate:
    def __init__(
        self, input, cutoff_date: datetime.datetime = datetime.datetime(2024, 1, 1)
    ):
        self.input = input
        self.output = self.process(cutoff_date)

    def process(self, cutoff_date) -> None:
        entries = []
        for listing in self.input.data:
            date = datetime.datetime.fromtimestamp(int(listing["date_posted"]))
            if date >= cutoff_date:
                entries.append(listing)
        return LISTINGS_PARSED.save(entries)


class AddCoordinates:
    def __init__(self, input):
        self.input = input
        self.output = self.process()

    def get_coord(
        self, location: str, location_cache: Dict, geolocator: Nominatim
    ) -> List:
        location = location.strip()
        if "remote" in location.lower():
            location_cache[location] = ["remote", "remote", "remote"]
        elif not location_cache.get(location) is not None:
            logger.debug(f"API Call! for {location}")
            time.sleep(1)

            loc = geolocator.geocode(location)
            assert loc, f"Location not found, {loc.raw}"

            location_cache[location] = [loc.latitude, loc.longitude, loc.address]
        return location_cache[location]

    def get_all_locations(self, locations: str):
        cleaned_locations = []
        splitter = ["|", ";", "•", " and ", " or "]
        for spli in splitter:
            if spli in locations:
                cleaned_locations += locations.split(spli)
                break
        cleaned_locations = [i.strip() for i in cleaned_locations]
        for i in cleaned_locations:
            if i.endswith(" more"):
                cleaned_locations.remove(i)
        if not cleaned_locations:
            cleaned_locations.append(locations)
        return cleaned_locations

    def process(self):
        location_cache = LOCATION_CACHE.load()
        geolocator = Nominatim(user_agent="location_converter")
        errors = []

        for item in self.input.data:
            locations = self.get_all_locations(item["job_posting_location"])
            if not locations:
                logger.error(f"No locations found for {item['job_posting_location']}")
            item["coordinates"] = []
            for loc in locations:
                try:
                    item["coordinates"].append(
                        self.get_coord(loc, location_cache, geolocator)
                    )
                    # logger.info(f"Coordinates for {loc} is {item['coordinates']}")
                except Exception as e:
                    errors.append(loc)
                    logger.error(
                        f"Error adding coordinates for {loc} : https://simplify.jobs/tracker?id={item['id']}"
                    )

        LOCATION_CACHE.save(location_cache)
        return SIMPLIFY_TRACKER_PARSED.save(self.input.data)


class StatusEvents:
    def __init__(self, input):
        self.input = input
        self.output = self.process()

    def process(self):
        for item in self.input.data:
            for status in item["status_events"]:
                if status["status"] == 1:
                    status["status"] = "saved"
                elif status["status"] == 2:
                    status["status"] = "applied"
                elif status["status"] == 11:
                    status["status"] = "screen"
                elif status["status"] == 23:
                    status["status"] = "rejected"

        return SIMPLIFY_TRACKER_PARSED.save(self.input.data)


class ProcessSalary:
    def __init__(self, input):
        self.input = input
        self.output = self.process()

    def process(self):
        hour_map = {2: 168, 3: 744, 4: 8784}
        for item in self.input.data:
            sal = None
            salary_period = item["salary_period"]
            if item["salary_low"] and item["salary_high"]:
                sal = int(item["salary_low"] + item["salary_high"])
            elif item["salary_low"] or item["salary_high"]:
                sal = item["salary_low"] or item["salary_high"]
            if sal:
                if salary_period > 1:
                    sal = sal // hour_map[salary_period]
                if salary_period > 1 and sal < 100:
                    logger.error(
                        f"Change salary from anually to weekly: https://simplify.jobs/tracker?id={item['id']}"
                    )
            item["salary"] = sal

        return SIMPLIFY_TRACKER_PARSED.save(self.input.data)


def main():
    # Simplify Listings
    data = LISTINGS_RAW
    data = FilterByDate(data, cutoff_date=datetime.datetime(2024, 1, 1)).output

    # Simplify Tracker Data
    data = SIMPLIFY_TRACKER
    data = AddCoordinates(data).output
    data = StatusEvents(data).output
    data = ProcessSalary(data).output


if __name__ == "__main__":
    main()
