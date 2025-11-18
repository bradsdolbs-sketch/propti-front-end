"use client";
import { useState } from "react";
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

type SignupPayload = {
  fullName: string;
  email: string;
  password: string;
  role: string;
};

const defaultPayload: SignupPayload = {
  fullName: "",
  email: "",
  password: "",
  role: "landlord-plus",
};

const SignupForm = ({ defaultRole = "landlord-plus" }: { defaultRole?: string }) => {
  const [form, setForm] = useState({ ...defaultPayload, role: defaultRole });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const update = (key: keyof SignupPayload) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setFeedback("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.text()) || "Signup failed");
      setStatus("success");
      setFeedback("Account created! Check your email for next steps.");
      setForm({ ...defaultPayload, role: defaultRole });
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="fullName">Full name</Label>
        <Input id="fullName" value={form.fullName} onChange={update("fullName")} required />
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