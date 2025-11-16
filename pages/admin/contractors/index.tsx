import Link from "next/link";
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

type ContractorStatus = "Active" | "Onboarding" | "Paused";

interface AdminContractorRow {
  id: string;
  name: string;
  company: string;
  trades: string;
  coverage: string;
  jobsThisWeek: number;
  rating: number;
  status: ContractorStatus;
}

const mockContractors: AdminContractorRow[] = [
  {
    id: "CON-001",
    name: "ABC Plumbing",
    company: "ABC Plumbing Ltd",
    trades: "Plumbing, Heating",
    coverage: "E1, E2, EC1, EC2",
    jobsThisWeek: 6,
    rating: 4.8,
    status: "Active",
  },
  {
    id: "CON-002",
    name: "Central Gate Maintenance",
    company: "Central Gate Maintenance",
    trades: "General maintenance",
    coverage: "E1, E5, N1",
    jobsThisWeek: 3,
    rating: 4.6,
    status: "Active",
  },
  {
    id: "CON-003",
    name: "Ventilation Co",
    company: "Ventilation Co",
    trades: "Electrical, Ventilation",
    coverage: "All London",
    jobsThisWeek: 1,
    rating: 4.4,
    status: "Onboarding",
  },
  {
    id: "CON-004",
    name: "Handyman Plus",
    company: "Handyman Plus",
    trades: "Handyman",
    coverage: "E1 only",
    jobsThisWeek: 0,
    rating: 4.2,
    status: "Paused",
  },
];

function statusVariant(status: ContractorStatus): "default" | "warning" | "success" {
  switch (status) {
    case "Active":
      return "success";
    case "Onboarding":
      return "warning";
    case "Paused":
      return "default";
  }
}

export default function AdminContractorsListPage() {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Contractors
          </h1>
          <p className="text-slate-500 text-sm">
            All contractors available on Propti and their current status.
          </p>
        </div>

        <div className="w-full md:max-w-xs">
          <Input placeholder="Search by name, trade, or area..." />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contractor directory</CardTitle>
          <CardDescription>
            Use this list to check coverage, workload, and onboarding status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <Thead>
                <Tr>
                  <Th>Contractor</Th>
                  <Th>Trades</Th>
                  <Th>Coverage</Th>
                  <Th>Jobs this week</Th>
                  <Th>Rating</Th>
                  <Th>Status</Th>
                  <Th>Details</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mockContractors.map((c) => (
                  <Tr key={c.id}>
                    <Td>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs text-slate-500">{c.company}</div>
                      <div className="text-[11px] text-slate-400">
                        {c.id}
                      </div>
                    </Td>
                    <Td className="whitespace-nowrap">{c.trades}</Td>
                    <Td className="whitespace-nowrap">{c.coverage}</Td>
                    <Td>{c.jobsThisWeek}</Td>
                    <Td>{c.rating.toFixed(1)}</Td>
                    <Td>
                      <Badge variant={statusVariant(c.status)}>
                        {c.status}
                      </Badge>
                    </Td>
                    <Td>
                      <Link
                        href={`/admin/contractors/${c.id}`}
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
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
