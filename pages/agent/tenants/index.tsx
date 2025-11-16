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

type TenantStatus = "Active" | "Notice" | "Past";

interface AgentTenantRow {
  id: string;
  name: string;
  email: string;
  property: string;
  postcode: string;
  landlord: string;
  status: TenantStatus;
  openRequests: number;
  lastActivity: string; // ISO date
}

const mockTenants: AgentTenantRow[] = [
  {
    id: "T-1001",
    name: "Danise Fang",
    email: "danise@example.com",
    property: "22 Anthony House",
    postcode: "E5 8GZ",
    landlord: "Central Gate Estates",
    status: "Active",
    openRequests: 1,
    lastActivity: "2025-11-10",
  },
  {
    id: "T-1002",
    name: "Phuong Nguyen",
    email: "phuong@example.com",
    property: "22 Anthony House",
    postcode: "E5 8GZ",
    landlord: "Central Gate Estates",
    status: "Active",
    openRequests: 0,
    lastActivity: "2025-11-08",
  },
  {
    id: "T-1003",
    name: "Alex Johnson",
    email: "alex@example.com",
    property: "Central Gate",
    postcode: "E1 1LN",
    landlord: "Central Gate Estates",
    status: "Notice",
    openRequests: 2,
    lastActivity: "2025-11-12",
  },
  {
    id: "T-0901",
    name: "Maria Silva",
    email: "maria@example.com",
    property: "Silverstream House",
    postcode: "W1T 6EB",
    landlord: "Demo Properties Ltd",
    status: "Past",
    openRequests: 0,
    lastActivity: "2025-09-30",
  },
];

function statusVariant(
  status: TenantStatus
): "default" | "success" | "warning" {
  switch (status) {
    case "Active":
      return "success";
    case "Notice":
      return "warning";
    case "Past":
    default:
      return "default";
  }
}

export default function AgentTenantsPage() {
  return (
    <AgentLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Tenants</h1>
          <p className="text-slate-500 text-sm">
            All tenants linked to your agency across active and past tenancies.
          </p>
        </div>

        <div className="w-full md:max-w-xs">
          <Input placeholder="Search by name, email, or property..." />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tenant directory</CardTitle>
          <CardDescription>
            Use this to see who lives where, open issues, and recent activity.
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
                  <Th className="text-right">Open requests</Th>
                  <Th>Last activity</Th>
                  <Th>Status</Th>
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
                      <div>{t.property}</div>
                      <div className="text-xs text-slate-500">
                        {t.postcode}
                      </div>
                    </Td>
                    <Td className="whitespace-nowrap">{t.landlord}</Td>
                    <Td className="text-right">{t.openRequests}</Td>
                    <Td>
                      {new Date(t.lastActivity).toLocaleDateString("en-GB")}
                    </Td>
                    <Td>
                      <Badge variant={statusVariant(t.status)}>
                        {t.status}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AgentLayout>
  );
}
