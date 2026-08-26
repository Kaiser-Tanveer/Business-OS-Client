import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import Button from "../components/ui/Button";

import ProductStats from "../features/products/components/ProductStats";
import ProductFilters from "../features/products/components/ProductFilters";
import ProductTable from "../features/products/components/ProductTable";
import ProductFormModal from "../features/products/components/ProducFormtModal";

import {
  mockProducts,
} from "../features/products/ProductApi";

import {
  addProduct,
  deleteProduct,
  setProducts,
  updateProduct,
} from "../features/products/ProductSlice";

import type { Product } from "../features/products/ProductTypes";
import type { ProductFormData } from "../features/products/ProductSchema";

import {
  useAppDispatch,
  useAppSelector,
} from "../hooks";

const Products = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(
    (state) => state.products.products
  );

  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [formLoading, setFormLoading] =
    useState(false);

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

  // --------------------------------
  // ADD PRODUCT
  // --------------------------------

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  // --------------------------------
  // EDIT PRODUCT
  // --------------------------------

  const handleOpenEdit = (
    product: Product
  ) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  // --------------------------------
  // CREATE / UPDATE
  // --------------------------------

  const handleSubmitProduct = (
    data: ProductFormData
  ) => {
    setFormLoading(true);

    const now =
      new Date().toISOString();

    // EDIT
    if (editingProduct) {
      const updatedProduct: Product = {
        ...editingProduct,
        ...data,
        updatedAt: now,
      };

      dispatch(
        updateProduct(updatedProduct)
      );
    }

    // CREATE
    else {
      const newProduct: Product = {
        id: crypto.randomUUID(),

        ...data,

        createdAt: now,
        updatedAt: now,
      };

      dispatch(addProduct(newProduct));
    }

    setFormLoading(false);
    setFormOpen(false);
    setEditingProduct(null);
  };

  // --------------------------------
  // DELETE
  // --------------------------------

  const handleDelete = (
    id: string
  ) => {
    dispatch(deleteProduct(id));
  };

  // --------------------------------
  // CLOSE FORM
  // --------------------------------

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <>
      <div className="space-y-6">

        {/* HEADER */}

        <PageHeader
          title="Products"
          description="Manage your products, pricing and stock."
          action={
            <Button
              onClick={handleOpenCreate}
            >
              <Plus size={17} />
              Add Product
            </Button>
          }
        />

        {/* STATS */}

        <ProductStats
          products={products}
        />

        {/* FILTERS */}

        <ProductFilters
          search={search}
          onSearchChange={setSearch}
        />

        {/* TABLE */}

        <ProductTable
          products={filteredProducts}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />

      </div>

      {/* CREATE / EDIT MODAL */}

      <ProductFormModal
        open={formOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitProduct}
        loading={formLoading}

        title={
          editingProduct
            ? "Edit Product"
            : "Add Product"
        }

        description={
          editingProduct
            ? "Update product information, pricing and stock."
            : "Add a new product to your inventory."
        }

        defaultValues={
          editingProduct
            ? {
                name:
                  editingProduct.name,
                sku:
                  editingProduct.sku,
                category:
                  editingProduct.category,
                description:
                  editingProduct.description,
                purchasePrice:
                  editingProduct.purchasePrice,
                sellingPrice:
                  editingProduct.sellingPrice,
                stockQuantity:
                  editingProduct.stockQuantity,
                lowStockThreshold:
                  editingProduct.lowStockThreshold,
                unit:
                  editingProduct.unit,
                status:
                  editingProduct.status,
              }
            : undefined
        }
      />
    </>
  );
};

export default Products;