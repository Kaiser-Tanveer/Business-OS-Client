import {
  ArrowDownToLine,
  ArrowUpFromLine,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import type {
  Product,
} from "../../products/productTypes";

import type {
  StockMovementReason,
  StockMovementType,
} from "../inventoryTypes";

interface StockMovementModalProps {
  open: boolean;
  type: StockMovementType;
  products: Product[];
  selectedProductId?: string;
  onClose: () => void;
  onSubmit: (data: {
    productId: string;
    quantity: number;
    reason: StockMovementReason;
    note: string;
  }) => void;
}

const StockMovementModal = ({
  open,
  type,
  products,
  selectedProductId,
  onClose,
  onSubmit,
}: StockMovementModalProps) => {
  const [productId, setProductId] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [reason, setReason] =
    useState<StockMovementReason>(
      type === "IN"
        ? "PURCHASE"
        : "SALE"
    );

  const [note, setNote] =
    useState("");

  // =========================================
  // RESET FORM
  // =========================================

  useEffect(() => {
    if (!open) {
      return;
    }

    setProductId(
    selectedProductId ?? ""
    );
    setQuantity("");
    setNote("");

    setReason(
      type === "IN"
        ? "PURCHASE"
        : "SALE"
    );
  }, [open, selectedProductId, type]);

  if (!open) {
    return null;
  }

  // =========================================
  // SUBMIT
  // =========================================

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const parsedQuantity =
      Number(quantity);

    if (
      !productId ||
      parsedQuantity <= 0
    ) {
      return;
    }

    onSubmit({
      productId,
      quantity: parsedQuantity,
      reason,
      note: note.trim(),
    });
  };

  const isStockIn = type === "IN";

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/50
        p-4
        backdrop-blur-sm
      "
      onMouseDown={onClose}
    >
      <div
        className="
          w-full
          max-w-lg
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
        {/* ====================================
            HEADER
            ==================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            px-6
            py-5

            dark:border-slate-800
          "
        >
          <div className="flex items-center gap-3">

            <div
              className={`
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl

                ${
                  isStockIn
                    ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                    : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                }
              `}
            >
              {isStockIn ? (
                <ArrowDownToLine size={20} />
              ) : (
                <ArrowUpFromLine size={20} />
              )}
            </div>

            <div>
              <h2
                className="
                  text-lg
                  font-semibold
                  text-slate-900

                  dark:text-white
                "
              >
                {isStockIn
                  ? "Stock In"
                  : "Stock Out"}
              </h2>

              <p
                className="
                  text-sm
                  text-slate-500

                  dark:text-slate-400
                "
              >
                {isStockIn
                  ? "Add stock to your inventory."
                  : "Remove stock from your inventory."}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
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

        {/* ====================================
            FORM
            ==================================== */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* PRODUCT */}

          <div>
            <label
              htmlFor="stock-product"
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700

                dark:text-slate-300
              "
            >
              Product
            </label>

            <select
              id="stock-product"
              value={productId}
              onChange={(event) =>
                setProductId(
                  event.target.value
                )
              }
              required
              className="
                h-11
                w-full
                rounded-lg
                border
                border-slate-300
                bg-white
                px-3
                text-sm
                text-slate-900
                outline-none
                transition

                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-500/20

                dark:border-slate-700
                dark:bg-slate-900
                dark:text-white
              "
            >
              <option value="">
                Select a product
              </option>

              {products.map((product) => (
                <option
                  key={product.id}
                  value={product.id}
                >
                  {product.name} — Stock:{" "}
                  {product.stockQuantity}
                </option>
              ))}
            </select>
          </div>

          {/* QUANTITY */}

          <div>
            <label
              htmlFor="stock-quantity"
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700

                dark:text-slate-300
              "
            >
              Quantity
            </label>

            <input
              id="stock-quantity"
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(event) =>
                setQuantity(
                  event.target.value
                )
              }
              required
              placeholder="Enter quantity"
              className="
                h-11
                w-full
                rounded-lg
                border
                border-slate-300
                bg-white
                px-3
                text-sm
                text-slate-900
                outline-none
                transition

                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-500/20

                dark:border-slate-700
                dark:bg-slate-900
                dark:text-white
              "
            />
          </div>

          {/* REASON */}

          <div>
            <label
              htmlFor="stock-reason"
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700

                dark:text-slate-300
              "
            >
              Reason
            </label>

            <select
              id="stock-reason"
              value={reason}
              onChange={(event) =>
                setReason(
                  event.target
                    .value as StockMovementReason
                )
              }
              className="
                h-11
                w-full
                rounded-lg
                border
                border-slate-300
                bg-white
                px-3
                text-sm
                text-slate-900
                outline-none
                transition

                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-500/20

                dark:border-slate-700
                dark:bg-slate-900
                dark:text-white
              "
            >
              {isStockIn ? (
                <>
                  <option value="PURCHASE">
                    Purchase
                  </option>

                  <option value="RETURN">
                    Customer Return
                  </option>

                  <option value="CORRECTION">
                    Stock Correction
                  </option>

                  <option value="OTHER">
                    Other
                  </option>
                </>
              ) : (
                <>
                  <option value="SALE">
                    Sale
                  </option>

                  <option value="DAMAGE">
                    Damaged
                  </option>

                  <option value="RETURN">
                    Supplier Return
                  </option>

                  <option value="CORRECTION">
                    Stock Correction
                  </option>

                  <option value="OTHER">
                    Other
                  </option>
                </>
              )}
            </select>
          </div>

          {/* NOTE */}

          <div>
            <label
              htmlFor="stock-note"
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700

                dark:text-slate-300
              "
            >
              Note
              <span className="
                ml-1
                font-normal
                text-slate-400
              ">
                (Optional)
              </span>
            </label>

            <textarea
              id="stock-note"
              value={note}
              onChange={(event) =>
                setNote(
                  event.target.value
                )
              }
              rows={3}
              placeholder="Add a note..."
              className="
                w-full
                resize-none
                rounded-lg
                border
                border-slate-300
                bg-white
                px-3
                py-2.5
                text-sm
                text-slate-900
                outline-none
                transition

                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-500/20

                dark:border-slate-700
                dark:bg-slate-900
                dark:text-white
              "
            />
          </div>

          {/* ACTIONS */}

          <div
            className="
              flex
              justify-end
              gap-3
              border-t
              border-slate-200
              pt-5

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
                px-4
                text-sm
                font-medium
                text-slate-700
                transition

                hover:bg-slate-50

                dark:border-slate-700
                dark:text-slate-300
                dark:hover:bg-slate-800
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`
                h-10
                rounded-lg
                px-5
                text-sm
                font-medium
                text-white
                transition

                ${
                  isStockIn
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }
              `}
            >
              {isStockIn
                ? "Add Stock"
                : "Remove Stock"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default StockMovementModal;