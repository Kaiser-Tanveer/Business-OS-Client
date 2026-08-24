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
import { useTranslation } from "react-i18next";

interface SideMenuProps {
  onClose?: () => void;
}

interface MenuItem {
  label: string;
  icon: React.ElementType;
  href: string;
}

const SideMenu = ({ onClose }: SideMenuProps) => {
  const { t } = useTranslation();

  const menuItems: MenuItem[] = [
    {
      label: t("common.dashboard"),
      icon: LayoutDashboard,
      href: "#",
    },
    {
      label: t("common.sales"),
      icon: ShoppingCart,
      href: "#",
    },
    {
      label: t("common.products"),
      icon: Package,
      href: "#",
    },
    {
      label: t("common.customers"),
      icon: Users,
      href: "#",
    },
    {
      label: t("common.expenses"),
      icon: Wallet,
      href: "#",
    },
    {
      label: t("common.reports"),
      icon: BarChart3,
      href: "#",
    },
  ];

  return (
    <div
      className="
        flex h-dvh w-full flex-col
        border-r
        border-slate-200
        bg-white
        transition-colors
        duration-200

        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      {/* Logo */}
      <div
        className="
          flex h-16 shrink-0
          items-center
          justify-between
          border-b
          border-slate-200
          px-5

          dark:border-slate-800
        "
      >
        <div>
          <h1
            className="
              text-lg
              font-bold
              tracking-tight
              text-slate-900
              dark:text-white
            "
          >
            Business OS
          </h1>

          <p
            className="
              text-xs
              text-slate-500
              dark:text-slate-500
            "
          >
            {t("sidebar.businessManagement")}
          </p>
        </div>

        {/* Mobile Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label={t("common.close")}
          className="
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
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
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
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === 0;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`
                  group flex items-center gap-3
                  rounded-lg px-3 py-2.5
                  text-sm font-medium
                  transition-all duration-200

                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                      : `
                        text-slate-600
                        hover:bg-slate-100
                        hover:text-slate-900

                        dark:text-slate-400
                        dark:hover:bg-slate-800
                        dark:hover:text-white
                      `
                  }
                `}
              >
                <Icon
                  size={18}
                  strokeWidth={1.8}
                  className={
                    isActive
                      ? "text-white"
                      : `
                        text-slate-400
                        group-hover:text-slate-700

                        dark:text-slate-500
                        dark:group-hover:text-slate-300
                      `
                  }
                />

                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* System */}
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

          <a
            href="#"
            onClick={onClose}
            className="
              group flex items-center gap-3
              rounded-lg px-3 py-2.5
              text-sm font-medium

              text-slate-600
              hover:bg-slate-100
              hover:text-slate-900

              dark:text-slate-400
              dark:hover:bg-slate-800
              dark:hover:text-white
            "
          >
            <Settings
              size={18}
              strokeWidth={1.8}
              className="
                text-slate-400
                group-hover:text-slate-700

                dark:text-slate-500
                dark:group-hover:text-slate-300
              "
            />

            <span>{t("common.settings")}</span>
          </a>
        </div>
      </nav>

      {/* User */}
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
            flex items-center gap-3
            rounded-lg
            bg-slate-100
            p-3

            dark:bg-slate-800/60
          "
        >
          <div
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-full
              bg-indigo-600
              text-xs font-bold
              text-white
            "
          >
            KT
          </div>

          <div className="min-w-0">
            <p
              className="
                truncate
                text-sm
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              Business Owner
            </p>

            <p
              className="
                truncate
                text-xs
                text-slate-500
              "
            >
              {t("sidebar.ownerAccount")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;