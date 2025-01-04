import json
import os
import datetime
from typing import Dict, List, Any
from geopy.geocoders import Nominatim
import time

class JSONFile:
    def __init__(self, file_path: str):
        self.file_path = file_path
        self.data = self.load()

    def load(self) -> Any:
        if not os.path.exists(self.file_path):
            with open(self.file_path, 'w') as f:
                json.dump([], f)
        with open(self.file_path, 'r+') as f:
            return json.load(f)

    def save(self, data: Any= []) -> None:
        with open(self.file_path, 'w') as f:
            json.dump(data or self.data, f, indent=2)

PARSED_JSON = JSONFile('docs/analytics/cache/listings_parsed.json')
LOCATION_CACHE = JSONFile('docs/analytics/cache/locations.json')

PREDEFINED_MAPPING = {"Austin, Texas Metropolitan Area": "Austin, Texas, USA"}

class FilterByDate:
    def __init__(self, cutoff_date: datetime.datetime=datetime.datetime(2024, 1, 1)):
        self.cutoff_date = cutoff_date
        self.listings = JSONFile('.github/scripts/listings.json')
        self.filter()

    def filter(self) -> None:
        entries = []
        for listing in self.listings.data:
            date = datetime.datetime.fromtimestamp(int(listing['date_posted']))
            if date >= self.cutoff_date:
                entries.append(listing)
        PARSED_JSON.save(entries)

class AddCoordinates:
    def __init__(self):
        self.process()
    
    def get_coord(location: str, location_cache: Dict, geolocator: Nominatim) -> List:
        if location_cache.get(location) is not None:
            return location_cache[location]

        print(f"API Call! for {location}")
        time.sleep(1)

        loc = geolocator.geocode(location)
        assert loc, f"Location not found, {loc.raw}"
        
        location_cache[location] = [[loc.latitude, loc.longitude, loc.address]]
        LOCATION_CACHE.save(location_cache)
        return location_cache[location]
    
    def process(self):
        location_cache = LOCATION_CACHE.load()
        geolocator = Nominatim(user_agent="location_converter")
        errors = []

        # for item in data:
        #     locations = item['locations']
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
    FilterByDate()
    AddCoordinates()
    
if __name__ == '__main__':
    main()