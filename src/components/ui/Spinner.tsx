interface SpinnerProps {
  size?: "sm" | "md" | "lg";
}

const Spinner = ({ size = "md" }: SpinnerProps) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div
      className={`
        animate-spin
        rounded-full
        border-2
        border-slate-300
        border-t-indigo-600
        dark:border-slate-700
        dark:border-t-indigo-400
        ${sizes[size]}
      `}
    />
  );
};

export default Spinner;