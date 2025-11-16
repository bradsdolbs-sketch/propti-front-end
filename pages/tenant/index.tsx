import TenantLayout from "../../layouts/TenantLayout";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";

import { Badge } from "../../components/ui/badge";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "../../components/ui/table";

import {
  maintenanceRequests,
  properties,
  UnifiedStatus,
} from "../../lib/mockData";

const CURRENT_TENANT_ID = "T-1001";

function isOpenStatus(status: UnifiedStatus) {
  return status !== "Completed";
}

export default function TenantDashboardPage() {
  const tenantRequests = maintenanceRequests.filter(
    (r) => r.tenantId === CURRENT_TENANT_ID
  );

  const totalRequests = tenantRequests.length;
  const openRequests = tenantRequests.filter((r) =>
    isOpenStatus(r.status)
  ).length;
  const completedRequests = tenantRequests.filter(
    (r) => r.status === "Completed"
  ).length;
  const urgentRequests = tenantRequests.filter(
    (r) => r.priority === "Urgent"
  ).length;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const createdThisMonth = tenantRequests.filter((r) => {
    const created = new Date(r.createdAt);
    return (
      created.getMonth() === currentMonth &&
      created.getFullYear() === currentYear
    );
  }).length;

  const recentRequests = [...tenantRequests]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const propertyId = tenantRequests[0]?.propertyId;
  const property = properties.find((p) => p.id === propertyId);

  return (
    <TenantLayout>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Dashboard
          </h1>
          <p className="text-slate-500 text-sm">
            Quick overview of your maintenance requests and property.
          </p>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Open requests</CardTitle>
            <CardDescription>Still being worked on</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{openRequests}</p>
            <p className="text-xs text-slate-500 mt-1">
              Out of {totalRequests} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
            <CardDescription>Jobs marked as done</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{completedRequests}</p>
            <p className="text-xs text-slate-500 mt-1">
              Since you started using Propti
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Urgent issues</CardTitle>
            <CardDescription>Marked as urgent</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{urgentRequests}</p>
            <p className="text-xs text-slate-500 mt-1">
              We’ll prioritise these first
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>This month</CardTitle>
            <CardDescription>
              Requests created in{" "}
              {now.toLocaleString("en-GB", { month: "long" })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{createdThisMonth}</p>
            <p className="text-xs text-slate-500 mt-1">
              New issues raised this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Recent requests */}
        <div className="md:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle>Recent requests</CardTitle>
              <CardDescription>
                The last few issues you’ve reported.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentRequests.length === 0 ? (
                <p className="text-sm text-slate-500">
                  You haven’t raised any maintenance requests yet. When you do,
                  they’ll appear here.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>ID</Th>
                        <Th>Issue</Th>
                        <Th>Status</Th>
                        <Th>Created</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {recentRequests.map((req) => (
                        <Tr key={req.id}>
                          <Td className="whitespace-nowrap">
                            <span className="text-xs font-medium">
                              {req.id}
                            </span>
                          </Td>
                          <Td>
                            <div className="text-sm font-medium">
                              {req.issueTitle}
                            </div>
                            <div className="text-xs text-slate-500">
                              {req.category}
                            </div>
                          </Td>
                          <Td>
                            <Badge
                              variant={
                                req.status === "Completed"
                                  ? "success"
                                  : req.status === "Awaiting Landlord"
                                  ? "warning"
                                  : "default"
                              }
                            >
                              {req.status}
                            </Badge>
                          </Td>
                          <Td>
                            {new Date(
                              req.createdAt
                            ).toLocaleDateString("en-GB")}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Property summary */}
        <div className="md:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Your property</CardTitle>
              <CardDescription>
                Where these requests are being raised.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {property ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-900">
                    {property.name}
                  </p>
                  <p className="text-sm text-slate-600">
                    {property.addressLine1
                      ? `${property.addressLine1}, `
                      : ""}
                    {property.postcode}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    If anything changes (like your phone number or access
                    details), update your information in Settings so
                    contractors can reach you easily.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  We couldn’t find a linked property for this tenant in
                  mock data. In a real system, your tenancy address would
                  appear here.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </TenantLayout>
  );
}
