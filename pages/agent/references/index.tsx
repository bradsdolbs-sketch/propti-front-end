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

type ReferenceStatus =
  | "Awaiting tenant"
  | "Sent to referee"
  | "Completed"
  | "Failed";

interface AgentReferenceRow {
  id: string;
  tenantName: string;
  tenantEmail: string;
  property: string;
  postcode: string;
  refereeType: "Landlord" | "Employer" | "Agency";
  status: ReferenceStatus;
  requestedOn: string; // ISO date
  completedOn?: string;
}

const mockReferences: AgentReferenceRow[] = [
  {
    id: "REF-5001",
    tenantName: "Danise Fang",
    tenantEmail: "danise@example.com",
    property: "22 Anthony House",
    postcode: "E5 8GZ",
    refereeType: "Landlord",
    status: "Sent to referee",
    requestedOn: "2025-11-10",
  },
  {
    id: "REF-5002",
    tenantName: "Alex Johnson",
    tenantEmail: "alex@example.com",
    property: "Central Gate",
    postcode: "E1 1LN",
    refereeType: "Employer",
    status: "Completed",
    requestedOn: "2025-11-01",
    completedOn: "2025-11-03",
  },
  {
    id: "REF-5003",
    tenantName: "Maria Silva",
    tenantEmail: "maria@example.com",
    property: "Silverstream House",
    postcode: "W1T 6EB",
    refereeType: "Landlord",
    status: "Awaiting tenant",
    requestedOn: "2025-11-12",
  },
  {
    id: "REF-5004",
    tenantName: "John Lee",
    tenantEmail: "john@example.com",
    property: "Central Gate",
    postcode: "E1 1LN",
    refereeType: "Agency",
    status: "Failed",
    requestedOn: "2025-10-20",
  },
];

function statusVariant(
  status: ReferenceStatus
): "default" | "success" | "warning" | "danger" {
  switch (status) {
    case "Completed":
      return "success";
    case "Awaiting tenant":
    case "Sent to referee":
      return "warning";
    case "Failed":
    default:
      return "danger";
  }
}

export default function AgentReferencesPage() {
  return (
    <AgentLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            References
          </h1>
          <p className="text-slate-500 text-sm">
            Track all tenant reference checks linked to your agency.
          </p>
        </div>

        <div className="w-full md:max-w-xs">
          <Input placeholder="Search by tenant or reference ID..." />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reference checks</CardTitle>
          <CardDescription>
            See where each reference is in the flow and chase the right person.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <Thead>
                <Tr>
                  <Th>Reference</Th>
                  <Th>Tenant</Th>
                  <Th>Property</Th>
                  <Th>Referee type</Th>
                  <Th>Requested</Th>
                  <Th>Completed</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mockReferences.map((r) => (
                  <Tr key={r.id}>
                    <Td>
                      <div className="font-medium">{r.id}</div>
                    </Td>
                    <Td className="whitespace-nowrap">
                      <div>{r.tenantName}</div>
                      <div className="text-xs text-slate-500">
                        {r.tenantEmail}
                      </div>
                    </Td>
                    <Td className="whitespace-nowrap">
                      <div>{r.property}</div>
                      <div className="text-xs text-slate-500">
                        {r.postcode}
                      </div>
                    </Td>
                    <Td>{r.refereeType}</Td>
                    <Td>
                      {new Date(r.requestedOn).toLocaleDateString("en-GB")}
                    </Td>
                    <Td>
                      {r.completedOn
                        ? new Date(r.completedOn).toLocaleDateString("en-GB")
                        : "-"}
                    </Td>
                    <Td>
                      <Badge variant={statusVariant(r.status)}>
                        {r.status}
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
