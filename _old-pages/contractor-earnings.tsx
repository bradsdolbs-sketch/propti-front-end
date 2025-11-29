import ContractorLayout from "../layouts/ContractorLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import Link from "next/link";

import {
  maintenanceRequests,
  properties,
  contractors,
  UnifiedStatus,
  Priority,
} from "../lib/mockData";

const CURRENT_CONTRACTOR_ID = "CON-001";

// ----- Helpers -----
function toContractorStatus(status: UnifiedStatus):
  | "Offer"
  | "Assigned"
  | "In Progress"
  | "Completed" {
  switch (status) {
    case "Offer":
      return "Offer";
    case "Approved – Awaiting Contractor":
    case "Contractor Booked":
      return "Assigned";
    case "In Progress":
      return "In Progress";
    case "Completed":
      return "Completed";
    case "Awaiting Landlord":
    default:
      return "Offer";
  }
}

function statusVariant(
  status: "Offer" | "Assigned" | "In Progress" | "Completed"
): "default" | "warning" | "success" {
  switch (status) {
    case "Offer":
      return "warning";
    case "Assigned":
    case "In Progress":
      return "default";
    case "Completed":
      return "success";
  }
}

export default function ContractorEarningsPage() {
  const contractor = contractors.find((c) => c.id === CURRENT_CONTRACTOR_ID);

  const completedJobs = maintenanceRequests.filter(
    (job) =>
      job.contractorId === CURRENT_CONTRACTOR_ID &&
      toContractorStatus(job.status) === "Completed"
  );

  const totalEarnings = completedJobs.length * 120; // £120 per job (demo)
  const upcomingPayout = Math.min(totalEarnings, 300); // demo payout cap

  const propertyMap = Object.fromEntries(
    properties.map((p) => [p.id, `${p.name}, ${p.postcode}`])
  );

  return (
    <ContractorLayout>
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          Earnings & payouts
        </h1>
        <p className="text-slate-500 text-sm">
          Track your completed jobs and upcoming payments.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total earned</CardTitle>
            <CardDescription>Across all completed jobs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">£{totalEarnings}</p>
            <p className="text-xs text-slate-500 mt-1">
              Payouts are sent every Friday at 5pm.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming payout</CardTitle>
            <CardDescription>Scheduled: Friday, 5pm</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">£{upcomingPayout}</p>
            <p className="text-xs text-slate-500 mt-1">
              Any remaining balance rolls over to next week.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed jobs</CardTitle>
            <CardDescription>Awaiting or paid out</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              {completedJobs.length}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Jobs marked finished on-site.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Completed Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Completed jobs</CardTitle>
          <CardDescription>
            These jobs have been confirmed as completed and are included in payout calculations.
          </CardDescription>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          {completedJobs.length === 0 ? (
            <p className="text-sm text-slate-500">
              You haven&apos;t completed any jobs yet. Once you complete your
              first job, it will appear here.
            </p>
          ) : (
            <Table>
              <Thead>
                <Tr>
                  <Th>Job</Th>
                  <Th>Property</Th>
                  <Th>Date</Th>
                  <Th>Payout</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {completedJobs.map((job) => (
                  <Tr key={job.id}>
                    <Td>
                      <div className="font-medium">{job.issueTitle}</div>
                      <div className="text-xs text-slate-500">{job.id}</div>
                    </Td>
                    <Td className="whitespace-nowrap">
                      {propertyMap[job.propertyId] ?? job.propertyId}
                    </Td>
                    <Td>
                      {new Date(job.lastUpdate).toLocaleDateString("en-GB")}
                    </Td>
                    <Td>£120</Td>
                    <Td>
                      <Link href={`/contractor/jobs/${job.id}`}>
                        <Button variant="ghost" size="sm">
                          View details
                        </Button>
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </CardContent>
      </Card>
    </ContractorLayout>
  );
}
