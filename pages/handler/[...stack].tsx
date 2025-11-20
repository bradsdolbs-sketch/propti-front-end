import dynamic from "next/dynamic";
import { StackClientApp } from "@stackframe/stack";

const StackHandler = dynamic(
  async () => (await import("@stackframe/stack")).StackHandler,
  { ssr: false }
);

const projectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID;
const publishableKey = process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY;

if (!projectId || !publishableKey) {
  throw new Error("Stack Auth env vars are missing (NEXT_PUBLIC_STACK_PROJECT_ID / NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY)");
}

const stackApp = new StackClientApp({
  projectId,
  publishableClientKey: publishableKey,
  tokenStore: "cookie",
});

export default function StackHandlerPage() {
  return <StackHandler app={stackApp} fullPage />;
}
