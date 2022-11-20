
import csv
import json
 
 
def make_json(csvFilePath, jsonFilePath):
   data = {}
   
   with open(csvFilePath, encoding='utf-8') as csv_file:
      csvReader = csv.DictReader(csv_file)
      
      for line_count, rows in enumerate(csvReader, start=1):
         if line_count <= 7:
            print(line_count, rows)
            continue
         exit(2)
         # Assuming a column named 'No' to
         # be the primary key
         key = rows['No']
         data[key] = rows
 
   # Open a json writer, and use the json.dumps()
   # function to dump data
   with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
      jsonf.write(json.dumps(data, indent=4))

# path to input and output file
csvFilePath = r'csv_data/2021fa_details.csv'
jsonFilePath = r'/json_data/2021fa_details.json'

if __name__ == "__main__":
   make_json(csvFilePath, jsonFilePath)