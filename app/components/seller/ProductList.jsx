"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import Pagination from "../pagination/Pagination";
import { useState } from "react";

const PRODUCTS_PER_PAGE = 10;

export default function ProductList() {
  const { products, currency, router, deleteProduct } = useAppContext();

  const searchParams = useSearchParams();

  const [selectedProduct, setSelectedProduct] = useState(null);

  /* const currentPage = Number(searchParams.get("page")) || 1; */

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const requestedPage = Number(searchParams.get("page")) || 1;

  const currentPage = Math.min(
    Math.max(1, requestedPage),
    Math.max(1, totalPages),
  );

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const currentProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  const handleEdit = (productId) => {
    router.push(`/seller/edit-product/${productId}`);
  };

  const handleDelete = () => {
    if (!selectedProduct) return;

    deleteProduct(selectedProduct._id);
    setSelectedProduct(null);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 5 text-xs font-bold text-cyan-800">
              <Icon icon="solar:shop-2-linear" width={16} />
              SWIFTCART SELLER CENTER
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Product inventory
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Manage your products, review pricing, and monitor stock levels.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <Icon
              icon="solar:box-linear"
              width={20}
              className="text-cyan-600"
            />
            {products.length} {products.length === 1 ? "product" : "Products"}
          </div>
        </div>

        {/* Product Table */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Table Header */}
          <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <h2 className="font-bold text-slate-900">All Products</h2>
              <p className="mt-1 text-xs text-slate-500">
                Your complete product catalogue.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-lg bg-slate-50 px-3 py-3 text-xs font-medium text-slate-500">
              <Icon icon="solar:refresh-linear" width={15} />
              Inventory overview
            </div>
          </div>

          {/* Empty State */}
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                <Icon icon="solar:box-minimalistic-linear" width={32} />
              </div>

              <h3 className="font-bold text-slate-900">No products yet</h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Your product listings will appear here once you add products to
                your inventory.
              </p>
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-190 text-left">
                <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Subcategory</th>
                    <th className="px-6 py-4">Selling Price</th>
                    <th className="px-6 py-4">Stock Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {currentProducts.map((product, index) => (
                    <tr
                      key={product.id || product.id || index}
                      className="transition-colors hover:bg-slate-50/80"
                    >
                      {/* Product */}
                      <td className="px-6 py-4">
                        <div className="flex min-w-[220px] items-center gap-3">
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                            {product.images?.[0] ? (
                              <Image
                                alt={product.name || "product image"}
                                src={product.images[0]}
                                fill
                                sizes="56px"
                                className="object-contain p-1"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-slate-300">
                                <Icon icon="solar:gallery-linear" width={24} />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-800">
                              {product.name}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                          {product.category}
                        </span>
                      </td>

                      {/* Subcategory */}
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {product.subCategory}
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-800">
                          {currency}
                          {Number(product.offerPrice).toLocaleString()}
                        </span>
                      </td>

                      {/* Stock Status */}
                      <td className="px-6 py-4">
                        <label className="relative inline-flex cursor-pointer items-center gap-3">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked={product.inStock ?? true}
                          />

                          <div className="h-7 w-12 rounded-full bg-slate-300 transition-colors duration-200 peer-checked:bg-cyan-600" />

                          <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-5" />

                          <span className="text-xs font-semibold text-slate-600">
                            {(product.inStock ?? true)
                              ? "In Stock"
                              : "Out of Stock"}
                          </span>
                        </label>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(product._id)}
                            disabled={!product._id}
                            title="Edit product"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 txt-slate-600 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Icon icon="solar:pen-linear" width={18} />
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedProduct(product)}

                            title="Delete product"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 txt-slate-600 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Icon
                              icon="solar:trash-bin-trash-linear"
                              width={18}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <Pagination totalPages={totalPages} />

      {/* Delete Confirmation Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Icon icon="solar:trash-bin-trash-linear" width={24} />
            </div>

            <h2 className="text-lg font-bold text-slate-900">
              Delete product?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure yo want to delete{" "}
              <span className="font-semibold text-slate-800">
                {selectedProduct.name}
              </span>
              ? This action will remove it from your current product list.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Delete product
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
