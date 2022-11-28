
import csv
import json

def make_json(csvFilePath, jsonFilePath):
   header = []
   data = []
   
   with open(csvFilePath, encoding='utf-8-sig') as csv_file:
      csvreader = csv.reader(csv_file)

      for idx, row in enumerate(csvreader, start=1):
         row = [el.strip() for el in row]

         if idx == 1:
            # Copying over the headers of the list
            header = row
            continue 
         elif row[4] == "":
            # If it is a row which does not describe a major (either summary or empty) skip
            continue
         else:
            row = [el if i != 6 and i != 7 and i != 28 else "" for i, el in enumerate(row)]
            # Check to see if major and degree already exists 
            # If it does we just add the values
            # Otherwise we create a new row
            foundExistingMajorTotal = False
            foundExistingMajorDegree = False
            for saved_idx, saved_row in enumerate(data):
               if saved_row[3] == row[3] and saved_row[4] == row[4]:
                  foundExistingMajorDegree = True
                  data[saved_idx] = [int(row[i]) + int(saved_row[i]) if 7 < i and i < 28 else saved_row[i] for i, el in enumerate(row)]
               if saved_row[3] == "***Major total***" and saved_row[4] == row[4]:
                  foundExistingMajorTotal = True
                  data[saved_idx] = [int(row[i]) + int(saved_row[i]) if 7 < i and i < 28 else saved_row[i] for i, el in enumerate(row)]
            if not foundExistingMajorTotal:
               data.append(["***Major total***" if i == 3 else el for i, el in enumerate(row)])
            if not foundExistingMajorDegree:
               data.append(row)

         
         
   with open('countries.csv', 'w', encoding='UTF8', newline='') as f:
      writer = csv.writer(f)
      writer.writerow(header)
      writer.writerows(data)


if __name__ == "__main__":
   for year in range(2022, 2023):
      make_json(fr'csv_data/{year}fa_details.csv', fr'json_data/{year}fa_details.json')