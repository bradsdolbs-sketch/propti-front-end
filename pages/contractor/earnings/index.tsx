import ContractorLayout from "../../../layouts/ContractorLayout";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";

import { Badge } from "../../../components/ui/badge";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "../../../components/ui/table";

// NEW: Empty state
import EmptyState from "../../../components/ui/empty-state";
import { PoundSterling } from "lucide-react";

interface EarningsRow {
  id: string;
  property: string;
  date: string;
  fee: number;
  status: "Pending" | "Paid";
}

const mockEarnings: EarningsRow[] = [
  {
    id: "JOB-3019",
    property: "Silverstream House, W1",
    date: "2025-11-10",
    fee: 110,
    status: "Paid",
  },
  {
    id: "JOB-3020",
    property: "Central Gate, E1",
    date: "2025-11-11",
    fee: 120,
    status: "Pending",
  },
  {
    id: "JOB-3021",
    property: "22 Anthony House, E5",
    date: "2025-11-12",
    fee: 140,
    status: "Pending",
  },
];

const PLATFORM_COMMISSION = 0.1; // 10%

function formatGBP(value: number): string {
  return `£${value.toFixed(0)}`;
}

export default function ContractorEarningsPage() {
  const totalThisMonth = mockEarnings.reduce((acc, row) => acc + row.fee, 0);

  const pending = mockEarnings
    .filter((r) => r.status === "Pending")
    .reduce((acc, row) => acc + row.fee, 0);

  const completedJobs = mockEarnings.length;

  const lifetime = 3200; // placeholder

  return (
    <ContractorLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Earnings</h1>
          <p className="text-slate-500 text-sm">
            Overview of your recent jobs, payouts, and commission.
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>This month</CardTitle>
            <CardDescription>Gross job value</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{formatGBP(totalThisMonth)}</p>
            <p className="text-xs text-slate-500 mt-1">
              Before Propti commission
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending payout</CardTitle>
            <CardDescription>Expected next cycle</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              {formatGBP(pending * (1 - PLATFORM_COMMISSION))}
            </p>
            <p className="text-xs text-slate-500 mt-1">After 10% platform fee</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed jobs</CardTitle>
            <CardDescription>Included in this view</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{completedJobs}</p>
            <p className="text-xs text-slate-500 mt-1">Across all shown jobs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lifetime earnings</CardTitle>
            <CardDescription>All-time net via Propti</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{formatGBP(lifetime)}</p>
            <p className="text-xs text-slate-500 mt-1">
              Net after platform fee (mock)
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job earnings</CardTitle>
          <CardDescription>
            Each completed job with gross amount, platform fee, and your net.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* EMPTY STATE */}
          {mockEarnings.length === 0 ? (
            <EmptyState
              title="No earnings yet"
              description="Completed and paid jobs will appear here automatically."
              icon={<PoundSterling size={40} />}
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Job</Th>
                    <Th>Date</Th>
                    <Th>Property</Th>
                    <Th>Gross fee</Th>
                    <Th>Platform (10%)</Th>
                    <Th>Your net</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {mockEarnings.map((row) => {
                    const commission = row.fee * PLATFORM_COMMISSION;
                    const net = row.fee - commission;

                    return (
                      <Tr key={row.id}>
                        <Td className="whitespace-nowrap">
                          <div className="font-medium">{row.id}</div>
                        </Td>

                        <Td>
                          {new Date(row.date).toLocaleDateString("en-GB")}
                        </Td>

                        <Td className="whitespace-nowrap">{row.property}</Td>

                        <Td>{formatGBP(row.fee)}</Td>
                        <Td>{formatGBP(commission)}</Td>
                        <Td>{formatGBP(net)}</Td>

                        <Td>
                          {row.status === "Pending" ? (
                            <Badge variant="warning">Pending</Badge>
                          ) : (
                            <Badge variant="success">Paid</Badge>
                          )}
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
