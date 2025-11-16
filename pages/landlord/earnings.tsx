import LandlordLayout from "../../../layouts/LandlordLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";

import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
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
import { PoundSterling, Wallet, TrendingUp } from "lucide-react";

// Temporary earnings mock
const earnings = [
  {
    id: "EARN-001",
    property: "22 Anthony House, E5",
    amount: 2000,
    date: "2025-02-01",
    status: "Paid",
  },
  {
    id: "EARN-002",
    property: "Central Gate, E1",
    amount: 1750,
    date: "2025-02-01",
    status: "Pending",
  },
];

export default function LandlordEarningsPage() {
  const totalEarned = earnings
    .filter((e) => e.status === "Paid")
    .reduce((sum, e) => sum + e.amount, 0);

  const outstanding = earnings
    .filter((e) => e.status === "Pending")
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <LandlordLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Earnings</h1>
        <p className="text-slate-500 text-sm">
          Track rental income across all your properties.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total earned</CardTitle>
            <PoundSterling className="text-slate-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">£{totalEarned.toLocaleString()}</p>
            <p className="text-xs text-slate-500">From paid rent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Outstanding</CardTitle>
            <Wallet className="text-slate-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">£{outstanding.toLocaleString()}</p>
            <p className="text-xs text-slate-500">Pending payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Next rent</CardTitle>
            <TrendingUp className="text-slate-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              £{outstanding.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500">Due next cycle</p>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Table */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Income history</CardTitle>
            <CardDescription>
              A full record of rental payments.
            </CardDescription>
          </div>
          <Button disabled>Download CSV (soon)</Button>
        </CardHeader>

        <CardContent>
          {earnings.length === 0 ? (
            <EmptyState
              title="No earnings yet"
              description="Once tenants begin paying rent, your earnings will appear here."
              icon={<PoundSterling size={40} />}
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Property</Th>
                    <Th>Amount</Th>
                    <Th>Date</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {earnings.map((e) => (
                    <Tr key={e.id}>
                      <Td>{e.id}</Td>
                      <Td>{e.property}</Td>
                      <Td>£{e.amount.toLocaleString()}</Td>
                      <Td>
                        {new Date(e.date).toLocaleDateString("en-GB")}
                      </Td>
                      <Td>
                        <Badge
                          variant={e.status === "Paid" ? "success" : "warning"}
                        >
                          {e.status}
                        </Badge>
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
