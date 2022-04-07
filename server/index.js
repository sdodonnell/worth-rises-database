import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import AirtableService from './AirtableService.js';
import CacheService from './CacheService.js';

const cache = new CacheService();
const PORT = process.env.PORT || 3001;

const app = express();

app.get('/api', async (req, res) => {
  const table = new AirtableService(cache);

  try {
    const entries = await table.getAllEntries();
    res.json(entries);
  } catch (e) {
    console.log(e);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
