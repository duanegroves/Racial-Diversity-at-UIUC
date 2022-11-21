
import csv
import json

#  GENERAL NOTES ABOUT INFORMATION:
#     <= 2009 removes "Hawaiian/Pacific Isl" , "Multiracial", "All   African American", and "All    Native American"
#     <= 2013 removes "All Asian" and "All Hawaiian"
#     <= 2019 removes "URM"

#  TIME SPENT ON PROJECT:
#     Intake, Understanding, and Normalization Data ->  Saturday and Sunday
#     

def jsonify_row(row):
   return {
      'Total': row['Total'],
      'Sex': {
         'Men': row['Sex: Men'],
         'Women': row['Sex: Women'],
         'Unknown': row['Sex: Unknown']
      }, 
      'Ethnicity': {
         'Caucasian':         row['Ethnicity: Caucasian'],
         'Asian American':    row['Ethnicity: Asian American'],
         'Asian American':    row['Ethnicity: Asian American'],
         'African American':  row['Ethnicity: African American'],
         'Hispanic':          row['Ethnicity: Hispanic'],
         'Native American':   row['Ethnicity: Native American'],
         'Hawaiian/Pacific Isl': row['Ethnicity: Hawaiian/Pacific Isl'] if 'Ethnicity: Hawaiian/Pacific Isl' in row else None,
         'Multiracial':       row['Ethnicity: Multiracial'] if 'Ethnicity: Multiracial' in row else None,
         'International':     row['Ethnicity: International'],
         'Unknown':           row['Ethnicity: Unknown'],
      }, 
      'All': {
         'African American':  row['All: African American'] if 'All: African American' in row else None,
         'Native American':   row['All: Native American'] if 'All: Native American' in row else None,
         'Hawaiian/ Pac Isl': row['All: Hawaiian/ Pac Isl'] if 'All: Hawaiian/ Pac Isl' in row else None,
         'Asian':             row['All: Asian'] if 'All: Asian' in row else None,
      }, 
      'URM': row['URM'] if 'URM' in row else None, 
      'Residency': {
         'Illinois': row['Residency: Illinois'],
         'Non-Illinois': row['Residency: Non-Illinois']
      }}



def merge(a, b):
   newdict = {}
   for a_key, a_val in a.items():
      if type(a_val) is dict:
         for a2_key, a2_val in a_val.items():
            if a_key not in newdict:
               newdict[a_key] = {a2_key: int(a2_val) + int(b[a_key][a2_key]) if a2_val != None or b[a_key][a2_key] != None else None}
            else:
               newdict[a_key][a2_key] = int(a2_val) + int(b[a_key][a2_key]) if a2_val != None or b[a_key][a2_key] != None else None
      else:
         newdict[a_key] = int(a_val) + int(b[a_key]) if a_val != None or b[a_key] != None else None
   return newdict


def make_json(csvFilePath, jsonFilePath):
   json_data = {}
   
   with open(csvFilePath, encoding='utf-8-sig') as csv_file:
      csvReader = csv.DictReader(csv_file)
      
      for line_count, row in enumerate(csvReader, start=2):
         row = { key:val.strip() for key, val in row.items()}
         
         # Empty Rows
         #  Data has some empty rows that we just want skip over 
         if all(value == "" for value in row.values()):
            continue

         # Overall Statistics
         #  At the top of each page there are some overall statistics of the univeristy
         if row["Major Name"] == "***Campus total***":
            json_data['Term/Year Code'] = row['Term/Year Code']
            json_data['Colleges'] = {}
            json_data[row["Major Name"]] = jsonify_row(row)
            continue
         elif row["Major Name"] == "Undergraduate":
            json_data[row["Major Name"]] = jsonify_row(row)
            continue
         elif row["Major Name"] == "Graduate":
            json_data[row["Major Name"]] = jsonify_row(row)
            continue
         elif row["Major Name"] == "Professional":
            json_data[row["Major Name"]] = jsonify_row(row)
            continue

         # College Statistics
         if row['Coll'] not in json_data['Colleges']:
            # Creates college if it does not exist
            # Colleges have their own row with their name in place of major name
            json_data['Colleges'][row['Coll']] = {
               'College Name': row['Major Name'],
               'Majors': {}}
            continue
         else:
            # If College is already created
            if row['Concentration Name (if any)'] == '***College total***':
               json_data['Colleges'][row['Coll']][row['Concentration Name (if any)']] = jsonify_row(row)
               continue
            elif row['Major Name'] not in json_data['Colleges'][row['Coll']]['Majors']:
               # If Major name is not already listed create the major and fill in information about
               # accompanied degree
               json_data['Colleges'][row['Coll']]['Majors'][row['Major Name']] = {
                  'Major Code': row['Major code'],
                  'Degrees': {
                     row['Degree']: jsonify_row(row)
                  }
               }
               continue
            else:
               if row['Degree'] not in json_data['Colleges'][row['Coll']]['Majors'][row['Major Name']]['Degrees']:
                  # If Major is created but degree is not listed, add degree information
                  json_data['Colleges'][row['Coll']]['Majors'][row['Major Name']]['Degrees'][row['Degree']] = jsonify_row(row)
                  continue
               else:
                  # If College, Major, and Degree already exist we will add the results of the row with 
                  # already existent information. This is because we don't care about concentration
                  json_data['Colleges'][row['Coll']]['Majors'][row['Major Name']]['Degrees'][row['Degree']] = merge(json_data['Colleges'][row['Coll']]['Majors'][row['Major Name']]['Degrees'][row['Degree']], jsonify_row(row))
                  continue
         
   # Open a json writer, and use the json.dumps()
   # function to dump data
   with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
      jsonf.write(json.dumps(json_data, indent=4))


if __name__ == "__main__":
   for year in range(2004, 2023):
      make_json(fr'csv_data/{year}fa_details.csv', fr'json_data/{year}fa_details.json')