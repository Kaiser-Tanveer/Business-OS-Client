import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({
  children,
  className = "",
}: CardProps) => {
  return (
    <div
      className={`
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-colors

        dark:border-slate-800
        dark:bg-slate-900

        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;