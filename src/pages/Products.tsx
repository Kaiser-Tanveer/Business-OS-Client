import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Plus } from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import Button from "../components/ui/Button";
import ConfirmDialog from "../components/ui/ConfirmDialog";

import ProductStats from "../features/products/components/ProductStats";
import ProductFilters from "../features/products/components/ProductFilters";
import ProductTable from "../features/products/components/ProductTable";
import ProductFormModal from "../features/products/components/ProductFormModal";
import ProductDetailsModal from "../features/products/components/ProductDetailsModal";

import { mockProducts } from "../features/products/ProductApi";

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

  // =========================================
  // STATE
  // =========================================

  const [search, setSearch] =
    useState("");

  const [formOpen, setFormOpen] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [viewingProduct, setViewingProduct] =
    useState<Product | null>(null);

  const [productToDelete, setProductToDelete] =
    useState<Product | null>(null);

  const [formLoading, setFormLoading] =
    useState(false);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  // =========================================
  // LOAD PRODUCTS
  // =========================================

  useEffect(() => {
    dispatch(setProducts(mockProducts));
  }, [dispatch]);

  // =========================================
  // SEARCH
  // =========================================

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

  // =========================================
  // CREATE
  // =========================================

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  // =========================================
  // EDIT
  // =========================================

  const handleOpenEdit = (
    product: Product
  ) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  // =========================================
  // VIEW
  // =========================================

  const handleOpenView = (
    product: Product
  ) => {
    setViewingProduct(product);
  };

  const handleCloseView = () => {
    setViewingProduct(null);
  };

  // =========================================
  // CREATE / UPDATE
  // =========================================

  const handleSubmitProduct = (
    data: ProductFormData
  ) => {
    setFormLoading(true);

    const now =
      new Date().toISOString();

    // UPDATE

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

      dispatch(
        addProduct(newProduct)
      );
    }

    setFormLoading(false);
    setFormOpen(false);
    setEditingProduct(null);
  };

  // =========================================
  // CLOSE FORM
  // =========================================

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingProduct(null);
  };

  // =========================================
  // DELETE
  // =========================================

  const handleDelete = (
    id: string
  ) => {
    const product = products.find(
      (item) => item.id === id
    );

    if (!product) {
      return;
    }

    setProductToDelete(product);
  };

  // =========================================
  // CONFIRM DELETE
  // =========================================

  const handleConfirmDelete = () => {
    if (!productToDelete) {
      return;
    }

    setDeleteLoading(true);

    dispatch(
      deleteProduct(
        productToDelete.id
      )
    );

    setDeleteLoading(false);
    setProductToDelete(null);
  };

  // =========================================
  // CANCEL DELETE
  // =========================================

  const handleCancelDelete = () => {
    if (deleteLoading) {
      return;
    }

    setProductToDelete(null);
  };

  // =========================================
  // RENDER
  // =========================================

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

        {/* STATISTICS */}

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
          onView={handleOpenView}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />

      </div>

      {/* =========================================
          ADD / EDIT
          ========================================= */}

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

      {/* =========================================
          VIEW PRODUCT
          ========================================= */}

      <ProductDetailsModal
        open={Boolean(viewingProduct)}
        product={viewingProduct}
        onClose={handleCloseView}
      />

      {/* =========================================
          DELETE CONFIRMATION
          ========================================= */}

      <ConfirmDialog
        open={Boolean(productToDelete)}
        title="Delete Product?"
        message={
          productToDelete
            ? `Are you sure you want to delete "${productToDelete.name}"? This action cannot be undone.`
            : "Are you sure you want to delete this product?"
        }
        confirmText="Delete Product"
        cancelText="Cancel"
        loading={deleteLoading}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default Products;