import OwnerLayout from "../../layouts/OwnerLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  maintenanceRequests,
  properties,
} from "../../lib/mockData";

const CURRENT_OWNER_ID = "LL-1001"; // reuse your existing landlord in mockData

export default function OwnerDashboardPage() {
  const ownerProperties = properties.filter(
    (p) => p.landlordId === CURRENT_OWNER_ID
  );

  const ownerRequests = maintenanceRequests.filter(
    (r) => r.landlordId === CURRENT_OWNER_ID
  );

  const openRequests = ownerRequests.filter(
    (r) => r.status !== "Completed"
  );

  const completedRequests = ownerRequests.filter(
    (r) => r.status === "Completed"
  );

  return (
    <OwnerLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Dashboard
          </h1>
          <p className="text-slate-500 text-sm">
            High-level overview of your property and maintenance activity.
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Open requests</CardTitle>
            <CardDescription>Issues currently in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              {openRequests.length}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Includes new, awaiting approval, and booked jobs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your properties</CardTitle>
            <CardDescription>Linked to this account</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              {ownerProperties.length}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Each property has its own requests and documents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resolved issues</CardTitle>
            <CardDescription>Completed via Propti</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              {completedRequests.length}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Historical jobs you can review later
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Property list */}
      <Card>
        <CardHeader>
          <CardTitle>Your properties</CardTitle>
          <CardDescription>
            Quick view of each unit and its current status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {ownerProperties.length === 0 ? (
            <p className="text-sm text-slate-500">
              No properties linked to this landlord yet. These are usually
              added by your agent.
            </p>
          ) : (
            <div className="space-y-4">
              {ownerProperties.map((p) => {
                const propRequests = ownerRequests.filter(
                  (r) => r.propertyId === p.id
                );
                const openForProperty = propRequests.filter(
                  (r) => r.status !== "Completed"
                );

                return (
                  <div
                    key={p.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between border border-slate-200 p-4 rounded-lg"
                  >
                    <div>
                      <h3 className="text-lg font-semibold">
                        {p.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {p.postcode}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {propRequests.length} total requests ·{" "}
                        {openForProperty.length} open
                      </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-2 mt-4 md:mt-0">
                      <Badge variant={openForProperty.length ? "warning" : "success"}>
                        {openForProperty.length
                          ? `${openForProperty.length} open`
                          : "All clear"}
                      </Badge>
                      <p className="text-xs text-slate-400">
                        Detailed views (requests & documents) coming next
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </OwnerLayout>
  );
}
