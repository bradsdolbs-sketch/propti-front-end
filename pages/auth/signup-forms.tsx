"use client";

import dynamic from "next/dynamic";

const StackSignUp = dynamic(
  async () => (await import("@stackframe/stack")).SignUp,
  { ssr: false }
);

const SignupForm = () => {
  return <StackSignUp fullPage={false} automaticRedirect />;
};

export default SignupForm;
