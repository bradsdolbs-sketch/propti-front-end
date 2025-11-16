import ContractorLayout from "../../layouts/ContractorLayout";

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

const CURRENT_CONTRACTOR_ID = "CON-001";

type ContractorJobStatus = "Offer" | "Assigned" | "In Progress" | "Completed";

function toContractorStatus(status: UnifiedStatus): ContractorJobStatus {
  switch (status) {
    case "Offer":
      return "Offer";
    case "Contractor Booked":
    case "Approved – Awaiting Contractor":
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

function isOpenStatus(status: UnifiedStatus) {
  return status !== "Completed";
}

function isInProgressStatus(status: UnifiedStatus) {
  return ["Contractor Booked", "In Progress"].includes(status);
}

function statusVariant(
  status: ContractorJobStatus
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

export default function ContractorDashboardPage() {
  const contractorJobs = maintenanceRequests.filter(
    (job) => job.contractorId === CURRENT_CONTRACTOR_ID
  );

  const totalJobs = contractorJobs.length;
  const openJobs = contractorJobs.filter((j) => isOpenStatus(j.status)).length;
  const inProgress = contractorJobs.filter((j) =>
    isInProgressStatus(j.status)
  ).length;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const completedThisMonth = contractorJobs.filter((j) => {
    if (j.status !== "Completed") return false;
    const created = new Date(j.createdAt);
    return (
      created.getMonth() === currentMonth &&
      created.getFullYear() === currentYear
    );
  }).length;

  const recentJobs = [...contractorJobs]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const upcomingJobs = contractorJobs.filter((j) =>
    ["Approved – Awaiting Contractor", "Contractor Booked"].includes(
      j.status
    )
  );

  const propertyMap = Object.fromEntries(
    properties.map((p) => [p.id, `${p.name}, ${p.postcode}`])
  );

  return (
    <ContractorLayout>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Dashboard
          </h1>
          <p className="text-slate-500 text-sm">
            Overview of your offers, active jobs, and recent work.
          </p>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total jobs</CardTitle>
            <CardDescription>Assigned to your company</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{totalJobs}</p>
            <p className="text-xs text-slate-500 mt-1">
              Includes offers and completed jobs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Open jobs</CardTitle>
            <CardDescription>Need attention or action</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{openJobs}</p>
            <p className="text-xs text-slate-500 mt-1">
              Anything not marked as completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>In progress</CardTitle>
            <CardDescription>
              Contractor booked or on site
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{inProgress}</p>
            <p className="text-xs text-slate-500 mt-1">
              Jobs you’re actively handling
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed this month</CardTitle>
            <CardDescription>
              Closed in{" "}
              {now.toLocaleString("en-GB", { month: "long" })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              {completedThisMonth}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Helps track monthly throughput
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Recent jobs table */}
        <div className="md:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle>Recent jobs</CardTitle>
              <CardDescription>
                Latest work assigned to you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentJobs.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No jobs assigned yet.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Job</Th>
                        <Th>Property</Th>
                        <Th>Status</Th>
                        <Th>Created</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {recentJobs.map((job) => {
                        const contractorStatus = toContractorStatus(
                          job.status
                        );
                        const label =
                          propertyMap[job.propertyId] ?? job.propertyId;

                        return (
                          <Tr key={job.id}>
                            <Td>
                              <div className="font-medium text-sm">
                                {job.issueTitle}
                              </div>
                              <div className="text-xs text-slate-500">
                                {job.id}
                              </div>
                            </Td>
                            <Td className="whitespace-nowrap">
                              {label}
                            </Td>
                            <Td>
                              <Badge
                                variant={statusVariant(
                                  contractorStatus
                                )}
                              >
                                {contractorStatus}
                              </Badge>
                            </Td>
                            <Td>
                              {new Date(
                                job.createdAt
                              ).toLocaleDateString("en-GB")}
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
        </div>

        {/* Upcoming / next jobs */}
        <div className="md:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Next jobs</CardTitle>
              <CardDescription>
                Jobs that look ready to be booked or completed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingJobs.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No upcoming jobs yet. Once landlords approve work,
                  it will appear here.
                </p>
              ) : (
                <div className="space-y-4">
                  {upcomingJobs.map((job) => {
                    const label =
                      propertyMap[job.propertyId] ?? job.propertyId;
                    const contractorStatus = toContractorStatus(
                      job.status
                    );

                    return (
                      <div
                        key={job.id}
                        className="border border-slate-200 rounded-lg px-3 py-2 flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">
                            {job.issueTitle}
                          </p>
                          <p className="text-xs text-slate-500">
                            {label}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            Created{" "}
                            {new Date(
                              job.createdAt
                            ).toLocaleDateString("en-GB")}
                          </p>
                        </div>
                        <Badge variant={statusVariant(contractorStatus)}>
                          {contractorStatus}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ContractorLayout>
  );
}
