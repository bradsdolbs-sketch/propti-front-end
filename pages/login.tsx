import Link from "next/link";
import { useRouter } from "next/router";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
<<<<<<< HEAD
import { ArrowLeft } from "lucide-react";
=======
>>>>>>> 010a4d4d37bbeaa9bac74c7e899a053acfd067bb
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";

const dashboardRoutes: Record<string, string> = {
  "landlord-plus": "/landlord",
  agent: "/agent",
  owner: "/owner",
  tenant: "/tenant",
  contractor: "/contractor",
};

export default function LoginPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [feedback, setFeedback] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  const update = (key: "email" | "password") => (e: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setFeedback("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status !== 200) {
        const message = data?.message || "Login failed";
<<<<<<< HEAD
        const friendly =
          res.status === 401
            ? "We couldn't sign you in. Check your email and password."
            : message;
        throw new Error(friendly);
      }
      const role = data?.role || "landlord-plus";
      if (data?.token) {
        sessionStorage.setItem("propti_auth_token", data.token);
      }
      sessionStorage.setItem("propti_auth_ok", "true");
      sessionStorage.setItem("propti_auth_role", role);
      if (data?.userId) {
        sessionStorage.setItem("propti_auth_user", data.userId);
      }
=======
        throw new Error(message);
      }
      const role = data?.role || "landlord-plus";
      sessionStorage.setItem("propti_auth_ok", "true");
      sessionStorage.setItem("propti_auth_role", role);
>>>>>>> 010a4d4d37bbeaa9bac74c7e899a053acfd067bb
      setStatus("success");
      setFeedback("Welcome back! Redirecting to your workspace...");
      const destination = dashboardRoutes[role] || "/portals";
      router.push(destination);
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl space-y-8">
        <header>
<<<<<<< HEAD
          <div className="flex items-center justify-between">
            <p className="text-xs tracking-[0.25em] text-slate-400 mb-2">PROPTI</p>
            <Link
              href="/"
              className="text-sm text-slate-600 hover:text-slate-900 inline-flex items-center gap-2"
            >
              <ArrowLeft size={14} />
              Home
            </Link>
          </div>
=======
          <p className="text-xs tracking-[0.25em] text-slate-400 mb-2">PROPTI</p>
>>>>>>> 010a4d4d37bbeaa9bac74c7e899a053acfd067bb
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl">
            Sign in with your email and password to jump into your workspace.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr,0.9fr] items-start">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">What to expect</CardTitle>
              <CardDescription className="text-sm text-slate-500">
                We&apos;ll verify your details and take you straight to your portal.
                If you don&apos;t have an account yet, start with signup instead.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <ul className="space-y-1 list-disc list-inside">
                <li>Sign in to pick up where you left off.</li>
                <li>Your access and permissions load automatically.</li>
                <li>Need an account? Head to signup to get started.</li>
              </ul>
              <Link href="/signup" className="inline-flex">
                <Button variant="outline" size="sm">
                  Go to signup
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">Sign in</CardTitle>
              <CardDescription className="text-sm text-slate-500">
                Use the email and password you registered with.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={update("password")}
                    required
                  />
                </div>
                <Button className="w-full" type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "Signing in..." : "Sign in"}
                </Button>
                {feedback && (
                  <p
                    className={`text-sm ${
                      status === "error" ? "text-red-600" : "text-slate-600"
                    }`}
                  >
                    {feedback}
<<<<<<< HEAD
                    {status === "error" && (
                      <span className="block text-xs text-slate-500 mt-1">
                        If you don&apos;t have an account yet, you can create one on the signup page.
                      </span>
                    )}
=======
>>>>>>> 010a4d4d37bbeaa9bac74c7e899a053acfd067bb
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
