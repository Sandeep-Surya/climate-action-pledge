import { Pledge } from '@/types/pledge';

// Mock data store (simulates backend)
export const mockPledges: Pledge[] = [
  {
    id: 'PLG-20250101-0001',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    mobile: '+919876543210',
    state: 'Karnataka',
    profile: 'Professional',
    commitments: ['Use public transport', 'Plant trees', 'Reduce plastic usage'],
    rating: 5,
    date: '2025-01-01',
  },
  {
    id: 'PLG-20250102-0002',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    mobile: '+919876543211',
    state: 'Maharashtra',
    profile: 'Student',
    commitments: ['Save water', 'Plant trees', 'Educate others'],
    rating: 4,
    date: '2025-01-02',
  },
  {
    id: 'PLG-20250103-0003',
    name: 'Amit Patel',
    email: 'amit@example.com',
    mobile: '+919876543212',
    state: 'Gujarat',
    profile: 'Entrepreneur',
    commitments: ['Use renewable energy', 'Support local businesses'],
    rating: 5,
    date: '2025-01-03',
  },
];

// Generate unique Pledge ID
export function generatePledgeId(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  return `PLG-${year}${month}${day}-${random}`;
}

// Add pledge to mock data
export function addPledge(pledge: Pledge): void {
  mockPledges.push(pledge);
}

// Get all pledges
export function getAllPledges(): Pledge[] {
  return mockPledges;
}

// Get total pledges count
export function getTotalPledgesCount(): number {
  return mockPledges.length;
}
