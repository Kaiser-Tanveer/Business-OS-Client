import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import Badge from "../../../components/ui/Badge";
import Card from "../../../components/ui/Card";

import { formatCurrency } from "../../../utils/currency";

import type { Product } from "../ProductTypes";

interface ProductTableProps {
  products: Product[];
  onDelete?: (id: string) => void;
}

const ProductTable = ({
  products,
  onDelete,
}: ProductTableProps) => {
  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Product
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                SKU
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Category
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Price
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Stock
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="w-16 px-5 py-3" />
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              const lowStock =
                product.stockQuantity <=
                product.lowStockThreshold;

              const outOfStock =
                product.stockQuantity <= 0;

              return (
                <tr
                  key={product.id}
                  className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800/80 dark:hover:bg-slate-800/40"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-900 dark:text-white">
                      {product.name}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {product.unit}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {product.sku}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {product.category}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-slate-900 dark:text-white">
                    {formatCurrency(
                      product.sellingPrice
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <div>
                      <p
                        className={`
                          text-sm font-medium
                          ${
                            outOfStock
                              ? "text-red-600 dark:text-red-400"
                              : lowStock
                              ? "text-yellow-600 dark:text-yellow-400"
                              : "text-slate-900 dark:text-white"
                          }
                        `}
                      >
                        {product.stockQuantity}
                      </p>

                      <p className="text-xs text-slate-400">
                        {product.unit}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    {outOfStock ? (
                      <Badge variant="danger">
                        Out of Stock
                      </Badge>
                    ) : lowStock ? (
                      <Badge variant="warning">
                        Low Stock
                      </Badge>
                    ) : (
                      <Badge variant="success">
                        Active
                      </Badge>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                        aria-label={`Edit ${product.name}`}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onDelete?.(product.id)
                        }
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                        aria-label={`Delete ${product.name}`}
                      >
                        <Trash2 size={16} />
                      </button>

                      <button
                        type="button"
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                        aria-label="More options"
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ProductTable;