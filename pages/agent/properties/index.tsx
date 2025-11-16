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

import { maintenanceRequests, properties } from "../../../lib/mockData";

export default function AgentPropertiesPage() {
  // For now, show all properties from mockData.
  // Later, we can filter by managingAgentId when we add that field.
  const propertyCards = properties.map((p) => {
    const allRequestsForProperty = maintenanceRequests.filter(
      (r) => r.propertyId === p.id
    );
    const openRequests = allRequestsForProperty.filter(
      (r) => r.status !== "Completed"
    );

    return {
      id: p.id,
      name: p.name,
      postcode: p.postcode,
      openCount: openRequests.length,
      totalCount: allRequestsForProperty.length,
    };
  });

  const totalOpen = propertyCards.reduce(
    (acc, p) => acc + p.openCount,
    0
  );

  return (
    <AgentLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Managed properties
          </h1>
          <p className="text-slate-500 text-sm">
            All properties your agency manages in Propti, with open request counts.
          </p>
        </div>

        <div className="w-full md:max-w-xs">
          <Input placeholder="Search by name or postcode..." />
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total properties</CardTitle>
            <CardDescription>In this workspace</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              {propertyCards.length}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Each property can have multiple active tenancies over time.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Open requests</CardTitle>
            <CardDescription>Across all properties</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{totalOpen}</p>
            <p className="text-xs text-slate-500 mt-1">
              Includes anything not yet marked as completed.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Action</CardTitle>
            <CardDescription>
              Quick path into triage if things are busy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              size="sm"
              onClick={() => {
                // simple client-side nav using location for now
                window.location.href = "/agent/requests";
              }}
            >
              Go to requests triage
            </Button>
            <p className="text-[11px] text-slate-400 mt-1">
              In a full build this might be a filtered view or saved search.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Property list */}
      <Card>
        <CardHeader>
          <CardTitle>Property list</CardTitle>
          <CardDescription>
            Overview of each managed unit and its current maintenance load.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {propertyCards.length === 0 ? (
            <p className="text-sm text-slate-500">
              No properties yet. When your team onboards landlords and adds
              units, they&apos;ll appear here.
            </p>
          ) : (
            <div className="space-y-4">
              {propertyCards.map((prop) => (
                <div
                  key={prop.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between border border-slate-200 rounded-lg p-4"
                >
                  <div>
                    <p className="text-xs text-slate-400">{prop.id}</p>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {prop.name}
                    </h2>
                    <p className="text-sm text-slate-600">{prop.postcode}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {prop.totalCount} total requests ·{" "}
                      {prop.openCount} open
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-2 mt-4 md:mt-0">
                    <Badge variant={prop.openCount ? "warning" : "success"}>
                      {prop.openCount
                        ? `${prop.openCount} open`
                        : "All clear"}
                    </Badge>
                    <Button size="sm" variant="outline" disabled>
                      View property (demo only)
                    </Button>
                    <p className="text-[11px] text-slate-400">
                      Later this would link to a full property detail page
                      with tenancies, documents and job history.
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
