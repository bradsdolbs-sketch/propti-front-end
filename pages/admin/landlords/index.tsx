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

type LandlordStatus = "Active" | "Onboarding" | "Paused";

interface AdminLandlordRow {
  id: string;
  name: string;
  email: string;
  type: "Individual" | "Company";
  propertiesCount: number;
  openRequests: number;
  status: LandlordStatus;
}

const mockLandlords: AdminLandlordRow[] = [
  {
    id: "LL-1001",
    name: "Bipin Uka",
    email: "bipin@example.com",
    type: "Individual",
    propertiesCount: 2,
    openRequests: 1,
    status: "Active",
  },
  {
    id: "LL-1002",
    name: "Central Gate Holdings Ltd",
    email: "accounts@centralgate.example.com",
    type: "Company",
    propertiesCount: 5,
    openRequests: 3,
    status: "Active",
  },
  {
    id: "LL-1003",
    name: "Jane Doe",
    email: "jane@example.com",
    type: "Individual",
    propertiesCount: 1,
    openRequests: 0,
    status: "Onboarding",
  },
];

function statusVariant(status: LandlordStatus): "success" | "warning" | "default" {
  switch (status) {
    case "Active":
      return "success";
    case "Onboarding":
      return "warning";
    case "Paused":
      return "default";
  }
}

export default function AdminLandlordsListPage() {
  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Landlords</h1>
            <p className="text-sm text-slate-500">
              All landlords using Propti, their properties and onboarding status.
            </p>
          </div>
          <div className="w-full md:max-w-xs">
            <Input placeholder="Search by name, email, or ID..." />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Landlord directory</CardTitle>
            <CardDescription>
              Use this list to jump into landlord profiles and see their properties
              and compliance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Landlord</Th>
                    <Th>Type</Th>
                    <Th>Properties</Th>
                    <Th>Open requests</Th>
                    <Th>Status</Th>
                    <Th>Details</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {mockLandlords.map((l) => (
                    <Tr key={l.id}>
                      <Td>
                        <div className="font-medium">{l.name}</div>
                        <div className="text-xs text-slate-500">
                          {l.email}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {l.id}
                        </div>
                      </Td>
                      <Td>{l.type}</Td>
                      <Td>{l.propertiesCount}</Td>
                      <Td>{l.openRequests}</Td>
                      <Td>
                        <Badge variant={statusVariant(l.status)}>
                          {l.status}
                        </Badge>
                      </Td>
                      <Td>
                        <Link
                          href={`/admin/landlords/${l.id}`}
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
