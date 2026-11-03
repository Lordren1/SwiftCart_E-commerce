"use client";

/* import { useAppContext } from "@/context/AppContext"; */
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Title from "../title/Title";
import { useAppContext } from "@/context/AppContext";
import { orderDummyData } from "@/data";

export default function OrdersListContent() {
  const { currency, user } = useAppContext();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(Array.isArray(orderDummyData) ? orderDummyData : []);
  }, [user]);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "Date unavailable";

    return parsedDate.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm sm:py-20">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-50">
          <Icon icon="solar:bag-4-linear" className="text-4xl text-cyan-600" />
        </div>

        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          No orders yet
        </h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
          Your orders will appear here once you make your first purchase.
          Explore our collection and find something you love.
        </p>

        <Link
          href="/collection"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
        >
          Start shopping
          <Icon icon="solar:arrow-right-linear" className="text-lg" />
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* Page summary */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <Title
          title1="My"
          title2="Orders"
          para=" View your purchases, payment details and delivery addresses."
        />

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">
          <Icon icon="solar:box-linear" className="text-lg text-cyan-600" />
          {orders.length} {orders.length === 1 ? "order" : "orders"}
        </div>
      </div>

      {/* Orders */}
      {orders.map((order, index) => {
        const items = Array.isArray(order.items) ? order.items : [];
        const isPaid = Boolean(order.isPaid);
        const orderTotal = Number(order.amount ?? 0);

        return (
          <article
            key={order._id || index}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md sm:rounded-3xl"
          >
            {/* Order header */}
            <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/70 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm ring-1 ring-slate-200">
                  <Icon icon="solar:box-linear" className="text-2xl" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Order reference
                  </p>
                  <h3
                    className="mt-1 truncate text-sm font-bold text-slate-900 sm:text-base"
                    title={String(order._id || `Order ${index + 1}`)}
                  >
                    #{order._id || `ORDER-${index + 1}`}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Placed on {formatDate(order.date)}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                    isPaid
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  <Icon
                    icon={
                      isPaid
                        ? "solar:check-circle-bold"
                        : "solar:clock-circle-linear"
                    }
                    className="text-base"
                  />
                  {isPaid ? "Paid" : "Payment pending"}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                  <Icon icon="solar:card-linear" className="text-base" />
                  {order.paymentType || "Payment method unavailable"}
                </span>
              </div>
            </div>

            {/* Ordered products */}
            <div className="px-4 py-5 sm:px-6 sm:py-6">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">
                  Items ordered
                </h4>
                <span className="text-xs text-slate-500">
                  {items.length} {items.length === 1 ? "product" : "products"}
                </span>
              </div>

              {items.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {items.map((item, itemIndex) => {
                    const product = item.product;
                    const imageSrc =
                      (Array.isArray(product?.images)
                        ? product.images[0]
                        : product?.images || product?.image) ||
                      "/images/placeholder.jpg";

                    return (
                      <div
                        key={item._id || `${order._id}-${itemIndex}`}
                        className="flex items-center gap-3 py-4 first:pt-0 last:pb-0 sm:gap-4"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 sm:h-20 sm:w-20">
                          <Image
                            src={imageSrc}
                            alt={product?.name || "Ordered product"}
                            fill
                            sizes="80px"
                            className="object-contain p-1"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-semibold leading-5 text-slate-900 sm:text-base">
                            {product?.name || "Product"}
                          </p>

                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                              Size: {item.size || "Standard"}
                            </span>

                            <span className="text-xs text-slate-500">
                              Qty:{" "}
                              <span className="font-semibold text-slate-700">
                                {item.quantity ?? 0}
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="text-sm font-bold text-slate-900">
                            {currency}
                            {(
                              Number(
                                item.price ??
                                  product?.offerPrice ??
                                  product?.price ??
                                  0,
                              ) * Number(item.quantity ?? 0)
                            ).toFixed(2)}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {Number(item.quantity ?? 0)}{" "}
                            {Number(item.quantity ?? 0) === 1
                              ? "item"
                              : "items"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                  No product details are available for this order.
                </p>
              )}
            </div>

            {/* Order summary */}
            <div className="grid grid-cols-1 gap-4 border-t border-slate-100 bg-slate-50/50 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
              {/* Shipping address */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
                    <Icon icon="solar:map-point-linear" className="text-xl" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Delivery address
                  </h4>
                </div>

                <p className="text-sm font-semibold text-slate-800">
                  {order.address?.completeName || "Name unavailable"}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {[
                    order.address?.streetAddress,
                    order.address?.city,
                    order.address?.state,
                    order.address?.country,
                  ]
                    .filter(Boolean)
                    .join(", ") || "Address unavailable"}
                </p>
              </div>

              {/* Payment details */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
                    <Icon
                      icon="solar:wallet-money-linear"
                      className="text-xl"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Payment details
                  </h4>
                </div>

                <p className="text-xs text-slate-500">Payment method</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {order.paymentType || "Not specified"}
                </p>

                <p className="mt-3 text-xs text-slate-500">Payment status</p>
                <p
                  className={`mt-1 text-sm font-semibold ${
                    isPaid ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {isPaid ? "Payment confirmed" : "Awaiting payment"}
                </p>
              </div>

              {/* Total */}
              <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
                    <Icon icon="solar:wallet-linear" className="text-xl" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Order total
                  </h4>
                </div>

                <div className="mt-4">
                  <p className="text-xs text-slate-500">
                    Total amount paid or due
                  </p>
                  <p className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                    {currency}
                    {orderTotal.toFixed(2)}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    {items.reduce(
                      (total, item) => total + Number(item.quantity ?? 0),
                      0,
                    )}{" "}
                    total units
                  </p>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
