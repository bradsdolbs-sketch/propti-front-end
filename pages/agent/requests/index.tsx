import Link from "next/link";
import AgentLayout from "../../../layouts/AgentLayout";
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
import {
  maintenanceRequests,
  properties,
  Priority,
  UnifiedStatus,
} from "../../../lib/mockData";

function statusVariant(status: UnifiedStatus): "default" | "warning" | "success" {
  switch (status) {
    case "Awaiting Landlord":
      return "warning";
    case "Approved – Awaiting Contractor":
    case "Offer":
    case "Contractor Booked":
    case "In Progress":
      return "default";
    case "Completed":
      return "success";
  }
}

function priorityVariant(priority: Priority): "danger" | "outline" {
  return priority === "Urgent" ? "danger" : "outline";
}

export default function AgentRequestsPage() {
  // For now: show all requests. Later: filter to properties managed by this agent.
  const rows = maintenanceRequests;

  const propertyMap = Object.fromEntries(
    properties.map((p) => [p.id, `${p.name}, ${p.postcode}`])
  );

  return (
    <AgentLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            All requests
          </h1>
          <p className="text-slate-500 text-sm">
            Triage issues, coordinate contractors and keep landlords updated.
          </p>
        </div>

        <div className="w-full md:max-w-xs">
          <Input placeholder="Search by property, tenant, or ID..." />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Requests across your portfolio</CardTitle>
          <CardDescription>
            In a full build, this would be filtered to properties that your
            agency manages.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {rows.length === 0 ? (
            <p className="text-sm text-slate-500">
              No maintenance requests yet. Once tenants raise issues, they&apos;ll
              appear here for triage.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Property</Th>
                    <Th>Tenant</Th>
                    <Th>Category</Th>
                    <Th>Priority</Th>
                    <Th>Status</Th>
                    <Th>Created</Th>
                    <Th>Details</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {rows.map((req) => {
                    const propertyLabel =
                      propertyMap[req.propertyId] ?? req.propertyId;

                    return (
                      <Tr key={req.id}>
                        <Td>
                          <span className="text-xs font-medium text-slate-700">
                            {req.id}
                          </span>
                        </Td>
                        <Td className="whitespace-nowrap">
                          {propertyLabel}
                        </Td>
                        <Td className="whitespace-nowrap">
                          {req.tenantName ?? "Tenant"}
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
                          <Link
                            href={`/agent/requests/${req.id}`}
                            className="text-xs text-blue-600 hover:underline"
                          >
                            View details
                          </Link>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </AgentLayout>
  );
}
