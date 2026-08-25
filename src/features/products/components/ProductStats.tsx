import {
  Package,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

import Card from "../../../components/ui/Card";
import type { Product } from "../ProductTypes";

interface ProductStatsProps {
  products: Product[];
}

const ProductStats = ({
  products,
}: ProductStatsProps) => {
  const total = products.length;

  const active = products.filter(
    (product) =>
      product.status === "active"
  ).length;

  const lowStock = products.filter(
    (product) =>
      product.stockQuantity > 0 &&
      product.stockQuantity <=
        product.lowStockThreshold
  ).length;

  const outOfStock = products.filter(
    (product) =>
      product.stockQuantity <= 0
  ).length;

  const stats = [
    {
      label: "Total Products",
      value: total,
      icon: Package,
    },
    {
      label: "Active Products",
      value: active,
      icon: CheckCircle2,
    },
    {
      label: "Low Stock",
      value: lowStock,
      icon: AlertTriangle,
    },
    {
      label: "Out of Stock",
      value: outOfStock,
      icon: XCircle,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.label}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <Icon size={20} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ProductStats;