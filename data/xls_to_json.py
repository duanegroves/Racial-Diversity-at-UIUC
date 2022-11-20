
import csv
import json

#  GENERAL NOTES ABOUT INFORMATION:
#     <= 2009 removes "Hawaiian/Pacific Isl" , "Multiracial", "All   African American", and "All    Native American"
#     <= 2013 removes "All Asian" and "All Hawaiian"
#     <= 2019 removes "URM"

#  TIME SPENT ON PROJECT:
#     Normalizing Data: Saturday and Sunday

def make_json(csvFilePath, jsonFilePath):
   json_data = {}
   
   with open(csvFilePath, encoding='utf-8-sig') as csv_file:
      csvReader = csv.DictReader(csv_file)
      
      consecutive_empty_rows = 0
      for line_count, row in enumerate(csvReader, start=2):
         row = { key:val.strip() for key, val in row.items()}

         if all(value == "" for value in row.values()):
            consecutive_empty_rows =+1
            continue
         consecutive_empty_rows = 0

         if row["Major Name"] == "***Campus total***":
            json_data['Term/Year Code'] = row['Term/Year Code']
            json_data['Campus total'] = {
               'Total': row['Total'],
               'Sex': {
                  'Men': row['Sex: Men'],
                  'Women': row['Sex: Women'],
                  'Unknown': row['Sex: Unknown']
               }, 
               'Ethnicity': {
                  'Men': row['Sex: Men'],
                  'Women': row['Sex: Women'],
                  'Unknown': row['Sex: Unknown']
               }, 
               'All': {}, 
               'URM': None, 
               'Residency': {}}
         
         if line_count > 5: break


 
   # Open a json writer, and use the json.dumps()
   # function to dump data
   with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
      jsonf.write(json.dumps(json_data, indent=4))

# path to input and output file
csvFilePath = r'csv_data/2022fa_details.csv'
jsonFilePath = r'json_data/2022fa_details.json'

if __name__ == "__main__":
   make_json(csvFilePath, jsonFilePath)