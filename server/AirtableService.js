import Airtable from 'airtable';
class AirtableService {
  constructor(cache) {
    this.base = new Airtable({ apiKey: process.env.API_KEY }).base('appNAH2NzKzc4R9Fe');
    this.cache = cache;

    this.primarySectors = {};
  }

  parsePrimarySector(records) {
    records.forEach((record) => {
      const sectorId = record?.['Primary Sector']?.[0];

      if (!sectorId) return;

      if (sectorId in this.primarySectors) {
        record['Primary Sector'] = this.primarySectors[sectorId];
      } else {
        this.base('Primary Sector').find(sectorId, (err, rec) => {
          const sectorName = rec?.fields?.Name;
          if (!err && sectorName) {
            record['Primary Sector'] = sectorName;
            this.primarySectors[sectorId] = sectorName;
          }
        });
      }
    });
  }

  cleanRecords(records) {
    return records.map((record) => record.fields);
  }

  getAllEntries() {
    let value = this.cache.get('myKey');

    if (!value) {
      value = this.checkAirtable();
    }

    return value;
  }

  checkAirtable() {
    const results = [];

    return new Promise((resolve, reject) => {
      this.base('Sheet1')
        .select({
          view: 'Grid view',
        })
        .eachPage(
          (records, fetchNextPage) => {
            try {
              // Remove unnecessary fields from records objects
              const cleanedRecords = this.cleanRecords(records);

              // 'Primary Sector' is a reference to another table, so these cells need to be cross-referenced
              this.parsePrimarySector(cleanedRecords);

              // This function (`page`) will get called for each page of records.
              results.push(cleanedRecords);
            } catch (e) {
              console.log(e);
            }

            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            try {
              // HERE
              fetchNextPage();
            } catch (e) {
              console.log(e);
              return;
            }
          },
          (err) => {
            if (err) {
              console.error(err);
              reject();
            }

            this.cache.set('myKey', results);
            resolve(results);
          }
        );
    });
  }
}

export default AirtableService;
