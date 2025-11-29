import { api } from "./api";

export type PortalRole =
  | "landlord"
  | "tenant"
  | "agent"
  | "contractor"
  | "owner"
  | "admin";

const ROLE_KEY = "propti_role";

export function getStoredRole(): PortalRole | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(ROLE_KEY);
  return value as PortalRole | null;
}

export function setStoredRole(role: PortalRole) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ROLE_KEY, role);
}

export function clearStoredRole() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ROLE_KEY);
}

export function roleToPortal(role: PortalRole): string {
  switch (role) {
    case "landlord":
      return "/landlord";
    case "tenant":
      return "/tenant";
    case "agent":
      return "/agent";
    case "contractor":
      return "/contractor";
    case "owner":
      return "/owner";
    case "admin":
      return "/admin";
    default:
      return "/portals";
  }
}

// Simple client-side guard. In a real build, replace with server/session check.
export function useRequireRole(expected: PortalRole) {
  // dynamic import to avoid hard dep on next/router in SSR for layouts
  if (typeof window === "undefined") {
    return;
  }
  // we intentionally require caller to call this inside a React component's body.
  const { useEffect } = require("react");
  const { useRouter } = require("next/router");
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const user = await api.getCurrentUser();
        if (cancelled) return;
        const storedRole = getStoredRole();
        const perUserRole =
          user?.id && typeof window !== "undefined"
            ? window.localStorage.getItem(`propti_role_${user.id}`)
            : null;
        const role = (user?.role as PortalRole | undefined) || (perUserRole as PortalRole | null) || storedRole;

        if (!role) {
          router.replace("/role-missing");
          return;
        }

        setStoredRole(role);
        if (user?.id) {
          window.localStorage.setItem(`propti_role_${user.id}`, role);
        }
        if (role !== expected) {
          router.replace(roleToPortal(role));
        }
      } catch (err) {
        if (cancelled) return;
        if (document.cookie.includes("stack-access")) {
          router.replace("/login");
        } else {
          router.replace("/login");
        }
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [expected, router]);
}
