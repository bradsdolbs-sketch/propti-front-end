import TenantLayout from "../../../layouts/TenantLayout";
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
import { Button } from "../../../components/ui/button";

interface RentPaymentRow {
  id: string;
  period: string;
  dueDate: string;
  paidDate?: string;
  amount: number;
  status: "Paid" | "Overdue" | "Upcoming";
  method?: string;
}

const rent = 2000;
const nextDue = "2025-12-01";

const mockPayments: RentPaymentRow[] = [
  {
    id: "RENT-2025-11",
    period: "Nov 2025",
    dueDate: "2025-11-01",
    paidDate: "2025-10-30",
    amount: 2000,
    status: "Paid",
    method: "Bank transfer",
  },
  {
    id: "RENT-2025-10",
    period: "Oct 2025",
    dueDate: "2025-10-01",
    paidDate: "2025-09-30",
    amount: 2000,
    status: "Paid",
    method: "Bank transfer",
  },
  {
    id: "RENT-2025-12",
    period: "Dec 2025",
    dueDate: "2025-12-01",
    amount: 2000,
    status: "Upcoming",
  },
];

function statusVariant(status: RentPaymentRow["status"]): "success" | "warning" | "default" {
  switch (status) {
    case "Paid":
      return "success";
    case "Overdue":
      return "warning";
    case "Upcoming":
      return "default";
  }
}

function formatGBP(value: number): string {
  return `£${value.toFixed(0)}`;
}

export default function TenantRentPage() {
  const nextDueDate = new Date(nextDue).toLocaleDateString("en-GB");

  return (
    <TenantLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Rent</h1>
            <p className="text-sm text-slate-500">
              See your rent amount, due dates, and recent payments.
            </p>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Monthly rent</CardTitle>
              <CardDescription>As per your tenancy agreement</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{formatGBP(rent)}</p>
              <p className="text-xs text-slate-500 mt-1">
                22 Anthony House, Pembury Place, E5 8GZ
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next due</CardTitle>
              <CardDescription>Upcoming rent period</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{nextDueDate}</p>
              <p className="text-xs text-slate-500 mt-1">
                Please make sure payment is received by this date.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment method</CardTitle>
              <CardDescription>How you currently pay</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="font-medium text-slate-800">
                Bank transfer / standing order
              </p>
              <p className="text-xs text-slate-500">
                In a future version, this could show direct debit / card
                details and allow you to update them.
              </p>
              <Button size="sm" variant="outline" disabled>
                Update payment method (demo only)
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Landlord / agent bank details (demo) */}
        <Card>
          <CardHeader>
            <CardTitle>Where to pay</CardTitle>
            <CardDescription>
              Bank details your rent should be paid to.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 text-sm">
            <div>
              <p className="text-xs text-slate-500">Payee</p>
              <p className="font-medium">Central Gate Estates (Client Account)</p>
              <p className="text-xs text-slate-500 mt-2">
                In the live system this would pull from your landlord / agent
                configuration.
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500">Sort code</p>
              <p className="font-medium">00-00-00</p>
              <p className="text-xs text-slate-500 mt-2">Account number</p>
              <p className="font-medium">00000000</p>
            </div>
          </CardContent>
        </Card>

        {/* Payment history */}
        <Card>
          <CardHeader>
            <CardTitle>Payment history</CardTitle>
            <CardDescription>
              Recent rent payments against your tenancy.
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
                  {mockPayments.map((row) => (
                    <Tr key={row.id}>
                      <Td>{row.period}</Td>
                      <Td>
                        {new Date(row.dueDate).toLocaleDateString("en-GB")}
                      </Td>
                      <Td>
                        {row.paidDate
                          ? new Date(row.paidDate).toLocaleDateString("en-GB")
                          : "—"}
                      </Td>
                      <Td>{formatGBP(row.amount)}</Td>
                      <Td>
                        <Badge variant={statusVariant(row.status)}>
                          {row.status}
                        </Badge>
                      </Td>
                      <Td>{row.method ?? "—"}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              In the real product this would be synced from your rent
              collection / client account system and could show arrears,
              part-payments and payment references.
            </p>
          </CardContent>
        </Card>
      </div>
    </TenantLayout>
  );
}
