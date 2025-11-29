import Link from "next/link";
import TenantLayout from "../../../../layouts/TenantLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Input } from "../../../../components/ui/input";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "../../../../components/ui/table";
import { Button } from "../../../../components/ui/button";

type RequestStatus = "Awaiting Landlord" | "Booked" | "In Progress" | "Completed";
type RequestPriority = "Urgent" | "Standard";

interface TenantRequestRow {
  id: string;
  property: string;
  category: string;
  priority: RequestPriority;
  status: RequestStatus;
  createdAt: string;
  lastUpdate: string;
}

const mockRequests: TenantRequestRow[] = [
  {
    id: "REQ-1023",
    property: "22 Anthony House, E5",
    category: "Boiler / Heating",
    priority: "Urgent",
    status: "Awaiting Landlord",
    createdAt: "2025-11-10",
    lastUpdate: "2025-11-12",
  },
  {
    id: "REQ-1020",
    property: "22 Anthony House, E5",
    category: "Kitchen leak",
    priority: "Standard",
    status: "Booked",
    createdAt: "2025-11-07",
    lastUpdate: "2025-11-11",
  },
  {
    id: "REQ-1018",
    property: "22 Anthony House, E5",
    category: "Extractor fan",
    priority: "Standard",
    status: "Completed",
    createdAt: "2025-10-28",
    lastUpdate: "2025-10-30",
  },
];

function statusVariant(status: RequestStatus): "default" | "warning" | "success" {
  switch (status) {
    case "Awaiting Landlord":
      return "warning";
    case "Booked":
    case "In Progress":
      return "default";
    case "Completed":
      return "success";
  }
}

function priorityVariant(priority: RequestPriority): "danger" | "outline" {
  return priority === "Urgent" ? "danger" : "outline";
}

export default function TenantRequestsList() {
  return (
    <TenantLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Your requests</h1>
          <p className="text-slate-500 text-sm">
            All maintenance requests you’ve created for this property.
          </p>
        </div>
        <Button>Create new request</Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Requests</CardTitle>
            <CardDescription>
              Click a request to see full details, photos, and messages.
            </CardDescription>
          </div>
          <div className="w-full md:max-w-xs">
            <Input placeholder="Search by category or ID..." />
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Category</Th>
                  <Th>Priority</Th>
                  <Th>Status</Th>
                  <Th>Created</Th>
                  <Th>Last update</Th>
                  <Th>Details</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mockRequests.map((req) => (
                  <Tr key={req.id}>
                    <Td>
                      <span className="font-medium">{req.id}</span>
                    </Td>
                    <Td>{req.category}</Td>
                    <Td>
                      <Badge variant={priorityVariant(req.priority)}>
                        {req.priority}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge variant={statusVariant(req.status)}>
                        {req.status}
                      </Badge>
                    </Td>
                    <Td>
                      {new Date(req.createdAt).toLocaleDateString("en-GB")}
                    </Td>
                    <Td>
                      {new Date(req.lastUpdate).toLocaleDateString("en-GB")}
                    </Td>
                    <Td>
                      <Link
                        href={`/tenant/requests/${req.id}`}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        View details
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </TenantLayout>
  );
}
