import Link from "next/link";
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

type TenantStatus = "Active" | "Onboarding" | "Moved out";

interface AdminTenantRow {
  id: string;
  name: string;
  email: string;
  propertyLabel: string;
  landlordName: string;
  moveIn: string;
  moveOut?: string;
  status: TenantStatus;
}

const mockTenants: AdminTenantRow[] = [
  {
    id: "T-1001",
    name: "Danise Fang",
    email: "danise@example.com",
    propertyLabel: "22 Anthony House, E5",
    landlordName: "Bipin Uka",
    moveIn: "2025-06-12",
    status: "Active",
  },
  {
    id: "T-1002",
    name: "Phuong Ly",
    email: "phuong@example.com",
    propertyLabel: "22 Anthony House, E5",
    landlordName: "Bipin Uka",
    moveIn: "2025-06-12",
    status: "Active",
  },
  {
    id: "T-1003",
    name: "John Smith",
    email: "john@example.com",
    propertyLabel: "Central Gate, E1",
    landlordName: "Central Gate Holdings Ltd",
    moveIn: "2025-11-15",
    status: "Onboarding",
  },
  {
    id: "T-0999",
    name: "Old Tenant",
    email: "oldtenant@example.com",
    propertyLabel: "Previous Flat, N1",
    landlordName: "Jane Doe",
    moveIn: "2024-01-01",
    moveOut: "2025-01-01",
    status: "Moved out",
  },
];

function statusVariant(status: TenantStatus): "success" | "warning" | "default" {
  switch (status) {
    case "Active":
      return "success";
    case "Onboarding":
      return "warning";
    case "Moved out":
      return "default";
  }
}

export default function AdminTenantsListPage() {
  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Tenants</h1>
            <p className="text-sm text-slate-500">
              All tenants with an account in Propti, linked to their current or
              past tenancies.
            </p>
          </div>
          <div className="w-full md:max-w-xs">
            <Input placeholder="Search by name, email, or property..." />
          </div>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Tenant directory</CardTitle>
            <CardDescription>
              Use this list to view tenant profiles, their property, and
              verification status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Tenant</Th>
                    <Th>Property</Th>
                    <Th>Landlord</Th>
                    <Th>Move in</Th>
                    <Th>Status</Th>
                    <Th>Details</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {mockTenants.map((t) => (
                    <Tr key={t.id}>
                      <Td>
                        <div className="font-medium">{t.name}</div>
                        <div className="text-xs text-slate-500">
                          {t.email}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {t.id}
                        </div>
                      </Td>
                      <Td className="whitespace-nowrap">
                        {t.propertyLabel}
                      </Td>
                      <Td className="whitespace-nowrap">
                        {t.landlordName}
                      </Td>
                      <Td>
                        {new Date(t.moveIn).toLocaleDateString("en-GB")}
                      </Td>
                      <Td>
                        <Badge variant={statusVariant(t.status)}>
                          {t.status}
                        </Badge>
                      </Td>
                      <Td>
                        <Link
                          href={`/admin/tenants/${t.id}`}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          View profile
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
    </AdminLayout>
  );
}
