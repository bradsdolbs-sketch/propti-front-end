import LandlordLayout from "../../../layouts/LandlordLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "../../../components/ui/table";
import { useState } from "react";

interface InvoiceRow {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "Paid" | "Pending";
}

const invoices: InvoiceRow[] = [
  {
    id: "INV-1001",
    date: "2025-10-28",
    description: "Boiler repair – 22 Anthony House",
    amount: 140,
    status: "Paid",
  },
  {
    id: "INV-1002",
    date: "2025-11-02",
    description: "Extractor fan – 22 Anthony House",
    amount: 110,
    status: "Paid",
  },
  {
    id: "INV-1003",
    date: "2025-11-10",
    description: "Kitchen leak – Central Gate",
    amount: 120,
    status: "Pending",
  },
];

function formatGBP(value: number) {
  return `£${value.toFixed(0)}`;
}

export default function LandlordBillingPage() {
  const [showMockAction, setShowMockAction] = useState<string | null>(null);

  const totalPending = invoices
    .filter((i) => i.status === "Pending")
    .reduce((acc, i) => acc + i.amount, 0);

  const totalPaid = invoices
    .filter((i) => i.status === "Paid")
    .reduce((acc, i) => acc + i.amount, 0);

  return (
    <LandlordLayout>
      <div className="space-y-6 max-w-5xl">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Billing</h1>
          <p className="text-slate-500 text-sm">
            See how you’re billed for maintenance and view recent invoices.
          </p>
        </div>

        {showMockAction && (
          <div className="rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-800">
            {showMockAction} (demo only). In production this would open a payment
            / billing flow.
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Pending</CardTitle>
              <CardDescription>Awaiting collection</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">
                {formatGBP(totalPending)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Paid this month</CardTitle>
              <CardDescription>Completed invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{formatGBP(totalPaid)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Default payment method</CardTitle>
              <CardDescription>Used for automatic charges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-slate-700">
                Visa •••• 1234 – Central Gate Estates
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setShowMockAction("Manage payment methods clicked")
                }
              >
                Manage payment methods
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent invoices</CardTitle>
            <CardDescription>
              All figures are for demo purposes only.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Invoice</Th>
                    <Th>Date</Th>
                    <Th>Description</Th>
                    <Th>Amount</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {invoices.map((inv) => (
                    <Tr key={inv.id}>
                      <Td className="font-medium">{inv.id}</Td>
                      <Td>
                        {new Date(inv.date).toLocaleDateString("en-GB")}
                      </Td>
                      <Td className="whitespace-nowrap">
                        {inv.description}
                      </Td>
                      <Td>{formatGBP(inv.amount)}</Td>
                      <Td>
                        {inv.status === "Paid" ? (
                          <span className="text-xs rounded-full bg-green-50 px-2 py-1 text-green-700 border border-green-200">
                            Paid
                          </span>
                        ) : (
                          <span className="text-xs rounded-full bg-amber-50 px-2 py-1 text-amber-700 border border-amber-200">
                            Pending
                          </span>
                        )}
                      </Td>
                      <Td>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setShowMockAction(
                              inv.status === "Paid"
                                ? `Download invoice ${inv.id}`
                                : `Pay invoice ${inv.id}`
                            )
                          }
                        >
                          {inv.status === "Paid" ? "Download" : "Pay now"}
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </LandlordLayout>
  );
}
