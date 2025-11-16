import { useRouter } from "next/router";
import { useState, FormEvent } from "react";
import LandlordLayout from "../../../layouts/LandlordLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

export default function EditPropertyPage() {
  const router = useRouter();
  const { id } = router.query;
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaved(true);
  }

  return (
    <LandlordLayout>
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Edit property</CardTitle>
          <CardDescription>
            Editing property <span className="font-mono">{id}</span>. This is a
            demo-only form and won&apos;t persist changes yet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {saved && (
            <div className="mb-4 rounded-md bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-800">
              Mock update successful. In the real app, this would update the
              property details.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Property name
              </label>
              <Input defaultValue="22 Anthony House" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Address line
              </label>
              <Input defaultValue="Pembury Place" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Postcode
              </label>
              <Input defaultValue="E5 8GZ" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Monthly rent (£)
              </label>
              <Input type="number" defaultValue={2000} />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/landlord/properties")}
              >
                Back
              </Button>
              <Button type="submit">Save changes (demo)</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </LandlordLayout>
  );
}
