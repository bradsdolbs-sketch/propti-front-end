"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";

const StackSignUp = dynamic(
  async () => (await import("@stackframe/stack")).SignUp,
  { ssr: false }
);

const SignupForm = () => {
  const router = useRouter();
  const hasStackEnv =
    !!process.env.NEXT_PUBLIC_STACK_PROJECT_ID &&
    !!process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY;
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.cookie.includes("stack-access")) {
      router.replace("/post-auth");
    }
    const cached = window.localStorage.getItem("propti_signup_name");
    if (cached) {
      setFirstName(cached);
    }
  }, [router]);

  if (!hasStackEnv) {
    return (
      <div className="text-sm text-slate-500">
        Sign-up form is disabled because Stack Auth env vars are missing.
        Set NEXT_PUBLIC_STACK_PROJECT_ID and NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY to enable it.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700">
          First name
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => {
            const val = e.target.value;
            setFirstName(val);
            if (typeof window !== "undefined") {
              if (val.trim().length > 0) {
                window.localStorage.setItem("propti_signup_name", val.trim());
              } else {
                window.localStorage.removeItem("propti_signup_name");
              }
            }
          }}
          className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
          placeholder="e.g. Alex"
        />
        <p className="text-xs text-slate-500">
          We’ll use this to greet you inside your portal.
        </p>
      </div>
      <StackSignUp fullPage={false} automaticRedirect={false} />
    </div>
  );
};

export default SignupForm;
