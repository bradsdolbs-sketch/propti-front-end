import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const dashboardRoutes: Record<string, string> = {
  "landlord-plus": "/landlord",
  agent: "/agent",
  owner: "/owner",
  tenant: "/tenant",
  contractor: "/contractor",
};
const protectedPaths = Object.values(dashboardRoutes);

const normalizeRoleToPath = (role?: string | null) => {
  if (!role) return "";
  const key = role.toLowerCase();
  if (key.includes("landlord")) return "/landlord";
  return dashboardRoutes[key] || "";
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isProtectedRoute = protectedPaths.some((path) =>
    router.pathname.startsWith(path)
  );
  const [canRender, setCanRender] = useState(!isProtectedRoute);

  useEffect(() => {
    const storedRole =
      sessionStorage.getItem("propti_auth_role") ||
      sessionStorage.getItem("propti_signup_role");
    const storedFlag =
      sessionStorage.getItem("propti_auth_ok") === "true" ||
      sessionStorage.getItem("propti_signup_ok") === "true";
    const hasToken = !!sessionStorage.getItem("propti_auth_token");
    const allowedPath = normalizeRoleToPath(storedRole);
    const matchesRolePath =
      allowedPath && router.pathname.startsWith(allowedPath);
    // const isAllowed =
    //   !isProtectedRoute ||
    //   storedFlag ||
    //   hasToken ||
    //   matchesRolePath;

    // if (!isAllowed) {
    //   router.replace("/signup");
    //   return;
    // }

    setCanRender(true);
  }, [isProtectedRoute, router.pathname]);

  if (!canRender) return null;

  return <Component {...pageProps} />;
}
