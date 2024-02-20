import fs from 'fs';
import csv from 'csv-parser';

const inputFile = process.argv[2];
const records = [];

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    const key = Object.entries(row)[0][0];
    records.push(row[key])
  })
  .on('end', () => {
    fs.writeFileSync('./scripts/companyNames.json', JSON.stringify(records));
    console.log('Data saved');
  });
