import { cn } from "@/lib/utils";

type EmailStatusBadgeProps = {
  status: "sent" | "pending" | "failed";
  className?: string;
};

export function EmailStatusBadge({ status, className }: EmailStatusBadgeProps) {
  const config = {
    sent: {
      label: "Sent",
      className: "bg-status-success-bg text-status-success",
      dot: "bg-status-success",
    },
    pending: {
      label: "Pending",
      className: "bg-status-warning-bg text-status-warning",
      dot: "bg-status-warning",
    },
    failed: {
      label: "Failed",
      className: "bg-status-danger-bg text-status-danger",
      dot: "bg-status-danger",
    },
  };

  const cfg = config[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        cfg.className,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
      {cfg.label}
    </span>
  );
}

type RunStatusBadgeProps = {
  status: "completed" | "running" | "failed" | "pending";
  className?: string;
};

export function RunStatusBadge({ status, className }: RunStatusBadgeProps) {
  const config = {
    completed: {
      label: "Completed",
      className: "bg-status-success-bg text-status-success",
      dot: "bg-status-success",
    },
    running: {
      label: "Running",
      className: "bg-status-info-bg text-status-info",
      dot: "bg-status-info animate-pulse",
    },
    failed: {
      label: "Failed",
      className: "bg-status-danger-bg text-status-danger",
      dot: "bg-status-danger",
    },
    pending: {
      label: "Pending",
      className: "bg-status-neutral-bg text-status-neutral",
      dot: "bg-status-neutral",
    },
  };

  const cfg = config[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        cfg.className,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
      {cfg.label}
    </span>
  );
}
