import Airtable from 'airtable';
import CacheService from './CacheService.js';

class AirtableService {
  constructor(cache) {
    this.base = new Airtable({ apiKey: process.env.API_KEY }).base('appNAH2NzKzc4R9Fe');
    this.cache = cache;
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
    let pageNum = 1;

    return new Promise((resolve, reject) => {
      this.base('Sheet1')
        .select({
          view: 'Grid view',
        })
        .eachPage(
          (records, fetchNextPage) => {
            try {
              // This function (`page`) will get called for each page of records.
              results.push(records);
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
