import dynamic from "next/dynamic";
import { StackClientApp } from "@stackframe/stack";

const StackHandler = dynamic(
  async () => (await import("@stackframe/stack")).StackHandler,
  { ssr: false }
);

const projectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID;
const publishableKey = process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY;

const stackApp =
  projectId && publishableKey
    ? new StackClientApp({
        projectId,
        publishableClientKey: publishableKey,
        tokenStore: "cookie",
      })
    : null;

export default function StackHandlerPage() {
  if (!stackApp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="max-w-md text-center space-y-2 text-sm text-slate-600">
          <p className="font-semibold text-slate-800">Auth is not configured.</p>
          <p>
            Set NEXT_PUBLIC_STACK_PROJECT_ID and NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY
            to enable Stack Auth locally.
          </p>
        </div>
      </div>
    );
  }

  return <StackHandler app={stackApp} fullPage />;
}
