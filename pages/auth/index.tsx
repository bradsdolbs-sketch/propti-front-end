import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AuthPlaceholderPage() {
  const router = useRouter();

  useEffect(() => {
    const mode = (router.query.mode as string) || "login";
    const destination = mode === "signup" ? "/handler/sign-up" : "/handler/sign-in";
    router.replace(destination);
  }, [router]);

  return null;
}
