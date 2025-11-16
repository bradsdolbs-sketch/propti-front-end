import AdminLayout from "../../../layouts/AdminLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "../../../components/ui/table";

type AgentStatus = "Active" | "Onboarding" | "Paused";

interface AdminAgentRow {
  id: string;
  name: string;
  agency: string;
  email: string;
  phone: string;
  managedTenancies: number;
  managedLandlords: number;
  status: AgentStatus;
}

const mockAgents: AdminAgentRow[] = [
  {
    id: "AG-1001",
    name: "Central Gate Estates",
    agency: "Central Gate Estates",
    email: "brad@centralgateestates.com",
    phone: "+44 7777 000000",
    managedTenancies: 18,
    managedLandlords: 11,
    status: "Active",
  },
  {
    id: "AG-1002",
    name: "Prime Estates",
    agency: "Prime Estates",
    email: "hello@primeestates.co.uk",
    phone: "+44 20 0000 0000",
    managedTenancies: 9,
    managedLandlords: 5,
    status: "Active",
  },
  {
    id: "AG-1003",
    name: "Demo Properties",
    agency: "Demo Properties Ltd",
    email: "owner@demoproperties.co.uk",
    phone: "+44 20 1234 5678",
    managedTenancies: 3,
    managedLandlords: 2,
    status: "Onboarding",
  },
];

function statusVariant(
  status: AgentStatus
): "default" | "success" | "warning" {
  switch (status) {
    case "Active":
      return "success";
    case "Onboarding":
      return "warning";
    case "Paused":
    default:
      return "default";
  }
}

export default function AdminAgentsPage() {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Agents
          </h1>
          <p className="text-slate-500 text-sm">
            Lettings and management agencies connected to Propti.
          </p>
        </div>

        <div className="w-full md:max-w-xs">
          <Input placeholder="Search by agency name, contact, or email..." />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agent directory</CardTitle>
          <CardDescription>
            See who manages which tenancies and landlords across the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <Thead>
                <Tr>
                  <Th>Agent</Th>
                  <Th>Contact</Th>
                  <Th>Phone</Th>
                  <Th className="text-right">Tenancies</Th>
                  <Th className="text-right">Landlords</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mockAgents.map((a) => (
                  <Tr key={a.id}>
                    <Td>
                      <div className="font-medium">{a.agency}</div>
                      <div className="text-xs text-slate-500">
                        {a.id}
                      </div>
                    </Td>
                    <Td className="whitespace-nowrap">
                      <div>{a.name}</div>
                      <div className="text-xs text-slate-500">
                        {a.email}
                      </div>
                    </Td>
                    <Td className="whitespace-nowrap">{a.phone}</Td>
                    <Td className="text-right">
                      {a.managedTenancies}
                    </Td>
                    <Td className="text-right">
                      {a.managedLandlords}
                    </Td>
                    <Td>
                      <Badge variant={statusVariant(a.status)}>
                        {a.status}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
