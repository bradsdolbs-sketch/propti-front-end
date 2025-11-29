import { useEffect } from "react";
import { useRouter } from "next/router";
import { getStoredRole, roleToPortal, setStoredRole } from "../lib/auth";
import { api } from "../lib/api";

export default function PostAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const me = await api.getCurrentUser();
        if (cancelled) return;
        const storedRole = getStoredRole();
        const perUserRole =
          me?.id && typeof window !== "undefined"
            ? window.localStorage.getItem(`propti_role_${me.id}`)
            : null;
        const role = me?.role || perUserRole || storedRole;

        if (role) {
          setStoredRole(role as any);
          if (me?.id) {
            window.localStorage.setItem(`propti_role_${me.id}`, role as any);
          }
          router.replace(roleToPortal(role as any));
          return;
        }

        // Authenticated but no role: send to role selection page
        router.replace("/role-missing");
      } catch (err) {
        if (cancelled) return;
        const fallbackRole = getStoredRole();
        if (fallbackRole) {
          router.replace(roleToPortal(fallbackRole));
        } else {
          if (typeof document !== "undefined" && document.cookie.includes("stack-access")) {
            router.replace("/login");
          } else {
            router.replace("/login");
          }
        }
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-sm text-slate-600">
      Redirecting...
    </div>
  );
}
