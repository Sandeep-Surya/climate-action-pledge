'use server';

import { Pledge, PledgeFormData } from '@/types/pledge';
import { addPledge, generatePledgeId, getAllPledges } from '@/lib/mockData';
import { addPledgeToSheet, getPledgesFromSheet, initializeSheet } from '@/lib/googleSheets';

export async function submitPledge(formData: PledgeFormData): Promise<Pledge> {
  // Validate form data
  if (!formData.name || !formData.email || !formData.mobile) {
    throw new Error('Required fields are missing');
  }

  if (formData.commitments.length === 0) {
    throw new Error('Please select at least one commitment');
  }

  // Create pledge object
  const pledge: Pledge = {
    id: generatePledgeId(),
    name: formData.name,
    email: formData.email,
    mobile: formData.mobile,
    state: formData.state,
    profile: formData.profile,
    customProfile: formData.customProfile,
    commitments: formData.commitments,
    rating: formData.rating,
    date: new Date().toISOString().split('T')[0],
  };

  // Try to add to Google Sheets
  const addedToSheet = await addPledgeToSheet(pledge);
  
  // If Google Sheets fails, fallback to mock data
  if (!addedToSheet) {
    addPledge(pledge);
  }

  // Return pledge (without sensitive data for client)
  return pledge;
}

export async function getPledges(): Promise<Pledge[]> {
  // Try to get from Google Sheets first
  const sheetPledges = await getPledgesFromSheet();
  
  // If Google Sheets has data, return it
  if (sheetPledges.length > 0) {
    return sheetPledges;
  }
  
  // Otherwise, return mock data
  return getAllPledges();
}

export async function initializeGoogleSheet(): Promise<boolean> {
  return await initializeSheet();
}
