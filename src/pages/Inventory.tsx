import { useEffect } from "react";

import PageHeader from "../components/common/PageHeader";

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

const Inventory = () => {
  const dispatch = useAppDispatch();

  const movements = useAppSelector(
    (state) =>
      state.inventory.movements
  );

  useEffect(() => {
    dispatch(
      setMovements(
        mockStockMovements
      )
    );
  }, [dispatch]);

  return (
    <div className="space-y-6">

      <PageHeader
        title="Inventory"
        description="Monitor stock levels and manage stock movements."
      />

      <Card>

        <div className="flex items-center justify-between">

          <div>
            <h2 className="
              text-base
              font-semibold
              text-slate-900
              dark:text-white
            ">
              Stock Movements
            </h2>

            <p className="
              mt-1
              text-sm
              text-slate-500
              dark:text-slate-400
            ">
              {movements.length} movement
              {movements.length !== 1
                ? "s"
                : ""}
            </p>
          </div>

        </div>

      </Card>

    </div>
  );
};

export default Inventory;