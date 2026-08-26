import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import Button from "../components/ui/Button";

import ProductStats from "../features/products/components/ProductStats";
import ProductFilters from "../features/products/components/ProductFilters";
import ProductTable from "../features/products/components/ProductTable";

import { mockProducts } from "../features/products/productApi";

import {
  setProducts,
  deleteProduct,
} from "../features/products/productSlice";

import { useAppDispatch, useAppSelector } from "../hooks";

const Products = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(
    (state) => state.products.products
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(setProducts(mockProducts));
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    const searchTerm =
      search.toLowerCase().trim();

    if (!searchTerm) {
      return products;
    }

    return products.filter((product) =>
      [
        product.name,
        product.sku,
        product.category,
      ].some((value) =>
        value
          .toLowerCase()
          .includes(searchTerm)
      )
    );
  }, [products, search]);

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="space-y-6">

      <PageHeader
        title="Products"
        description="Manage your products, pricing and stock."
        action={
          <Button>
            <Plus size={17} />
            Add Product
          </Button>
        }
      />

      <ProductStats
        products={products}
      />

      <ProductFilters
        search={search}
        onSearchChange={setSearch}
      />

      <ProductTable
        products={filteredProducts}
        onDelete={handleDelete}
      />

    </div>
  );
};

export default Products;