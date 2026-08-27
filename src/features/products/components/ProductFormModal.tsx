import { X } from "lucide-react";

import ProductForm from "./ProductForm";
import type { ProductFormData } from "../productSchema";

interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  defaultValues?: Partial<ProductFormData>;
  title?: string;
  description?: string;
  loading?: boolean;
}

const ProductFormModal = ({
  open,
  onClose,
  onSubmit,
  defaultValues,
  title = "Add Product",
  description = "Add a new product to your inventory.",
  loading = false,
}: ProductFormModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/50
        p-4
        backdrop-blur-sm
      "
      onMouseDown={onClose}
    >
      <div
        className="
          flex max-h-[90dvh] w-full max-w-4xl
          flex-col overflow-hidden rounded-2xl
          border border-slate-200 bg-white shadow-2xl
          dark:border-slate-800 dark:bg-slate-950
        "
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        {/* Header */}

        <div
          className="
            flex shrink-0 items-center justify-between
            border-b border-slate-200 px-6 py-4
            dark:border-slate-800
          "
        >
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {title}
            </h2>

            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close product form"
            className="
              rounded-lg p-2 text-slate-400 transition
              hover:bg-slate-100 hover:text-slate-700
              dark:hover:bg-slate-800 dark:hover:text-white
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}

        <div className="overflow-y-auto p-6">
          <ProductForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            onCancel={onClose}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;