export interface Pledge {
  id: string;
  name: string;
  email: string;
  mobile: string;
  state: string;
  profile: string;
  commitments: string[];
  rating: number;
  date: string;
}

export interface PledgeFormData {
  name: string;
  email: string;
  mobile: string;
  state: string;
  profile: string;
  commitments: string[];
  rating: number;
}

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export const PROFILES = [
  "Student",
  "Professional",
  "Entrepreneur",
  "Homemaker",
  "Retired",
  "Other",
];

export const COMMITMENT_OPTIONS = [
  "Reduce plastic usage",
  "Use public transport",
  "Plant trees",
  "Save water",
  "Use renewable energy",
  "Reduce food waste",
  "Support local businesses",
  "Educate others",
];
