import LandlordLayout from "../layouts/LandlordLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "../components/ui/table";
import { Button } from "../components/ui/button";

type InvoiceStatus = "Paid" | "Pending" | "Overdue";

interface InvoiceRow {
  id: string;
  property: string;
  description: string;
  date: string;
  amount: string;
  status: InvoiceStatus;
}

const mockInvoices: InvoiceRow[] = [
  {
    id: "INV-3007",
    property: "22 Anthony House, E5",
    description: "Boiler call-out & repair",
    date: "12 Nov 2025",
    amount: "£140",
    status: "Pending",
  },
  {
    id: "INV-3006",
    property: "Central Gate, E1",
    description: "Window latch repair",
    date: "05 Nov 2025",
    amount: "£80",
    status: "Paid",
  },
  {
    id: "INV-3005",
    property: "22 Anthony House, E5",
    description: "Kitchen leak – parts & labour",
    date: "28 Oct 2025",
    amount: "£210",
    status: "Paid",
  },
  {
    id: "INV-3004",
    property: "Central Gate, E1",
    description: "Emergency call-out – no fix",
    date: "10 Oct 2025",
    amount: "£90",
    status: "Overdue",
  },
];

function statusVariant(status: InvoiceStatus): "default" | "success" | "warning" {
  switch (status) {
    case "Paid":
      return "success";
    case "Pending":
      return "warning";
    case "Overdue":
      return "default";
  }
}

export default function LandlordBillingPage() {
  const totalThisMonth = "£570";
  const outstanding = "£230";
  const paidThisMonth = "£340";

  return (
    <LandlordLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Billing</h1>
          <p className="text-slate-500 text-sm">
            See what you&apos;ve spent on maintenance and what&apos;s still due.
          </p>
        </div>
        <Button variant="outline" disabled>
          Download statement (coming soon)
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>This month&apos;s spend</CardTitle>
            <CardDescription>All completed invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{totalThisMonth}</p>
            <p className="text-xs text-slate-500 mt-1">
              Across all properties in November.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Outstanding</CardTitle>
            <CardDescription>Pending & overdue</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{outstanding}</p>
            <p className="text-xs text-slate-500 mt-1">
              Includes invoices awaiting payment.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paid this month</CardTitle>
            <CardDescription>Already settled</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{paidThisMonth}</p>
            <p className="text-xs text-slate-500 mt-1">
              Cleared and receipted invoices.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Invoices table */}
      <Card>
        <CardHeader>
          <CardTitle>Maintenance invoices</CardTitle>
          <CardDescription>
            Individual charges linked to specific jobs and properties.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <Thead>
                <Tr>
                  <Th>Invoice</Th>
                  <Th>Property</Th>
                  <Th>Description</Th>
                  <Th>Date</Th>
                  <Th>Amount</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mockInvoices.map((inv) => (
                  <Tr key={inv.id}>
                    <Td>
                      <div className="font-medium">{inv.id}</div>
                    </Td>
                    <Td className="whitespace-nowrap">{inv.property}</Td>
                    <Td>{inv.description}</Td>
                    <Td>{inv.date}</Td>
                    <Td>{inv.amount}</Td>
                    <Td>
                      <Badge variant={statusVariant(inv.status)}>
                        {inv.status}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </LandlordLayout>
  );
}
