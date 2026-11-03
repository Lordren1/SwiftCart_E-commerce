"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { Icon } from "@iconify/react";
import SectionHeading from "../components/seller/SectionHeading";
import { useAppContext } from "@/context/AppContext";

// Convert newly uploaded images into data URLs so they can be previewed and stored in the product payload.
const fileTodataURL = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject(new Error("Image could not be loaded"));

    reader.readAsDataURL(file);
  });

export default function AddProduct({ mode = "add", productId }) {
  const { currency, products, updateProduct, router } = useAppContext();
  const existingProduct = products.find((product) => product._id === productId);

  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [popular, setPopular] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    if (mode !== "edit" || !existingProduct) return;

    setName(existingProduct.name || "");
    setDescription(existingProduct.description || "");
    setCategory(existingProduct.category || "Men");
    setSubCategory(existingProduct.subCategory || "Topwear");
    setPrice(String(existingProduct.price ?? ""));
    setOfferPrice(String(existingProduct.offerPrice ?? ""));
    setPopular(existingProduct.popular ?? false);
    setSelectedSizes(existingProduct.sizes || []);
    setExistingImages(existingProduct.images || []);
    setFiles([]);
  }, [mode, existingProduct]);

  // Data Schema Arrays synced with SwiftCart inventory configurations
  const categories = [
    { name: "Men" },
    { name: "Women" },
    { name: "Kids" },
    { name: "Shoes" },
  ];

  const clothingSubcategories = ["Topwear", "Bottomwear", "Winterwear"];

  const shoeSubcategories = ["Sneakers", "Boots", "Loafers", "Sandals"];

  const clothingSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const shoeSizes = ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"];

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10";

  const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

  const subCategories = useMemo(
    () => (category === "Shoes" ? shoeSubcategories : clothingSubcategories),
    [category],
  );

  const availableSizeOptions = useMemo(
    () => (category === "Shoes" ? shoeSizes : clothingSizes),
    [category],
  );

  const handleCategoryChange = (event) => {
    const nextCategory = event.target.value;

    setCategory(nextCategory);
    setSubCategory(nextCategory === "Shoes" ? "Sneakers" : "Topwear");
    setSelectedSizes([]);
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFiles((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });

    e.target.value = "";
  };

  const getImagePreview = (index) => {
    if (files[index]) {
      return URL.createObjectURL(files[index]);
    }

    return existingImages[index] || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (mode === "edit" && !existingProduct) {
      setError("Product could not be found for editing.");
      return;
    }

    if (!selectedSizes.length) {
      setError("Select at least one available size.");
      return;
    }

    if (Number(price) <= 0 || Number(offerPrice) <= 0) {
      setError("Enter valid prices greater than zero.");
      return;
    }

    if (Number(offerPrice) > Number(price)) {
      setError("The offer price cannot exceed the original price.");
      return;
    }

    setSubmitting(true);

    try {
      // Keep existing images unless the seller replaces them with new updates.
      const images = await Promise.all(
        Array.from({ length: 4 }, async (_, index) => {
          if (files[index]) {
            return await fileTodataURL(files[index]);
          }

          return existingImages[index] || null;
        }),
      );

      const productPayload = {
        name: name.trim(),
        description: description.trim(),
        category,
        subCategory,
        price: Number(price),
        offerPrice: Number(offerPrice),
        popular,
        sizes: selectedSizes,
        images: images.filter(Boolean),
      };

      if (mode === "edit") {
        updateProduct(productId, productPayload);

        alert("Product updated successfully.");
        router.push("/seller/product-list");
      } else {
        console.log("SwiftCart product payload:", productPayload);
        alert("Product details validated succcessfully.");
      }
    } catch (error) {
      console.error("Product submission error:", error);
      setError(
        "Something went wrong while saving the product. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (mode === "edit" && !existingProduct && products.length > 0) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <Icon
            icon="solar:danger-circle-linear"
            width={40}
            className="mx-auto mb-4 text-rose-500"
          />

          <h1 className="mb-2 text-2xl font-bold text-slate-950">
            Product not found
          </h1>
          <p className="mb-6 text-sm text-slate-500">
            The product you are trying to edit does not exist in your inventory.
            Please check the product ID or return to your product list.
          </p>

          <button
            onClick={() => router.push("/seller/product-list")}
            className="mt-6 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/20"
          >
            <Icon
              icon="solar:arrow-left-bold"
              width={16}
              className="mr-2 inline"
            />
            Return to Product List
          </button>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Page header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-xs font-bold text-cyan-800">
              <Icon icon="solar:shop-2-linear" width={16} />
              SWIFTCART SELLER CENTRE
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              {mode === "edit" ? "Edit Product" : "Add New Product"}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              {mode === "edit"
                ? "Update your product images, details, sizes, and pricing."
                : "Create a product listing with images, details, sizes, and pricing."}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Icon
              icon="solar:check-circle-linear"
              width={19}
              className="text-emerald-600"
            />
            All changes are local until you submit
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Grid Boxes */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <SectionHeading
              icon="solar:gallery-add-linear"
              title="Product images"
              description="Add up to four clear images of your product."
            />

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <label
                  key={index}
                  htmlFor={`product-image-${index}`}
                  className="relative group flex aspect-square cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50 transition hover:border-cyan-500 hover:bg-cyan-50/40"
                >
                  <input
                    accept="image/*"
                    type="file"
                    id={`product-image-${index}`}
                    className="sr-only"
                    onChange={(e) => handleImageChange(e, index)}
                  />

                  {getImagePreview(index) ? (
                    <>
                      <Image
                        fill
                        className="object-contain p-2"
                        src={getImagePreview(index)}
                        alt={`Upload Preview ${index + 1}`}
                        sizes="(max-width: 640px) 45vw, 200px"
                        unoptimized
                      />

                      <span className="absolute inset-x-0 bottom-0 bg-slate-950/70 py-2 text-center text-xs font-semibold text-white">
                        Change image
                      </span>
                    </>
                  ) : (
                    <>
                      <Icon
                        icon="solar:camera-add-linear"
                        width={24}
                        height={24}
                        className="mb-2 text-slate-400 transition group-hover:text-cyan-600"
                      />
                      <span className="text-sm font-semibold text-slate-600">
                        Upload
                      </span>

                      <span className="mt-1 text-xs text-slate-400">
                        Image {index + 1}
                      </span>
                    </>
                  )}
                </label>
              ))}
            </div>
          </section>

          {/* Details */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <SectionHeading
              icon="solar:document-text-linear"
              title="Product details"
              description="Provide the information customers will see."
            />

            <div className="space-y-5">
              <div>
                <label className={labelClass} htmlFor="product-name">
                  Product name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="product-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Classic Cotton T-Shirt"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="product-description">
                  Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="product-description"
                  rows={5}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Describe the material, fit, colour, and product features..."
                  className={`${inputClass} resize-y`}
                  required
                />
                <p className="mt-2 text-right text-xs text-slate-400">
                  {description.length} characters
                </p>
              </div>
            </div>
          </section>

          {/* Category */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <SectionHeading
              icon="solar:widget-4-linear"
              title="Category and sizes"
              description="Organise your product and choose the available variants."
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="category">
                  Category
                </label>

                <select
                  id="category"
                  value={category}
                  onChange={handleCategoryChange}
                  className={inputClass}
                >
                  {categories.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="subcategory">
                  Subcategory
                </label>
                <select
                  id="subcategory"
                  value={subCategory}
                  onChange={(event) => setSubCategory(event.target.value)}
                  className={inputClass}
                >
                  {subCategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-7 border-t border-slate-100 pt-6">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-800">
                  Available sizes
                </h3>
                <span className="text-xs text-slate-400">
                  {selectedSizes.length} selected
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {availableSizeOptions.map((size) => {
                  const selected = selectedSizes.includes(size);

                  return (
                    <button
                      key={size}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => handleSizeToggle(size)}
                      className={`min-w-14 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                        selected
                          ? "border-cyan-600 bg-cyan-600 text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-cyan-400 hover:bg-cyan-50"
                      }`}
                    >
                      {selected && (
                        <Icon
                          icon="solar:check-circle-bold"
                          width={14}
                          className="mr-1 inline"
                        />
                      )}
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <SectionHeading
              icon="solar:tag-price-linear"
              title="Pricing and promotion"
              description="Set the regular price and your current offer price."
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="product-price">
                  Original price {currency}
                </label>
                <input
                  id="product-price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="product-price">
                  Offer price {currency}
                </label>
                <input
                  id="offer-price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  placeholder="0.00"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {Number(price) > 0 &&
              Number(offerPrice) > 0 &&
              Number(offerPrice) <= Number(price) && (
                <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  <Icon icon="solar:tag-price-linear" width={19} />
                  {Number(offerPrice) < Number(price)
                    ? `Discount: ${Math.round(
                        ((Number(price) - Number(offerPrice)) / Number(price)) *
                          100,
                      )}%`
                    : "No discount applied"}
                </div>
              )}

            <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-cyan-300">
              <input
                type="checkbox"
                checked={popular}
                onChange={(e) => setPopular(e.target.checked)}
                className="mt-1 h-4 w-4 accent-cyan-600"
              />

              <span>
                <span className="block text-sm font-semibold text-slate-800">
                  Feature as a popular product
                </span>

                <span className="mt-1 block text-xs leading-5 text-slate-500">
                  Mark this item for your popular products section.
                </span>
              </span>
            </label>
          </section>

          {/* Validation and submit */}
          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p4 text-sm text-rose-700"
            >
              <Icon
                icon="solar:danger-circle-linear"
                width={20}
                className="shrink-0"
              />
              {error}
            </div>
          )}

          <div className="flex flex-col-reverse gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-slate-400">
              Required fields must be completed before submitting.
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-7 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 disabled:opacity-60"
            >
              <Icon
                icon={
                  mode === "edit"
                    ? "solar:edit-pencil-linear"
                    : "solar:add-circle-linear"
                }
                width={20}
              />
              {submitting
                ? "Processing..."
                : mode === "edit"
                  ? "Save changes"
                  : "Add product"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
