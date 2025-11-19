import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import LandlordLayout from "../../../layouts/LandlordLayout";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";

import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "../../../components/ui/table";

import EmptyState from "../../../components/ui/empty-state";
import { AlertTriangle, ClipboardList, RefreshCcw } from "lucide-react";

type RequestStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED" | string;

type MaintenanceRequestDto = {
  id: string;
  title: string;
  description: string;
  status: RequestStatus;
  propertyId: string | null;
  createdAt: string;
  updatedAt: string;
};

function statusVariant(status: RequestStatus): "default" | "warning" | "success" {
  switch (status) {
    case "OPEN":
      return "warning";
    case "IN_PROGRESS":
      return "default";
    case "RESOLVED":
    case "CLOSED":
      return "success";
    default:
      return "default";
  }
}

export default function LandlordRequestsPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<MaintenanceRequestDto[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiBase =
    process.env.NEXT_PUBLIC_API_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");
  const token = useMemo(() => {
    if (typeof window === "undefined") return "";
    return sessionStorage.getItem("propti_auth_token") || "";
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return requests.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        (r.propertyId || "").toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
    );
  }, [requests, search]);

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRequests = async () => {
    if (!apiBase) {
      setError("Missing NEXT_PUBLIC_API_URL; please set it to your backend base URL.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const url = `${apiBase}/api/landlord/requests/open`;
      console.info("Fetching landlord requests from", url);
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      // if (res.status === 401 || res.status === 403) {
      //   setError("Not authorized. Please sign in as a landlord.");
      //   router.replace("/login");
      //   setLoading(false);
      //   return;
      // }
      if (!res.ok) {
        const msg = (await res.text()) || "Failed to load requests";
        throw new Error(msg);
      }
      const data = (await res.json()) as MaintenanceRequestDto[];
      setRequests(data);
    } catch (err) {
      console.error("Failed to load landlord requests", err);
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LandlordLayout>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Tenant requests</h1>
          <p className="text-slate-500 text-sm">
            Live data scoped to your landlord account. Only your open requests are shown.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:max-w-md">
          <Input
            placeholder="Search by title, property, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={fetchRequests}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
            disabled={loading}
          >
            <RefreshCcw size={14} />
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Open requests</CardTitle>
          <CardDescription>
            Pulled from /api/landlord/requests/open using your session/token.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800">
              <AlertTriangle size={16} />
              <span>{error}</span>
            </div>
          )}

          {!loading && filtered.length === 0 ? (
            <EmptyState
              title="No open maintenance requests"
              description="When tenants report issues, your open items will appear here."
              icon={<ClipboardList size={40} />}
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Title</Th>
                    <Th>Status</Th>
                    <Th>Property</Th>
                    <Th>Updated</Th>
                    <Th>Details</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {filtered.map((req) => (
                    <Tr key={req.id}>
                      <Td className="whitespace-nowrap text-xs">{req.id}</Td>
                      <Td className="max-w-[240px]">{req.title}</Td>
                      <Td>
                        <Badge variant={statusVariant(req.status)}>{req.status}</Badge>
                      </Td>
                      <Td className="whitespace-nowrap text-xs">
                        {req.propertyId || "—"}
                      </Td>
                      <Td className="whitespace-nowrap text-xs">
                        {new Date(req.updatedAt).toLocaleString()}
                      </Td>
                      <Td>
                        <Link
                          href={`/landlord/requests/${req.id}`}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          View
                        </Link>
                      </Td>
                    </Tr>
                  ))}
                  {loading && (
                    <Tr>
                      <Td colSpan={6} className="text-center py-4 text-sm text-slate-500">
                        Loading requests...
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </LandlordLayout>
  );
}
