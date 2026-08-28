import {
  Minus,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import { useMemo, useState } from "react";

import { useAppSelector } from "../../../hooks/usAppSelector";

import type { SaleItem } from "../salesTypes";

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
    paymentStatus:
      | "PAID"
      | "PARTIAL"
      | "DUE";
  }) => void;
}

const SaleForm = ({
  onClose,
  onSubmit,
}: SaleFormProps) => {
  const products = useAppSelector(
    (state) => state.products.products
  );

  const [customerName, setCustomerName] =
    useState("");

  const [selectedProductId, setSelectedProductId] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  const [items, setItems] =
    useState<SaleItem[]>([]);

  const [discount, setDiscount] =
    useState(0);

  const [paidAmount, setPaidAmount] =
    useState(0);

  const selectedProduct = products.find(
    (product) =>
      product.id === selectedProductId
  );

  // =========================================
  // CALCULATIONS
  // =========================================

  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + item.total,
      0
    );
  }, [items]);

  const total = Math.max(
    subtotal - discount,
    0
  );

  const dueAmount = Math.max(
    total - paidAmount,
    0
  );

  const paymentStatus =
    paidAmount >= total && total > 0
      ? "PAID"
      : paidAmount > 0
      ? "PARTIAL"
      : "DUE";

  // =========================================
  // ADD PRODUCT
  // =========================================

  const handleAddProduct = () => {
    if (!selectedProduct) {
      return;
    }

    if (selectedProduct.status !== "active") {
      alert(
        "This product is inactive and cannot be sold."
      );

      return;
    }

    if (quantity <= 0) {
      alert(
        "Quantity must be greater than zero."
      );

      return;
    }

    const existingItem =
      items.find(
        (item) =>
          item.productId ===
          selectedProduct.id
      );

    const existingQuantity =
      existingItem?.quantity ?? 0;

    const newQuantity =
      existingQuantity + quantity;

    if (
      newQuantity >
      selectedProduct.stockQuantity
    ) {
      alert(
        `Only ${selectedProduct.stockQuantity} ${selectedProduct.unit} available in stock.`
      );

      return;
    }

    if (existingItem) {
      setItems(
        items.map((item) =>
          item.productId ===
          selectedProduct.id
            ? {
                ...item,
                quantity: newQuantity,
                total:
                  newQuantity *
                  item.unitPrice,
              }
            : item
        )
      );
    } else {
      const newItem: SaleItem = {
        productId:
          selectedProduct.id,

        productName:
          selectedProduct.name,

        quantity,

        unitPrice:
          selectedProduct.sellingPrice,

        total:
          quantity *
          selectedProduct.sellingPrice,
      };

      setItems([
        ...items,
        newItem,
      ]);
    }

    setSelectedProductId("");
    setQuantity(1);
  };

  // =========================================
  // UPDATE QUANTITY
  // =========================================

  const handleQuantityChange = (
    productId: string,
    newQuantity: number
  ) => {
    const product = products.find(
      (item) =>
        item.id === productId
    );

    if (!product) {
      return;
    }

    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    if (
      newQuantity >
      product.stockQuantity
    ) {
      alert(
        `Only ${product.stockQuantity} ${product.unit} available in stock.`
      );

      return;
    }

    setItems(
      items.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: newQuantity,
              total:
                newQuantity *
                item.unitPrice,
            }
          : item
      )
    );
  };

  // =========================================
  // REMOVE PRODUCT
  // =========================================

  const handleRemoveItem = (
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
  // SUBMIT SALE
  // =========================================

  const handleSubmit = () => {
    if (items.length === 0) {
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
        "Paid amount cannot be greater than the total."
      );

      return;
    }

    onSubmit({
      customerName:
        customerName.trim() ||
        undefined,

      items,

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
    >
      <div
        className="
          flex
          max-h-[95dvh]
          w-full
          max-w-4xl
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
        {/* =========================================
            HEADER
        ========================================= */}

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

            sm:px-6
          "
        >
          <div>
            <h2
              className="
                text-lg
                font-semibold
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

        {/* =========================================
            BODY
        ========================================= */}

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
                htmlFor="customerName"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700

                  dark:text-slate-300
                "
              >
                Customer
              </label>

              <input
                id="customerName"
                type="text"
                value={customerName}
                onChange={(event) =>
                  setCustomerName(
                    event.target.value
                  )
                }
                placeholder="Walk-in Customer"
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

            {/* =====================================
                PRODUCT SELECTOR
            ===================================== */}

            <div
              className="
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                p-4

                dark:border-slate-800
                dark:bg-slate-900/50
              "
            >
              <h3
                className="
                  mb-4
                  text-sm
                  font-semibold
                  text-slate-900

                  dark:text-white
                "
              >
                Add Products
              </h3>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-3

                  md:grid-cols-[1fr_140px_auto]
                "
              >
                <select
                  value={selectedProductId}
                  onChange={(event) =>
                    setSelectedProductId(
                      event.target.value
                    )
                  }
                  className="
                    h-11
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
                    Select a product
                  </option>

                  {products
                    .filter(
                      (product) =>
                        product.status ===
                        "active"
                    )
                    .map((product) => (
                      <option
                        key={product.id}
                        value={product.id}
                      >
                        {product.name} — ৳
                        {product.sellingPrice}
                        {" "}
                        ({product.stockQuantity}{" "}
                        {product.unit} available)
                      </option>
                    ))}
                </select>

                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(
                      Math.max(
                        1,
                        Number(
                          event.target.value
                        )
                      )
                    )
                  }
                  className="
                    h-11
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
                />

                <button
                  type="button"
                  onClick={
                    handleAddProduct
                  }
                  className="
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-indigo-600
                    px-5
                    text-sm
                    font-medium
                    text-white
                    transition

                    hover:bg-indigo-700

                    focus:outline-none
                    focus:ring-2
                    focus:ring-indigo-500/30
                  "
                >
                  <Plus size={17} />
                  Add
                </button>
              </div>

              {selectedProduct && (
                <div
                  className="
                    mt-3
                    text-xs
                    text-slate-500

                    dark:text-slate-400
                  "
                >
                  Available stock:{" "}
                  <span className="
                    font-medium
                    text-slate-700

                    dark:text-slate-200
                  ">
                    {selectedProduct.stockQuantity}{" "}
                    {selectedProduct.unit}
                  </span>
                </div>
              )}
            </div>

            {/* =====================================
                SELECTED PRODUCTS
            ===================================== */}

            <div>
              <div
                className="
                  mb-3
                  flex
                  items-center
                  justify-between
                "
              >
                <h3
                  className="
                    text-sm
                    font-semibold
                    text-slate-900

                    dark:text-white
                  "
                >
                  Sale Items
                </h3>

                <span
                  className="
                    text-xs
                    text-slate-500

                    dark:text-slate-400
                  "
                >
                  {items.length}{" "}
                  {items.length === 1
                    ? "item"
                    : "items"}
                </span>
              </div>

              {items.length === 0 ? (
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
                  {/* DESKTOP */}

                  <div className="
                    hidden
                    md:block
                  ">
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
                          <th className="
                            px-4
                            py-3
                            text-left
                            text-xs
                            font-semibold
                            text-slate-500

                            dark:text-slate-400
                          ">
                            Product
                          </th>

                          <th className="
                            px-4
                            py-3
                            text-right
                            text-xs
                            font-semibold
                            text-slate-500

                            dark:text-slate-400
                          ">
                            Price
                          </th>

                          <th className="
                            px-4
                            py-3
                            text-center
                            text-xs
                            font-semibold
                            text-slate-500

                            dark:text-slate-400
                          ">
                            Quantity
                          </th>

                          <th className="
                            px-4
                            py-3
                            text-right
                            text-xs
                            font-semibold
                            text-slate-500

                            dark:text-slate-400
                          ">
                            Total
                          </th>

                          <th className="
                            w-12
                            px-4
                            py-3
                          " />
                        </tr>
                      </thead>

                      <tbody>
                        {items.map(
                          (item) => (
                            <tr
                              key={
                                item.productId
                              }
                              className="
                                border-b
                                border-slate-100
                                last:border-0

                                dark:border-slate-800
                              "
                            >
                              <td className="
                                px-4
                                py-4
                              ">
                                <p className="
                                  text-sm
                                  font-medium
                                  text-slate-900

                                  dark:text-white
                                ">
                                  {
                                    item.productName
                                  }
                                </p>
                              </td>

                              <td className="
                                px-4
                                py-4
                                text-right
                                text-sm
                                text-slate-600

                                dark:text-slate-300
                              ">
                                ৳
                                {item.unitPrice.toLocaleString()}
                              </td>

                              <td className="
                                px-4
                                py-4
                              ">
                                <div className="
                                  mx-auto
                                  flex
                                  w-fit
                                  items-center
                                  rounded-lg
                                  border
                                  border-slate-200

                                  dark:border-slate-700
                                ">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.productId,
                                        item.quantity -
                                          1
                                      )
                                    }
                                    className="
                                      p-2
                                      text-slate-500
                                      hover:text-slate-900

                                      dark:text-slate-400
                                      dark:hover:text-white
                                    "
                                  >
                                    <Minus
                                      size={14}
                                    />
                                  </button>

                                  <span className="
                                    min-w-8
                                    text-center
                                    text-sm
                                    font-medium
                                    text-slate-900

                                    dark:text-white
                                  ">
                                    {
                                      item.quantity
                                    }
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.productId,
                                        item.quantity +
                                          1
                                      )
                                    }
                                    className="
                                      p-2
                                      text-slate-500
                                      hover:text-slate-900

                                      dark:text-slate-400
                                      dark:hover:text-white
                                    "
                                  >
                                    <Plus
                                      size={14}
                                    />
                                  </button>
                                </div>
                              </td>

                              <td className="
                                px-4
                                py-4
                                text-right
                                text-sm
                                font-semibold
                                text-slate-900

                                dark:text-white
                              ">
                                ৳
                                {item.total.toLocaleString()}
                              </td>

                              <td className="
                                px-4
                                py-4
                              ">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveItem(
                                      item.productId
                                    )
                                  }
                                  className="
                                    rounded-lg
                                    p-2
                                    text-slate-400
                                    transition

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
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>

                    </table>
                  </div>

                  {/* MOBILE */}

                  <div className="
                    divide-y
                    divide-slate-200

                    dark:divide-slate-800

                    md:hidden
                  ">
                    {items.map(
                      (item) => (
                        <div
                          key={
                            item.productId
                          }
                          className="p-4"
                        >
                          <div className="
                            flex
                            items-start
                            justify-between
                            gap-3
                          ">
                            <div>
                              <p className="
                                text-sm
                                font-medium
                                text-slate-900

                                dark:text-white
                              ">
                                {
                                  item.productName
                                }
                              </p>

                              <p className="
                                mt-1
                                text-xs
                                text-slate-500

                                dark:text-slate-400
                              ">
                                ৳
                                {item.unitPrice.toLocaleString()}
                                {" "}per unit
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveItem(
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

                          <div className="
                            mt-4
                            flex
                            items-center
                            justify-between
                          ">
                            <div className="
                              flex
                              items-center
                              rounded-lg
                              border
                              border-slate-200

                              dark:border-slate-700
                            ">
                              <button
                                type="button"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.productId,
                                    item.quantity -
                                      1
                                  )
                                }
                                className="p-2"
                              >
                                <Minus
                                  size={14}
                                />
                              </button>

                              <span className="
                                min-w-8
                                text-center
                                text-sm
                                font-medium
                                text-slate-900

                                dark:text-white
                              ">
                                {
                                  item.quantity
                                }
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.productId,
                                    item.quantity +
                                      1
                                  )
                                }
                                className="p-2"
                              >
                                <Plus
                                  size={14}
                                />
                              </button>
                            </div>

                            <p className="
                              text-sm
                              font-semibold
                              text-slate-900

                              dark:text-white
                            ">
                              ৳
                              {item.total.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* =====================================
                PAYMENT SUMMARY
            ===================================== */}

            <div
              className="
                ml-auto
                w-full
                max-w-md
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                p-5

                dark:border-slate-800
                dark:bg-slate-900/50
              "
            >
              <h3
                className="
                  mb-4
                  text-sm
                  font-semibold
                  text-slate-900

                  dark:text-white
                "
              >
                Payment Summary
              </h3>

              <div className="space-y-3">

                <div className="
                  flex
                  justify-between
                  text-sm
                ">
                  <span className="
                    text-slate-500

                    dark:text-slate-400
                  ">
                    Subtotal
                  </span>

                  <span className="
                    font-medium
                    text-slate-900

                    dark:text-white
                  ">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="
                  flex
                  items-center
                  justify-between
                  gap-4
                ">
                  <label
                    htmlFor="discount"
                    className="
                      text-sm
                      text-slate-500

                      dark:text-slate-400
                    "
                  >
                    Discount
                  </label>

                  <input
                    id="discount"
                    type="number"
                    min={0}
                    max={subtotal}
                    value={discount}
                    onChange={(event) =>
                      setDiscount(
                        Math.max(
                          0,
                          Number(
                            event.target.value
                          )
                        )
                      )
                    }
                    className="
                      h-9
                      w-28
                      rounded-lg
                      border
                      border-slate-300
                      bg-white
                      px-2
                      text-right
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

                <div className="
                  border-t
                  border-slate-200
                  pt-3

                  dark:border-slate-800
                ">
                  <div className="
                    flex
                    justify-between
                  ">
                    <span className="
                      text-sm
                      font-semibold
                      text-slate-900

                      dark:text-white
                    ">
                      Total
                    </span>

                    <span className="
                      text-lg
                      font-bold
                      text-indigo-600

                      dark:text-indigo-400
                    ">
                      ৳{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="
                  flex
                  items-center
                  justify-between
                  gap-4
                ">
                  <label
                    htmlFor="paidAmount"
                    className="
                      text-sm
                      text-slate-500

                      dark:text-slate-400
                    "
                  >
                    Paid Amount
                  </label>

                  <input
                    id="paidAmount"
                    type="number"
                    min={0}
                    max={total}
                    value={paidAmount}
                    onChange={(event) =>
                      setPaidAmount(
                        Math.max(
                          0,
                          Number(
                            event.target.value
                          )
                        )
                      )
                    }
                    className="
                      h-9
                      w-28
                      rounded-lg
                      border
                      border-slate-300
                      bg-white
                      px-2
                      text-right
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

                <div className="
                  flex
                  justify-between
                  border-t
                  border-slate-200
                  pt-3

                  dark:border-slate-800
                ">
                  <span className="
                    text-sm
                    text-slate-500

                    dark:text-slate-400
                  ">
                    Due
                  </span>

                  <span className="
                    text-sm
                    font-bold
                    text-red-600

                    dark:text-red-400
                  ">
                    ৳{dueAmount.toLocaleString()}
                  </span>
                </div>

                <div className="
                  flex
                  items-center
                  justify-between
                  pt-1
                ">
                  <span className="
                    text-sm
                    text-slate-500

                    dark:text-slate-400
                  ">
                    Payment Status
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
        </div>

        {/* =========================================
            FOOTER
        ========================================= */}

        <div
          className="
            flex
            shrink-0
            flex-col-reverse
            gap-3
            border-t
            border-slate-200
            bg-white
            p-4

            dark:border-slate-800
            dark:bg-slate-950

            sm:flex-row
            sm:justify-end
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
              transition

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
            className="
              h-10
              rounded-lg
              bg-indigo-600
              px-5
              text-sm
              font-medium
              text-white
              transition

              hover:bg-indigo-700

              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500/30
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