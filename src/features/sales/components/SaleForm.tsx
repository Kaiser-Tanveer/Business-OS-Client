import { Plus, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";

import {
  useAppSelector,
} from "../../../hooks";

import type {
  PaymentStatus,
  SaleItem,
} from "../salesTypes";

interface SaleFormProps {
  onClose: () => void;

  onSubmit: (data: {
    customerName?: string;
    items: SaleItem[];
    subtotal: number;
    discount: number;
    total: number;
    paidAmount: number;
    dueAmount: number;
    paymentStatus: PaymentStatus;
  }) => void;
}

interface FormItem {
  productId: string;
  quantity: number;
}

const SaleForm = ({
  onClose,
  onSubmit,
}: SaleFormProps) => {
  // =========================================
  // PRODUCTS FROM REDUX
  // =========================================

  const products = useAppSelector(
    (state) => state.products.products
  );

  // =========================================
  // FORM STATE
  // =========================================

  const [customerName, setCustomerName] =
    useState("");

  const [selectedProductId, setSelectedProductId] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  const [discount, setDiscount] =
    useState(0);

  const [paidAmount, setPaidAmount] =
    useState(0);

  const [items, setItems] =
    useState<FormItem[]>([]);

  // =========================================
  // SELECTED PRODUCT
  // =========================================

  const selectedProduct = products.find(
    (product) =>
      product.id === selectedProductId
  );

  // =========================================
  // AVAILABLE PRODUCTS
  // =========================================

  const availableProducts = products.filter(
    (product) =>
      product.status === "active" &&
      product.stockQuantity > 0
  );

  // =========================================
  // ADD PRODUCT
  // =========================================

  const handleAddProduct = () => {
    if (!selectedProduct) {
      alert("Please select a product.");
      return;
    }

    if (quantity <= 0) {
      alert(
        "Quantity must be greater than 0."
      );
      return;
    }

    if (
      quantity >
      selectedProduct.stockQuantity
    ) {
      alert(
        `Only ${selectedProduct.stockQuantity} ${selectedProduct.unit} available in stock.`
      );
      return;
    }

    const existingItem = items.find(
      (item) =>
        item.productId ===
        selectedProduct.id
    );

    if (existingItem) {
      const newQuantity =
        existingItem.quantity +
        quantity;

      if (
        newQuantity >
        selectedProduct.stockQuantity
      ) {
        alert(
          `Only ${selectedProduct.stockQuantity} ${selectedProduct.unit} available in stock.`
        );

        return;
      }

      setItems(
        items.map((item) =>
          item.productId ===
          selectedProduct.id
            ? {
                ...item,
                quantity: newQuantity,
              }
            : item
        )
      );
    } else {
      setItems([
        ...items,
        {
          productId:
            selectedProduct.id,
          quantity,
        },
      ]);
    }

    setSelectedProductId("");
    setQuantity(1);
  };

  // =========================================
  // REMOVE PRODUCT
  // =========================================

  const handleRemoveProduct = (
    productId: string
  ) => {
    setItems(
      items.filter(
        (item) =>
          item.productId !== productId
      )
    );
  };

  // =========================================
  // SALE ITEMS
  // =========================================

  const saleItems: SaleItem[] =
    useMemo(() => {
      return items
        .map((item) => {
          const product = products.find(
            (product) =>
              product.id === item.productId
          );

          if (!product) {
            return null;
          }

          return {
            productId: product.id,
            productName: product.name,
            quantity: item.quantity,
            unitPrice: product.sellingPrice,
            total:
              item.quantity *
              product.sellingPrice,
          };
        })
        .filter(
          (
            item
          ): item is SaleItem =>
            item !== null
        );
    }, [items, products]);

  // =========================================
  // TOTALS
  // =========================================

  const subtotal = useMemo(() => {
    return saleItems.reduce(
      (sum, item) =>
        sum + item.total,
      0
    );
  }, [saleItems]);

  const total = Math.max(
    0,
    subtotal - discount
  );

  const dueAmount = Math.max(
    0,
    total - paidAmount
  );

  const paymentStatus: PaymentStatus =
    paidAmount >= total && total > 0
      ? "PAID"
      : paidAmount > 0
      ? "PARTIAL"
      : "DUE";

  // =========================================
  // SUBMIT
  // =========================================

  const handleSubmit = () => {
    if (saleItems.length === 0) {
      alert(
        "Please add at least one product."
      );
      return;
    }

    if (discount < 0) {
      alert(
        "Discount cannot be negative."
      );
      return;
    }

    if (discount > subtotal) {
      alert(
        "Discount cannot be greater than subtotal."
      );
      return;
    }

    if (paidAmount < 0) {
      alert(
        "Paid amount cannot be negative."
      );
      return;
    }

    if (paidAmount > total) {
      alert(
        "Paid amount cannot be greater than total."
      );
      return;
    }

    onSubmit({
      customerName:
        customerName.trim() ||
        undefined,

      items: saleItems,

      subtotal,

      discount,

      total,

      paidAmount,

      dueAmount,

      paymentStatus,
    });
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/60
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div
        className="
          flex
          max-h-[92dvh]
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
      >
        {/* HEADER */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-slate-200
            px-5
            py-4

            dark:border-slate-800
          "
        >
          <div>
            <h2
              className="
                text-lg
                font-bold
                text-slate-900

                dark:text-white
              "
            >
              Create New Sale
            </h2>

            <p
              className="
                mt-1
                text-xs
                text-slate-500

                dark:text-slate-400
              "
            >
              Add products and complete
              the transaction.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
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
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}

        <div
          className="
            flex-1
            overflow-y-auto
            p-5

            sm:p-6
          "
        >
          <div className="space-y-6">

            {/* CUSTOMER */}

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700

                  dark:text-slate-300
                "
              >
                Customer Name
              </label>

              <input
                type="text"
                value={customerName}
                onChange={(event) =>
                  setCustomerName(
                    event.target.value
                  )
                }
                placeholder="Walk-in Customer"
                className="
                  h-10
                  w-full
                  rounded-lg
                  border
                  border-slate-300
                  bg-white
                  px-3
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
                  dark:placeholder:text-slate-500
                "
              />
            </div>

            {/* ADD PRODUCT */}

            <div>
              <h3
                className="
                  mb-3
                  text-sm
                  font-semibold
                  text-slate-900

                  dark:text-white
                "
              >
                Add Product
              </h3>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-3

                  sm:grid-cols-[1fr_120px_auto]
                "
              >
                <select
                  value={
                    selectedProductId
                  }
                  onChange={(event) =>
                    setSelectedProductId(
                      event.target.value
                    )
                  }
                  className="
                    h-10
                    w-full
                    rounded-lg
                    border
                    border-slate-300
                    bg-white
                    px-3
                    text-sm
                    text-slate-900
                    outline-none

                    focus:border-indigo-500
                    focus:ring-2
                    focus:ring-indigo-500/20

                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                  "
                >
                  <option value="">
                    {availableProducts.length ===
                    0
                      ? "No products available"
                      : "Select a product"}
                  </option>

                  {availableProducts.map(
                    (product) => (
                      <option
                        key={
                          product.id
                        }
                        value={
                          product.id
                        }
                      >
                        {product.name}{" "}
                        — {product.sku}{" "}
                        — Stock:{" "}
                        {
                          product.stockQuantity
                        }{" "}
                        {product.unit}
                      </option>
                    )
                  )}
                </select>

                <input
                  type="number"
                  min={1}
                  max={
                    selectedProduct?.stockQuantity
                  }
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(
                      Number(
                        event.target.value
                      )
                    )
                  }
                  className="
                    h-10
                    w-full
                    rounded-lg
                    border
                    border-slate-300
                    bg-white
                    px-3
                    text-sm
                    text-slate-900
                    outline-none

                    focus:border-indigo-500

                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                  "
                />

                <button
                  type="button"
                  onClick={
                    handleAddProduct
                  }
                  disabled={
                    !selectedProduct
                  }
                  className="
                    inline-flex
                    h-10
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-indigo-600
                    px-4
                    text-sm
                    font-medium
                    text-white

                    hover:bg-indigo-700

                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>

              {selectedProduct && (
                <div
                  className="
                    mt-3
                    rounded-lg
                    bg-slate-50
                    px-3
                    py-2
                    text-xs
                    text-slate-600

                    dark:bg-slate-900
                    dark:text-slate-400
                  "
                >
                  <span className="font-medium">
                    {
                      selectedProduct.name
                    }
                  </span>

                  {" · "}

                  Selling Price: ৳
                  {selectedProduct.sellingPrice.toLocaleString()}

                  {" · "}

                  Available:{" "}
                  {
                    selectedProduct.stockQuantity
                  }{" "}
                  {selectedProduct.unit}
                </div>
              )}
            </div>

            {/* SALE ITEMS */}

            <div>
              <h3
                className="
                  mb-3
                  text-sm
                  font-semibold
                  text-slate-900

                  dark:text-white
                "
              >
                Sale Items
              </h3>

              {saleItems.length === 0 ? (
                <div
                  className="
                    rounded-xl
                    border
                    border-dashed
                    border-slate-300
                    px-5
                    py-10
                    text-center

                    dark:border-slate-700
                  "
                >
                  <p
                    className="
                      text-sm
                      text-slate-500

                      dark:text-slate-400
                    "
                  >
                    No products added yet.
                  </p>
                </div>
              ) : (
                <div
                  className="
                    overflow-hidden
                    rounded-xl
                    border
                    border-slate-200

                    dark:border-slate-800
                  "
                >
                  {saleItems.map(
                    (item) => (
                      <div
                        key={
                          item.productId
                        }
                        className="
                          flex
                          items-center
                          justify-between
                          gap-4
                          border-b
                          border-slate-200
                          p-4
                          last:border-0

                          dark:border-slate-800
                        "
                      >
                        <div className="min-w-0">
                          <p
                            className="
                              truncate
                              text-sm
                              font-medium
                              text-slate-900

                              dark:text-white
                            "
                          >
                            {
                              item.productName
                            }
                          </p>

                          <p
                            className="
                              mt-1
                              text-xs
                              text-slate-500

                              dark:text-slate-400
                            "
                          >
                            {item.quantity} ×
                            ৳
                            {item.unitPrice.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <p
                            className="
                              text-sm
                              font-semibold
                              text-slate-900

                              dark:text-white
                            "
                          >
                            ৳
                            {item.total.toLocaleString()}
                          </p>

                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveProduct(
                                item.productId
                              )
                            }
                            className="
                              rounded-lg
                              p-2
                              text-slate-400

                              hover:bg-red-50
                              hover:text-red-600

                              dark:hover:bg-red-500/10
                              dark:hover:text-red-400
                            "
                          >
                            <Trash2
                              size={16}
                            />
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* PAYMENT */}

            <div
              className="
                ml-auto
                w-full
                max-w-md
                space-y-4
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                p-5

                dark:border-slate-800
                dark:bg-slate-900/50
              "
            >
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Subtotal
                </span>

                <span className="font-medium text-slate-900 dark:text-white">
                  ৳
                  {subtotal.toLocaleString()}
                </span>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-500 dark:text-slate-400">
                  Discount
                </label>

                <input
                  type="number"
                  min={0}
                  max={subtotal}
                  value={discount}
                  onChange={(event) =>
                    setDiscount(
                      Number(
                        event.target.value
                      )
                    )
                  }
                  className="
                    h-10
                    w-full
                    rounded-lg
                    border
                    border-slate-300
                    bg-white
                    px-3
                    text-sm
                    text-slate-900
                    outline-none

                    focus:border-indigo-500

                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                  "
                />
              </div>

              <div className="flex justify-between border-t border-slate-200 pt-3 dark:border-slate-800">
                <span className="font-semibold text-slate-900 dark:text-white">
                  Total
                </span>

                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  ৳
                  {total.toLocaleString()}
                </span>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-500 dark:text-slate-400">
                  Paid Amount
                </label>

                <input
                  type="number"
                  min={0}
                  max={total}
                  value={paidAmount}
                  onChange={(event) =>
                    setPaidAmount(
                      Number(
                        event.target.value
                      )
                    )
                  }
                  className="
                    h-10
                    w-full
                    rounded-lg
                    border
                    border-slate-300
                    bg-white
                    px-3
                    text-sm
                    text-slate-900
                    outline-none

                    focus:border-indigo-500

                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                  "
                />
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Due
                </span>

                <span className="text-sm font-bold text-red-600 dark:text-red-400">
                  ৳
                  {dueAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Status
                </span>

                <span
                  className={`
                    rounded-full
                    px-2.5
                    py-1
                    text-xs
                    font-semibold

                    ${
                      paymentStatus ===
                      "PAID"
                        ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                        : paymentStatus ===
                          "PARTIAL"
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                        : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                    }
                  `}
                >
                  {paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <div
          className="
            flex
            shrink-0
            justify-end
            gap-3
            border-t
            border-slate-200
            px-5
            py-4

            dark:border-slate-800

            sm:px-6
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
              px-5
              text-sm
              font-medium
              text-slate-700

              hover:bg-slate-50

              dark:border-slate-700
              dark:text-slate-300
              dark:hover:bg-slate-900
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              saleItems.length === 0
            }
            className="
              h-10
              rounded-lg
              bg-indigo-600
              px-5
              text-sm
              font-medium
              text-white

              hover:bg-indigo-700

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Complete Sale
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleForm;