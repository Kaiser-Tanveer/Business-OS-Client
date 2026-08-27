import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ChevronDown,
  PackageOpen,
} from "lucide-react";

import { useMemo, useState } from "react";

import Card from "../../../components/ui/Card";

import type { Product } from "../../products/productTypes";

import type {
  StockMovement,
  StockMovementType,
} from "../inventoryTypes";

interface StockMovementHistoryProps {
  movements: StockMovement[];
  products: Product[];
}

const StockMovementHistory = ({
  movements,
  products,
}: StockMovementHistoryProps) => {
  // =========================================
  // FILTER STATE
  // =========================================

  const [typeFilter, setTypeFilter] =
    useState<"ALL" | StockMovementType>(
      "ALL"
    );

  const [productFilter, setProductFilter] =
    useState("ALL");

  // =========================================
  // PRODUCT LOOKUP
  // =========================================

  const getProductName = (
    productId: string
  ) => {
    const product = products.find(
      (item) =>
        item.id === productId
    );

    return product?.name ?? "Unknown Product";
  };

  // =========================================
  // FILTER MOVEMENTS
  // =========================================

  const filteredMovements = useMemo(() => {
    return movements.filter(
      (movement) => {
        const matchesType =
          typeFilter === "ALL" ||
          movement.type === typeFilter;

        const matchesProduct =
          productFilter === "ALL" ||
          movement.productId ===
            productFilter;

        return (
          matchesType &&
          matchesProduct
        );
      }
    );
  }, [
    movements,
    typeFilter,
    productFilter,
  ]);

  // =========================================
  // FORMAT DATE
  // =========================================

  const formatDate = (
    date: string
  ) => {
    return new Intl.DateTimeFormat(
      "en-BD",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    ).format(new Date(date));
  };

  // =========================================
  // TYPE BADGE
  // =========================================

  const renderTypeBadge = (
    type: StockMovementType
  ) => {
    if (type === "IN") {
      return (
        <span
          className="
            inline-flex
            items-center
            gap-1.5
            rounded-full
            bg-green-50
            px-2.5
            py-1
            text-xs
            font-semibold
            text-green-700

            dark:bg-green-500/10
            dark:text-green-400
          "
        >
          <ArrowDownToLine
            size={13}
          />

          Stock In
        </span>
      );
    }

    if (type === "OUT") {
      return (
        <span
          className="
            inline-flex
            items-center
            gap-1.5
            rounded-full
            bg-red-50
            px-2.5
            py-1
            text-xs
            font-semibold
            text-red-700

            dark:bg-red-500/10
            dark:text-red-400
          "
        >
          <ArrowUpFromLine
            size={13}
          />

          Stock Out
        </span>
      );
    }

    return (
      <span
        className="
          inline-flex
          items-center
          rounded-full
          bg-amber-50
          px-2.5
          py-1
          text-xs
          font-semibold
          text-amber-700

          dark:bg-amber-500/10
          dark:text-amber-400
        "
      >
        Adjustment
      </span>
    );
  };

  // =========================================
  // REASON LABEL
  // =========================================

  const formatReason = (
    reason: string
  ) => {
    return reason
      .toLowerCase()
      .split("_")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");
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

          lg:flex-row
          lg:items-center
          lg:justify-between

          dark:border-slate-800
        "
      >

        {/* TITLE */}

        <div>
          <h2
            className="
              text-base
              font-semibold
              text-slate-900

              dark:text-white
            "
          >
            Stock Movement History
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500

              dark:text-slate-400
            "
          >
            Track all inventory
            stock movements.
          </p>
        </div>

        {/* FILTERS */}

        <div
          className="
            flex
            flex-col
            gap-2

            sm:flex-row
          "
        >

          {/* TYPE FILTER */}

          <div className="relative">

            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(
                  event.target.value as
                    | "ALL"
                    | StockMovementType
                )
              }
              className="
                h-10
                w-full
                appearance-none
                rounded-lg
                border
                border-slate-300
                bg-white
                pl-3
                pr-9
                text-sm
                text-slate-700
                outline-none

                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-500/20

                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-300

                sm:w-36
              "
            >
              <option value="ALL">
                All Types
              </option>

              <option value="IN">
                Stock In
              </option>

              <option value="OUT">
                Stock Out
              </option>

              <option value="ADJUSTMENT">
                Adjustment
              </option>
            </select>

            <ChevronDown
              size={16}
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

          </div>

          {/* PRODUCT FILTER */}

          <div className="relative">

            <select
              value={productFilter}
              onChange={(event) =>
                setProductFilter(
                  event.target.value
                )
              }
              className="
                h-10
                w-full
                appearance-none
                rounded-lg
                border
                border-slate-300
                bg-white
                pl-3
                pr-9
                text-sm
                text-slate-700
                outline-none

                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-500/20

                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-300

                sm:w-48
              "
            >
              <option value="ALL">
                All Products
              </option>

              {products.map(
                (product) => (
                  <option
                    key={product.id}
                    value={product.id}
                  >
                    {product.name}
                  </option>
                )
              )}
            </select>

            <ChevronDown
              size={16}
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

          </div>

        </div>

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
                Date
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
                Type
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
                Reason
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
                Quantity
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
                Note
              </th>

            </tr>
          </thead>

          <tbody>

            {filteredMovements.length ===
            0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="
                    px-5
                    py-16
                    text-center
                  "
                >
                  <div className="
                    flex
                    flex-col
                    items-center
                    justify-center
                  ">

                    <PackageOpen
                      size={40}
                      className="
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
                      No stock movements
                      found
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-slate-400
                      "
                    >
                      Try changing
                      your filters.
                    </p>

                  </div>
                </td>
              </tr>
            ) : (
              filteredMovements.map(
                (movement) => (
                  <tr
                    key={movement.id}
                    className="
                      border-b
                      border-slate-100
                      transition-colors

                      hover:bg-slate-50

                      dark:border-slate-800
                      dark:hover:bg-slate-900/50
                    "
                  >

                    {/* DATE */}

                    <td
                      className="
                        whitespace-nowrap
                        px-5
                        py-4
                        text-sm
                        text-slate-600

                        dark:text-slate-300
                      "
                    >
                      {formatDate(
                        movement.createdAt
                      )}
                    </td>

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
                        {getProductName(
                          movement.productId
                        )}
                      </p>

                    </td>

                    {/* TYPE */}

                    <td className="px-5 py-4">
                      {renderTypeBadge(
                        movement.type
                      )}
                    </td>

                    {/* REASON */}

                    <td
                      className="
                        px-5
                        py-4
                        text-sm
                        text-slate-600

                        dark:text-slate-300
                      "
                    >
                      {formatReason(
                        movement.reason
                      )}
                    </td>

                    {/* QUANTITY */}

                    <td
                      className={`
                        px-5
                        py-4
                        text-right
                        text-sm
                        font-semibold

                        ${
                          movement.type ===
                          "IN"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }
                      `}
                    >
                      {movement.type ===
                      "IN"
                        ? "+"
                        : "-"}
                      {movement.quantity}
                    </td>

                    {/* NOTE */}

                    <td
                      className="
                        max-w-xs
                        truncate
                        px-5
                        py-4
                        text-sm
                        text-slate-500

                        dark:text-slate-400
                      "
                    >
                      {movement.note ||
                        "—"}
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

      <div className="divide-y divide-slate-100 md:hidden dark:divide-slate-800">

        {filteredMovements.length ===
        0 ? (
          <div className="
            flex
            flex-col
            items-center
            px-5
            py-16
            text-center
          ">

            <PackageOpen
              size={40}
              className="
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
              No stock movements
              found
            </p>

          </div>
        ) : (
          filteredMovements.map(
            (movement) => (
              <div
                key={movement.id}
                className="space-y-4 p-5"
              >

                {/* TOP */}

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
                      {getProductName(
                        movement.productId
                      )}
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-slate-400
                      "
                    >
                      {formatDate(
                        movement.createdAt
                      )}
                    </p>
                  </div>

                  {renderTypeBadge(
                    movement.type
                  )}

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
                      Reason
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
                      {formatReason(
                        movement.reason
                      )}
                    </p>
                  </div>

                  <div>
                    <p
                      className="
                        text-xs
                        text-slate-400
                      "
                    >
                      Quantity
                    </p>

                    <p
                      className={`
                        mt-1
                        text-sm
                        font-semibold

                        ${
                          movement.type ===
                          "IN"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }
                      `}
                    >
                      {movement.type ===
                      "IN"
                        ? "+"
                        : "-"}
                      {movement.quantity}
                    </p>
                  </div>

                </div>

                {/* NOTE */}

                {movement.note && (
                  <div>
                    <p
                      className="
                        text-xs
                        text-slate-400
                      "
                    >
                      Note
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-slate-600

                        dark:text-slate-400
                      "
                    >
                      {movement.note}
                    </p>
                  </div>
                )}

              </div>
            )
          )
        )}

      </div>

    </Card>
  );
};

export default StockMovementHistory;