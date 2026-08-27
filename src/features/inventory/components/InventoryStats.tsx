import {
  AlertTriangle,
  Package,
  PackageCheck,
  PackageX,
} from "lucide-react";

import Card from "../../../components/ui/Card";

import type { Product } from "../../products/productTypes";

interface InventoryStatsProps {
  products: Product[];
}

const InventoryStats = ({
  products,
}: InventoryStatsProps) => {
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) =>
      total + product.stockQuantity,
    0
  );

  const lowStockProducts = products.filter(
    (product) =>
      product.stockQuantity > 0 &&
      product.stockQuantity <=
        product.lowStockThreshold
  ).length;

  const outOfStockProducts = products.filter(
    (product) =>
      product.stockQuantity <= 0
  ).length;

  const stats = [
    {
      title: "Total Products",
      value: totalProducts.toLocaleString(
        "en-BD"
      ),
      description: "Products in inventory",
      icon: Package,
    },
    {
      title: "Total Stock",
      value: totalStock.toLocaleString(
        "en-BD"
      ),
      description: "Units currently available",
      icon: PackageCheck,
    },
    {
      title: "Low Stock",
      value: lowStockProducts.toLocaleString(
        "en-BD"
      ),
      description: "Products need attention",
      icon: AlertTriangle,
    },
    {
      title: "Out of Stock",
      value: outOfStockProducts.toLocaleString(
        "en-BD"
      ),
      description: "Products unavailable",
      icon: PackageX,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className="
              relative
              overflow-hidden
            "
          >
            <div className="flex items-start justify-between">
              
              <div>
                <p
                  className="
                    text-sm
                    font-medium
                    text-slate-500

                    dark:text-slate-400
                  "
                >
                  {stat.title}
                </p>

                <p
                  className="
                    mt-2
                    text-2xl
                    font-bold
                    tracking-tight
                    text-slate-900

                    dark:text-white
                  "
                >
                  {stat.value}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-500

                    dark:text-slate-400
                  "
                >
                  {stat.description}
                </p>
              </div>

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-slate-100
                  text-slate-600

                  dark:bg-slate-800
                  dark:text-slate-300
                "
              >
                <Icon size={20} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default InventoryStats;