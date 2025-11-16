import Link from "next/link";
import ContractorLayout from "../../../layouts/ContractorLayout";

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

import { Button } from "../../../components/ui/button";

import {
  maintenanceRequests,
  properties,
  UnifiedStatus,
} from "../../../lib/mockData";

import EmptyState from "../../../components/ui/empty-state";
import { ClipboardList } from "lucide-react";

type ContractorJobStatus = "Offer" | "Assigned" | "In Progress" | "Completed";

const CURRENT_CONTRACTOR_ID = "CON-001";

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

export default function ContractorJobsPage() {
  const contractorJobs = maintenanceRequests.filter(
    (job) =>
      job.contractorId === CURRENT_CONTRACTOR_ID || job.status === "Offer"
  );

  const propertyMap = Object.fromEntries(
    properties.map((p) => [p.id, `${p.name}, ${p.postcode}`])
  );

  return (
    <ContractorLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Jobs</h1>
          <p className="text-slate-500 text-sm">
            Offers, active jobs, and completed work assigned to you.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Current jobs</CardTitle>
            <CardDescription>
              Accept offers, view job details, and update progress.
            </CardDescription>
          </div>
          <div className="w-full md:max-w-xs">
            <Input placeholder="Search by property or job ID..." />
          </div>
        </CardHeader>

        <CardContent>
          {/* EMPTY STATE */}
          {contractorJobs.length === 0 ? (
            <EmptyState
              title="No jobs available"
              description="Any jobs assigned to you or offered to all contractors will appear here."
              icon={<ClipboardList size={40} />}
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Job</Th>
                    <Th>Property</Th>
                    <Th>Time slot</Th>
                    <Th>Status</Th>
                    <Th>Fee</Th>
                    <Th>Actions</Th>
                    <Th>Details</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {contractorJobs.map((job) => {
                    const contractorStatus = toContractorStatus(job.status);
                    const isOffer = contractorStatus === "Offer";
                    const isInProgress = contractorStatus === "In Progress";
                    const isCompleted = contractorStatus === "Completed";

                    const propertyLabel =
                      propertyMap[job.propertyId] ?? job.propertyId;

                    const created = new Date(job.createdAt);
                    const slot = `${created.toLocaleDateString(
                      "en-GB"
                    )} · ${created.toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`;

                    return (
                      <Tr key={job.id}>
                        <Td>
                          <div className="font-medium">{job.issueTitle}</div>
                          <div className="text-xs text-slate-500">{job.id}</div>
                        </Td>

                        <Td className="whitespace-nowrap">{propertyLabel}</Td>
                        <Td>{slot}</Td>

                        <Td>
                          <Badge variant={statusVariant(contractorStatus)}>
                            {contractorStatus}
                          </Badge>
                        </Td>

                        <Td>{job.fee}</Td>

                        <Td>
                          {isOffer ? (
                            <div className="flex gap-2">
                              <Button size="sm" className="text-xs px-2 py-1">
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-xs px-2 py-1"
                              >
                                Decline
                              </Button>
                            </div>
                          ) : isInProgress ? (
                            <Button size="sm" className="text-xs px-2 py-1">
                              Mark complete
                            </Button>
                          ) : isCompleted ? (
                            <span className="text-xs text-slate-400">
                              No actions
                            </span>
                          ) : (
                            <Button size="sm" className="text-xs px-2 py-1">
                              Start job
                            </Button>
                          )}
                        </Td>

                        <Td>
                          <Link href={`/contractor/jobs/${job.id}`}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs px-2 py-1"
                            >
                              View details
                            </Button>
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
    </ContractorLayout>
  );
}
