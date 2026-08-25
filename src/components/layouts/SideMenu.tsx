import {
  BarChart3,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
  Wallet,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface SideMenuProps {
  onClose?: () => void;
}

const SideMenu = ({ onClose }: SideMenuProps) => {
  const { t } = useTranslation();

  const menuItems = [
    {
      label: t("common.dashboard"),
      path: "/",
      icon: LayoutDashboard,
    },
    {
      label: t("common.sales"),
      path: "/sales",
      icon: ShoppingCart,
    },
    {
      label: t("common.products"),
      path: "/products",
      icon: Package,
    },
    {
      label: t("common.customers"),
      path: "/customers",
      icon: Users,
    },
    {
      label: t("common.expenses"),
      path: "/expenses",
      icon: Wallet,
    },
    {
      label: t("common.reports"),
      path: "/reports",
      icon: BarChart3,
    },
  ];

  return (
    <div
      className="
        flex
        h-dvh
        w-full
        flex-col

        border-r
        border-slate-200
        bg-white

        transition-colors
        duration-300

        dark:border-slate-800
        dark:bg-slate-900
      "
    >

      {/* LOGO */}
      <div
        className="
          flex
          h-16
          shrink-0
          items-center
          justify-between

          border-b
          border-slate-200

          px-5

          dark:border-slate-800
        "
      >
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">
            Business OS
          </h1>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Business Management
          </p>
        </div>

        {/* Mobile close */}
        <button
          type="button"
          onClick={onClose}
          className="
            rounded-lg
            p-2
            text-slate-500

            hover:bg-slate-100
            hover:text-slate-900

            dark:text-slate-400
            dark:hover:bg-slate-800
            dark:hover:text-white

            lg:hidden
          "
        >
          <X size={20} />
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">

        <p
          className="
            mb-3
            px-3
            text-[11px]
            font-semibold
            uppercase
            tracking-wider
            text-slate-400
            dark:text-slate-500
          "
        >
          {t("sidebar.menu")}
        </p>

        <div className="space-y-1">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2.5
                    text-sm
                    font-medium
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? `
                          bg-indigo-600
                          text-white
                          shadow-sm
                        `
                        : `
                          text-slate-600

                          hover:bg-slate-100
                          hover:text-slate-900

                          dark:text-slate-400
                          dark:hover:bg-slate-800
                          dark:hover:text-white
                        `
                    }
                  `
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={18}
                      strokeWidth={1.8}
                      className={
                        isActive
                          ? "text-white"
                          : "text-slate-400 dark:text-slate-500"
                      }
                    />

                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}

        </div>

        {/* SYSTEM */}
        <div
          className="
            mt-8
            border-t
            border-slate-200
            pt-5

            dark:border-slate-800
          "
        >
          <p
            className="
              mb-3
              px-3
              text-[11px]
              font-semibold
              uppercase
              tracking-wider
              text-slate-400
              dark:text-slate-500
            "
          >
            {t("sidebar.system")}
          </p>

          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-2.5
                text-sm
                font-medium
                transition-all

                ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : `
                      text-slate-600
                      hover:bg-slate-100
                      hover:text-slate-900

                      dark:text-slate-400
                      dark:hover:bg-slate-800
                      dark:hover:text-white
                    `
                }
              `
            }
          >
            <Settings size={18} strokeWidth={1.8} />

            <span>{t("common.settings")}</span>
          </NavLink>
        </div>

      </nav>

      {/* USER */}
      <div
        className="
          shrink-0
          border-t
          border-slate-200
          p-4

          dark:border-slate-800
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
            rounded-lg
            bg-slate-100
            p-3

            dark:bg-slate-800
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-indigo-600
              text-xs
              font-bold
              text-white
            "
          >
            KT
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
              {t("user.businessOwner")}
            </p>

            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              {t("user.ownerAccount")}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SideMenu;