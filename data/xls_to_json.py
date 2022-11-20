
import csv
import json
 
 
def make_json(csvFilePath, jsonFilePath):
   """
   Given a cvs converted xls file from Enrollment by Curriculum, Race, Sex, and Residency 
   (https://dmi.illinois.edu/stuenr/), this will convert it into json
   """
   data = {}
   
   with open(csvFilePath, encoding='utf-8') as csvf:
      csvReader = csv.DictReader(csvf)
      
      # Convert each row into a dictionary
      # and add it to data
      for rows in csvReader:
            
         # Assuming a column named 'No' to
         # be the primary key
         key = rows['No']
         data[key] = rows
 
   # Open a json writer, and use the json.dumps()
   # function to dump data
   with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
      jsonf.write(json.dumps(data, indent=4))

# path to input and output file
csvFilePath = r'/raw_data/2022fa-details.csv'
jsonFilePath = r'/json_data/2022fa-details.json'

if __name__ == "__main__":
   make_json(csvFilePath, jsonFilePath)