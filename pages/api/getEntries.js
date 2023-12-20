import Airtable from 'airtable';
import uniq from 'lodash/uniq';
import {
  PRIMARY_SECTOR_ID,
  OTHER_SECTORS_ID,
  PRIMARY_SUBSECTOR_ID,
  OTHER_SUBSECTORS_ID,
} from '../../utils';

export default async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=86400');

  try {
    const base = new Airtable({ apiKey: process.env.API_KEY }).base(process.env.BASE_ID);
    let values = await checkAirtable(base);

    if (!values) {
      values = [];
    }

    const flattenedValues = values.flat();
    res.status(200).json(flattenedValues);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const parseSectors = (records) => {
  return records.map((record) => {
    const primarySector = record?.[PRIMARY_SECTOR_ID];
    const sectors = record?.[OTHER_SECTORS_ID] || [];
    const primarySubsector = record?.[PRIMARY_SUBSECTOR_ID];
    const subsectors = record?.[OTHER_SUBSECTORS_ID] || [];

    let newSectors = sectors;
    if (primarySector) {
      newSectors = uniq([primarySector, ...sectors]);
    }

    let newSubsectors = subsectors;
    if (primarySector) {
      newSubsectors = uniq([primarySubsector, ...subsectors]);
    }

    return { ...record, [OTHER_SECTORS_ID]: newSectors, [OTHER_SUBSECTORS_ID]: newSubsectors };
  });
};

const cleanRecords = (records) => {
  return records.map((record) => ({
    ...record.fields,
    rowId: record.id,
  }));
};

const checkAirtable = (base) => {
  const results = [];

  return new Promise((resolve, reject) => {
    base(process.env.SHEET_ID)
      .select({
        view: 'All corporations',
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
