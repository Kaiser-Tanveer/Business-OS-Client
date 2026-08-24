import { Moon, Sun } from "lucide-react";

import { useTheme } from "../../../context/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      title={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className="
        flex h-10 w-10
        items-center justify-center
        rounded-lg
        border
        border-slate-200
        bg-white
        text-slate-600
        transition-all
        duration-200

        hover:bg-slate-100
        hover:text-slate-900

        dark:border-slate-700
        dark:bg-slate-800
        dark:text-slate-300
        dark:hover:bg-slate-700
        dark:hover:text-white
      "
    >
      {isDark ? (
        <Sun size={19} />
      ) : (
        <Moon size={19} />
      )}
    </button>
  );
};

export default ThemeToggle;