import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-[110]
        flex items-center justify-center
        bg-black/50
        p-4
        backdrop-blur-sm
      "
      onMouseDown={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className="
          w-full max-w-md
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-2xl

          dark:border-slate-800
          dark:bg-slate-950
        "
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        {/* Icon + Close */}

        <div className="flex items-start justify-between">
          <div
            className="
              flex h-11 w-11
              items-center justify-center
              rounded-full
              bg-red-50
              text-red-600

              dark:bg-red-500/10
              dark:text-red-400
            "
          >
            <AlertTriangle size={22} />
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            aria-label="Close confirmation dialog"
            className="
              rounded-lg
              p-2
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
              disabled:cursor-not-allowed
              disabled:opacity-50

              dark:hover:bg-slate-800
              dark:hover:text-white
            "
          >
            <X size={19} />
          </button>
        </div>

        {/* Content */}

        <div className="mt-4">
          <h2
            id="confirm-dialog-title"
            className="
              text-lg
              font-semibold
              text-slate-900
              dark:text-white
            "
          >
            {title}
          </h2>

          <p className="
            mt-2
            text-sm
            leading-6
            text-slate-500
            dark:text-slate-400
          ">
            {message}
          </p>
        </div>

        {/* Actions */}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="
              h-10
              rounded-lg
              border
              border-slate-300
              bg-white
              px-4
              text-sm
              font-medium
              text-slate-700
              transition

              hover:bg-slate-50

              disabled:cursor-not-allowed
              disabled:opacity-50

              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-300
              dark:hover:bg-slate-800
            "
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="
              h-10
              rounded-lg
              bg-red-600
              px-4
              text-sm
              font-medium
              text-white
              transition

              hover:bg-red-700

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading
              ? "Deleting..."
              : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;