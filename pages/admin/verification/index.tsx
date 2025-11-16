import { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";

type StepStatus = "Not started" | "In review" | "Approved";
type RoleTab = "landlords" | "tenants" | "contractors";

interface LandlordVerificationRow {
  id: string;
  name: string;
  email: string;
  properties: number;
  idStatus: StepStatus;
  addressStatus: StepStatus;
  bankStatus: StepStatus;
}

interface TenantVerificationRow {
  id: string;
  name: string;
  email: string;
  tenancyId: string;
  idStatus: StepStatus;
  rightToRentStatus: StepStatus;
  affordabilityStatus: StepStatus;
  referencesStatus: StepStatus;
}

interface ContractorVerificationRow {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  trades: string;
  idStatus: StepStatus;
  companyStatus: StepStatus;
  insuranceStatus: StepStatus;
  bankStatus: StepStatus;
}

// ─── MOCK DATA ──────────────────────────────────────────────────────────────

const landlordRows: LandlordVerificationRow[] = [
  {
    id: "LL-1001",
    name: "Bipin Uka",
    email: "bipin@example.com",
    properties: 2,
    idStatus: "Approved",
    addressStatus: "Approved",
    bankStatus: "In review",
  },
  {
    id: "LL-1002",
    name: "Central Gate Holdings Ltd",
    email: "landlord@centralgate.com",
    properties: 5,
    idStatus: "In review",
    addressStatus: "Not started",
    bankStatus: "Not started",
  },
  {
    id: "LL-1003",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    properties: 1,
    idStatus: "Approved",
    addressStatus: "Approved",
    bankStatus: "Approved",
  },
];

const tenantRows: TenantVerificationRow[] = [
  {
    id: "T-1001",
    name: "Danise Fang",
    email: "danise@example.com",
    tenancyId: "TEN-1001",
    idStatus: "Approved",
    rightToRentStatus: "Approved",
    affordabilityStatus: "Approved",
    referencesStatus: "Approved",
  },
  {
    id: "T-1002",
    name: "Phuong Ly",
    email: "phuong@example.com",
    tenancyId: "TEN-1001",
    idStatus: "Approved",
    rightToRentStatus: "Approved",
    affordabilityStatus: "In review",
    referencesStatus: "In review",
  },
  {
    id: "T-1003",
    name: "John Smith",
    email: "john.smith@example.com",
    tenancyId: "TEN-1002",
    idStatus: "In review",
    rightToRentStatus: "Not started",
    affordabilityStatus: "Not started",
    referencesStatus: "Not started",
  },
];

const contractorRows: ContractorVerificationRow[] = [
  {
    id: "CON-001",
    companyName: "ABC Plumbing Ltd",
    contactName: "Alex Brown",
    email: "contact@abcplumbing.co.uk",
    trades: "Plumbing, Heating",
    idStatus: "Approved",
    companyStatus: "Approved",
    insuranceStatus: "Approved",
    bankStatus: "In review",
  },
  {
    id: "CON-002",
    companyName: "Central Gate Maintenance",
    contactName: "Chris Green",
    email: "info@cgm-maintenance.com",
    trades: "General maintenance",
    idStatus: "In review",
    companyStatus: "In review",
    insuranceStatus: "Not started",
    bankStatus: "Not started",
  },
  {
    id: "CON-003",
    companyName: "Ventilation Co",
    contactName: "Vera Lopez",
    email: "hello@ventco.co.uk",
    trades: "Electrical, Ventilation",
    idStatus: "Not started",
    companyStatus: "Not started",
    insuranceStatus: "Not started",
    bankStatus: "Not started",
  },
];

// ─── HELPERS ────────────────────────────────────────────────────────────────

function stepBadgeVariant(status: StepStatus): "default" | "warning" | "success" {
  switch (status) {
    case "Not started":
      return "default";
    case "In review":
      return "warning";
    case "Approved":
      return "success";
  }
}

function overallStatus(
  steps: StepStatus[]
): { label: string; variant: "default" | "warning" | "success" } {
  if (steps.every((s) => s === "Approved")) {
    return { label: "Ready to go live", variant: "success" };
  }
  if (steps.some((s) => s === "In review")) {
    return { label: "In review", variant: "warning" };
  }
  return { label: "Needs attention", variant: "default" };
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────────────

export default function AdminVerificationPage() {
  const [activeTab, setActiveTab] = useState<RoleTab>("landlords");

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Verification
            </h1>
            <p className="text-sm text-slate-500">
              Track where every landlord, tenant, and contractor is in their onboarding.
            </p>
          </div>
          <div className="w-full md:max-w-xs">
            <Input placeholder="Search by name, email, or ID..." />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
          <TabButton
            label="Landlords"
            active={activeTab === "landlords"}
            onClick={() => setActiveTab("landlords")}
          />
          <TabButton
            label="Tenants"
            active={activeTab === "tenants"}
            onClick={() => setActiveTab("tenants")}
          />
          <TabButton
            label="Contractors"
            active={activeTab === "contractors"}
            onClick={() => setActiveTab("contractors")}
          />
        </div>

        {/* Content per tab */}
        {activeTab === "landlords" && <LandlordsTab />}
        {activeTab === "tenants" && <TenantsTab />}
        {activeTab === "contractors" && <ContractorsTab />}
      </div>
    </AdminLayout>
  );
}

// ─── TAB BUTTON COMPONENT ───────────────────────────────────────────────────

interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function TabButton({ label, active, onClick }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "px-3 py-1.5 rounded-md text-sm font-medium transition",
        active
          ? "bg-slate-900 text-slate-50"
          : "text-slate-600 hover:bg-slate-100",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

// ─── LANDLORDS TAB ─────────────────────────────────────────────────────────

function LandlordsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Landlord verification</CardTitle>
        <CardDescription>
          Basic KYC for property owners: ID, proof of address, and payout details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <Thead>
              <Tr>
                <Th>Landlord</Th>
                <Th>Properties</Th>
                <Th>ID</Th>
                <Th>Proof of address</Th>
                <Th>Bank details</Th>
                <Th>Overall</Th>
              </Tr>
            </Thead>
            <Tbody>
              {landlordRows.map((l) => {
                const overall = overallStatus([
                  l.idStatus,
                  l.addressStatus,
                  l.bankStatus,
                ]);

                return (
                  <Tr key={l.id}>
                    <Td>
                      <div className="font-medium">{l.name}</div>
                      <div className="text-xs text-slate-500">
                        {l.email}
                      </div>
                      <div className="text-[11px] text-slate-400">{l.id}</div>
                    </Td>
                    <Td>{l.properties}</Td>
                    <Td>
                      <Badge variant={stepBadgeVariant(l.idStatus)}>
                        {l.idStatus}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge variant={stepBadgeVariant(l.addressStatus)}>
                        {l.addressStatus}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge variant={stepBadgeVariant(l.bankStatus)}>
                        {l.bankStatus}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge variant={overall.variant}>{overall.label}</Badge>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </div>
        <p className="text-[11px] text-slate-400 mt-3">
          Later you could drill into each landlord to see document previews,
          audit logs, and who approved each step.
        </p>
      </CardContent>
    </Card>
  );
}

// ─── TENANTS TAB ────────────────────────────────────────────────────────────

function TenantsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tenant verification</CardTitle>
        <CardDescription>
          Right to rent, affordability, and references per tenancy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <Thead>
              <Tr>
                <Th>Tenant</Th>
                <Th>Tenancy</Th>
                <Th>ID</Th>
                <Th>Right to rent</Th>
                <Th>Affordability</Th>
                <Th>References</Th>
                <Th>Overall</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tenantRows.map((t) => {
                const overall = overallStatus([
                  t.idStatus,
                  t.rightToRentStatus,
                  t.affordabilityStatus,
                  t.referencesStatus,
                ]);

                return (
                  <Tr key={t.id}>
                    <Td>
                      <div className="font-medium">{t.name}</div>
                      <div className="text-xs text-slate-500">
                        {t.email}
                      </div>
                      <div className="text-[11px] text-slate-400">{t.id}</div>
                    </Td>
                    <Td>{t.tenancyId}</Td>
                    <Td>
                      <Badge variant={stepBadgeVariant(t.idStatus)}>
                        {t.idStatus}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge
                        variant={stepBadgeVariant(t.rightToRentStatus)}
                      >
                        {t.rightToRentStatus}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge
                        variant={stepBadgeVariant(t.affordabilityStatus)}
                      >
                        {t.affordabilityStatus}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge
                        variant={stepBadgeVariant(t.referencesStatus)}
                      >
                        {t.referencesStatus}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge variant={overall.variant}>{overall.label}</Badge>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </div>
        <p className="text-[11px] text-slate-400 mt-3">
          This ties directly into your idea of Propti becoming a soft reference
          layer – every completed tenancy builds a history here.
        </p>
      </CardContent>
    </Card>
  );
}

// ─── CONTRACTORS TAB ────────────────────────────────────────────────────────

function ContractorsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contractor verification</CardTitle>
        <CardDescription>
          Checks before allowing jobs: ID, company details, insurance, bank info.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <Thead>
              <Tr>
                <Th>Contractor</Th>
                <Th>Trades</Th>
                <Th>ID</Th>
                <Th>Company details</Th>
                <Th>Insurance</Th>
                <Th>Bank details</Th>
                <Th>Overall</Th>
              </Tr>
            </Thead>
            <Tbody>
              {contractorRows.map((c) => {
                const overall = overallStatus([
                  c.idStatus,
                  c.companyStatus,
                  c.insuranceStatus,
                  c.bankStatus,
                ]);

                return (
                  <Tr key={c.id}>
                    <Td>
                      <div className="font-medium">{c.companyName}</div>
                      <div className="text-xs text-slate-500">
                        {c.contactName} · {c.email}
                      </div>
                      <div className="text-[11px] text-slate-400">{c.id}</div>
                    </Td>
                    <Td className="whitespace-nowrap">{c.trades}</Td>
                    <Td>
                      <Badge variant={stepBadgeVariant(c.idStatus)}>
                        {c.idStatus}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge variant={stepBadgeVariant(c.companyStatus)}>
                        {c.companyStatus}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge variant={stepBadgeVariant(c.insuranceStatus)}>
                        {c.insuranceStatus}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge variant={stepBadgeVariant(c.bankStatus)}>
                        {c.bankStatus}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge variant={overall.variant}>{overall.label}</Badge>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </div>
        <p className="text-[11px] text-slate-400 mt-3">
          For contractors you’ll eventually want documents like public liability
          insurance, company registration, and maybe trade body membership stored here.
        </p>
      </CardContent>
    </Card>
  );
}
