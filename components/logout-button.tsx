import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "./ui/button";

type LogoutButtonProps = {
  label?: string;
};

const clearAuth = () => {
  sessionStorage.removeItem("propti_auth_ok");
  sessionStorage.removeItem("propti_auth_role");
  sessionStorage.removeItem("propti_signup_ok");
  sessionStorage.removeItem("propti_signup_role");
  sessionStorage.removeItem("propti_auth_token");
  sessionStorage.removeItem("propti_auth_user");
};

export function LogoutButton({ label = "Logout" }: LogoutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      // Best-effort logout: even if the network call fails, clear client state.
    } finally {
      clearAuth();
      router.push("/login");
      setLoading(false);
    }
  };

  return (
    <Button variant="outline" onClick={handleLogout} disabled={loading}>
      {loading ? "Logging out..." : label}
    </Button>
  );
}
