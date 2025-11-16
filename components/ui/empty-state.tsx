import { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode; // button or link
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "w-full flex flex-col items-center justify-center text-center py-16 text-slate-600",
        className
      )}
    >
      {icon && <div className="mb-4 text-slate-400">{icon}</div>}

      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>

      {description && (
        <p className="text-sm text-slate-500 mt-1 max-w-sm">{description}</p>
      )}

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
