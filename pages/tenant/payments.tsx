import TenantLayout from "../../layouts/TenantLayout";
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

import EmptyState from "../../components/ui/empty-state";
import { PoundSterling, CalendarClock, Receipt } from "lucide-react";

// Temporary mock data
const payments = [
  {
    id: "PAY-001",
    amount: 2000,
    date: "2025-02-01",
    status: "Paid",
  },
  {
    id: "PAY-002",
    amount: 2000,
    date: "2025-03-01",
    status: "Upcoming",
  },
];

const CURRENT_RENT = 2000;

export default function TenantPaymentsPage() {
  const paid = payments.filter((p) => p.status === "Paid");
  const nextPayment = payments.find((p) => p.status === "Upcoming");

  const totalPaid = paid.reduce((sum, p) => sum + p.amount, 0);

  return (
    <TenantLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          Rent & payments
        </h1>
        <p className="text-slate-500 text-sm">
          Track your rent, payment history, and next due date.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Total paid */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total paid</CardTitle>
            <PoundSterling className="text-slate-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">£{totalPaid.toLocaleString()}</p>
            <p className="text-xs text-slate-500">All payments to date</p>
          </CardContent>
        </Card>

        {/* Next payment */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Next payment</CardTitle>
            <CalendarClock className="text-slate-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              £{nextPayment?.amount?.toLocaleString() ?? CURRENT_RENT}
            </p>
            <p className="text-xs text-slate-500">
              Due {nextPayment ? new Date(nextPayment.date).toLocaleDateString("en-GB") : "soon"}
            </p>
          </CardContent>
        </Card>

        {/* Monthly rent */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Monthly rent</CardTitle>
            <Receipt className="text-slate-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">£{CURRENT_RENT.toLocaleString()}</p>
            <p className="text-xs text-slate-500">Set by your landlord</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment table */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Payment history</CardTitle>
            <CardDescription>
              A complete list of all past and upcoming rent payments.
            </CardDescription>
          </div>
          <Button disabled>Download receipt (soon)</Button>
        </CardHeader>

        <CardContent>
          {payments.length === 0 ? (
            <EmptyState
              title="No payments found"
              description="Your rent payments will show here once recorded."
              icon={<PoundSterling size={40} />}
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Amount</Th>
                    <Th>Due date</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {payments.map((p) => (
                    <Tr key={p.id}>
                      <Td>{p.id}</Td>
                      <Td>£{p.amount.toLocaleString()}</Td>
                      <Td>
                        {new Date(p.date).toLocaleDateString("en-GB")}
                      </Td>
                      <Td>
                        <Badge
                          variant={
                            p.status === "Paid"
                              ? "success"
                              : p.status === "Upcoming"
                              ? "warning"
                              : "default"
                          }
                        >
                          {p.status}
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
    </TenantLayout>
  );
}
