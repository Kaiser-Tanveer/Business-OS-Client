import {
  CalendarDays,
  CircleDollarSign,
  Package,
  Tag,
  X,
} from "lucide-react";

import type { Product } from "../productTypes";

interface ProductDetailsModalProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
}

const ProductDetailsModal = ({
  open,
  product,
  onClose,
}: ProductDetailsModalProps) => {
  if (!open || !product) {
    return null;
  }

  const profitPerUnit =
    product.sellingPrice -
    product.purchasePrice;

  const profitMargin =
    product.sellingPrice > 0
      ? (profitPerUnit /
          product.sellingPrice) *
        100
      : 0;

  const isOutOfStock =
    product.stockQuantity <= 0;

  const isLowStock =
    product.stockQuantity > 0 &&
    product.stockQuantity <=
      product.lowStockThreshold;

  const status = isOutOfStock
    ? "Out of Stock"
    : isLowStock
      ? "Low Stock"
      : "In Stock";

  const statusClass = isOutOfStock
    ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
    : isLowStock
      ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
      : "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400";

  const formatDate = (
    date: string
  ) => {
    return new Date(date).toLocaleDateString(
      "en-BD",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  };

  const formatCurrency = (
    amount: number
  ) => {
    return new Intl.NumberFormat(
      "en-BD",
      {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 2,
      }
    ).format(amount);
  };

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/50
        p-4
        backdrop-blur-sm
      "
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-details-title"
        className="
          flex
          max-h-[90dvh]
          w-full
          max-w-3xl
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-2xl

          dark:border-slate-800
          dark:bg-slate-950
        "
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        {/* ======================================
            HEADER
            ====================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-slate-200
            px-6
            py-5

            dark:border-slate-800
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-indigo-50
                text-indigo-600

                dark:bg-indigo-500/10
                dark:text-indigo-400
              "
            >
              <Package size={23} />
            </div>

            <div>
              <h2
                id="product-details-title"
                className="
                  text-lg
                  font-semibold
                  text-slate-900

                  dark:text-white
                "
              >
                {product.name}
              </h2>

              <p
                className="
                  mt-0.5
                  text-sm
                  text-slate-500

                  dark:text-slate-400
                "
              >
                SKU: {product.sku}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="
              rounded-lg
              p-2
              text-slate-400
              transition

              hover:bg-slate-100
              hover:text-slate-700

              dark:hover:bg-slate-800
              dark:hover:text-white
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* ======================================
            CONTENT
            ====================================== */}

        <div className="overflow-y-auto p-6">

          {/* Status */}

          <div className="mb-6 flex items-center justify-between">
            <span
              className={`
                inline-flex
                items-center
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                ${statusClass}
              `}
            >
              {status}
            </span>

            <span
              className="
                text-sm
                text-slate-500

                dark:text-slate-400
              "
            >
              {product.category}
            </span>
          </div>

          {/* ====================================
              FINANCIAL SUMMARY
              ==================================== */}

          <div className="grid gap-4 sm:grid-cols-3">

            {/* Selling Price */}

            <div
              className="
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                p-4

                dark:border-slate-800
                dark:bg-slate-900
              "
            >
              <div className="flex items-center gap-2">
                <CircleDollarSign
                  size={17}
                  className="text-slate-400"
                />

                <span
                  className="
                    text-xs
                    font-medium
                    text-slate-500
                  "
                >
                  Selling Price
                </span>
              </div>

              <p
                className="
                  mt-3
                  text-xl
                  font-semibold
                  text-slate-900

                  dark:text-white
                "
              >
                {formatCurrency(
                  product.sellingPrice
                )}
              </p>
            </div>

            {/* Profit */}

            <div
              className="
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                p-4

                dark:border-slate-800
                dark:bg-slate-900
              "
            >
              <div className="flex items-center gap-2">
                <Tag
                  size={17}
                  className="text-slate-400"
                />

                <span
                  className="
                    text-xs
                    font-medium
                    text-slate-500
                  "
                >
                  Profit / Unit
                </span>
              </div>

              <p
                className="
                  mt-3
                  text-xl
                  font-semibold
                  text-green-600

                  dark:text-green-400
                "
              >
                {formatCurrency(
                  profitPerUnit
                )}
              </p>
            </div>

            {/* Margin */}

            <div
              className="
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                p-4

                dark:border-slate-800
                dark:bg-slate-900
              "
            >
              <div className="flex items-center gap-2">
                <CircleDollarSign
                  size={17}
                  className="text-slate-400"
                />

                <span
                  className="
                    text-xs
                    font-medium
                    text-slate-500
                  "
                >
                  Profit Margin
                </span>
              </div>

              <p
                className="
                  mt-3
                  text-xl
                  font-semibold
                  text-slate-900

                  dark:text-white
                "
              >
                {profitMargin.toFixed(1)}%
              </p>
            </div>

          </div>

          {/* ====================================
              PRODUCT INFORMATION
              ==================================== */}

          <div className="mt-6">

            <h3
              className="
                mb-3
                text-sm
                font-semibold
                text-slate-900

                dark:text-white
              "
            >
              Product Information
            </h3>

            <div
              className="
                overflow-hidden
                rounded-xl
                border
                border-slate-200

                dark:border-slate-800
              "
            >
              <div
                className="
                  grid
                  grid-cols-1
                  divide-y
                  divide-slate-200

                  dark:divide-slate-800

                  sm:grid-cols-2
                  sm:divide-x
                  sm:divide-y-0
                "
              >

                {/* Purchase Price */}

                <div className="p-4">
                  <p className="text-xs text-slate-500">
                    Purchase Price
                  </p>

                  <p className="
                    mt-1
                    text-sm
                    font-medium
                    text-slate-900
                    dark:text-white
                  ">
                    {formatCurrency(
                      product.purchasePrice
                    )}
                  </p>
                </div>

                {/* Unit */}

                <div className="p-4">
                  <p className="text-xs text-slate-500">
                    Unit
                  </p>

                  <p className="
                    mt-1
                    text-sm
                    font-medium
                    text-slate-900
                    dark:text-white
                  ">
                    {product.unit}
                  </p>
                </div>

              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  divide-y
                  divide-slate-200
                  border-t

                  dark:divide-slate-800
                  dark:border-slate-800

                  sm:grid-cols-2
                  sm:divide-x
                  sm:divide-y-0
                "
              >

                {/* Current Stock */}

                <div className="p-4">
                  <p className="text-xs text-slate-500">
                    Current Stock
                  </p>

                  <p className="
                    mt-1
                    text-sm
                    font-medium
                    text-slate-900
                    dark:text-white
                  ">
                    {product.stockQuantity}{" "}
                    {product.unit}
                  </p>
                </div>

                {/* Low Stock Threshold */}

                <div className="p-4">
                  <p className="text-xs text-slate-500">
                    Low Stock Alert
                  </p>

                  <p className="
                    mt-1
                    text-sm
                    font-medium
                    text-slate-900
                    dark:text-white
                  ">
                    {product.lowStockThreshold}{" "}
                    {product.unit}
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* ====================================
              DESCRIPTION
              ==================================== */}

          {product.description && (
            <div className="mt-6">

              <h3
                className="
                  mb-3
                  text-sm
                  font-semibold
                  text-slate-900

                  dark:text-white
                "
              >
                Description
              </h3>

              <p
                className="
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-4
                  text-sm
                  leading-6
                  text-slate-600

                  dark:border-slate-800
                  dark:bg-slate-900
                  dark:text-slate-400
                "
              >
                {product.description}
              </p>

            </div>
          )}

          {/* ====================================
              DATES
              ==================================== */}

          <div className="mt-6">

            <h3
              className="
                mb-3
                text-sm
                font-semibold
                text-slate-900

                dark:text-white
              "
            >
              Record Information
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-200
                  p-4

                  dark:border-slate-800
                "
              >
                <CalendarDays
                  size={18}
                  className="text-slate-400"
                />

                <div>
                  <p className="text-xs text-slate-500">
                    Created
                  </p>

                  <p className="
                    mt-1
                    text-sm
                    font-medium
                    text-slate-900
                    dark:text-white
                  ">
                    {formatDate(
                      product.createdAt
                    )}
                  </p>
                </div>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-200
                  p-4

                  dark:border-slate-800
                "
              >
                <CalendarDays
                  size={18}
                  className="text-slate-400"
                />

                <div>
                  <p className="text-xs text-slate-500">
                    Last Updated
                  </p>

                  <p className="
                    mt-1
                    text-sm
                    font-medium
                    text-slate-900
                    dark:text-white
                  ">
                    {formatDate(
                      product.updatedAt
                    )}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ======================================
            FOOTER
            ====================================== */}

        <div
          className="
            flex
            shrink-0
            justify-end
            border-t
            border-slate-200
            px-6
            py-4

            dark:border-slate-800
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              h-10
              rounded-lg
              border
              border-slate-300
              bg-white
              px-5
              text-sm
              font-medium
              text-slate-700
              transition

              hover:bg-slate-50

              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-300
              dark:hover:bg-slate-800
            "
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailsModal;