export interface Pledge {
  id: string;
  name: string;
  email: string;
  mobile: string;
  state: string;
  profile: string;
  customProfile?: string;
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
  customProfile?: string;
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
  "Working Professional",
  "Other",
];

export interface CommitmentTheme {
  theme: string;
  commitments: string[];
}

export const COMMITMENT_THEMES: CommitmentTheme[] = [
  {
    theme: "Energy & Resources",
    commitments: [
      "Use renewable energy",
      "Reduce electricity consumption",
      "Conserve water usage",
    ],
  },
  {
    theme: "Waste & Consumption",
    commitments: [
      "Reduce plastic usage",
      "Minimize food waste",
      "Practice recycling",
    ],
  },
  {
    theme: "Mobility & Community",
    commitments: [
      "Use public transport",
      "Plant trees",
      "Educate others about climate action",
    ],
  },
];

export const COMMITMENT_OPTIONS = COMMITMENT_THEMES.flatMap(
  (theme) => theme.commitments
);
