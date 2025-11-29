import { useRouter } from "next/router";
import { useState, useEffect, FormEvent } from "react";
import LandlordLayout from "../../../../layouts/LandlordLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { api } from "../../../../lib/api";

export default function EditPropertyPage() {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState<any>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;
    let cancelled = false;
    api
      .getProperty(id)
      .then((p) => {
        if (cancelled) return;
        setProperty({
          name: p.name || "",
          address: p.address || "",
          postcode: p.postcode || "",
          tenancyId: p.tenancyId,
          tenantStatus: p.tenantStatus,
        });
        if (p.tenancyId && p.tenantStatus === "ACTIVE") {
          setLocked(true);
        }
      })
      .catch((err: any) => {
        if (cancelled) return;
        setError(err.message || "Property not found");
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!id || Array.isArray(id)) return;
    setError(null);
    try {
      await api.updateProperty(id, {
        name: property.name,
        address: property.address,
        postcode: property.postcode,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err: any) {
      setError(err.message || "Failed to update property");
    }
  }

  if (!property && !error) {
    return (
      <LandlordLayout>
        <div className="p-6 text-sm text-slate-500">Loading property...</div>
      </LandlordLayout>
    );
  }

  return (
    <LandlordLayout>
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Edit property</CardTitle>
          <CardDescription>
            Editing property <span className="font-mono">{id}</span>.{" "}
            {locked ? "Tenancy started: details locked." : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {saved && (
            <div className="mb-4 rounded-md bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-800">
              Property updated.
            </div>
          )}
          {error && (
            <div className="mb-4 rounded-md bg-amber-50 border border-amber-200 px-3 py-2 text-sm text-amber-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Property name
              </label>
              <Input
                value={property?.name || ""}
                disabled={locked}
                onChange={(e) => setProperty((s: any) => ({ ...s, name: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Address line
              </label>
              <Input
                value={property?.address || ""}
                disabled={locked}
                onChange={(e) => setProperty((s: any) => ({ ...s, address: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Postcode
              </label>
              <Input
                value={property?.postcode || ""}
                disabled={locked}
                onChange={(e) => setProperty((s: any) => ({ ...s, postcode: e.target.value }))}
              />
            </div>

            <div className="flex flex-wrap justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/landlord/properties")}
              >
                Back
              </Button>
              <Button type="submit" disabled={locked}>
                {locked ? "Locked" : "Save changes"}
              </Button>
              {!locked && (
                <Button
                  type="button"
                  variant="destructive"
                  disabled={deleting}
                  onClick={async () => {
                    if (!id || Array.isArray(id)) return;
                    const confirmDelete = window.confirm("Delete this property? This cannot be undone.");
                    if (!confirmDelete) return;
                    setDeleting(true);
                    setError(null);
                    try {
                      await api.deleteProperty(id);
                      router.push("/landlord/properties");
                    } catch (err: any) {
                      setError(err.message || "Failed to delete property");
                    } finally {
                      setDeleting(false);
                    }
                  }}
                >
                  {deleting ? "Deleting..." : "Delete property"}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </LandlordLayout>
  );
}
