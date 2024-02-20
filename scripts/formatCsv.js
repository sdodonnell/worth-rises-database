import fs from 'fs';
import csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';
import companyNames from './companyNames.json' assert { type: 'json' };
import { closestMatch, distance } from 'closest-match';
// import readlineSync from 'readline-sync';

// Function to convert a string to title case
function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const inputFile = process.argv[2];
const validOutputFile = inputFile.split('.').slice(0, -1).join('.') + '_valid.csv';
const invalidOutputFile = inputFile.split('.').slice(0, -1).join('.') + '_invalid.csv';

// CSV writer setup
let validRecordsCsvWriter;
let invalidRecordsCsvWriter;

let headers = [];
const records = [];
const unprocessedRecords = [];

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('headers', (headerList) => {
    headers = headerList;

    validRecordsCsvWriter = createObjectCsvWriter({
      path: validOutputFile,
      header: headerList.filter(Boolean).map((el) => {
        return {
          id: el,
          title: el,
        };
      }),
    });

    invalidRecordsCsvWriter = createObjectCsvWriter({
      path: invalidOutputFile,
      header: headerList.filter(Boolean).map((el) => {
        return {
          id: el,
          title: el,
        };
      }),
    });
  })
  .on('data', (row) => {
    if (headers.length > 0 && row[headers[0]]) {
      // Do any formatting here
      let companyName = row[headers[0]];
      // if (row['Old Name and Ticker']) {
      //   companyName = row['Old Name and Ticker'].split('/')[0].trim();
      // }

      const original = companyName;
      const bestOption = closestMatch(original, companyNames);
      // let bestOption = closestMatches[0];
      const matchDistance = distance(original, bestOption);

      // if (matchDistance > 5) {
      //   console.log(`${original} not found. These are the possible matches:`);
      //   const matchIndex = readlineSync.keyInSelect(
      //     [...closestMatches],
      //     'Which is the best match?'
      //   );
 
      //   if (matchIndex === -1) {
      //     unprocessedRecords.push(row);
      //     return;
      //   } else {
      //     bestOption = closestMatches[matchIndex];
      //     row[headers[0]] = bestOption;
      //     records.push(row);
      //     return;
      //   }
      // }

      if (bestOption && matchDistance < 2) {
        // if (matchDistance > 2) {
        //   // console.log(`This isn't a perfect match: ${original} --> ${bestOption}`);
        //   // fs.writeFileSync('weird-matches-2.txt', `\n${original} --> ${bestOption}`, { flag: 'a+' });
        //   return;
        // }

        row[headers[0]] = bestOption;
        records.push(row);
      } else {
        console.log(`Imperfect match: ${original} --> ${bestOption}`)
        // console.log(`Not sure what happened with record ${original}; not including it.`);
        unprocessedRecords.push(row);
      }
    }
  })
  .on('end', () => {
    validRecordsCsvWriter.writeRecords(records);
    invalidRecordsCsvWriter.writeRecords(unprocessedRecords);
    console.log(`Modified file saved as ${validOutputFile}`);
    console.log(`
        Could not include ${unprocessedRecords.length} records. 
        Not including the following records: ${unprocessedRecords.map((el) => el.Name)}
    `);
  });
