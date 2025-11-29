import AgentLayout from "../../layouts/AgentLayout";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { maintenanceRequests } from "../../lib/mockData";
import { api, AgentStatus } from "../../lib/api";

const ACTIVE_TENANCIES = 18;
const LANDLORDS = 11;
const TENANTS = 36;
const PENDING_REFERENCES = 3;

export default function AgentDashboardPage() {
  const AGENT_ID = "agent-123";
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("PENDING");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [latestTenancy, setLatestTenancy] = useState<string | null>(null);
  const [latestRefStatus, setLatestRefStatus] = useState<string | null>(null);
  const [latestAgreementStatus, setLatestAgreementStatus] = useState<string | null>(null);

  useEffect(() => {
    api
      .getAgentStatus(AGENT_ID)
      .then((res) => setAgentStatus(res.status))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Demo fetch: pull tenant T-1001 tenancy to show statuses
  useEffect(() => {
    api
      .getTenancyForTenant("T-1001")
      .then((t) => {
        setLatestTenancy(t.id);
        setLatestRefStatus(t.referenceStatus ?? null);
        setLatestAgreementStatus(t.agreementStatus ?? null);
      })
      .catch(() => {
        /* ignore for dashboard */
      });
  }, []);

  if (loading) {
    return (
      <AgentLayout>
        <div className="max-w-4xl mx-auto mt-8 text-sm text-slate-600">
          Checking your verification status...
        </div>
      </AgentLayout>
    );
  }

  if (agentStatus === "PENDING") {
    return (
      <AgentLayout>
        <div className="max-w-3xl mx-auto mt-10">
          <Card>
            <CardHeader>
              <CardTitle>Verification pending</CardTitle>
              <CardDescription>
                Complete verification to access the agent dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <p>
                Once you&apos;re verified, you&apos;ll see tenancies, landlords,
                and maintenance in this workspace.
              </p>
              {error && (
                <p className="text-xs text-amber-700">
                  Couldn&apos;t sync status ({error}). You can retry verification below.
                </p>
              )}
              <Button
                onClick={() =>
                  api.verifyAgent(AGENT_ID).then((res) => setAgentStatus(res.status))
                }
              >
                Mark as verified (demo)
              </Button>
            </CardContent>
          </Card>
        </div>
      </AgentLayout>
    );
  }

  const openRequests = maintenanceRequests.filter(
    (r) => r.status !== "Completed"
  ).slice(0, 5);

  return (
    <AgentLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500">
              Quick overview of tenancies, landlords, and live maintenance.
            </p>
          </div>
          <Button size="sm" variant="outline" disabled>
            Add new tenancy (demo only)
          </Button>
        </div>

        {/* Summary cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Active tenancies</CardTitle>
              <CardDescription>Currently managed by your agency</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{ACTIVE_TENANCIES}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Landlords</CardTitle>
              <CardDescription>Linked to Propti</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{LANDLORDS}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tenants</CardTitle>
              <CardDescription>With active logins</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{TENANTS}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>References</CardTitle>
              <CardDescription>Awaiting completion</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">
                {latestRefStatus
                  ? latestRefStatus === "COMPLETED"
                    ? "Completed"
                    : "In progress"
                  : PENDING_REFERENCES}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                {latestRefStatus
                  ? "Live tenancy reference status (demo)."
                  : "Could link directly to your reference provider later."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Open maintenance overview */}
        <Card>
          <CardHeader>
            <CardTitle>Live maintenance requests</CardTitle>
            <CardDescription>
              A few of the most recent open issues across your portfolio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {openRequests.length === 0 ? (
              <p className="text-sm text-slate-500">
                No open requests right now – nice.
              </p>
            ) : (
              <div className="space-y-3 text-sm">
                {openRequests.map((req) => (
                  <div
                    key={req.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between border border-slate-200 rounded-lg px-3 py-2 gap-2"
                  >
                    <div>
                      <p className="font-medium text-slate-900">
                        {req.issueTitle}
                      </p>
                      <p className="text-xs text-slate-500">
                        {req.id} · {req.category} · Priority {req.priority}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="default">{req.status}</Badge>
                      <Button size="sm" variant="outline" disabled>
                        View (demo only)
                      </Button>
                    </div>
                  </div>
                ))}
                <p className="text-[11px] text-slate-400">
                  In the full product, this would click through to the Agent
                  Requests list and into the specific ticket.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AgentLayout>
  );
}
