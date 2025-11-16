import AdminLayout from "../../layouts/AdminLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "../../components/ui/table";

import {
  landlords,
  contractors,
  properties,
  maintenanceRequests,
  UnifiedStatus,
  Priority,
} from "../../lib/mockData";

function isOpen(status: UnifiedStatus) {
  return status !== "Completed";
}

export default function AdminDashboardPage() {
  const totalOrgs = landlords.length;
  const totalProperties = properties.length;
  const totalContractors = contractors.length;
  const totalRequests = maintenanceRequests.length;

  const openRequests = maintenanceRequests.filter((r) => isOpen(r.status));
  const urgentRequests = openRequests.filter(
    (r) => r.priority === "Urgent"
  ).length;

  // super-simple “commission” just for demo:
  const commission = maintenanceRequests.filter(
    (r) => r.status === "Completed"
  ).length * 12; // £12 per completed job (10% of £120-ish)

  // sort recent activity (newest first)
  const recentRequests = [...maintenanceRequests]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const propertyMap = Object.fromEntries(
    properties.map((p) => [p.id, `${p.name}, ${p.postcode}`])
  );

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Admin SuperConsole
          </h1>
          <p className="text-slate-500 text-sm">
            Platform overview and operations across all landlords, tenants, and contractors.
          </p>
        </div>
        <Badge variant="outline">Demo environment</Badge>
      </div>

      {/* Top metrics */}
      <div className="grid gap-4 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Organisations</CardTitle>
            <CardDescription>Active landlord accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{totalOrgs}</p>
            <p className="text-xs text-slate-500 mt-1">
              Onboarded into the platform.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Properties</CardTitle>
            <CardDescription>Under management</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{totalProperties}</p>
            <p className="text-xs text-slate-500 mt-1">
              Spread across all landlord portfolios.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contractors</CardTitle>
            <CardDescription>Verified on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{totalContractors}</p>
            <p className="text-xs text-slate-500 mt-1">
              Ready to accept jobs in their areas.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform revenue (10%)</CardTitle>
            <CardDescription>From completed jobs (demo)</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">£{commission}</p>
            <p className="text-xs text-slate-500 mt-1">
              Based on fake pricing just for showcase.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Second row: request overview + quick actions */}
      <div className="grid gap-4 lg:grid-cols-3 mb-6">
        {/* Request volume “chart” */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Request overview</CardTitle>
            <CardDescription>
              Open vs completed requests across the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6 items-end">
              <div className="flex-1">
                <p className="text-xs text-slate-500 mb-1">Open</p>
                <div className="h-32 w-full rounded-lg bg-slate-100 flex items-end">
                  <div
                    className="w-full bg-amber-400 rounded-lg"
                    style={{
                      height: openRequests.length === 0 ? "0%" : "70%",
                    }}
                  />
                </div>
                <p className="mt-2 text-sm font-medium">
                  {openRequests.length} open
                  {urgentRequests > 0 ? ` • ${urgentRequests} urgent` : ""}
                </p>
              </div>

              <div className="flex-1">
                <p className="text-xs text-slate-500 mb-1">Completed</p>
                <div className="h-32 w-full rounded-lg bg-slate-100 flex items-end">
                  <div
                    className="w-full bg-emerald-400 rounded-lg"
                    style={{
                      height:
                        totalRequests === 0
                          ? "0%"
                          : `${
                              (maintenanceRequests.filter(
                                (r) => r.status === "Completed"
                              ).length /
                                totalRequests) *
                              100
                            }%`,
                    }}
                  />
                </div>
                <p className="mt-2 text-sm font-medium">
                  {
                    maintenanceRequests.filter(
                      (r) => r.status === "Completed"
                    ).length
                  }{" "}
                  completed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
            <CardDescription>
              Common admin flows across the platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Button variant="outline" className="w-full justify-start">
              Verify new contractors (demo)
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Review pending landlord approvals
            </Button>
            <Button variant="outline" className="w-full justify-start">
              View disputes & escalations
            </Button>
            <Button variant="ghost" className="w-full justify-start text-xs">
              Open full audit log
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests table */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Recent requests</CardTitle>
            <CardDescription>
              Last few issues raised anywhere on the platform.
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View all requests (demo)
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {recentRequests.length === 0 ? (
            <p className="text-sm text-slate-500">
              No maintenance activity yet. Once tenants start logging issues,
              they&apos;ll appear here.
            </p>
          ) : (
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Property</Th>
                  <Th>Category</Th>
                  <Th>Priority</Th>
                  <Th>Status</Th>
                  <Th>Created</Th>
                </Tr>
              </Thead>
              <Tbody>
                {recentRequests.map((req) => (
                  <Tr key={req.id}>
                    <Td className="text-xs text-blue-600 font-medium">
                      {req.id}
                    </Td>
                    <Td className="whitespace-nowrap">
                      {propertyMap[req.propertyId] ?? req.propertyId}
                    </Td>
                    <Td>{req.category}</Td>
                    <Td>
                      <Badge
                        variant={
                          req.priority === "Urgent" ? "danger" : "outline"
                        }
                      >
                        {req.priority}
                      </Badge>
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
                      {new Date(req.createdAt).toLocaleDateString("en-GB")}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
