import AgentLayout from "../../../layouts/AgentLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { properties } from "../../../lib/mockData";

type DocStatus = "Up to date" | "Missing" | "Expiring soon";

interface ComplianceDoc {
  id: string;
  name: string;
  status: DocStatus;
}

interface AgentComplianceRow {
  propertyId: string;
  propertyLabel: string;
  landlordName: string;
  docs: ComplianceDoc[];
}

// For now this mirrors the landlord view but from the agent’s angle.
const rawCompliance: AgentComplianceRow[] = [
  {
    propertyId: "PROP-2001",
    propertyLabel: "22 Anthony House, E5 8GZ",
    landlordName: "Bipin Uka",
    docs: [
      { id: "AST-22-AH", name: "AST", status: "Up to date" },
      { id: "GAS-22-AH", name: "Gas safety", status: "Up to date" },
      { id: "EICR-22-AH", name: "EICR", status: "Up to date" },
      { id: "EPC-22-AH", name: "EPC", status: "Up to date" },
    ],
  },
  {
    propertyId: "PROP-2002",
    propertyLabel: "Central Gate, E1 1LN",
    landlordName: "Central Gate Holdings Ltd",
    docs: [
      { id: "AST-CG", name: "AST", status: "Missing" },
      { id: "GAS-CG", name: "Gas safety", status: "Expiring soon" },
      { id: "EICR-CG", name: "EICR", status: "Up to date" },
      { id: "EPC-CG", name: "EPC", status: "Up to date" },
    ],
  },
];

function statusVariant(status: DocStatus): "success" | "warning" | "default" {
  switch (status) {
    case "Up to date":
      return "success";
    case "Expiring soon":
      return "warning";
    case "Missing":
      return "default";
  }
}

export default function AgentDocumentsPage() {
  // Align labels with mockData properties where possible
  const propertyLookup = Object.fromEntries(
    properties.map((p) => [p.id, `${p.name}, ${p.postcode}`])
  );

  const rows = rawCompliance.map((row) => ({
    ...row,
    propertyLabel: propertyLookup[row.propertyId] ?? row.propertyLabel,
  }));

  const totalProperties = rows.length;
  const totalMissing = rows.reduce(
    (acc, row) =>
      acc + row.docs.filter((d) => d.status === "Missing").length,
    0
  );
  const totalExpiring = rows.reduce(
    (acc, row) =>
      acc + row.docs.filter((d) => d.status === "Expiring soon").length,
    0
  );

  return (
    <AgentLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Documents & compliance
            </h1>
            <p className="text-sm text-slate-500">
              Portfolio-level view of ASTs, gas, electrical and energy
              documents across all managed properties.
            </p>
          </div>
          <div className="w-full md:max-w-xs">
            <Input placeholder="Search by property or landlord..." />
          </div>
        </div>

        {/* Summary strip */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Managed properties</CardTitle>
              <CardDescription>With compliance data</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{totalProperties}</p>
              <p className="text-xs text-slate-500 mt-1">
                Each property should have AST, gas, EICR and EPC as a minimum.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Missing documents</CardTitle>
              <CardDescription>Across all properties</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{totalMissing}</p>
              <p className="text-xs text-slate-500 mt-1">
                Good candidates for an internal compliance task list.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expiring soon</CardTitle>
              <CardDescription>
                Gas / EICR / other certificates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{totalExpiring}</p>
              <p className="text-xs text-slate-500 mt-1">
                In a full build, Propti could notify you ahead of these dates.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Property list */}
        {rows.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <p className="text-sm text-slate-500">
                No properties with compliance data in this demo. Once your
                landlords and units are onboarded, you&apos;ll see their
                documents here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {rows.map((row) => {
              const missingCount = row.docs.filter(
                (d) => d.status === "Missing"
              ).length;
              const expiringCount = row.docs.filter(
                (d) => d.status === "Expiring soon"
              ).length;

              return (
                <Card key={row.propertyId}>
                  <CardHeader>
                    <CardTitle>{row.propertyLabel}</CardTitle>
                    <CardDescription>
                      Landlord: {row.landlordName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <Badge variant={missingCount ? "default" : "success"}>
                        {missingCount
                          ? `${missingCount} missing`
                          : "No missing docs"}
                      </Badge>
                      <Badge
                        variant={expiringCount ? "warning" : "default"}
                      >
                        {expiringCount
                          ? `${expiringCount} expiring soon`
                          : "No upcoming expiries"}
                      </Badge>
                    </div>

                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      {row.docs.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between border border-slate-200 rounded-lg px-3 py-2"
                        >
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {doc.name}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              Ref: {doc.id}
                            </p>
                          </div>
                          <Badge variant={statusVariant(doc.status)}>
                            {doc.status}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <p className="text-[11px] text-slate-400">
                        In a full system, you could jump from here into the
                        landlord or property view to upload or chase documents.
                      </p>
                      <Button size="sm" variant="outline" disabled>
                        Export report (demo only)
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AgentLayout>
  );
}
