import Link from "next/link";
import LandlordLayout from "../../../layouts/LandlordLayout";

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

const CURRENT_LANDLORD_ID = "LL-1001";

export default function LandlordRequestsPage() {
  const landlordRequests = maintenanceRequests.filter(
    (r) => r.landlordId === CURRENT_LANDLORD_ID
  );

  return (
    <LandlordLayout>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Tenant requests
          </h1>
          <p className="text-slate-500 text-sm">
            All open and completed maintenance requests across your properties.
          </p>
        </div>

        <div className="w-full md:max-w-xs">
          <Input placeholder="Search by property, tenant, or ID..." />
        </div>
      </div>

      {/* Main card */}
      <Card>
        <CardHeader>
          <CardTitle>Requests</CardTitle>
          <CardDescription>
            Approve work, choose contractors, and track progress.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Empty state handler */}
          {landlordRequests.length === 0 ? (
            <EmptyState
              title="No maintenance requests"
              description="When tenants report issues, they'll appear here automatically."
              icon={<ClipboardList size={40} />}
            />
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
                  {landlordRequests.map((req) => (
                    <Tr key={req.id}>
                      <Td>
                        <Link
                          href={`/landlord/requests/${req.id}`}
                          className="text-xs font-medium text-blue-600 hover:underline"
                        >
                          {req.id}
                        </Link>
                      </Td>

                      <Td className="whitespace-nowrap">
                        {req.propertyId === "PROP-2001"
                          ? "22 Anthony House, E5"
                          : "Central Gate, E1"}
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
                          href={`/landlord/requests/${req.id}`}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          View
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
    </LandlordLayout>
  );
}
