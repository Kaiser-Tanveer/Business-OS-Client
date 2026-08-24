import { Menu } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import LanguageSwitcher from "../common/LanguageSwitcher";
import ThemeToggle from "../common/ThemeToggler";
import SideMenu from "./SideMenu";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <div
      className="
        flex min-h-dvh w-full
        bg-slate-50
        text-slate-900
        transition-colors duration-300
        dark:bg-slate-950
        dark:text-slate-100
      "
    >
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <button
          type="button"
          aria-label={t("common.close")}
          onClick={() => setIsSidebarOpen(false)}
          className="
            fixed inset-0 z-40
            bg-slate-900/30
            backdrop-blur-sm
            dark:bg-black/60
            lg:hidden
          "
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-72
          transform
          transition-transform duration-300

          lg:static
          lg:translate-x-0

          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <SideMenu
          onClose={() => setIsSidebarOpen(false)}
        />
      </aside>

      {/* Application */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Header */}
        <header
          className="
            sticky top-0 z-30
            flex h-16 shrink-0
            items-center
            border-b
            border-slate-200
            bg-white/95
            px-4
            backdrop-blur-md
            transition-colors duration-300

            dark:border-slate-800
            dark:bg-slate-950/95

            sm:px-6
          "
        >
          {/* Mobile menu */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="
              mr-3
              rounded-lg
              p-2
              text-slate-500
              transition-colors

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

          {/* Page title */}
          <div>
            <h1
              className="
                text-sm
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              {t("dashboard.title")}
            </h1>

            <p
              className="
                hidden
                text-xs
                text-slate-500
                dark:text-slate-400
                sm:block
              "
            >
              {t("header.businessManagement")}
            </p>
          </div>

          {/* Controls */}
          <div className="ml-auto flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </header>

        {/* Main interface */}
        <main
          className="
            flex-1
            bg-slate-50
            transition-colors duration-300
            dark:bg-slate-950
          "
        >
          <div className="p-4 sm:p-6 lg:p-8">

            <div className="mx-auto max-w-7xl">

              {/* Welcome */}
              <div className="mb-8">
                <h2
                  className="
                    text-2xl
                    font-bold
                    tracking-tight
                    text-slate-900
                    dark:text-white
                    sm:text-3xl
                  "
                >
                  {t("dashboard.welcome")}
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                    sm:text-base
                  "
                >
                  {t("dashboard.description")}
                </p>
              </div>

              {/* Statistics */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <DashboardCard
                  title={t("dashboard.todaySales")}
                  value="৳ 25,400"
                />

                <DashboardCard
                  title={t("dashboard.todayProfit")}
                  value="৳ 8,250"
                />

                <DashboardCard
                  title={t("dashboard.customerDue")}
                  value="৳ 12,500"
                />

                <DashboardCard
                  title={t("dashboard.expenses")}
                  value="৳ 4,850"
                />

              </div>

              {/* Main dashboard area */}
              <div className="mt-6 grid gap-6 lg:grid-cols-3">

                {/* Sales overview */}
                <section
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                    shadow-sm
                    transition-colors duration-300

                    dark:border-slate-800
                    dark:bg-slate-900
                    dark:shadow-none

                    lg:col-span-2
                  "
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        className="
                          font-semibold
                          text-slate-900
                          dark:text-white
                        "
                      >
                        {t("dashboard.overview")}
                      </h3>

                      <p
                        className="
                          mt-1
                          text-sm
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        {t("dashboard.recentSales")}
                      </p>
                    </div>
                  </div>

                  <div
                    className="
                      mt-8
                      flex h-64
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-dashed
                      border-slate-300
                      bg-slate-50

                      dark:border-slate-700
                      dark:bg-slate-950
                    "
                  >
                    <p
                      className="
                        text-sm
                        text-slate-400
                        dark:text-slate-500
                      "
                    >
                      Sales chart will appear here
                    </p>
                  </div>
                </section>

                {/* Low stock */}
                <section
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                    shadow-sm
                    transition-colors duration-300

                    dark:border-slate-800
                    dark:bg-slate-900
                    dark:shadow-none
                  "
                >
                  <h3
                    className="
                      font-semibold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    {t("dashboard.lowStock")}
                  </h3>

                  <div
                    className="
                      mt-6
                      flex h-48
                      items-center
                      justify-center
                      rounded-xl
                      bg-slate-50

                      dark:bg-slate-950
                    "
                  >
                    <p
                      className="
                        text-sm
                        text-slate-400
                        dark:text-slate-500
                      "
                    >
                      No low-stock products
                    </p>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  value: string;
}

const DashboardCard = ({
  title,
  value,
}: DashboardCardProps) => {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm

        transition-all
        duration-300

        hover:border-slate-300
        hover:shadow-md

        dark:border-slate-800
        dark:bg-slate-900
        dark:shadow-none

        dark:hover:border-slate-700
      "
    >
      <p
        className="
          text-sm
          text-slate-500
          dark:text-slate-400
        "
      >
        {title}
      </p>

      <p
        className="
          mt-3
          text-2xl
          font-bold
          text-slate-900
          dark:text-white
        "
      >
        {value}
      </p>
    </div>
  );
};

export default DashboardLayout;