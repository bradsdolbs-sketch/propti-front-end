import LandlordLayout from "../../layouts/LandlordLayout";

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

const CURRENT_LANDLORD_ID = "LL-1001";

function isOpenStatus(status: UnifiedStatus) {
  return status !== "Completed";
}

function isInProgressStatus(status: UnifiedStatus) {
  return ["Contractor Booked", "In Progress", "Approved – Awaiting Contractor"].includes(
    status
  );
}

export default function LandlordDashboardPage() {
  const landlordRequests = maintenanceRequests.filter(
    (r) => r.landlordId === CURRENT_LANDLORD_ID
  );

  const propertyIds = Array.from(
    new Set(landlordRequests.map((r) => r.propertyId))
  );

  const landlordProperties = properties.filter((p) =>
    propertyIds.includes(p.id)
  );

  const totalRequests = landlordRequests.length;
  const openRequests = landlordRequests.filter((r) =>
    isOpenStatus(r.status)
  ).length;
  const inProgress = landlordRequests.filter((r) =>
    isInProgressStatus(r.status)
  ).length;
  const urgentCount = landlordRequests.filter(
    (r) => r.priority === "Urgent"
  ).length;

  const propertiesWithIssues = landlordProperties.length;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const completedThisMonth = landlordRequests.filter((r) => {
    if (r.status !== "Completed") return false;
    const created = new Date(r.createdAt);
    return (
      created.getMonth() === currentMonth &&
      created.getFullYear() === currentYear
    );
  }).length;

  const recentRequests = [...landlordRequests]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const propertySummary = landlordRequests.reduce<Record<string, { open: number; total: number }>>(
    (acc, r) => {
      if (!acc[r.propertyId]) {
        acc[r.propertyId] = { open: 0, total: 0 };
      }
      acc[r.propertyId].total += 1;
      if (isOpenStatus(r.status)) acc[r.propertyId].open += 1;
      return acc;
    },
    {}
  );

  const propertyMap = Object.fromEntries(
    properties.map((p) => [p.id, `${p.name}, ${p.postcode}`])
  );

  return (
    <LandlordLayout>
      {/* Page header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Dashboard
          </h1>
          <p className="text-slate-500 text-sm">
            Overview of maintenance activity across your properties.
          </p>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Open requests</CardTitle>
            <CardDescription>Needing attention</CardDescription>
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
            <CardTitle>In progress</CardTitle>
            <CardDescription>
              With contractors or being scheduled
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{inProgress}</p>
            <p className="text-xs text-slate-500 mt-1">
              Contractor booked / in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Urgent issues</CardTitle>
            <CardDescription>Flagged as high priority</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{urgentCount}</p>
            <p className="text-xs text-slate-500 mt-1">
              Across all properties
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed this month</CardTitle>
            <CardDescription>
              Jobs closed in {now.toLocaleString("en-GB", { month: "long" })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{completedThisMonth}</p>
            <p className="text-xs text-slate-500 mt-1">
              Showing only landlord-linked jobs
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Recent requests table */}
        <div className="md:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle>Recent requests</CardTitle>
              <CardDescription>
                Latest maintenance requests across your portfolio.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentRequests.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No maintenance requests yet.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>ID</Th>
                        <Th>Property</Th>
                        <Th>Category</Th>
                        <Th>Status</Th>
                        <Th>Created</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {recentRequests.map((req) => (
                        <Tr key={req.id}>
                          <Td className="whitespace-nowrap">
                            <span className="font-medium text-xs">
                              {req.id}
                            </span>
                          </Td>
                          <Td className="whitespace-nowrap">
                            {propertyMap[req.propertyId] ?? req.propertyId}
                          </Td>
                          <Td>{req.category}</Td>
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
              <CardTitle>Properties with issues</CardTitle>
              <CardDescription>
                Open maintenance by property.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {propertiesWithIssues === 0 ? (
                <p className="text-sm text-slate-500">
                  No open issues across your properties.
                </p>
              ) : (
                <div className="space-y-4">
                  {Object.entries(propertySummary).map(
                    ([propertyId, summary]) => {
                      const label =
                        propertyMap[propertyId] ?? propertyId;

                      return (
                        <div
                          key={propertyId}
                          className="flex items-center justify-between border border-slate-200 rounded-lg px-3 py-2"
                        >
                          <div>
                            <p className="text-sm font-medium text-slate-800">
                              {label}
                            </p>
                            <p className="text-xs text-slate-500">
                              {summary.open} open · {summary.total} total
                            </p>
                          </div>
                          <Badge
                            variant={
                              summary.open > 0 ? "warning" : "success"
                            }
                          >
                            {summary.open > 0
                              ? `${summary.open} open`
                              : "Clear"}
                          </Badge>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </LandlordLayout>
  );
}
