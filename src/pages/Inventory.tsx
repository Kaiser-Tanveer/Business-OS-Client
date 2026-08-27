import {
  useEffect,
  useState,
} from "react";

import {
  ArrowDownToLine,
  ArrowUpFromLine,
} from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

import InventoryStats from "../features/inventory/components/InventoryStats";
import StockMovementModal from "../features/inventory/components/StockMovementModal";

import {
  mockStockMovements,
} from "../features/inventory/inventoryApi";

import {
  addMovement,
  setMovements,
} from "../features/inventory/inventorySlice";

import {
  updateProductStock,
} from "../features/products/productSlice";

import {
  mockProducts,
} from "../features/products/productApi";

import {
  setProducts,
} from "../features/products/productSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../hooks";

import type {
  StockMovementReason,
  StockMovementType,
} from "../features/inventory/inventoryTypes";
import StockMovementHistory from "../features/inventory/components/StockMovementHistory";
import StockAlerts from "../features/inventory/components/StockAlert";

const Inventory = () => {
  const dispatch = useAppDispatch();

  const [
    selectedProductId,
    setSelectedProductId,
    ] = useState<string | undefined>(
    undefined
    );

  // =========================================
  // REDUX STATE
  // =========================================

  const products = useAppSelector(
    (state) =>
      state.products.products
  );

  const movements = useAppSelector(
    (state) =>
      state.inventory.movements
  );

  // =========================================
  // LOCAL STATE
  // =========================================

  const [
    movementModalOpen,
    setMovementModalOpen,
  ] = useState(false);

  const [
    movementType,
    setMovementType,
  ] = useState<StockMovementType>("IN");

  // =========================================
  // LOAD PRODUCTS
  // =========================================

  useEffect(() => {
    if (products.length === 0) {
      dispatch(
        setProducts(mockProducts)
      );
    }
  }, [
    dispatch,
    products.length,
  ]);

  // =========================================
  // LOAD MOVEMENTS
  // =========================================

  useEffect(() => {
    if (movements.length === 0) {
      dispatch(
        setMovements(
          mockStockMovements
        )
      );
    }
  }, [
    dispatch,
    movements.length,
  ]);

  // =========================================
  // OPEN STOCK MODAL
  // =========================================

  const handleOpenMovement = (
    type: StockMovementType,
    productId?: string
    ) => {
    setMovementType(type);
    setSelectedProductId(productId);
    setMovementModalOpen(true);
    };

  // =========================================
  // CLOSE STOCK MODAL
  // =========================================

  const handleCloseMovement = () => {
    setMovementModalOpen(false);
    setSelectedProductId(undefined);
    };

  // =========================================
  // CREATE STOCK MOVEMENT
  // =========================================

  const handleMovementSubmit = (
    data: {
      productId: string;
      quantity: number;
      reason: StockMovementReason;
      note: string;
    }
  ) => {
    const product =
      products.find(
        (item) =>
          item.id ===
          data.productId
      );

    if (!product) {
      return;
    }

    // =======================================
    // CALCULATE NEW STOCK
    // =======================================

    let newStock =
      product.stockQuantity;

    if (movementType === "IN") {
      newStock += data.quantity;
    }

    if (movementType === "OUT") {
      newStock -= data.quantity;
    }

    // =======================================
    // PREVENT NEGATIVE STOCK
    // =======================================

    if (newStock < 0) {
      window.alert(
        "Stock cannot be negative."
      );

      return;
    }

    // =======================================
    // CREATE MOVEMENT
    // =======================================

    const movement = {
      id: crypto.randomUUID(),

      productId:
        data.productId,

      type: movementType,

      reason: data.reason,

      quantity: data.quantity,

      note:
        data.note || undefined,

      createdAt:
        new Date().toISOString(),
    };

    // =======================================
    // UPDATE REDUX
    // =======================================

    dispatch(
      addMovement(movement)
    );

    dispatch(
      updateProductStock({
        productId:
          data.productId,

        quantity:
          newStock,
      })
    );

    // =======================================
    // CLOSE MODAL
    // =======================================

    setMovementModalOpen(false);
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="space-y-6">

      {/* =====================================
          HEADER
          ===================================== */}

      <PageHeader
        title="Inventory"
        description="Monitor stock levels and manage stock movements."
        action={
          <div className="flex flex-wrap gap-2">

            <Button
              onClick={() =>
                handleOpenMovement(
                  "IN"
                )
              }
            >
              <ArrowDownToLine
                size={17}
              />

              Stock In
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                handleOpenMovement(
                  "OUT"
                )
              }
            >
              <ArrowUpFromLine
                size={17}
              />

              Stock Out
            </Button>

          </div>
        }
      />

      {/* =====================================
          STATISTICS
          ===================================== */}

      <InventoryStats
        products={products}
      />

        <StockAlerts
        products={products}
        onStockIn={(productId) =>
            handleOpenMovement(
            "IN",
            productId
            )
        }
        />

      {/* =====================================
          STOCK MOVEMENTS
          ===================================== */}

      <Card>

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
            <h2
              className="
                text-base
                font-semibold
                text-slate-900

                dark:text-white
              "
            >
              Stock Movements
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500

                dark:text-slate-400
              "
            >
              Recent inventory activity
            </p>
          </div>

          <span
            className="
              w-fit
              rounded-full
              bg-slate-100
              px-3
              py-1
              text-xs
              font-medium
              text-slate-600

              dark:bg-slate-800
              dark:text-slate-300
            "
          >
            {movements.length} movement
            {movements.length !== 1
              ? "s"
              : ""}
          </span>

        </div>

      </Card>

      {/* =====================================
    STOCK MOVEMENT HISTORY
    ===================================== */}

    <StockMovementHistory
    movements={movements}
    products={products}
    />

      {/* =====================================
          STOCK MOVEMENT MODAL
          ===================================== */}

      <StockMovementModal
        open={movementModalOpen}
        type={movementType}
        products={products}
        selectedProductId={
            selectedProductId
        }
        onClose={
            handleCloseMovement
        }
        onSubmit={
            handleMovementSubmit
        }
        />

    </div>
  );
};

export default Inventory;