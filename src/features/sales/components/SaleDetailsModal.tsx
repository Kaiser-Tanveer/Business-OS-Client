import {
  CalendarDays,
  ReceiptText,
  UserRound,
  X,
} from "lucide-react";

import type { Sale } from "../salesTypes";

interface SaleDetailsModalProps {
  sale: Sale;
  onClose: () => void;
}

const SaleDetailsModal = ({
  sale,
  onClose,
}: SaleDetailsModalProps) => {
  const formattedDate =
    new Date(
      sale.createdAt
    ).toLocaleString("en-BD", {
      dateStyle: "medium",
      timeStyle: "short",
    });

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
        if (event.target === event.currentTarget) {
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
        {/* =====================================
            HEADER
        ===================================== */}

        <div
          className="
            flex
            shrink-0
            items-start
            justify-between
            border-b
            border-slate-200
            px-5
            py-5

            dark:border-slate-800

            sm:px-6
          "
        >
          <div className="flex items-start gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-indigo-50
                text-indigo-600

                dark:bg-indigo-500/10
                dark:text-indigo-400
              "
            >
              <ReceiptText size={20} />
            </div>

            <div>
              <p
                className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Sales Invoice
              </p>

              <h2
                className="
                  mt-1
                  text-lg
                  font-bold
                  text-slate-900

                  dark:text-white
                "
              >
                {sale.invoiceNumber}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
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

        {/* =====================================
            BODY
        ===================================== */}

        <div
          className="
            flex-1
            overflow-y-auto
            p-5

            sm:p-6
          "
        >
          <div className="space-y-6">

            {/* =================================
                SALE INFORMATION
            ================================= */}

            <div
              className="
                grid
                grid-cols-1
                gap-4

                sm:grid-cols-2
              "
            >
              {/* CUSTOMER */}

              <div
                className="
                  rounded-xl
                  border
                  border-slate-200
                  p-4

                  dark:border-slate-800
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      bg-slate-100
                      text-slate-600

                      dark:bg-slate-800
                      dark:text-slate-300
                    "
                  >
                    <UserRound size={17} />
                  </div>

                  <div>
                    <p
                      className="
                        text-xs
                        text-slate-500

                        dark:text-slate-400
                      "
                    >
                      Customer
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-sm
                        font-medium
                        text-slate-900

                        dark:text-white
                      "
                    >
                      {sale.customerName ||
                        "Walk-in Customer"}
                    </p>
                  </div>
                </div>
              </div>

              {/* DATE */}

              <div
                className="
                  rounded-xl
                  border
                  border-slate-200
                  p-4

                  dark:border-slate-800
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      bg-slate-100
                      text-slate-600

                      dark:bg-slate-800
                      dark:text-slate-300
                    "
                  >
                    <CalendarDays size={17} />
                  </div>

                  <div>
                    <p
                      className="
                        text-xs
                        text-slate-500

                        dark:text-slate-400
                      "
                    >
                      Date
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-sm
                        font-medium
                        text-slate-900

                        dark:text-white
                      "
                    >
                      {formattedDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================
                PRODUCTS
            ================================= */}

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
                Products
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
                {/* DESKTOP */}

                <div className="hidden md:block">
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
                            px-4
                            py-3
                            text-left
                            text-xs
                            font-semibold
                            text-slate-500

                            dark:text-slate-400
                          "
                        >
                          Product
                        </th>

                        <th
                          className="
                            px-4
                            py-3
                            text-center
                            text-xs
                            font-semibold
                            text-slate-500

                            dark:text-slate-400
                          "
                        >
                          Quantity
                        </th>

                        <th
                          className="
                            px-4
                            py-3
                            text-right
                            text-xs
                            font-semibold
                            text-slate-500

                            dark:text-slate-400
                          "
                        >
                          Unit Price
                        </th>

                        <th
                          className="
                            px-4
                            py-3
                            text-right
                            text-xs
                            font-semibold
                            text-slate-500

                            dark:text-slate-400
                          "
                        >
                          Total
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {sale.items.map(
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
                            <td className="px-4 py-4">
                              <p
                                className="
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
                            </td>

                            <td
                              className="
                                px-4
                                py-4
                                text-center
                                text-sm
                                text-slate-600

                                dark:text-slate-300
                              "
                            >
                              {item.quantity}
                            </td>

                            <td
                              className="
                                px-4
                                py-4
                                text-right
                                text-sm
                                text-slate-600

                                dark:text-slate-300
                              "
                            >
                              ৳
                              {item.unitPrice.toLocaleString()}
                            </td>

                            <td
                              className="
                                px-4
                                py-4
                                text-right
                                text-sm
                                font-semibold
                                text-slate-900

                                dark:text-white
                              "
                            >
                              ৳
                              {item.total.toLocaleString()}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>

                  </table>
                </div>

                {/* MOBILE */}

                <div
                  className="
                    divide-y
                    divide-slate-200

                    dark:divide-slate-800

                    md:hidden
                  "
                >
                  {sale.items.map(
                    (item) => (
                      <div
                        key={
                          item.productId
                        }
                        className="p-4"
                      >
                        <div
                          className="
                            flex
                            items-start
                            justify-between
                            gap-4
                          "
                        >
                          <div>
                            <p
                              className="
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
                              {item.quantity} × ৳
                              {item.unitPrice.toLocaleString()}
                            </p>
                          </div>

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
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* =================================
                PAYMENT SUMMARY
            ================================= */}

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

                <div className="flex justify-between">
                  <span
                    className="
                      text-sm
                      text-slate-500

                      dark:text-slate-400
                    "
                  >
                    Subtotal
                  </span>

                  <span
                    className="
                      text-sm
                      font-medium
                      text-slate-900

                      dark:text-white
                    "
                  >
                    ৳
                    {sale.subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span
                    className="
                      text-sm
                      text-slate-500

                      dark:text-slate-400
                    "
                  >
                    Discount
                  </span>

                  <span
                    className="
                      text-sm
                      font-medium
                      text-slate-900

                      dark:text-white
                    "
                  >
                    − ৳
                    {sale.discount.toLocaleString()}
                  </span>
                </div>

                <div
                  className="
                    border-t
                    border-slate-200
                    pt-3

                    dark:border-slate-800
                  "
                >
                  <div className="flex justify-between">
                    <span
                      className="
                        text-sm
                        font-semibold
                        text-slate-900

                        dark:text-white
                      "
                    >
                      Total
                    </span>

                    <span
                      className="
                        text-lg
                        font-bold
                        text-indigo-600

                        dark:text-indigo-400
                      "
                    >
                      ৳
                      {sale.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span
                    className="
                      text-sm
                      text-slate-500

                      dark:text-slate-400
                    "
                  >
                    Paid
                  </span>

                  <span
                    className="
                      text-sm
                      font-medium
                      text-green-600

                      dark:text-green-400
                    "
                  >
                    ৳
                    {sale.paidAmount.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span
                    className="
                      text-sm
                      text-slate-500

                      dark:text-slate-400
                    "
                  >
                    Due
                  </span>

                  <span
                    className="
                      text-sm
                      font-bold
                      text-red-600

                      dark:text-red-400
                    "
                  >
                    ৳
                    {sale.dueAmount.toLocaleString()}
                  </span>
                </div>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-t
                    border-slate-200
                    pt-3

                    dark:border-slate-800
                  "
                >
                  <span
                    className="
                      text-sm
                      text-slate-500

                      dark:text-slate-400
                    "
                  >
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
                        sale.paymentStatus ===
                        "PAID"
                          ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                          : sale.paymentStatus ===
                            "PARTIAL"
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                          : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                      }
                    `}
                  >
                    {sale.paymentStatus}
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* =====================================
            FOOTER
        ===================================== */}

        <div
          className="
            flex
            shrink-0
            justify-end
            border-t
            border-slate-200
            bg-white
            px-5
            py-4

            dark:border-slate-800
            dark:bg-slate-950

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
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default SaleDetailsModal;