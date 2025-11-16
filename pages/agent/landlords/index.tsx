import AgentLayout from "../../../layouts/AgentLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

type LandlordType = "Individual" | "Company";

interface AgentLandlordRow {
  id: string;
  name: string;
  type: LandlordType;
  email: string;
  phone?: string;
  propertiesManaged: number;
  openRequests: number;
  autoApprovalLimit: number; // GBP
}

const mockLandlords: AgentLandlordRow[] = [
  {
    id: "LL-1001",
    name: "Bipin Uka",
    type: "Individual",
    email: "bipin.uka@example.com",
    phone: "+44 7xxx xxx xxx",
    propertiesManaged: 1,
    openRequests: 1,
    autoApprovalLimit: 250,
  },
  {
    id: "LL-1002",
    name: "Central Gate Holdings Ltd",
    type: "Company",
    email: "portfolio@cgholdings.co.uk",
    phone: "+44 20 xxxx xxxx",
    propertiesManaged: 3,
    openRequests: 0,
    autoApprovalLimit: 500,
  },
];

function typeBadgeVariant(type: LandlordType): "outline" | "default" {
  return type === "Company" ? "default" : "outline";
}

export default function AgentLandlordsPage() {
  const totalLandlords = mockLandlords.length;
  const totalManaged = mockLandlords.reduce(
    (acc, l) => acc + l.propertiesManaged,
    0
  );
  const totalOpen = mockLandlords.reduce(
    (acc, l) => acc + l.openRequests,
    0
  );

  return (
    <AgentLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Landlords
          </h1>
          <p className="text-slate-500 text-sm">
            Your client landlords and key info for managing maintenance and approvals.
          </p>
        </div>

        <div className="w-full md:max-w-xs">
          <Input placeholder="Search by name, email, or ID..." />
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total landlords</CardTitle>
            <CardDescription>Using this workspace</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{totalLandlords}</p>
            <p className="text-xs text-slate-500 mt-1">
              Mix of individual owners and company landlords.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Managed properties</CardTitle>
            <CardDescription>Across all landlords</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{totalManaged}</p>
            <p className="text-xs text-slate-500 mt-1">
              Each property can have its own approval rules and contacts.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Open requests</CardTitle>
            <CardDescription>Needing visibility or approval</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{totalOpen}</p>
            <p className="text-xs text-slate-500 mt-1">
              Includes anything not yet marked as completed.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Landlords list */}
      <Card>
        <CardHeader>
          <CardTitle>Landlord directory</CardTitle>
          <CardDescription>
            Quick overview of who owns what and how hands-on they are.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockLandlords.length === 0 ? (
            <p className="text-sm text-slate-500">
              No landlords added yet. As you onboard owners into Propti,
              they&apos;ll appear here.
            </p>
          ) : (
            <div className="space-y-4">
              {mockLandlords.map((ll) => (
                <div
                  key={ll.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between border border-slate-200 rounded-lg p-4"
                >
                  <div className="space-y-1">
                    <p className="text-[11px] text-slate-400">{ll.id}</p>
                    <p className="text-base font-semibold text-slate-900">
                      {ll.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                      <span>{ll.email}</span>
                      {ll.phone && (
                        <>
                          <span className="text-slate-300">•</span>
                          <span>{ll.phone}</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {ll.propertiesManaged} properties · {ll.openRequests} open
                      requests
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-2 mt-4 md:mt-0">
                    <div className="flex items-center gap-2">
                      <Badge variant={typeBadgeVariant(ll.type)}>
                        {ll.type}
                      </Badge>
                      <Badge variant="outline">
                        Auto-approve up to £{ll.autoApprovalLimit}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline" disabled>
                      View landlord (demo only)
                    </Button>
                    <p className="text-[11px] text-slate-400">
                      Later this would link into an owner view with documents,
                      statements and settings.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </AgentLayout>
  );
}
