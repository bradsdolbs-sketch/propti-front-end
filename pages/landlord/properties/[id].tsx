import { useRouter } from "next/router";
import LandlordLayout from "../../../layouts/LandlordLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { useEffect, useState } from "react";
import { api } from "../../../lib/api";

export default function ViewPropertyPage() {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;
    let cancelled = false;
    api
      .getProperty(id)
      .then((p) => {
        if (cancelled) return;
        setProperty(p);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <LandlordLayout>
        <div className="p-6 text-sm text-slate-500">Loading property...</div>
      </LandlordLayout>
    );
  }

  if (!property) {
    return (
      <LandlordLayout>
        <div className="p-6 text-sm text-red-600">Property not found.</div>
      </LandlordLayout>
    );
  }

  const tenancyStatus =
    property.tenantStatus === "ACTIVE"
      ? "Tenancy active"
      : property.tenantStatus === "PENDING"
      ? "Tenancy pending"
      : "No tenancy";

  return (
    <LandlordLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-xs text-slate-500 cursor-pointer hover:underline"
              onClick={() => router.push("/landlord/properties")}
            >
              ← Back to properties
            </p>
            <h1 className="text-2xl font-semibold text-slate-900 mt-1">{property.name || "Property"}</h1>
            <p className="text-sm text-slate-500">
              {property.address || "N/A"}, {property.postcode || "N/A"} · {id}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant={property.status === "Occupied" ? "success" : "warning"}>
              {property.status || "N/A"}
            </Badge>
            <Badge variant={property.tenantStatus === "ACTIVE" ? "success" : "warning"}>{tenancyStatus}</Badge>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tenancy overview</CardTitle>
            <CardDescription>Key details for this property and tenancy.</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-xs text-slate-500">Tenant</p>
              <p className="font-medium">{property.tenantName || "N/A"}</p>
              <p className="text-[11px] text-slate-500">{property.tenantEmail || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Rent</p>
              <p className="font-medium">
                {property.rent ? `£${property.rent}/mo` : "Set during tenancy"}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">References</p>
              <Badge variant="warning">
                {property.referenceStatus ? property.referenceStatus : "N/A"}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-slate-500">Agreement</p>
              <Badge variant="default">
                {property.agreementStatus ? property.agreementStatus : "N/A"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/landlord/properties/${id}/edit`)}>
            Edit property
          </Button>
          <Button onClick={() => router.push("/landlord/properties")}>Back</Button>
        </div>
      </div>
    </LandlordLayout>
  );
}
