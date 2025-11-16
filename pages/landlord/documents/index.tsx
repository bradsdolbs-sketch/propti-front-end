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
import { properties } from "../../../lib/mockData";

type DocStatus = "Up to date" | "Missing" | "Expiring soon";

interface ComplianceDoc {
  id: string;
  name: string;
  status: DocStatus;
  lastIssued?: string;
  notes?: string;
}

interface PropertyComplianceRow {
  propertyId: string;
  propertyLabel: string;
  docs: ComplianceDoc[];
}

// For now we hard-code compliance per property.
// Later you could store these in the DB with real renewal dates.
const complianceByProperty: PropertyComplianceRow[] = [
  {
    propertyId: "PROP-2001",
    propertyLabel: "22 Anthony House, E5 8GZ",
    docs: [
      {
        id: "AST-22-AH",
        name: "Assured Shorthold Tenancy (AST)",
        status: "Up to date",
        lastIssued: "2025-06-12",
      },
      {
        id: "GAS-22-AH",
        name: "Gas safety certificate",
        status: "Up to date",
        lastIssued: "2025-05-20",
      },
      {
        id: "EICR-22-AH",
        name: "Electrical installation condition report (EICR)",
        status: "Up to date",
        lastIssued: "2024-07-01",
      },
      {
        id: "EPC-22-AH",
        name: "Energy Performance Certificate (EPC)",
        status: "Up to date",
        lastIssued: "2023-03-15",
      },
    ],
  },
  {
    propertyId: "PROP-2002",
    propertyLabel: "Central Gate, E1 1LN",
    docs: [
      {
        id: "AST-CG",
        name: "Assured Shorthold Tenancy (AST)",
        status: "Missing",
        notes: "No active tenancy attached in this demo.",
      },
      {
        id: "GAS-CG",
        name: "Gas safety certificate",
        status: "Expiring soon",
        lastIssued: "2024-12-01",
        notes: "Renewal due within 2 months.",
      },
      {
        id: "EICR-CG",
        name: "Electrical installation condition report (EICR)",
        status: "Up to date",
        lastIssued: "2024-01-10",
      },
      {
        id: "EPC-CG",
        name: "Energy Performance Certificate (EPC)",
        status: "Up to date",
        lastIssued: "2022-09-30",
      },
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

export default function LandlordDocumentsPage() {
  // Optionally line this up with properties from mockData
  const propertyLookup = Object.fromEntries(
    properties.map((p) => [p.id, `${p.name}, ${p.postcode}`])
  );

  const rows = complianceByProperty.map((row) => ({
    ...row,
    propertyLabel: propertyLookup[row.propertyId] ?? row.propertyLabel,
  }));

  return (
    <LandlordLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Documents & compliance
          </h1>
          <p className="text-sm text-slate-500">
            See key tenancy and safety documents across your portfolio in one place.
          </p>
        </div>

        {rows.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <p className="text-sm text-slate-500">
                No properties found for this landlord in the demo data. Once
                properties are linked to your account, you&apos;ll see their
                compliance status here.
              </p>
            </CardContent>
          </Card>
        ) : (
          rows.map((row) => (
            <Card key={row.propertyId}>
              <CardHeader>
                <CardTitle>{row.propertyLabel}</CardTitle>
                <CardDescription>
                  AST, gas, electrical and energy documents for this property.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {row.docs.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between border border-slate-200 rounded-lg p-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {doc.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        Ref: {doc.id}
                        {doc.lastIssued && (
                          <>
                            {" · "}Last issued{" "}
                            {new Date(doc.lastIssued).toLocaleDateString(
                              "en-GB"
                            )}
                          </>
                        )}
                      </p>
                      {doc.notes && (
                        <p className="text-[11px] text-slate-400 mt-1">
                          {doc.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-2 mt-3 md:mt-0">
                      <Badge variant={statusVariant(doc.status)}>
                        {doc.status}
                      </Badge>
                      <Button size="sm" variant="outline" disabled>
                        View / upload (demo only)
                      </Button>
                    </div>
                  </div>
                ))}

                <p className="text-[11px] text-slate-400 mt-2">
                  In the full version, you&apos;d be able to upload and replace
                  documents here, and Propti could remind you ahead of expiry
                  dates for gas, EICR and other safety certificates.
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </LandlordLayout>
  );
}
