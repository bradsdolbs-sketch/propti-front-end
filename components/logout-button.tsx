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
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("propti_role");
  }
};

export function LogoutButton({ label = "Logout" }: LogoutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    clearAuth();
    router.push("/handler/sign-out");
    setLoading(false);
  };

  return (
    <Button variant="outline" onClick={handleLogout} disabled={loading}>
      {loading ? "Logging out..." : label}
    </Button>
  );
}
