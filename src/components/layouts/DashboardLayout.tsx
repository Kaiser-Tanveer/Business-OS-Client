import { Menu } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import LanguageSwitcher from "../common/LanguageSwitcher";
import SideMenu from "./SideMenu";
import ThemeToggler from "../common/ThemeToggler";
import { useTranslation } from "react-i18next";

const DashboardLayout = () => {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-dvh w-full bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-72
          shrink-0
          transform
          transition-transform
          duration-300

          lg:static
          lg:translate-x-0

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <SideMenu
          onClose={() => setSidebarOpen(false)}
        />
      </aside>

      {/* RIGHT SIDE */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* HEADER */}
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

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
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

          {/* Header title */}
          <div>
            <h1 className="text-sm font-semibold text-slate-900 dark:text-white">
              {t("app.name")}
            </h1>

            <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
              {t("header.businessManagement")}
            </p>
          </div>

          {/* Header controls */}
          <div className="ml-auto flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggler />
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main
          className="
            min-h-[calc(100dvh-4rem)]
            flex-1
            bg-slate-50
            p-4
            transition-colors
            duration-300

            dark:bg-slate-950

            sm:p-6
            lg:p-8
          "
        >
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;