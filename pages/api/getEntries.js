import Airtable from 'airtable';
import values from './data.json';


export default async (req, res) => {
    res.setHeader('Cache-Control', 's-maxage=86400');

    try {
      // const base = new Airtable({ apiKey: process.env.API_KEY }).base('appuZlplPKjKPkFBR');
      // const values = await checkAirtable(base);
      

      res.status(200).json(values);
    } catch (error) {
      res.status(500).json({ error })
    }
}

  const parsePrimarySector = (records, base, primarySectors) => {
    records.forEach((record) => {
      const sectorId = record?.['Primary Sector']?.[0];

      if (!sectorId) return;

      if (sectorId in primarySectors) {
        record['Primary Sector'] = primarySectors[sectorId];
      } else {
        base('Primary Sector').find(sectorId, (err, rec) => {
          const sectorName = rec?.fields?.Name;
          if (!err && sectorName) {
            record['Primary Sector'] = sectorName;
            primarySectors[sectorId] = sectorName;
          }
        });
      }
    });
  }

  const cleanRecords = records => {
    return records.map((record) => record.fields);
  }

  const checkAirtable = base => {
    const results = [];

    return new Promise((resolve, reject) => {
      base('tblgyzaJvuz4Udat3')
        .select({
          view: 'Grid view',
          returnFieldsByFieldId: true
        })
        .eachPage(
          (records, fetchNextPage) => {
            try {
              // Remove unnecessary fields from records objects
              const cleanedRecords = cleanRecords(records);

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

            resolve(results);
          }
        );
    });
  }
