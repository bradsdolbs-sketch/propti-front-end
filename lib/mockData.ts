// lib/mockData.ts

// Shared types
export type UnifiedStatus =
  | "Awaiting Landlord"
  | "Approved – Awaiting Contractor"
  | "Offer"
  | "Contractor Booked"
  | "In Progress"
  | "Completed";

export type Priority = "Urgent" | "Standard";

export type LandlordType = "Agency" | "Individual";

export interface Landlord {
  id: string;
  name: string;
  type: LandlordType;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  postcode: string;
  landlordId: string;
}

export interface Tenant {
  id: string;
  name: string;
  propertyId: string;
}

export interface Contractor {
  id: string;
  name: string;
  company: string;
  trades: string;
  coverage: string;
  rating: number;
  jobsThisWeek: number;
  status: "Active" | "Onboarding" | "Paused";
}

export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  tenantId: string;
  landlordId: string;
  contractorId?: string;
  category: string;
  priority: Priority;
  status: UnifiedStatus;
  issueTitle: string;
  description: string;
  tenantAvailability?: string;
  fee: string;
  createdAt: string;   // ISO-ish date string
  lastUpdate: string;  // ISO-ish date string
}

// Landlords
export const landlords: Landlord[] = [
  {
    id: "LL-1001",
    name: "Central Gate Estates",
    type: "Agency",
  },
  {
    id: "LL-1002",
    name: "Bipin Uka",
    type: "Individual",
  },
];

// Properties
export const properties: Property[] = [
  {
    id: "PROP-2001",
    name: "22 Anthony House",
    address: "Pembury Place",
    postcode: "E5 8GZ",
    landlordId: "LL-1001",
  },
  {
    id: "PROP-2002",
    name: "Central Gate",
    address: "Commercial Road",
    postcode: "E1 1LN",
    landlordId: "LL-1001",
  },
];

// Tenants
export const tenants: Tenant[] = [
  {
    id: "T-1001",
    name: "Danise Fang",
    propertyId: "PROP-2001",
  },
  {
    id: "T-1002",
    name: "Phuong Nguyen",
    propertyId: "PROP-2001",
  },
];

// Contractors
export const contractors: Contractor[] = [
  {
    id: "CON-001",
    name: "ABC Plumbing",
    company: "ABC Plumbing Ltd",
    trades: "Plumbing, Heating",
    coverage: "E1, E2, EC1, EC2",
    jobsThisWeek: 6,
    rating: 4.8,
    status: "Active",
  },
  {
    id: "CON-002",
    name: "Central Gate Maintenance",
    company: "Central Gate Maintenance",
    trades: "General maintenance",
    coverage: "E1, E5, N1",
    jobsThisWeek: 3,
    rating: 4.6,
    status: "Active",
  },
  {
    id: "CON-003",
    name: "Ventilation Co",
    company: "Ventilation Co",
    trades: "Electrical, Ventilation",
    coverage: "All London",
    jobsThisWeek: 1,
    rating: 4.4,
    status: "Onboarding",
  },
];

// Maintenance requests – single source of truth 💡
export const maintenanceRequests: MaintenanceRequest[] = [
  {
    id: "REQ-1023",
    propertyId: "PROP-2001",
    tenantId: "T-1001",
    landlordId: "LL-1001",
    contractorId: undefined,
    category: "Boiler / Heating",
    priority: "Urgent",
    status: "Awaiting Landlord",
    issueTitle: "Boiler not working",
    description:
      "Boiler stopped working last night. No heating or hot water, display flashing error code.",
    fee: "£140",
    createdAt: "2025-11-10T09:30:00Z",
    lastUpdate: "2025-11-12T14:15:00Z",
  },
  {
    id: "REQ-1020",
    propertyId: "PROP-2001",
    tenantId: "T-1001",
    landlordId: "LL-1001",
    contractorId: "CON-001",
    category: "Kitchen leak",
    priority: "Standard",
    status: "Contractor Booked",
    issueTitle: "Leaking kitchen sink",
    description:
      "Slow leak from pipework under kitchen sink. Bucket currently catching water.",
    fee: "£120",
    createdAt: "2025-11-07T10:00:00Z",
    lastUpdate: "2025-11-11T09:00:00Z",
  },
  {
    id: "REQ-1018",
    propertyId: "PROP-2001",
    tenantId: "T-1002",
    landlordId: "LL-1001",
    contractorId: "CON-003",
    category: "Extractor fan",
    priority: "Standard",
    status: "Completed",
    issueTitle: "Extractor fan not working",
    description:
      "Bathroom extractor fan not turning on. Likely electrical issue.",
    fee: "£110",
    createdAt: "2025-10-28T09:00:00Z",
    lastUpdate: "2025-10-30T16:30:00Z",
  },
  {
    id: "REQ-1015",
    propertyId: "PROP-2002",
    tenantId: "T-1001", // pretend same tenant for demo
    landlordId: "LL-1001",
    contractorId: undefined,
    category: "Window / Doors",
    priority: "Standard",
    status: "Offer",
    issueTitle: "Window latch loose",
    description:
      "Living room window latch is loose and doesn’t fully close. Draught coming in.",
    fee: "£80",
    createdAt: "2025-10-20T11:00:00Z",
    lastUpdate: "2025-10-21T15:45:00Z",
  },
];
