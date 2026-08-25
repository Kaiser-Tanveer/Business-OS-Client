import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTranslation } from "react-i18next";

const salesData = [
  { month: "Jan", sales: 32000 },
  { month: "Feb", sales: 42000 },
  { month: "Mar", sales: 38000 },
  { month: "Apr", sales: 51000 },
  { month: "May", sales: 47000 },
  { month: "Jun", sales: 62000 },
  { month: "Jul", sales: 72000 },
  { month: "Aug", sales: 68000 },
];

const transactions = [
  {
    invoice: "#INV-1024",
    customer: "Rahim Ahmed",
    amount: "৳12,500",
    status: "Paid",
  },
  {
    invoice: "#INV-1023",
    customer: "Karim Traders",
    amount: "৳8,200",
    status: "Paid",
  },
  {
    invoice: "#INV-1022",
    customer: "Nusrat Enterprise",
    amount: "৳5,750",
    status: "Pending",
  },
  {
    invoice: "#INV-1021",
    customer: "Hasan Store",
    amount: "৳14,300",
    status: "Paid",
  },
];

const lowStockProducts = [
  {
    name: "Premium Rice",
    sku: "PR-001",
    stock: 5,
  },
  {
    name: "Soybean Oil",
    sku: "SO-002",
    stock: 8,
  },
  {
    name: "Sugar",
    sku: "SG-003",
    stock: 3,
  },
  {
    name: "Lentils",
    sku: "LT-004",
    stock: 7,
  },
];

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {t("dashboard.title")}
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {t("dashboard.welcome")}
          </p>
        </div>

        <button
          type="button"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-indigo-600
            px-4
            py-2.5
            text-sm
            font-medium
            text-white
            shadow-sm
            transition
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            focus:ring-offset-2
            dark:focus:ring-offset-slate-950
          "
        >
          <ShoppingCart size={17} />

          {t("sales.newSale")}
        </button>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title={t("dashboard.totalSales")}
          value="৳245,800"
          change="+12.5%"
          positive
          icon={<DollarSign size={20} />}
        />

        <StatCard
          title={t("dashboard.totalProducts")}
          value="1,248"
          change="+8.2%"
          positive
          icon={<Package size={20} />}
        />

        <StatCard
          title={t("dashboard.totalExpenses")}
          value="৳82,400"
          change="+4.6%"
          positive={false}
          icon={<ShoppingCart size={20} />}
        />

        <StatCard
          title="Net Profit"
          value="৳163,400"
          change="+18.4%"
          positive
          icon={<TrendingUp size={20} />}
        />

      </div>

      {/* CHART + QUICK SUMMARY */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* SALES CHART */}
        <div
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
            xl:col-span-2
          "
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                {t("dashboard.overview")}
              </h2>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {t("dashboard.recentSales")}
              </p>
            </div>

            <select
              className="
                rounded-lg
                border
                border-slate-200
                bg-white
                px-3
                py-2
                text-xs
                text-slate-700
                outline-none
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-200
              "
              defaultValue="7"
            >
              <option value="7">Last 7 months</option>
              <option value="12">Last 12 months</option>
            </select>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient
                    id="salesGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopOpacity={0.3}
                    />

                    <stop
                      offset="100%"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  className="stroke-slate-200 dark:stroke-slate-800"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="sales"
                  strokeWidth={2}
                  fill="url(#salesGradient)"
                  fillOpacity={1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BUSINESS SUMMARY */}
        <div
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Business Summary
          </h2>

          <div className="mt-6 space-y-5">

            <SummaryRow
              label="Today's Sales"
              value="৳18,450"
              percentage="+14.2%"
              positive
            />

            <SummaryRow
              label="Today's Expenses"
              value="৳6,250"
              percentage="+3.4%"
              positive={false}
            />

            <SummaryRow
              label="Today's Profit"
              value="৳12,200"
              percentage="+21.8%"
              positive
            />

            <SummaryRow
              label="Pending Payments"
              value="৳24,600"
              percentage="8 invoices"
              positive={false}
            />

          </div>
        </div>
      </div>

      {/* TABLES */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* TRANSACTIONS */}
        <div
          className="
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-white
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
            xl:col-span-2
          "
        >
          <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Recent Transactions
              </h2>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Latest business transactions
              </p>
            </div>

            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">

              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                <tr>
                  <th className="px-5 py-3">Invoice</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">

                {transactions.map((transaction) => (
                  <tr
                    key={transaction.invoice}
                    className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-5 py-4 font-medium text-slate-900 dark:text-white">
                      {transaction.invoice}
                    </td>

                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {transaction.customer}
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-900 dark:text-white">
                      {transaction.amount}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`
                          inline-flex
                          rounded-full
                          px-2.5
                          py-1
                          text-xs
                          font-medium

                          ${
                            transaction.status === "Paid"
                              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                              : "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                          }
                        `}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>

        {/* LOW STOCK */}
        <div
          className="
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-white
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <div className="border-b border-slate-200 p-5 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <AlertTriangle
                size={18}
                className="text-amber-500"
              />

              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Low Stock
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Products that need restocking
            </p>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800">

            {lowStockProducts.map((product) => (
              <div
                key={product.sku}
                className="flex items-center justify-between p-4"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {product.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {product.sku}
                  </p>
                </div>

                <span className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 dark:bg-red-500/10 dark:text-red-400">
                  {product.stock} left
                </span>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
}

const StatCard = ({
  title,
  value,
  change,
  positive,
  icon,
}: StatCardProps) => {
  return (
    <div
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition
        hover:shadow-md

        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {title}
        </p>

        <div className="rounded-lg bg-slate-100 p-2 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {icon}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {value}
        </p>

        <div className="mt-2 flex items-center gap-1 text-xs">
          {positive ? (
            <ArrowUpRight
              size={14}
              className="text-emerald-500"
            />
          ) : (
            <ArrowDownRight
              size={14}
              className="text-red-500"
            />
          )}

          <span
            className={
              positive
                ? "text-emerald-500"
                : "text-red-500"
            }
          >
            {change}
          </span>

          <span className="text-slate-400">
            vs last month
          </span>
        </div>
      </div>
    </div>
  );
};

interface SummaryRowProps {
  label: string;
  value: string;
  percentage: string;
  positive: boolean;
}

const SummaryRow = ({
  label,
  value,
  percentage,
  positive,
}: SummaryRowProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
          {value}
        </p>
      </div>

      <span
        className={
          positive
            ? "text-xs font-medium text-emerald-500"
            : "text-xs font-medium text-red-500"
        }
      >
        {percentage}
      </span>
    </div>
  );
};

export default Dashboard;