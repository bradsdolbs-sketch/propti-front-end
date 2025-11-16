import TenantLayout from "../../layouts/TenantLayout";
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
import { Button } from "../../components/ui/button";

interface RentPaymentRow {
  id: string;
  period: string;
  dueDate: string;
  paidDate?: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  method?: string;
}

const mockPayments: RentPaymentRow[] = [
  {
    id: "RP-2025-06",
    period: "June 2025",
    dueDate: "2025-06-12",
    paidDate: "2025-06-11",
    amount: 2000,
    status: "Paid",
    method: "Bank transfer",
  },
  {
    id: "RP-2025-07",
    period: "July 2025",
    dueDate: "2025-07-12",
    paidDate: "2025-07-12",
    amount: 2000,
    status: "Paid",
    method: "Bank transfer",
  },
  {
    id: "RP-2025-08",
    period: "August 2025",
    dueDate: "2025-08-12",
    paidDate: undefined,
    amount: 2000,
    status: "Pending",
    method: "Standing order",
  },
];

function formatGBP(value: number): string {
  return `£${value.toFixed(0)}`;
}

export default function TenantRentPage() {
  const nextPayment = mockPayments.find((p) => p.status === "Pending");
  const monthly = 2000;
  const deposit = 2308;

  return (
    <TenantLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Rent</h1>
          <p className="text-sm text-slate-500">
            See your rent amount, due dates, and a history of payments. This is
            a visual demo – no real payments here yet.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Monthly rent</CardTitle>
              <CardDescription>As per your AST</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">
                {formatGBP(monthly)}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Payable to your agent/landlord
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next payment</CardTitle>
              <CardDescription>Upcoming rent due</CardDescription>
            </CardHeader>
            <CardContent>
              {nextPayment ? (
                <>
                  <p className="text-lg font-semibold">
                    {nextPayment.period}
                  </p>
                  <p className="text-sm text-slate-600">
                    Due:{" "}
                    {new Date(nextPayment.dueDate).toLocaleDateString(
                      "en-GB"
                    )}
                  </p>
                  <p className="text-sm text-slate-600">
                    Amount: {formatGBP(nextPayment.amount)}
                  </p>
                  <div className="mt-2">
                    <Badge
                      variant={
                        nextPayment.status === "Pending"
                          ? "warning"
                          : nextPayment.status === "Overdue"
                          ? "default"
                          : "success"
                      }
                    >
                      {nextPayment.status}
                    </Badge>
                  </div>
                </>
              ) : (
                <p className="text-sm text-slate-500">
                  No upcoming payments shown in this demo.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Deposit</CardTitle>
              <CardDescription>Held as per your AST</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">
                {formatGBP(deposit)}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Details in your Documents section.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Payment history */}
        <Card>
          <CardHeader>
            <CardTitle>Payment history</CardTitle>
            <CardDescription>
              A simple log of recent rent payments (demo data).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Period</Th>
                    <Th>Due date</Th>
                    <Th>Paid date</Th>
                    <Th>Amount</Th>
                    <Th>Status</Th>
                    <Th>Method</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {mockPayments.map((p) => (
                    <Tr key={p.id}>
                      <Td>{p.period}</Td>
                      <Td>
                        {new Date(p.dueDate).toLocaleDateString("en-GB")}
                      </Td>
                      <Td>
                        {p.paidDate
                          ? new Date(p.paidDate).toLocaleDateString("en-GB")
                          : "—"}
                      </Td>
                      <Td>{formatGBP(p.amount)}</Td>
                      <Td>
                        <Badge
                          variant={
                            p.status === "Paid"
                              ? "success"
                              : p.status === "Pending"
                              ? "warning"
                              : "default"
                          }
                        >
                          {p.status}
                        </Badge>
                      </Td>
                      <Td>{p.method ?? "—"}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">
              In the full system this would sync from your actual payment
              provider or client account, not be static data.
            </p>
          </CardContent>
        </Card>

        {/* CTA / future payments */}
        <Card>
          <CardHeader>
            <CardTitle>Online payments (coming later)</CardTitle>
            <CardDescription>
              How this could work once payments are live.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-3 text-sm">
            <p className="text-slate-600">
              In a future version you could pay rent directly via Propti, see
              receipts, and share a payment history PDF with your landlord or
              referencing companies.
            </p>
            <Button size="sm" disabled>
              Pay rent online (demo)
            </Button>
          </CardContent>
        </Card>
      </div>
    </TenantLayout>
  );
}
