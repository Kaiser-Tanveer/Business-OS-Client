import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
}

const Badge = ({
  children,
  variant = "neutral",
}: BadgeProps) => {
  const styles = {
    success:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",

    warning:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",

    danger:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",

    info:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",

    neutral:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-2.5
        py-1
        text-xs
        font-medium
        ${styles[variant]}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;