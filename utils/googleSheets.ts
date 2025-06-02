import { google } from 'googleapis';

// Initialize the Google Sheets API client
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

export interface CompanyData {
  name: string;
  description: string;
  sector: string;
  type: string;
  state: string;
  city: string;
  revenue: string;
  employees: string;
  prisonLaborRevenue: string;
  prisonLaborEmployees: string;
  prisonLaborDescription: string;
  sources: string;
  notes: string;
}

export async function fetchGoogleSheetsData(spreadsheetId: string, range: string): Promise<CompanyData[]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return [];
    }

    // Assuming first row contains headers
    const headers = rows[0];
    const data = rows.slice(1).map(row => {
      const item: any = {};
      headers.forEach((header: string, index: number) => {
        item[header] = row[index] || '';
      });
      return item as CompanyData;
    });

    return data;
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    throw error;
  }
} 