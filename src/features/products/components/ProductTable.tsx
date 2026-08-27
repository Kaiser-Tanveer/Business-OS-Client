import {
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import Badge from "../../../components/ui/Badge";
import Card from "../../../components/ui/Card";

import type { Product } from "../productTypes";

interface ProductTableProps {
  products: Product[];
  onView?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
}

const ProductTable = ({
  products,
  onView,
  onEdit,
  onDelete,
}: ProductTableProps) => {
  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">

          {/* ======================================
              HEADER
              ====================================== */}

          <thead>
            <tr
              className="
                border-b
                border-slate-200
                bg-slate-50

                dark:border-slate-800
                dark:bg-slate-950
              "
            >
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

              <th className="w-32 px-5 py-3" />
            </tr>
          </thead>

          {/* ======================================
              BODY
              ====================================== */}

          <tbody>

            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="
                    px-5
                    py-12
                    text-center
                    text-sm
                    text-slate-500

                    dark:text-slate-400
                  "
                >
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => {

                const lowStock =
                  product.stockQuantity <=
                  product.lowStockThreshold;

                const outOfStock =
                  product.stockQuantity <= 0;

                return (
                  <tr
                    key={product.id}
                    className="
                      border-b
                      border-slate-100
                      transition-colors

                      hover:bg-slate-50

                      dark:border-slate-800/80
                      dark:hover:bg-slate-800/40
                    "
                  >

                    {/* PRODUCT */}

                    <td className="px-5 py-4">
                      <p className="
                        font-medium
                        text-slate-900

                        dark:text-white
                      ">
                        {product.name}
                      </p>

                      <p className="
                        mt-0.5
                        text-xs
                        text-slate-500
                      ">
                        {product.unit}
                      </p>
                    </td>

                    {/* SKU */}

                    <td className="
                      px-5
                      py-4
                      text-sm
                      text-slate-600

                      dark:text-slate-400
                    ">
                      {product.sku}
                    </td>

                    {/* CATEGORY */}

                    <td className="
                      px-5
                      py-4
                      text-sm
                      text-slate-600

                      dark:text-slate-400
                    ">
                      {product.category}
                    </td>

                    {/* PRICE */}

                    <td className="
                      px-5
                      py-4
                      text-sm
                      font-medium
                      text-slate-900

                      dark:text-white
                    ">
                      ৳{" "}
                      {product.sellingPrice.toLocaleString(
                        "en-BD"
                      )}
                    </td>

                    {/* STOCK */}

                    <td className="px-5 py-4">

                      <p
                        className={`
                          text-sm
                          font-medium

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

                      <p className="
                        text-xs
                        text-slate-400
                      ">
                        {product.unit}
                      </p>

                    </td>

                    {/* STATUS */}

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

                    {/* ACTIONS */}

                    <td className="px-5 py-4">

                      <div className="
                        flex
                        items-center
                        justify-end
                        gap-1
                      ">

                        {/* VIEW */}

                        <button
                          type="button"
                          onClick={() =>
                            onView?.(product)
                          }
                          aria-label={`View ${product.name}`}
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
                          <Eye size={16} />
                        </button>

                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() =>
                            onEdit?.(product)
                          }
                          aria-label={`Edit ${product.name}`}
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
                          <Pencil size={16} />
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            onDelete?.(
                              product.id
                            )
                          }
                          aria-label={`Delete ${product.name}`}
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
                          <Trash2 size={16} />
                        </button>

                        {/* MORE */}

                        <button
                          type="button"
                          aria-label="More options"
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
                          <MoreHorizontal
                            size={16}
                          />
                        </button>

                      </div>

                    </td>

                  </tr>
                );
              })
            )}

          </tbody>

        </table>
      </div>
    </Card>
  );
};

export default ProductTable;