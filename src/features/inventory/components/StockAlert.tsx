import {
  AlertTriangle,
  PackageOpen,
  Search,
} from "lucide-react";

import { useMemo, useState } from "react";

import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

import type { Product } from "../../products/productTypes";

interface StockAlertsProps {
  products: Product[];

  onStockIn: (
    productId: string
  ) => void;
}

type AlertType =
  | "LOW_STOCK"
  | "OUT_OF_STOCK";

const StockAlerts = ({
  products,
  onStockIn,
}: StockAlertsProps) => {
  const [activeTab, setActiveTab] =
    useState<AlertType>("LOW_STOCK");

  const [search, setSearch] =
    useState("");

  // =========================================
  // FILTER PRODUCTS
  // =========================================

  const alertProducts = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        product.sku
          .toLowerCase()
          .includes(normalizedSearch) ||
        product.category
          .toLowerCase()
          .includes(normalizedSearch);

      if (activeTab === "OUT_OF_STOCK") {
        return (
          product.stockQuantity <= 0 &&
          matchesSearch
        );
      }

      return (
        product.stockQuantity > 0 &&
        product.stockQuantity <=
          product.lowStockThreshold &&
        matchesSearch
      );
    });
  }, [
    products,
    activeTab,
    search,
  ]);

  // =========================================
  // COUNTS
  // =========================================

  const lowStockCount =
    products.filter(
      (product) =>
        product.stockQuantity > 0 &&
        product.stockQuantity <=
          product.lowStockThreshold
    ).length;

  const outOfStockCount =
    products.filter(
      (product) =>
        product.stockQuantity <= 0
    ).length;

  // =========================================
  // CLEAR SEARCH
  // =========================================

  const handleTabChange = (
    tab: AlertType
  ) => {
    setActiveTab(tab);
    setSearch("");
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <Card className="overflow-hidden">

      {/* =====================================
          HEADER
          ===================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-slate-200
          p-5

          dark:border-slate-800

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        <div>
          <h2
            className="
              text-base
              font-semibold
              text-slate-900

              dark:text-white
            "
          >
            Stock Alerts
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500

              dark:text-slate-400
            "
          >
            Products that need inventory
            attention.
          </p>
        </div>

        {/* SEARCH */}

        <div className="relative w-full lg:w-72">

          <Search
            size={17}
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search product..."
            className="
              h-10
              w-full
              rounded-lg
              border
              border-slate-300
              bg-white
              pl-9
              pr-3
              text-sm
              text-slate-900
              outline-none

              placeholder:text-slate-400

              focus:border-indigo-500
              focus:ring-2
              focus:ring-indigo-500/20

              dark:border-slate-700
              dark:bg-slate-900
              dark:text-white
            "
          />

        </div>

      </div>

      {/* =====================================
          TABS
          ===================================== */}

      <div
        className="
          flex
          border-b
          border-slate-200
          px-5

          dark:border-slate-800
        "
      >

        <button
          type="button"
          onClick={() =>
            handleTabChange(
              "LOW_STOCK"
            )
          }
          className={`
            relative
            flex
            items-center
            gap-2
            px-1
            py-4
            text-sm
            font-medium
            transition
            mr-6

            ${
              activeTab === "LOW_STOCK"
                ? "text-amber-600 dark:text-amber-400"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            }
          `}
        >

          <AlertTriangle size={16} />

          Low Stock

          <span
            className={`
              rounded-full
              px-2
              py-0.5
              text-xs
              font-semibold

              ${
                activeTab ===
                "LOW_STOCK"
                  ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
              }
            `}
          >
            {lowStockCount}
          </span>

          {activeTab ===
            "LOW_STOCK" && (
            <span
              className="
                absolute
                bottom-0
                left-0
                right-0
                h-0.5
                rounded-full
                bg-amber-500
              "
            />
          )}

        </button>

        <button
          type="button"
          onClick={() =>
            handleTabChange(
              "OUT_OF_STOCK"
            )
          }
          className={`
            relative
            flex
            items-center
            gap-2
            px-1
            py-4
            text-sm
            font-medium
            transition

            ${
              activeTab ===
              "OUT_OF_STOCK"
                ? "text-red-600 dark:text-red-400"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            }
          `}
        >

          <PackageOpen size={16} />

          Out of Stock

          <span
            className={`
              rounded-full
              px-2
              py-0.5
              text-xs
              font-semibold

              ${
                activeTab ===
                "OUT_OF_STOCK"
                  ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
              }
            `}
          >
            {outOfStockCount}
          </span>

          {activeTab ===
            "OUT_OF_STOCK" && (
            <span
              className="
                absolute
                bottom-0
                left-0
                right-0
                h-0.5
                rounded-full
                bg-red-500
              "
            />
          )}

        </button>

      </div>

      {/* =====================================
          DESKTOP TABLE
          ===================================== */}

      <div className="hidden overflow-x-auto md:block">

        <table className="w-full">

          <thead>
            <tr
              className="
                border-b
                border-slate-200
                bg-slate-50

                dark:border-slate-800
                dark:bg-slate-900/50
              "
            >

              <th
                className="
                  px-5
                  py-3
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Product
              </th>

              <th
                className="
                  px-5
                  py-3
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                "
              >
                SKU
              </th>

              <th
                className="
                  px-5
                  py-3
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Category
              </th>

              <th
                className="
                  px-5
                  py-3
                  text-right
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Current Stock
              </th>

              <th
                className="
                  px-5
                  py-3
                  text-right
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Reorder Level
              </th>

              <th
                className="
                  px-5
                  py-3
                  text-right
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            {alertProducts.length === 0 ? (
              <tr>

                <td
                  colSpan={6}
                  className="
                    px-5
                    py-16
                    text-center
                  "
                >

                  <PackageOpen
                    size={40}
                    className="
                      mx-auto
                      text-slate-300

                      dark:text-slate-700
                    "
                  />

                  <p
                    className="
                      mt-3
                      text-sm
                      font-medium
                      text-slate-600

                      dark:text-slate-300
                    "
                  >
                    No products found
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-slate-400
                    "
                  >
                    {search
                      ? "Try a different search."
                      : "Everything looks good."}
                  </p>

                </td>

              </tr>
            ) : (
              alertProducts.map(
                (product) => (
                  <tr
                    key={product.id}
                    className="
                      border-b
                      border-slate-100
                      transition-colors

                      hover:bg-slate-50

                      dark:border-slate-800
                      dark:hover:bg-slate-900/50
                    "
                  >

                    {/* PRODUCT */}

                    <td className="px-5 py-4">

                      <p
                        className="
                          text-sm
                          font-medium
                          text-slate-900

                          dark:text-white
                        "
                      >
                        {product.name}
                      </p>

                    </td>

                    {/* SKU */}

                    <td
                      className="
                        px-5
                        py-4
                        text-sm
                        text-slate-500

                        dark:text-slate-400
                      "
                    >
                      {product.sku}
                    </td>

                    {/* CATEGORY */}

                    <td
                      className="
                        px-5
                        py-4
                        text-sm
                        text-slate-600

                        dark:text-slate-300
                      "
                    >
                      {product.category}
                    </td>

                    {/* CURRENT STOCK */}

                    <td className="px-5 py-4 text-right">

                      <span
                        className={`
                          text-sm
                          font-semibold

                          ${
                            product.stockQuantity <=
                            0
                              ? "text-red-600 dark:text-red-400"
                              : "text-amber-600 dark:text-amber-400"
                          }
                        `}
                      >
                        {product.stockQuantity}
                      </span>

                    </td>

                    {/* REORDER LEVEL */}

                    <td
                      className="
                        px-5
                        py-4
                        text-right
                        text-sm
                        text-slate-500

                        dark:text-slate-400
                      "
                    >
                      {product.lowStockThreshold}
                    </td>

                    {/* ACTION */}

                    <td className="px-5 py-4 text-right">

                      <Button
                        size="sm"
                        onClick={() =>
                          onStockIn(
                            product.id
                          )
                        }
                      >
                        Stock In
                      </Button>

                    </td>

                  </tr>
                )
              )
            )}

          </tbody>

        </table>

      </div>

      {/* =====================================
          MOBILE CARDS
          ===================================== */}

      <div className="
        divide-y
        divide-slate-100

        dark:divide-slate-800

        md:hidden
      ">

        {alertProducts.length === 0 ? (
          <div className="
            px-5
            py-16
            text-center
          ">

            <PackageOpen
              size={40}
              className="
                mx-auto
                text-slate-300

                dark:text-slate-700
              "
            />

            <p
              className="
                mt-3
                text-sm
                font-medium
                text-slate-600

                dark:text-slate-300
              "
            >
              No products found
            </p>

          </div>
        ) : (
          alertProducts.map(
            (product) => (
              <div
                key={product.id}
                className="space-y-4 p-5"
              >

                {/* PRODUCT */}

                <div className="
                  flex
                  items-start
                  justify-between
                  gap-3
                ">

                  <div>

                    <p
                      className="
                        text-sm
                        font-semibold
                        text-slate-900

                        dark:text-white
                      "
                    >
                      {product.name}
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-slate-400
                      "
                    >
                      SKU: {product.sku}
                    </p>

                  </div>

                  <span
                    className={`
                      rounded-full
                      px-2.5
                      py-1
                      text-xs
                      font-semibold

                      ${
                        product.stockQuantity <=
                        0
                          ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                      }
                    `}
                  >
                    {product.stockQuantity <=
                    0
                      ? "Out of Stock"
                      : "Low Stock"}
                  </span>

                </div>

                {/* DETAILS */}

                <div className="
                  grid
                  grid-cols-2
                  gap-4
                ">

                  <div>

                    <p
                      className="
                        text-xs
                        text-slate-400
                      "
                    >
                      Current Stock
                    </p>

                    <p
                      className={`
                        mt-1
                        text-sm
                        font-semibold

                        ${
                          product.stockQuantity <=
                          0
                            ? "text-red-600 dark:text-red-400"
                            : "text-amber-600 dark:text-amber-400"
                        }
                      `}
                    >
                      {product.stockQuantity}
                    </p>

                  </div>

                  <div>

                    <p
                      className="
                        text-xs
                        text-slate-400
                      "
                    >
                      Reorder Level
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        font-medium
                        text-slate-700

                        dark:text-slate-300
                      "
                    >
                      {product.lowStockThreshold}
                    </p>

                  </div>

                </div>

                {/* CATEGORY */}

                <div>

                  <p
                    className="
                      text-xs
                      text-slate-400
                    "
                  >
                    Category
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-600

                      dark:text-slate-300
                    "
                  >
                    {product.category}
                  </p>

                </div>

                {/* ACTION */}

                <Button
                  className="w-full"
                  onClick={() =>
                    onStockIn(
                      product.id
                    )
                  }
                >
                  Stock In
                </Button>

              </div>
            )
          )
        )}

      </div>

    </Card>
  );
};

export default StockAlerts;