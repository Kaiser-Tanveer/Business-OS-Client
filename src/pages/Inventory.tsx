import { useEffect } from "react";

import PageHeader from "../components/common/PageHeader";

import InventoryStats from "../features/inventory/components/InventoryStats";

import Card from "../components/ui/Card";

import {
  mockStockMovements,
} from "../features/inventory/inventoryApi";

import {
  setMovements,
} from "../features/inventory/inventorySlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../hooks";

import {
  mockProducts,
} from "../features/products/productApi";

import {
  setProducts,
} from "../features/products/productSlice";

const Inventory = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(
    (state) => state.products.products
  );

  const movements = useAppSelector(
    (state) =>
      state.inventory.movements
  );

  // =========================================
  // LOAD PRODUCTS
  // =========================================

  useEffect(() => {
    if (products.length === 0) {
      dispatch(
        setProducts(mockProducts)
      );
    }
  }, [dispatch, products.length]);

  // =========================================
  // LOAD STOCK MOVEMENTS
  // =========================================

  useEffect(() => {
    if (movements.length === 0) {
      dispatch(
        setMovements(
          mockStockMovements
        )
      );
    }
  }, [dispatch, movements.length]);

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}

      <PageHeader
        title="Inventory"
        description="Monitor stock levels and manage stock movements."
      />

      {/* STATISTICS */}

      <InventoryStats
        products={products}
      />

      {/* STOCK MOVEMENTS */}

      <Card>

        <div className="flex items-center justify-between">

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

    </div>
  );
};

export default Inventory;