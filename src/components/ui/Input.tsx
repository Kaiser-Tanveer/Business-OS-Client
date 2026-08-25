import type { InputHTMLAttributes } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({
  label,
  error,
  className = "",
  id,
  ...props
}: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        {...props}
        className={`
          h-10 w-full rounded-lg border
          bg-white px-3 text-sm
          text-slate-900
          outline-none
          transition
          placeholder:text-slate-400

          border-slate-300
          focus:border-indigo-500
          focus:ring-2
          focus:ring-indigo-500/20

          dark:border-slate-700
          dark:bg-slate-900
          dark:text-slate-100
          dark:placeholder:text-slate-500

          ${error ? "border-red-500 focus:border-red-500" : ""}
          ${className}
        `}
      />

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;