import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Button from "../../../components/ui/Button";

import {
  productSchema,
  type ProductFormData,
} from "../productSchema";

interface ProductFormProps {
  defaultValues?: Partial<ProductFormData>;
  onSubmit: (
    data: ProductFormData
  ) => void;
  onCancel?: () => void;
  loading?: boolean;
}

const ProductForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  loading = false,
}: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),

    defaultValues: {
      name: "",
      sku: "",
      category: "",
      description: "",
      purchasePrice: 0,
      sellingPrice: 0,
      stockQuantity: 0,
      lowStockThreshold: 10,
      unit: "piece",
      status: "active",

      ...defaultValues,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* BASIC INFORMATION */}

      <section>
        <h2 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">
          Basic Information
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">

          {/* Product Name */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Product Name
            </label>

            <input
              {...register("name")}
              placeholder="e.g. Premium Rice"
              className="form-input"
            />

            {errors.name && (
              <p className="mt-1 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* SKU */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              SKU
            </label>

            <input
              {...register("sku")}
              placeholder="e.g. RICE-001"
              className="form-input"
            />

            {errors.sku && (
              <p className="mt-1 text-xs text-red-500">
                {errors.sku.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Category
            </label>

            <select
              {...register("category")}
              className="form-input"
            >
              <option value="">
                Select category
              </option>

              <option value="Grocery">
                Grocery
              </option>

              <option value="Electronics">
                Electronics
              </option>

              <option value="Clothing">
                Clothing
              </option>

              <option value="Other">
                Other
              </option>
            </select>

            {errors.category && (
              <p className="mt-1 text-xs text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Unit */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Unit
            </label>

            <select
              {...register("unit")}
              className="form-input"
            >
              <option value="piece">
                Piece
              </option>

              <option value="kg">
                Kilogram
              </option>

              <option value="gram">
                Gram
              </option>

              <option value="liter">
                Liter
              </option>

              <option value="meter">
                Meter
              </option>

              <option value="box">
                Box
              </option>
            </select>

            {errors.unit && (
              <p className="mt-1 text-xs text-red-500">
                {errors.unit.message}
              </p>
            )}
          </div>

        </div>
      </section>

      {/* PRICING */}

      <section>
        <h2 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">
          Pricing & Inventory
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Purchase Price */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Purchase Price
            </label>

            <input
              type="number"
              step="0.01"
              {...register(
                "purchasePrice",
                { valueAsNumber: true }
              )}
              className="form-input"
            />

            {errors.purchasePrice && (
              <p className="mt-1 text-xs text-red-500">
                {errors.purchasePrice.message}
              </p>
            )}
          </div>

          {/* Selling Price */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Selling Price
            </label>

            <input
              type="number"
              step="0.01"
              {...register(
                "sellingPrice",
                { valueAsNumber: true }
              )}
              className="form-input"
            />

            {errors.sellingPrice && (
              <p className="mt-1 text-xs text-red-500">
                {errors.sellingPrice.message}
              </p>
            )}
          </div>

          {/* Stock */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Current Stock
            </label>

            <input
              type="number"
              {...register(
                "stockQuantity",
                { valueAsNumber: true }
              )}
              className="form-input"
            />

            {errors.stockQuantity && (
              <p className="mt-1 text-xs text-red-500">
                {errors.stockQuantity.message}
              </p>
            )}
          </div>

          {/* Low Stock */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Low Stock Alert
            </label>

            <input
              type="number"
              {...register(
                "lowStockThreshold",
                { valueAsNumber: true }
              )}
              className="form-input"
            />

            {errors.lowStockThreshold && (
              <p className="mt-1 text-xs text-red-500">
                {errors.lowStockThreshold.message}
              </p>
            )}
          </div>

        </div>
      </section>

      {/* DESCRIPTION */}

      <section>
        <h2 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">
          Additional Information
        </h2>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Description
          </label>

          <textarea
            {...register("description")}
            rows={4}
            placeholder="Describe this product..."
            className="form-input resize-none"
          />
        </div>
      </section>

      {/* STATUS */}

      <section>
        <div className="max-w-sm">
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Status
          </label>

          <select
            {...register("status")}
            className="form-input"
          >
            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>
          </select>
        </div>
      </section>

      {/* ACTIONS */}

      <div className="flex justify-end gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">

        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}

        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : "Save Product"}
        </Button>

      </div>
    </form>
  );
};

export default ProductForm;