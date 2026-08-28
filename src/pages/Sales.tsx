import {
  CalendarDays,
  CircleDollarSign,
  CreditCard,
  Plus,
  Receipt,
  Search,
  Wallet,
} from "lucide-react";

import { useMemo, useState } from "react";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

import { useAppSelector } from "../assets/hooks/useAppSelector";

const Sales = () => {
  const sales = useAppSelector(
    (state) => state.sales.sales
  );

  const [search, setSearch] = useState("");

  const filteredSales = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return sales;
    }

    return sales.filter(
      (sale) =>
        sale.invoiceNumber
          .toLowerCase()
          .includes(query) ||
        sale.customerName
          ?.toLowerCase()
          .includes(query)
    );
  }, [sales, search]);

  const totalSales = useMemo(
    () =>
      sales.reduce(
        (total, sale) =>
          total + sale.total,
        0
      ),
    [sales]
  );

  const totalPaid = useMemo(
    () =>
      sales.reduce(
        (total, sale) =>
          total + sale.paidAmount,
        0
      ),
    [sales]
  );

  const totalDue = useMemo(
    () =>
      sales.reduce(
        (total, sale) =>
          total + sale.dueAmount,
        0
      ),
    [sales]
  );

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}

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
            Manage your sales and
            customer transactions.
          </p>
        </div>

        <Button
          className="
            w-full
            sm:w-auto
          "
        >
          <Plus size={17} />
          New Sale
        </Button>
      </div>

      {/* STATISTICS */}

      <div
        className="
          grid
          grid-cols-1
          gap-4

          sm:grid-cols-2
          xl:grid-cols-4
        "
      >

        {/* TOTAL SALES */}

        <Card className="p-5">

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>
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
                ৳{totalSales.toLocaleString()}
              </p>
            </div>

            <div
              className="
                rounded-xl
                bg-indigo-50
                p-3

                dark:bg-indigo-500/10
              "
            >
              <CircleDollarSign
                size={21}
                className="
                  text-indigo-600

                  dark:text-indigo-400
                "
              />
            </div>

          </div>

        </Card>

        {/* PAID */}

        <Card className="p-5">

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>
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
                ৳{totalPaid.toLocaleString()}
              </p>
            </div>

            <div
              className="
                rounded-xl
                bg-green-50
                p-3

                dark:bg-green-500/10
              "
            >
              <Wallet
                size={21}
                className="
                  text-green-600

                  dark:text-green-400
                "
              />
            </div>

          </div>

        </Card>

        {/* DUE */}

        <Card className="p-5">

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>
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
                ৳{totalDue.toLocaleString()}
              </p>
            </div>

            <div
              className="
                rounded-xl
                bg-red-50
                p-3

                dark:bg-red-500/10
              "
            >
              <CreditCard
                size={21}
                className="
                  text-red-600

                  dark:text-red-400
                "
              />
            </div>

          </div>

        </Card>

        {/* ORDERS */}

        <Card className="p-5">

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>
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
                {sales.length}
              </p>
            </div>

            <div
              className="
                rounded-xl
                bg-amber-50
                p-3

                dark:bg-amber-500/10
              "
            >
              <Receipt
                size={21}
                className="
                  text-amber-600

                  dark:text-amber-400
                "
              />
            </div>

          </div>

        </Card>

      </div>

      {/* SALES TABLE */}

      <Card className="overflow-hidden">

        {/* TABLE HEADER */}

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
              Sales Transactions
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500

                dark:text-slate-400
              "
            >
              View and manage your
              recent sales.
            </p>
          </div>

          {/* SEARCH */}

          <div
            className="
              relative
              w-full

              lg:w-72
            "
          >
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
              placeholder="Search invoice or customer..."
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
                  dark:bg-slate-900/50
                "
              >

                <th className="
                  px-5
                  py-3
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
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
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                ">
                  Customer
                </th>

                <th className="
                  px-5
                  py-3
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
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
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                ">
                  Total
                </th>

                <th className="
                  px-5
                  py-3
                  text-center
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                ">
                  Payment
                </th>

                <th className="
                  px-5
                  py-3
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                ">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredSales.length ===
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

                    <Receipt
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
                      No sales found
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-slate-400
                      "
                    >
                      Create your first
                      sale to get started.
                    </p>

                  </td>

                </tr>
              ) : (
                filteredSales.map(
                  (sale) => (
                    <tr
                      key={sale.id}
                      className="
                        border-b
                        border-slate-100
                        transition-colors

                        hover:bg-slate-50

                        dark:border-slate-800
                        dark:hover:bg-slate-900/50
                      "
                    >

                      {/* INVOICE */}

                      <td
                        className="
                          px-5
                          py-4
                          text-sm
                          font-semibold
                          text-indigo-600

                          dark:text-indigo-400
                        "
                      >
                        {sale.invoiceNumber}
                      </td>

                      {/* CUSTOMER */}

                      <td className="
                        px-5
                        py-4
                      ">

                        <p
                          className="
                            text-sm
                            font-medium
                            text-slate-900

                            dark:text-white
                          "
                        >
                          {sale.customerName ||
                            "Walk-in Customer"}
                        </p>

                      </td>

                      {/* ITEMS */}

                      <td
                        className="
                          px-5
                          py-4
                          text-sm
                          text-slate-500

                          dark:text-slate-400
                        "
                      >
                        {sale.items.length}
                        {" "}
                        {sale.items.length ===
                        1
                          ? "item"
                          : "items"}
                      </td>

                      {/* TOTAL */}

                      <td
                        className="
                          px-5
                          py-4
                          text-right
                          text-sm
                          font-semibold
                          text-slate-900

                          dark:text-white
                        "
                      >
                        ৳{sale.total.toLocaleString()}
                      </td>

                      {/* PAYMENT */}

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
                          {sale.paymentStatus}
                        </span>

                      </td>

                      {/* DATE */}

                      <td
                        className="
                          whitespace-nowrap
                          px-5
                          py-4
                          text-sm
                          text-slate-500

                          dark:text-slate-400
                        "
                      >
                        {new Intl.DateTimeFormat(
                          "en-BD",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        ).format(
                          new Date(
                            sale.createdAt
                          )
                        )}
                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>

        {/* MOBILE */}

        <div className="
          divide-y
          divide-slate-100

          dark:divide-slate-800

          md:hidden
        ">

          {filteredSales.length ===
          0 ? (
            <div className="
              px-5
              py-16
              text-center
            ">

              <Receipt
                size={40}
                className="
                  mx-auto
                  text-slate-300

                  dark:text-slate-700
                "
              />

              <p className="
                mt-3
                text-sm
                font-medium
                text-slate-600

                dark:text-slate-300
              ">
                No sales found
              </p>

            </div>
          ) : (
            filteredSales.map(
              (sale) => (
                <div
                  key={sale.id}
                  className="
                    space-y-4
                    p-5
                  "
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
                        font-semibold
                        text-indigo-600

                        dark:text-indigo-400
                      ">
                        {sale.invoiceNumber}
                      </p>

                      <p className="
                        mt-1
                        text-sm
                        font-medium
                        text-slate-900

                        dark:text-white
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
                    grid
                    grid-cols-2
                    gap-4
                  ">

                    <div>

                      <p className="
                        text-xs
                        text-slate-400
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
                        ৳{sale.total.toLocaleString()}
                      </p>

                    </div>

                    <div>

                      <p className="
                        text-xs
                        text-slate-400
                      ">
                        Items
                      </p>

                      <p className="
                        mt-1
                        text-sm
                        font-medium
                        text-slate-700

                        dark:text-slate-300
                      ">
                        {sale.items.length}
                      </p>

                    </div>

                  </div>

                  <div className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-slate-400
                  ">

                    <CalendarDays
                      size={14}
                    />

                    {new Intl.DateTimeFormat(
                      "en-BD",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    ).format(
                      new Date(
                        sale.createdAt
                      )
                    )}

                  </div>

                </div>
              )
            )
          )}

        </div>

      </Card>

    </div>
  );
};

export default Sales;