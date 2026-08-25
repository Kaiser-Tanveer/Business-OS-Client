import { Menu } from "lucide-react";

import LanguageSwitcher from "../common/LanguageSwitcher";
import ThemeToggler from "../common/ThemeToggler";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header
      className="
        sticky top-0 z-30
        flex h-16 shrink-0 items-center
        border-b
        border-slate-200
        bg-white/95
        px-4
        backdrop-blur
        transition-colors
        duration-300

        dark:border-slate-800
        dark:bg-slate-950/95

        sm:px-6
      "
    >
      {/* Mobile menu */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
        className="
          mr-3
          rounded-lg
          p-2
          text-slate-600
          transition

          hover:bg-slate-100
          hover:text-slate-900

          dark:text-slate-400
          dark:hover:bg-slate-800
          dark:hover:text-white

          lg:hidden
        "
      >
        <Menu size={22} />
      </button>

      {/* Application title */}
      <div>
        <h1 className="text-sm font-semibold text-slate-900 dark:text-white">
          Business OS
        </h1>

        <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
          Business Management System
        </p>
      </div>

      {/* Controls */}
      <div className="ml-auto flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggler />
      </div>
    </header>
  );
};

export default Header;