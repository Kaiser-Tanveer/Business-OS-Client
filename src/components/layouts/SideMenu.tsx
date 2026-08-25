import {
  BarChart3,
  Boxes,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Truck,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

interface SideMenuProps {
  onClose?: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },

  {
    label: "Products",
    path: "/products",
    icon: Package,
  },

  {
    label: "Inventory",
    path: "/inventory",
    icon: Boxes,
  },

  {
    label: "Sales",
    path: "/sales",
    icon: ShoppingCart,
  },

  {
    label: "Customers",
    path: "/customers",
    icon: Users,
  },

  {
    label: "Purchases",
    path: "/purchases",
    icon: Truck,
  },

  {
    label: "Expenses",
    path: "/expenses",
    icon: CircleDollarSign,
  },

  {
    label: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
];

const bottomNavigationItems: NavItem[] = [
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

const SideMenu = ({ onClose }: SideMenuProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (path: string) => {
    setExpandedItems((current) =>
      current.includes(path)
        ? current.filter((item) => item !== path)
        : [...current, path]
    );
  };

  return (
    <div
      className="
        flex
        h-full
        w-full
        flex-col
        border-r
        border-slate-200
        bg-white
        text-slate-900
        transition-colors
        duration-300

        dark:border-slate-800
        dark:bg-slate-950
        dark:text-slate-100
      "
    >
      {/* -------------------------------------------------
          LOGO / BRAND
      -------------------------------------------------- */}

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
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-indigo-600
              text-white
              shadow-sm
            "
          >
            <ClipboardList size={19} />
          </div>

          {/* Brand */}
          <div>
            <h1
              className="
                text-sm
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
                text-[11px]
                text-slate-500

                dark:text-slate-500
              "
            >
              Business Management
            </p>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="
            rounded-lg
            p-2
            text-slate-500
            transition

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

      {/* -------------------------------------------------
          MAIN NAVIGATION
      -------------------------------------------------- */}

      <nav
        className="
          flex-1
          overflow-y-auto
          px-3
          py-5
        "
      >
        <p
          className="
            mb-2
            px-3
            text-[10px]
            font-semibold
            uppercase
            tracking-wider
            text-slate-400

            dark:text-slate-600
          "
        >
          Main Menu
        </p>

        <div className="space-y-1">
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.path}
              item={item}
              expandedItems={expandedItems}
              toggleExpanded={toggleExpanded}
              onClose={onClose}
            />
          ))}
        </div>
      </nav>

      {/* -------------------------------------------------
          BOTTOM NAVIGATION
      -------------------------------------------------- */}

      <div
        className="
          shrink-0
          border-t
          border-slate-200
          px-3
          py-4

          dark:border-slate-800
        "
      >
        <div className="space-y-1">
          {bottomNavigationItems.map((item) => (
            <NavigationItem
              key={item.path}
              item={item}
              expandedItems={expandedItems}
              toggleExpanded={toggleExpanded}
              onClose={onClose}
            />
          ))}
        </div>

        {/* Version */}
        <div
          className="
            mt-4
            px-3
            text-[10px]
            text-slate-400

            dark:text-slate-600
          "
        >
          Business OS v1.0.0
        </div>
      </div>
    </div>
  );
};

interface NavigationItemProps {
  item: NavItem;
  expandedItems: string[];
  toggleExpanded: (path: string) => void;
  onClose?: () => void;
}

const NavigationItem = ({
  item,
  expandedItems,
  toggleExpanded,
  onClose,
}: NavigationItemProps) => {
  const Icon = item.icon;

  const hasChildren =
    Boolean(item.children?.length);

  const isExpanded =
    expandedItems.includes(item.path);

  return (
    <div>
      <div className="flex items-center">
        <NavLink
          to={item.path}
          end={item.path === "/"}
          onClick={onClose}
          className={({ isActive }) =>
            `
              group
              flex
              min-w-0
              flex-1
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
                strokeWidth={isActive ? 2.2 : 1.9}
                className="shrink-0"
              />

              <span className="truncate">
                {item.label}
              </span>
            </>
          )}
        </NavLink>

        {/* Expand/collapse button */}
        {hasChildren && (
          <button
            type="button"
            onClick={() =>
              toggleExpanded(item.path)
            }
            aria-label={
              isExpanded
                ? `Collapse ${item.label}`
                : `Expand ${item.label}`
            }
            className="
              ml-1
              rounded-md
              p-1.5
              text-slate-400
              transition

              hover:bg-slate-100
              hover:text-slate-700

              dark:hover:bg-slate-800
              dark:hover:text-slate-200
            "
          >
            {isExpanded ? (
              <ChevronDown size={15} />
            ) : (
              <ChevronRight size={15} />
            )}
          </button>
        )}
      </div>

      {/* Child routes */}
      {hasChildren && isExpanded && (
        <div className="ml-8 mt-1 space-y-1 border-l border-slate-200 pl-2 dark:border-slate-800">
          {item.children?.map((child) => {
            const ChildIcon = child.icon;

            return (
              <NavLink
                key={child.path}
                to={child.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    px-3
                    py-2
                    text-xs
                    font-medium
                    transition

                    ${
                      isActive
                        ? `
                          bg-indigo-50
                          text-indigo-600

                          dark:bg-indigo-500/10
                          dark:text-indigo-400
                        `
                        : `
                          text-slate-500
                          hover:bg-slate-100
                          hover:text-slate-900

                          dark:text-slate-500
                          dark:hover:bg-slate-800
                          dark:hover:text-slate-300
                        `
                    }
                  `
                }
              >
                <ChildIcon
                  size={15}
                  className="shrink-0"
                />

                <span>{child.label}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SideMenu;