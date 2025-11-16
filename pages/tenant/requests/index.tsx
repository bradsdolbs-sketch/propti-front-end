import Link from "next/link";
import TenantLayout from "../../../layouts/TenantLayout";
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
  Priority,
  UnifiedStatus,
} from "../../../lib/mockData";

// NEW: Empty state + icon
import EmptyState from "../../../components/ui/empty-state";
import { ClipboardList } from "lucide-react";

function statusVariant(
  status: UnifiedStatus
): "default" | "warning" | "success" {
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

const CURRENT_TENANT_ID = "T-1001";

export default function TenantRequestsList() {
  const tenantRequests = maintenanceRequests.filter(
    (r) => r.tenantId === CURRENT_TENANT_ID
  );

  return (
    <TenantLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Your requests
          </h1>
          <p className="text-slate-500 text-sm">
            All maintenance requests you’ve created for this property.
          </p>
        </div>

        <Link href="/tenant/requests/new">
          <button className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium">
            Create new request
          </button>
        </Link>
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
          {/* 🔹 Empty state integrated */}
          {tenantRequests.length === 0 ? (
            <EmptyState
              title="No requests yet"
              description="If you have an issue in your home, you can report it using the button above."
              icon={<ClipboardList size={40} />}
              action={
                <Link href="/tenant/requests/new">
                  <button className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium">
                    Create new request
                  </button>
                </Link>
              }
            />
          ) : (
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
                  {tenantRequests.map((req) => (
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
          )}
        </CardContent>
      </Card>
    </TenantLayout>
  );
}
