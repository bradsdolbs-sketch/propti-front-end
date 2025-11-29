import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "../components/ui/button";
import { api } from "../lib/api";
import { setStoredRole, type PortalRole, roleToPortal } from "../lib/auth";

const roles: PortalRole[] = ["tenant", "landlord", "agent", "owner", "contractor"];

export default function RoleMissingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Capture current user id for per-user caching
  useState(() => {
    api
      .getCurrentUser()
      .then((me) => {
        if (me?.id) {
          setUserId(me.id);
        }
      })
      .catch(() => {});
  });

  const chooseRole = async (role: PortalRole) => {
    setLoading(true);
    setError(null);
    try {
      await api.updateMyRole(role);
      setStoredRole(role);
      if (userId) {
        window.localStorage.setItem(`propti_role_${userId}`, role);
      }
      router.replace(roleToPortal(role));
    } catch (err: any) {
      setError(err?.message || "Could not set your role. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4 text-center">
        <h1 className="text-xl font-semibold text-slate-900">Choose your portal</h1>
        <p className="text-sm text-slate-600">
          We couldn’t detect your role yet. Select the portal that matches your account to continue.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {roles.map((r) => (
            <Button
              key={r}
              variant="outline"
              disabled={loading}
              onClick={() => chooseRole(r)}
              className="capitalize"
            >
              {r}
            </Button>
          ))}
        </div>
        {error && <p className="text-xs text-amber-700">{error}</p>}
        <p className="text-[11px] text-slate-400">
          This sets your portal role on your account.
        </p>
      </div>
    </div>
  );
}
