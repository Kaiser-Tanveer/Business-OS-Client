import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import SideMenu from "./SideMenu";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-dvh w-full bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
          className="
            fixed inset-0 z-40
            bg-black/50
            lg:hidden
          "
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-72 shrink-0
          transform
          transition-transform duration-300

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

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col">

        <Header
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main
          className="
            min-h-[calc(100dvh-4rem)]
            flex-1
            bg-slate-50
            p-4
            transition-colors duration-300
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