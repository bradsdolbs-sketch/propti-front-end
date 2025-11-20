"use client";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/router";
<<<<<<< HEAD
import { Button } from "../../components/ui/button";
=======
import { Button } from "../../components/ui/button"
>>>>>>> 010a4d4d37bbeaa9bac74c7e899a053acfd067bb
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

type SignupPayload = {
  fullName: string;
  email: string;
  password: string;
  role: string;
};

type SignupFormState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

const defaultFormState: SignupFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "landlord-plus",
};

const SignupForm = ({ defaultRole = "landlord-plus" }: { defaultRole?: string }) => {
  const router = useRouter();
<<<<<<< HEAD
  const [form, setForm] = useState({ ...defaultFormState, role: defaultRole });
=======
  const [form, setForm] = useState({ ...defaultPayload, role: defaultRole });
>>>>>>> 010a4d4d37bbeaa9bac74c7e899a053acfd067bb
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const dashboardRoutes: Record<string, string> = {
    "landlord-plus": "/landlord",
    agent: "/agent",
    owner: "/owner",
    tenant: "/tenant",
    contractor: "/contractor",
  };

<<<<<<< HEAD
  const update = (key: keyof SignupFormState) => (e: ChangeEvent<HTMLInputElement>) =>
=======
  const update = (key: keyof SignupPayload) => (e: ChangeEvent<HTMLInputElement>) =>
>>>>>>> 010a4d4d37bbeaa9bac74c7e899a053acfd067bb
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setFeedback("");
    const fullName = `${form.firstName} ${form.lastName}`.trim();
    const payload: SignupPayload = {
      fullName,
      email: form.email,
      password: form.password,
      role: form.role,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status !== 201) throw new Error((await res.text()) || "Signup failed");
<<<<<<< HEAD
      const data = await res.json().catch(() => ({}));
      if (data?.token) {
        sessionStorage.setItem("propti_auth_token", data.token as string);
      }
      setStatus("success");
      setFeedback("Account created! Taking you to your workspace...");
      sessionStorage.setItem("propti_auth_ok", "true");
      sessionStorage.setItem("propti_auth_role", data?.role || form.role);
      if (data?.userId) {
        sessionStorage.setItem("propti_auth_user", data.userId as string);
      }
      const destination = dashboardRoutes[form.role] || "/portals";
      setForm({ ...defaultFormState, role: defaultRole });
=======
      setStatus("success");
      setFeedback("Account created! Taking you to your workspace...");
      sessionStorage.setItem("propti_auth_ok", "true");
      sessionStorage.setItem("propti_auth_role", form.role);
      const destination = dashboardRoutes[form.role] || "/portals";
      setForm({ ...defaultPayload, role: defaultRole });
>>>>>>> 010a4d4d37bbeaa9bac74c7e899a053acfd067bb
      router.push(destination);
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            value={form.firstName}
            onChange={update("firstName")}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            value={form.lastName}
            onChange={update("lastName")}
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={form.email} onChange={update("email")} required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={form.password}
          onChange={update("password")}
          minLength={8}
          required
        />
      </div>
      <input type="hidden" value={form.role} />
      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Creating..." : "Create account"}
      </Button>
      {feedback && <p className="text-sm">{feedback}</p>}
    </form>
  );
};

export default SignupForm;
