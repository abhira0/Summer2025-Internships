import json
import os
import datetime
from typing import Dict, List, Any
from geopy.geocoders import Nominatim
import time
import threading
import logging
import coloredlogs

# Create a logger object
logger = logging.getLogger(__name__)

# Set the level of the logger to DEBUG
logger.setLevel(logging.DEBUG)

# Create a colored formatter and add it to the logger
coloredlogs.install(level='DEBUG', logger=logger,
    fmt="%(asctime)s - %(filename)s:%(lineno)d - %(levelname)s - %(message)s",
        field_styles={
        'asctime': {'color': 'green'},
        'filename': {'color': 'magenta'},
        'lineno': {'color': 'magenta'},
        'levelname': {'color': 'cyan', 'bold': True},
        'message': {'color': 'white'},
    })

class JSONFile:
    def __init__(self, file_path: str, auto_save: bool = True):
        self.file_path = file_path
        self.data = self.load()
        if auto_save:
            self.start_auto_save()

    def load(self) -> Any:
        if not os.path.exists(self.file_path):
            with open(self.file_path, 'w') as f:
                json.dump([], f)
        with open(self.file_path, 'r+') as f:
            return json.load(f)

    def save(self, data: Any = []) -> None:
        if data:
            self.data = data
        with open(self.file_path, 'w') as f:
            json.dump(data or self.data, f, indent=2)
        return self

    def start_auto_save(self):
        def auto_save():
            while True:
                time.sleep(3)
                self.save()
        thread = threading.Thread(target=auto_save, daemon=True)
        thread.start()

LISTINGS_RAW = JSONFile('.github/scripts/listings.json', auto_save=False)
LISTINGS_PARSED = JSONFile('docs/analytics/cache/listings_parsed.json')
SIMPLIFY_TRACKER = JSONFile('docs/analytics/cache/simplify/raw.json', auto_save=False)
LOCATION_CACHE = JSONFile('docs/analytics/cache/locations.json')

PREDEFINED_MAPPING = {"Austin, Texas Metropolitan Area": "Austin, Texas, USA"}

class FilterByDate:
    def __init__(self, input, cutoff_date: datetime.datetime=datetime.datetime(2024, 1, 1)):
        self.input = input
        self.output = self.process(cutoff_date)

    def process(self, cutoff_date) -> None:
        entries = []
        for listing in self.input.data:
            date = datetime.datetime.fromtimestamp(int(listing['date_posted']))
            if date >= cutoff_date:
                entries.append(listing)
        return LISTINGS_PARSED.save(entries)

class AddCoordinates:
    def __init__(self, input):
        self.input = input
        self.output = self.process()
    
    def get_coord(self, location: str, location_cache: Dict, geolocator: Nominatim) -> List:
        location = location.strip()
        if "remote" in location.lower():
            location_cache[location] = [["remote", "remote", "remote"]]
        elif not location_cache.get(location) is not None:
            logger.debug(f"API Call! for {location}")
            time.sleep(1)

            loc = geolocator.geocode(location)
            assert loc, f"Location not found, {loc.raw}"
            
            location_cache[location] = [[loc.latitude, loc.longitude, loc.address]]
        return location_cache[location]
    
    def get_all_locations(self, locations:str):
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
            locations = self.get_all_locations(item['job_posting_location'])
            if not locations:
                logger.error(f"No locations found for {item['job_posting_location']}")
            for loc in locations:
                try:
                    item['coordinates'] = self.get_coord(loc, location_cache, geolocator)
                    # logger.info(f"Coordinates for {loc} is {item['coordinates']}")
                except Exception as e:
                    errors.append(loc)
                    logger.error(f"Error adding coordinates for {loc} : https://simplify.jobs/tracker?id={item['id']}")
            
        LOCATION_CACHE.save(location_cache)
        #     for location in locations:
        #         ...

        #         if "remote" in location.lower():
        #             location_coordinates[location] = [["remote", "remote", "remote"]]
        #             continue
        #         if "multiple" in location.lower():
        #             location_coordinates[location] = [["multiple", "multiple", "multiple"]]
        #             continue

        #         split_markers = [" and ", " or ", " | ", ";", " • "]
        #         processed = False
                
        #         for split_by in split_markers:
        #             if split_by in location:
        #                 location_coordinates[location] = process_split_locations(location, split_by, coord_getter)
        #                 processed = True
        #                 break
                
        #         if processed:
        #             continue

        #         clean_location = clean_location_string(location)
        #         try:
        #             if clean_location in PREDEFINED_MAPPING:
        #                 location_coordinates[location] = [coord_getter(PREDEFINED_MAPPING[clean_location])]
        #             else:
        #                 location_coordinates[location] = [coord_getter(clean_location)]
        #         except Exception as e:
        #             errors.append(location)

        # return location_coordinates, location_cache, errors



# def process_split_locations(location: str, split_by: str, get_coord_func) -> List:
#     locs = []
#     for loc in location.split(split_by):
#         if "more" in loc:
#             continue
#         coord = get_coord_func(loc)
#         locs.append(coord)
#     return locs

# def clean_location_string(location: str) -> str:
#     removals = ["Location pin icon ", "locations", "office", "Category"]
#     clean_location = location
#     for i in removals:
#         clean_location = clean_location.replace(i, "")
#     return clean_location



def main():
    # Simplify Listings
    data = LISTINGS_RAW
    data = FilterByDate(data, cutoff_date=datetime.datetime(2024, 1, 1)).output
    
    # Simplify Tracker Data
    data = SIMPLIFY_TRACKER
    data = AddCoordinates(data).output
    
if __name__ == '__main__':
    main()