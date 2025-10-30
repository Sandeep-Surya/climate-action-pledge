import { google } from 'googleapis';
import { Pledge } from '@/types/pledge';

// Initialize Google Sheets API
const getGoogleSheetsClient = () => {
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;

  if (!privateKey || !clientEmail) {
    return null;
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
};

const SHEET_ID = process.env.GOOGLE_SHEET_ID || '';
const SHEET_NAME = 'Sheet1'; // Default Google Sheets tab name

// Add pledge to Google Sheets
export async function addPledgeToSheet(pledge: Pledge): Promise<boolean> {
  try {
    const sheets = getGoogleSheetsClient();
    if (!sheets) return false;

    const values = [[
      pledge.id,
      pledge.name,
      pledge.email,
      pledge.mobile,
      pledge.state,
      pledge.profile,
      pledge.commitments.join(', '),
      pledge.rating.toString(),
      pledge.date,
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:I`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
}

// Get pledges from Google Sheets
export async function getPledgesFromSheet(): Promise<Pledge[]> {
  try {
    const sheets = getGoogleSheetsClient();
    if (!sheets) {
      return [];
    }
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:I`,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return [];
    }

    // Skip header row and convert to Pledge objects
    const pledges: Pledge[] = rows.slice(1)
      .map((row, index) => {
        // Validate that we have the required fields
        if (!row[0] || !row[1] || !row[4]) {
          return null;
        }
        
        return {
          id: row[0] || '',
          name: row[1] || '',
          email: row[2] || '',
          mobile: row[3] || '',
          state: row[4] || '',
          profile: row[5] || '',
          commitments: row[6] ? (typeof row[6] === 'string' ? row[6].split(', ') : []) : [],
          rating: parseInt(row[7] || '5', 10),
          date: row[8] || new Date().toISOString().split('T')[0],
        };
      })
      .filter((pledge): pledge is Pledge => pledge !== null);

    // Return in reverse order (newest first)
    return pledges.reverse();
  } catch (error) {
    return [];
  }
}

// Initialize sheet with headers if needed
export async function initializeSheet(): Promise<boolean> {
  try {
    const sheets = getGoogleSheetsClient();
    if (!sheets) return false;

    // Check if sheet exists
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A1:I1`,
    });

    // If no data, add headers
    if (!response.data.values || response.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!A1:I1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[
            'Pledge ID',
            'Name',
            'Email',
            'Mobile',
            'State',
            'Profile',
            'Commitments',
            'Rating',
            'Date',
          ]],
        },
      });
    }

    return true;
  } catch (error) {
    return false;
  }
}
