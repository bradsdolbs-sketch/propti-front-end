import { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "../../../components/ui/table";

type RoleTab = "landlords" | "tenants" | "contractors";

type VerificationStatus = "Pending" | "In review" | "Approved";

interface VerificationRowBase {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  stage: string;
  missingItems: number;
  status: VerificationStatus;
}

interface LandlordVerificationRow extends VerificationRowBase {
  type: "Landlord";
  propertiesCount: number;
}

interface TenantVerificationRow extends VerificationRowBase {
  type: "Tenant";
  propertyLabel: string;
}

interface ContractorVerificationRow extends VerificationRowBase {
  type: "Contractor";
  companyName: string;
  trades: string;
  coverage: string;
}

const landlordRows: LandlordVerificationRow[] = [
  {
    id: "LL-1001",
    type: "Landlord",
    name: "Bipin Uka",
    email: "bipin@example.com",
    propertiesCount: 2,
    createdAt: "2025-11-10",
    stage: "ID verified · Bank details pending",
    missingItems: 1,
    status: "In review",
  },
  {
    id: "LL-1002",
    type: "Landlord",
    name: "Central Gate Holdings Ltd",
    email: "accounts@centralgate.example.com",
    propertiesCount: 5,
    createdAt: "2025-11-09",
    stage: "All checks complete",
    missingItems: 0,
    status: "Approved",
  },
  {
    id: "LL-1003",
    type: "Landlord",
    name: "Jane Doe",
    email: "jane@example.com",
    propertiesCount: 1,
    createdAt: "2025-11-12",
    stage: "ID & proof of ownership missing",
    missingItems: 2,
    status: "Pending",
  },
];

const tenantRows: TenantVerificationRow[] = [
  {
    id: "T-1001",
    type: "Tenant",
    name: "Danise Fang",
    email: "danise@example.com",
    propertyLabel: "22 Anthony House, E5",
    createdAt: "2025-06-05",
    stage: "Right to rent verified · Awaiting signed AST",
    missingItems: 1,
    status: "In review",
  },
  {
    id: "T-1002",
    type: "Tenant",
    name: "Phuong Ly",
    email: "phuong@example.com",
    propertyLabel: "22 Anthony House, E5",
    createdAt: "2025-06-05",
    stage: "All checks complete",
    missingItems: 0,
    status: "Approved",
  },
  {
    id: "T-1003",
    type: "Tenant",
    name: "John Smith",
    email: "john@example.com",
    propertyLabel: "Central Gate, E1",
    createdAt: "2025-11-11",
    stage: "ID & right to rent missing",
    missingItems: 2,
    status: "Pending",
  },
];

const contractorRows: ContractorVerificationRow[] = [
  {
    id: "CON-001",
    type: "Contractor",
    name: "ABC Plumbing",
    email: "hello@abcplumbing.example.com",
    companyName: "ABC Plumbing Ltd",
    trades: "Plumbing, Heating",
    coverage: "E1, E2, EC1, EC2",
    createdAt: "2025-11-01",
    stage: "Insurance & company number verified",
    missingItems: 0,
    status: "Approved",
  },
  {
    id: "CON-002",
    type: "Contractor",
    name: "Central Gate Maintenance",
    email: "ops@cgmaintenance.example.com",
    companyName: "Central Gate Maintenance",
    trades: "General maintenance",
    coverage: "E1, E5, N1",
    createdAt: "2025-11-07",
    stage: "Awaiting insurance document",
    missingItems: 1,
    status: "In review",
  },
  {
    id: "CON-003",
    type: "Contractor",
    name: "Ventilation Co",
    email: "admin@ventco.example.com",
    companyName: "Ventilation Co",
    trades: "Electrical, Ventilation",
    coverage: "All London",
    createdAt: "2025-11-12",
    stage: "ID, insurance & company number missing",
    missingItems: 3,
    status: "Pending",
  },
];

function statusVariant(status: VerificationStatus): "default" | "warning" | "success" {
  switch (status) {
    case "Pending":
      return "default";
    case "In review":
      return "warning";
    case "Approved":
      return "success";
  }
}

export default function AdminVerificationsPage() {
  const [activeTab, setActiveTab] = useState<RoleTab>("landlords");

  const totalLandlords = landlordRows.length;
  const totalTenants = tenantRows.length;
  const totalContractors = contractorRows.length;

  const pendingCount =
    landlordRows.filter((r) => r.status !== "Approved").length +
    tenantRows.filter((r) => r.status !== "Approved").length +
    contractorRows.filter((r) => r.status !== "Approved").length;

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Verifications
            </h1>
            <p className="text-sm text-slate-500">
              Track onboarding of landlords, tenants and contractors, and see what
              documents are still missing.
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Input
              placeholder="Search by name, email, or ID..."
              className="md:w-64"
            />
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Landlords</CardTitle>
              <CardDescription>In the onboarding funnel</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{totalLandlords}</p>
              <p className="text-xs text-slate-500 mt-1">
                ID, proof of ownership and bank details typically required.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tenants</CardTitle>
              <CardDescription>Being verified</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{totalTenants}</p>
              <p className="text-xs text-slate-500 mt-1">
                ID, right to rent & referencing checks.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contractors</CardTitle>
              <CardDescription>Onboarding for jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{totalContractors}</p>
              <p className="text-xs text-slate-500 mt-1">
                ID, company number, insurance and trade checks.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Open verifications</CardTitle>
              <CardDescription>Not yet fully approved</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{pendingCount}</p>
              <p className="text-xs text-slate-500 mt-1">
                Good candidates for an admin task list.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Onboarding pipeline</CardTitle>
            <CardDescription>
              Switch between landlords, tenants and contractors to see their
              current stage.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Tab buttons */}
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1 text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab("landlords")}
                className={cnTabButton(activeTab === "landlords")}
              >
                Landlords
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("tenants")}
                className={cnTabButton(activeTab === "tenants")}
              >
                Tenants
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("contractors")}
                className={cnTabButton(activeTab === "contractors")}
              >
                Contractors
              </button>
            </div>

            {/* Table area */}
            <div className="overflow-x-auto">
              {activeTab === "landlords" && (
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Landlord</Th>
                      <Th>Properties</Th>
                      <Th>Stage</Th>
                      <Th>Missing items</Th>
                      <Th>Status</Th>
                      <Th>Created</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {landlordRows.map((row) => (
                      <Tr key={row.id}>
                        <Td>
                          <div className="font-medium">{row.name}</div>
                          <div className="text-xs text-slate-500">
                            {row.email}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {row.id}
                          </div>
                        </Td>
                        <Td>{row.propertiesCount}</Td>
                        <Td className="text-sm">{row.stage}</Td>
                        <Td>{row.missingItems}</Td>
                        <Td>
                          <Badge variant={statusVariant(row.status)}>
                            {row.status}
                          </Badge>
                        </Td>
                        <Td>
                          {new Date(row.createdAt).toLocaleDateString("en-GB")}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}

              {activeTab === "tenants" && (
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Tenant</Th>
                      <Th>Property</Th>
                      <Th>Stage</Th>
                      <Th>Missing items</Th>
                      <Th>Status</Th>
                      <Th>Created</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {tenantRows.map((row) => (
                      <Tr key={row.id}>
                        <Td>
                          <div className="font-medium">{row.name}</div>
                          <div className="text-xs text-slate-500">
                            {row.email}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {row.id}
                          </div>
                        </Td>
                        <Td className="whitespace-nowrap">
                          {row.propertyLabel}
                        </Td>
                        <Td className="text-sm">{row.stage}</Td>
                        <Td>{row.missingItems}</Td>
                        <Td>
                          <Badge variant={statusVariant(row.status)}>
                            {row.status}
                          </Badge>
                        </Td>
                        <Td>
                          {new Date(row.createdAt).toLocaleDateString("en-GB")}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}

              {activeTab === "contractors" && (
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Contractor</Th>
                      <Th>Trades</Th>
                      <Th>Coverage</Th>
                      <Th>Stage</Th>
                      <Th>Missing items</Th>
                      <Th>Status</Th>
                      <Th>Created</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {contractorRows.map((row) => (
                      <Tr key={row.id}>
                        <Td>
                          <div className="font-medium">{row.companyName}</div>
                          <div className="text-xs text-slate-500">
                            {row.name} · {row.email}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {row.id}
                          </div>
                        </Td>
                        <Td className="whitespace-nowrap">{row.trades}</Td>
                        <Td className="whitespace-nowrap">{row.coverage}</Td>
                        <Td className="text-sm">{row.stage}</Td>
                        <Td>{row.missingItems}</Td>
                        <Td>
                          <Badge variant={statusVariant(row.status)}>
                            {row.status}
                          </Badge>
                        </Td>
                        <Td>
                          {new Date(row.createdAt).toLocaleDateString("en-GB")}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
            </div>

            <p className="text-[11px] text-slate-400">
              In the full system, each row would click through to a detailed
              profile showing uploaded documents (ID, right to rent, insurance,
              company number, etc.) and an audit trail of changes.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

// Small helper to style tab buttons
function cnTabButton(active: boolean): string {
  return [
    "px-3 py-1 rounded-md",
    "transition text-xs",
    active
      ? "bg-slate-900 text-white"
      : "text-slate-600 hover:bg-white hover:text-slate-900",
  ].join(" ");
}
