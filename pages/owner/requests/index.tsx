import Link from "next/link";
import OwnerLayout from "../../../layouts/OwnerLayout";
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

const CURRENT_OWNER_ID = "LL-1001";

function statusVariant(status: UnifiedStatus): "default" | "warning" | "success" {
  switch (status) {
    case "Awaiting Landlord":
    case "Approved – Awaiting Contractor":
      return "warning";
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

export default function OwnerRequestsListPage() {
  const ownerRequests = maintenanceRequests.filter(
    (r) => r.landlordId === CURRENT_OWNER_ID
  );

  const propertyMap = Object.fromEntries(
    properties.map((p) => [p.id, `${p.name}, ${p.postcode}`])
  );

  return (
    <OwnerLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Maintenance requests
          </h1>
          <p className="text-slate-500 text-sm">
            All issues raised by your tenants for properties you own.
          </p>
        </div>

        <div className="w-full md:max-w-xs">
          <Input placeholder="Search by property, category, or ID..." />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your requests</CardTitle>
          <CardDescription>
            View status, priority and details for each maintenance request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {ownerRequests.length === 0 ? (
            <p className="text-sm text-slate-500">
              No maintenance requests yet. When tenants report issues via Propti,
              they will appear here.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Property</Th>
                    <Th>Category</Th>
                    <Th>Priority</Th>
                    <Th>Status</Th>
                    <Th>Created</Th>
                    <Th>Details</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {ownerRequests.map((req) => {
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
                            href={`/owner/requests/${req.id}`}
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
    </OwnerLayout>
  );
}
