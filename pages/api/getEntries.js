import Airtable from 'airtable';
import values from './data.json';
// TODO: move field/record ids into single file for resuability
const PRIMARY_SECTOR_ID = 'fldjEW6owmKk8OMlX';
const OTHER_SECTORS_ID = 'fldTcs1OaGwdUsHiW';

export default async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=86400');

  try {
    // const base = new Airtable({ apiKey: process.env.API_KEY }).base('appuZlplPKjKPkFBR');
    // const values = await checkAirtable(base);

    let flatValues = values.flat();
    flatValues = parseSectors(flatValues);

    res.status(200).json(flatValues);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const parseSectors = (records) => {
  return records.map((record) => {
    const primarySector = record?.[PRIMARY_SECTOR_ID];
    const sectors = record?.[OTHER_SECTORS_ID] || [];

    let sectorsCopy = sectors;
    if (primarySector) {
      sectorsCopy = [primarySector, ...sectors];
    }

    return { ...record, [OTHER_SECTORS_ID]: sectorsCopy };
  });
};

const cleanRecords = (records) => {
  return records.map((record) => record.fields);
};

const checkAirtable = (base) => {
  const results = [];

  return new Promise((resolve, reject) => {
    base('tblgyzaJvuz4Udat3')
      .select({
        view: 'Grid view',
        returnFieldsByFieldId: true,
      })
      .eachPage(
        (records, fetchNextPage) => {
          try {
            // Remove unnecessary fields from records objects
            let cleanedRecords = cleanRecords(records);

            // Combine "Primary Sector/Subsector" and "Other Sectors/Subsectors" fields
            cleanedRecords = parseSectors(cleanedRecords);

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
};
