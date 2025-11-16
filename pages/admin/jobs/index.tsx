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
import {
  maintenanceRequests,
  landlords,
  properties,
  contractors,
  UnifiedStatus,
} from "../../../lib/mockData";
import Link from "next/link";

function statusVariant(status: UnifiedStatus): "default" | "warning" | "success" {
  switch (status) {
    case "Awaiting Landlord":
    case "Offer":
      return "warning";
    case "Approved – Awaiting Contractor":
    case "Contractor Booked":
    case "In Progress":
      return "default";
    case "Completed":
      return "success";
  }
}

export default function AdminJobsListPage() {
  const totalOpen = maintenanceRequests.filter(
    (j) => j.status !== "Completed"
  ).length;
  const inProgress = maintenanceRequests.filter(
    (j) => j.status === "In Progress"
  ).length;
  const awaitingLandlord = maintenanceRequests.filter(
    (j) => j.status === "Awaiting Landlord"
  ).length;
  const awaitingContractor = maintenanceRequests.filter(
    (j) => j.status === "Offer" || j.status === "Approved – Awaiting Contractor"
  ).length;

  const landlordMap = Object.fromEntries(
    landlords.map((l) => [l.id, l.name])
  );
  const propertyMap = Object.fromEntries(
    properties.map((p) => [p.id, `${p.name}, ${p.postcode}`])
  );
  const contractorMap = Object.fromEntries(
    contractors.map((c) => [c.id, c.name])
  );

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Jobs</h1>
          <p className="text-slate-500 text-sm">
            All maintenance requests across all properties.
          </p>
        </div>

        <div className="w-full md:max-w-xs">
          <Input placeholder="Search job ID, landlord, or property..." />
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Open jobs</CardTitle>
            <CardDescription>Across all landlords</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{totalOpen}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>In progress</CardTitle>
            <CardDescription>Contractors on site / due</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{inProgress}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Awaiting landlord</CardTitle>
            <CardDescription>Need approval or triage</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{awaitingLandlord}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Awaiting contractor</CardTitle>
            <CardDescription>Offer not accepted yet</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{awaitingContractor}</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>All jobs</CardTitle>
          <CardDescription>
            Monitor and manage all active and completed maintenance jobs.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <Thead>
                <Tr>
                  <Th>Job</Th>
                  <Th>Property</Th>
                  <Th>Landlord</Th>
                  <Th>Contractor</Th>
                  <Th>Status</Th>
                  <Th>Fee</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {maintenanceRequests.map((job) => (
                  <Tr key={job.id}>
                    <Td>
                      <div className="font-medium">{job.issueTitle}</div>
                      <div className="text-xs text-slate-500">{job.id}</div>
                    </Td>
                    <Td>
                      {propertyMap[job.propertyId] ?? job.propertyId}
                    </Td>
                    <Td>{landlordMap[job.landlordId] ?? job.landlordId}</Td>
                    <Td>
                      {job.contractorId
                        ? contractorMap[job.contractorId] ?? job.contractorId
                        : (
                          <span className="text-xs text-slate-400">
                            Unassigned
                          </span>
                        )}
                    </Td>
                    <Td>
                      <Badge variant={statusVariant(job.status)}>
                        {job.status}
                      </Badge>
                    </Td>
                    <Td>{job.fee}</Td>
                    <Td>
                      <Link href={`/admin/jobs/${job.id}`}>
                        <button className="text-xs text-blue-600 hover:underline">
                          View details
                        </button>
                      </Link>
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
