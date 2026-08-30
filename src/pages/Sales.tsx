import { Plus, ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/usAppSelector";

import { addSale } from "../features/sales/salesSlice";

import type {
  PaymentStatus,
  Sale,
} from "../features/sales/salesTypes";

import SaleForm from "../features/sales/components/SaleForm";
import { updateProductStock } from "../features/products/productSlice";
import SaleDetailsModal from "../features/sales/components/SaleDetailsModal";

const Sales = () => {
  const dispatch = useAppDispatch();


  
  const sales = useAppSelector(
    (state) => state.sales.sales
  );
  
  const [showSaleForm, setShowSaleForm] =
    useState(false);
  
    const [selectedSale, setSelectedSale] =
    useState<Sale | null>(null);

  // =========================================
  // STATISTICS
  // =========================================

  const statistics = useMemo(() => {
    const totalSales = sales.reduce(
      (sum, sale) =>
        sum + sale.total,
      0
    );

    const totalPaid = sales.reduce(
      (sum, sale) =>
        sum + sale.paidAmount,
      0
    );

    const totalDue = sales.reduce(
      (sum, sale) =>
        sum + sale.dueAmount,
      0
    );

    return {
      totalSales,
      totalPaid,
      totalDue,
      totalOrders: sales.length,
    };
  }, [sales]);

  // =========================================
  // CREATE SALE
  // =========================================

  const handleCreateSale = (data: {
  customerName?: string;
  items: Sale["items"];
  subtotal: number;
  discount: number;
  total: number;
  paidAmount: number;
  dueAmount: number;
  paymentStatus: PaymentStatus;
}) => {
  // =========================================
  // FINAL STOCK VALIDATION
  // =========================================

  const products = useAppSelector(
    (state) => state.products.products
  );

  for (const item of data.items) {
    const product = products.find(
      (product) =>
        product.id === item.productId
    );

    if (!product) {
      alert(
        `Product "${item.productName}" no longer exists.`
      );

      return;
    }

    if (
      item.quantity >
      product.stockQuantity
    ) {
      alert(
        `Insufficient stock for "${product.name}". Available: ${product.stockQuantity} ${product.unit}.`
      );

      return;
    }
  }

  // =========================================
  // CREATE SALE
  // =========================================

  const now =
    new Date().toISOString();

  const sale: Sale = {
    id: crypto.randomUUID(),

    invoiceNumber:
      `INV-${Date.now()}`,

    customerName:
      data.customerName,

    items: data.items,

    subtotal:
      data.subtotal,

    discount:
      data.discount,

    total:
      data.total,

    paidAmount:
      data.paidAmount,

    dueAmount:
      data.dueAmount,

    paymentStatus:
      data.paymentStatus,

    createdAt: now,

    updatedAt: now,
  };

  // =========================================
  // SAVE SALE
  // =========================================

  dispatch(addSale(sale));

  // =========================================
  // REDUCE STOCK
  // =========================================

  data.items.forEach((item) => {
    const product = products.find(
      (product) =>
        product.id === item.productId
    );

    if (!product) {
      return;
    }

    const newStock =
      product.stockQuantity -
      item.quantity;

    dispatch(
      updateProductStock({
        productId: product.id,
        quantity: newStock,
      })
    );
  });

  // =========================================
  // CLOSE FORM
  // =========================================

  setShowSaleForm(false);
};

  return (
    <div className="space-y-6">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <div
        className="
          flex
          flex-col
          gap-4

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <h1
            className="
              text-2xl
              font-bold
              tracking-tight
              text-slate-900

              dark:text-white
            "
          >
            Sales
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-slate-500

              dark:text-slate-400
            "
          >
            Manage sales transactions
            and customer payments.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setShowSaleForm(true)
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
            transition

            hover:bg-indigo-700

            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500/30
          "
        >
          <Plus size={17} />

          New Sale
        </button>
      </div>

      {/* =====================================
          STATISTICS
      ===================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-4

          sm:grid-cols-2
          lg:grid-cols-4
        "
      >

        {/* TOTAL SALES */}

        <div
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-5

            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <p
            className="
              text-sm
              text-slate-500

              dark:text-slate-400
            "
          >
            Total Sales
          </p>

          <p
            className="
              mt-2
              text-2xl
              font-bold
              text-slate-900

              dark:text-white
            "
          >
            ৳
            {statistics.totalSales.toLocaleString()}
          </p>
        </div>

        {/* PAID */}

        <div
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-5

            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <p
            className="
              text-sm
              text-slate-500

              dark:text-slate-400
            "
          >
            Paid
          </p>

          <p
            className="
              mt-2
              text-2xl
              font-bold
              text-green-600

              dark:text-green-400
            "
          >
            ৳
            {statistics.totalPaid.toLocaleString()}
          </p>
        </div>

        {/* DUE */}

        <div
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-5

            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <p
            className="
              text-sm
              text-slate-500

              dark:text-slate-400
            "
          >
            Due
          </p>

          <p
            className="
              mt-2
              text-2xl
              font-bold
              text-red-600

              dark:text-red-400
            "
          >
            ৳
            {statistics.totalDue.toLocaleString()}
          </p>
        </div>

        {/* ORDERS */}

        <div
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-5

            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <p
            className="
              text-sm
              text-slate-500

              dark:text-slate-400
            "
          >
            Total Orders
          </p>

          <p
            className="
              mt-2
              text-2xl
              font-bold
              text-slate-900

              dark:text-white
            "
          >
            {statistics.totalOrders}
          </p>
        </div>

      </div>

      {/* =====================================
          SALES TABLE
      ===================================== */}

      <div
        className="
          overflow-hidden
          rounded-xl
          border
          border-slate-200
          bg-white

          dark:border-slate-800
          dark:bg-slate-900
        "
      >

        {/* TABLE HEADER */}

        <div
          className="
            border-b
            border-slate-200
            px-5
            py-4

            dark:border-slate-800
          "
        >
          <h2
            className="
              text-sm
              font-semibold
              text-slate-900

              dark:text-white
            "
          >
            Sales Transactions
          </h2>
        </div>

        {/* EMPTY STATE */}

        {sales.length === 0 ? (
          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              px-6
              py-16
              text-center
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-slate-100
                text-slate-500

                dark:bg-slate-800
                dark:text-slate-400
              "
            >
              <ShoppingCart
                size={22}
              />
            </div>

            <h3
              className="
                mt-4
                text-sm
                font-semibold
                text-slate-900

                dark:text-white
              "
            >
              No sales found
            </h3>

            <p
              className="
                mt-1
                max-w-sm
                text-sm
                text-slate-500

                dark:text-slate-400
              "
            >
              Start by creating your
              first sale transaction.
            </p>

            <button
              type="button"
              onClick={() =>
                setShowSaleForm(true)
              }
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-indigo-600
                px-4
                py-2
                text-sm
                font-medium
                text-white

                hover:bg-indigo-700
              "
            >
              <Plus size={16} />

              Create Sale
            </button>
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE */}

            <div className="hidden overflow-x-auto md:block">

              <table className="w-full">

                <thead>
                  <tr
                    className="
                      border-b
                      border-slate-200
                      bg-slate-50

                      dark:border-slate-800
                      dark:bg-slate-950/50
                    "
                  >
                    <th className="
                      px-5
                      py-3
                      text-left
                      text-xs
                      font-semibold
                      text-slate-500

                      dark:text-slate-400
                    ">
                      Invoice
                    </th>

                    <th className="
                      px-5
                      py-3
                      text-left
                      text-xs
                      font-semibold
                      text-slate-500

                      dark:text-slate-400
                    ">
                      Customer
                    </th>

                    <th className="
                      px-5
                      py-3
                      text-center
                      text-xs
                      font-semibold
                      text-slate-500

                      dark:text-slate-400
                    ">
                      Items
                    </th>

                    <th className="
                      px-5
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
                      px-5
                      py-3
                      text-right
                      text-xs
                      font-semibold
                      text-slate-500

                      dark:text-slate-400
                    ">
                      Paid
                    </th>

                    <th className="
                      px-5
                      py-3
                      text-right
                      text-xs
                      font-semibold
                      text-slate-500

                      dark:text-slate-400
                    ">
                      Due
                    </th>

                    <th className="
                      px-5
                      py-3
                      text-center
                      text-xs
                      font-semibold
                      text-slate-500

                      dark:text-slate-400
                    ">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {sales.map(
                    (sale) => (
                      <tr
                        key={sale.id}
                        className="
                          border-b
                          border-slate-100
                          last:border-0

                          dark:border-slate-800
                        "
                      >

                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedSale(sale)
                            }
                            className="
                              text-sm
                              font-semibold
                              text-indigo-600
                              transition
                              hover:text-indigo-700
                              hover:underline

                              dark:text-indigo-400
                              dark:hover:text-indigo-300
                            "
                          >
                            {sale.invoiceNumber}
                          </button>
                        </td>

                        <td className="
                          px-5
                          py-4
                          text-sm
                          text-slate-600

                          dark:text-slate-300
                        ">
                          {sale.customerName ||
                            "Walk-in Customer"}
                        </td>

                        <td className="
                          px-5
                          py-4
                          text-center
                          text-sm
                          text-slate-600

                          dark:text-slate-300
                        ">
                          {sale.items.length}
                        </td>

                        <td className="
                          px-5
                          py-4
                          text-right
                          text-sm
                          font-semibold
                          text-slate-900

                          dark:text-white
                        ">
                          ৳
                          {sale.total.toLocaleString()}
                        </td>

                        <td className="
                          px-5
                          py-4
                          text-right
                          text-sm
                          text-green-600

                          dark:text-green-400
                        ">
                          ৳
                          {sale.paidAmount.toLocaleString()}
                        </td>

                        <td className="
                          px-5
                          py-4
                          text-right
                          text-sm
                          text-red-600

                          dark:text-red-400
                        ">
                          ৳
                          {sale.dueAmount.toLocaleString()}
                        </td>

                        <td className="
                          px-5
                          py-4
                          text-center
                        ">
                          <span
                            className={`
                              inline-flex
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
                            {
                              sale.paymentStatus
                            }
                          </span>
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

            {/* MOBILE CARDS */}

            <div
              className="
                divide-y
                divide-slate-200

                dark:divide-slate-800

                md:hidden
              "
            >
              {sales.map(
                (sale) => (
                  <div
                    key={sale.id}
                    className="p-5"
                  >
                    <div className="
                      flex
                      items-start
                      justify-between
                      gap-3
                    ">
                      <div>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedSale(sale)
                          }
                          className="
                            text-sm
                            font-semibold
                            text-indigo-600
                            hover:underline

                            dark:text-indigo-400
                          "
                        >
                          {sale.invoiceNumber}
                        </button>

                        <p className="
                          mt-1
                          text-xs
                          text-slate-500

                          dark:text-slate-400
                        ">
                          {sale.customerName ||
                            "Walk-in Customer"}
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

                    <div className="
                      mt-4
                      grid
                      grid-cols-2
                      gap-3
                    ">

                      <div>
                        <p className="
                          text-xs
                          text-slate-500

                          dark:text-slate-400
                        ">
                          Total
                        </p>

                        <p className="
                          mt-1
                          text-sm
                          font-semibold
                          text-slate-900

                          dark:text-white
                        ">
                          ৳
                          {sale.total.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="
                          text-xs
                          text-slate-500

                          dark:text-slate-400
                        ">
                          Items
                        </p>

                        <p className="
                          mt-1
                          text-sm
                          font-semibold
                          text-slate-900

                          dark:text-white
                        ">
                          {sale.items.length}
                        </p>
                      </div>

                      <div>
                        <p className="
                          text-xs
                          text-slate-500

                          dark:text-slate-400
                        ">
                          Paid
                        </p>

                        <p className="
                          mt-1
                          text-sm
                          font-semibold
                          text-green-600

                          dark:text-green-400
                        ">
                          ৳
                          {sale.paidAmount.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="
                          text-xs
                          text-slate-500

                          dark:text-slate-400
                        ">
                          Due
                        </p>

                        <p className="
                          mt-1
                          text-sm
                          font-semibold
                          text-red-600

                          dark:text-red-400
                        ">
                          ৳
                          {sale.dueAmount.toLocaleString()}
                        </p>
                      </div>

                    </div>
                  </div>
                )
              )}
            </div>
          </>
        )}

      </div>

      {/* =====================================
          SALE FORM
      ===================================== */}

      {showSaleForm && (
          <SaleForm
            onClose={() =>
              setShowSaleForm(false)
            }
            onSubmit={handleCreateSale}
          />
        )}

        {selectedSale && (
          <SaleDetailsModal
            sale={selectedSale}
            onClose={() =>
              setSelectedSale(null)
            }
          />
        )}

    </div>
  );
};

export default Sales;