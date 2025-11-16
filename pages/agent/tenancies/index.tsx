import Link from "next/link";
import AgentLayout from "../../../layouts/AgentLayout";
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

type TenancyStatus = "Active" | "Ending soon" | "Past";

interface AgentTenancyRow {
  id: string;
  propertyLabel: string;
  postcode: string;
  landlordName: string;
  tenants: string;
  start: string;
  end: string;
  rent: number;
  status: TenancyStatus;
}

const mockTenancies: AgentTenancyRow[] = [
  {
    id: "TEN-1001",
    propertyLabel: "22 Anthony House, Pembury Place",
    postcode: "E5 8GZ",
    landlordName: "Bipin Uka",
    tenants: "Danise Fang, Phuong Ly",
    start: "2025-06-12",
    end: "2026-06-11",
    rent: 2000,
    status: "Active",
  },
  {
    id: "TEN-1002",
    propertyLabel: "Central Gate, Commercial Road",
    postcode: "E1 1LN",
    landlordName: "Central Gate Holdings Ltd",
    tenants: "John Smith",
    start: "2025-12-01",
    end: "2026-11-30",
    rent: 1750,
    status: "Active",
  },
  {
    id: "TEN-0990",
    propertyLabel: "Old Flat, N1",
    postcode: "N1 3AB",
    landlordName: "Jane Doe",
    tenants: "Old Tenant",
    start: "2024-01-01",
    end: "2025-01-01",
    rent: 1500,
    status: "Past",
  },
];

function statusVariant(status: TenancyStatus): "success" | "warning" | "default" {
  switch (status) {
    case "Active":
      return "success";
    case "Ending soon":
      return "warning";
    case "Past":
      return "default";
  }
}

function formatGBP(value: number): string {
  return `£${value.toFixed(0)}`;
}

export default function AgentTenanciesListPage() {
  return (
    <AgentLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Tenancies
            </h1>
            <p className="text-sm text-slate-500">
              All current and past tenancies linked to your agency.
            </p>
          </div>
          <div className="w-full md:max-w-xs">
            <Input placeholder="Search by property, landlord, or tenant..." />
          </div>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Tenancy list</CardTitle>
            <CardDescription>
              Quickly jump into a tenancy to see payments, documents, and
              maintenance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Property</Th>
                    <Th>Landlord</Th>
                    <Th>Tenants</Th>
                    <Th>Term</Th>
                    <Th>Rent</Th>
                    <Th>Status</Th>
                    <Th>Details</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {mockTenancies.map((t) => (
                    <Tr key={t.id}>
                      <Td>
                        <div className="font-medium">{t.propertyLabel}</div>
                        <div className="text-xs text-slate-500">
                          {t.postcode} · {t.id}
                        </div>
                      </Td>
                      <Td className="whitespace-nowrap">
                        {t.landlordName}
                      </Td>
                      <Td className="whitespace-nowrap">{t.tenants}</Td>
                      <Td>
                        {new Date(t.start).toLocaleDateString("en-GB")} –{" "}
                        {new Date(t.end).toLocaleDateString("en-GB")}
                      </Td>
                      <Td>{formatGBP(t.rent)}/mo</Td>
                      <Td>
                        <Badge variant={statusVariant(t.status)}>
                          {t.status}
                        </Badge>
                      </Td>
                      <Td>
                        <Link
                          href={`/agent/tenancies/${t.id}`}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          View tenancy
                        </Link>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AgentLayout>
  );
}
