
import csv
import json

#  GENERAL NOTES ABOUT INFORMATION:
#     <= 2009 removes "Hawaiian/Pacific Isl" , "Multiracial", "All   African American", and "All    Native American"
#     <= 2013 removes "All Asian" and "All Hawaiian"
#     <= 2019 removes "URM"

def make_json(csvFilePath, jsonFilePath):
   json_data = {}
   
   with open(csvFilePath, encoding='utf-8') as csv_file:
      csvReader = csv.DictReader(csv_file)
      
      for line_count, rows in enumerate(csvReader, start=2):
         if all(value.strip(" ") == "" for value in rows.values()):
            continue


 
   # Open a json writer, and use the json.dumps()
   # function to dump data
   with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
      jsonf.write(json.dumps(json_data, indent=4))

# path to input and output file
csvFilePath = r'csv_data/2022fa_details.csv'
jsonFilePath = r'json_data/2022fa_details.json'

if __name__ == "__main__":
   make_json(csvFilePath, jsonFilePath)