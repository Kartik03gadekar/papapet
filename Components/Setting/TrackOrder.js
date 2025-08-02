"use client";

import React from "react";

export default function TrackOrder({ user, order }) {
  if (!order) return null;
  const {
    id,
    productCount,
    orderDate,
    totalAmount,
    expectedArrival,
    steps,
    currentStepIndex,
    activity,
    products,
    notes,
  } = order;

  // Helper for currency
  const formatCurrency = (amount) =>
    `₹${amount.toLocaleString("en-IN")}`;

  // Helper for date
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-screen mx-auto px-20 sm:px-6 py-5 rounded-2xl shadow-sm border border-[#e6f4f4] bg-white">
      {/* Order Summary */}
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center border-b border-[#e6f4f4] pb-4 mb-4 w-full bg-white">
        <div>
          <h2 className="text-base font-semibold text-[#0D9899] tracking-wide">Order #{id}</h2>
          <p className="text-xs text-gray-500 mt-1">
            {productCount} Product{productCount > 1 ? "s" : ""} • Placed on {formatDate(orderDate)}
          </p>
        </div>
        <div className="text-lg font-bold text-[#0D9899] sm:text-right">{formatCurrency(totalAmount)}</div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between gap-2 mb-6 overflow-x-auto">
        {steps.map((step, idx) => (
          <div key={idx} className="flex-1 min-w-[60px] flex flex-col items-center">
            <div
              className={`w-7 h-7 flex items-center justify-center rounded-full border-2 ${
                idx < currentStepIndex
                  ? "bg-[#0D9899] border-[#0D9899] text-white"
                  : idx === currentStepIndex
                  ? "bg-white border-[#0D9899] text-[#0D9899] font-bold"
                  : "bg-gray-100 border-gray-200 text-gray-400"
              } transition`}
            >
              {idx + 1}
            </div>
            <span
              className={`mt-1 text-[11px] text-center leading-tight ${
                idx <= currentStepIndex
                  ? "text-[#0D9899] font-medium"
                  : "text-gray-400"
              }`}
              style={{ minHeight: 28 }}
            >
              {step}
            </span>
            {idx < steps.length - 1 && (
              <div className="hidden sm:block w-full h-0.5 bg-gray-200 mt-1" />
            )}
          </div>
        ))}
      </div>

      {/* Order Activity */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-[#0D9899] mb-2 uppercase tracking-wide">Order Activity</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          {activity.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <span
                className={`inline-block w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold ${
                  item.type === 'success'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-[#e6f4f4] text-[#0D9899]'
                }`}
              >
                ✓
              </span>
              <span className="text-gray-700">{item.message}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Product Details */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-[#0D9899] mb-2 uppercase tracking-wide">
          Product{products.length > 1 ? "s" : ""} ({products.length})
        </h3>
        <div className="space-y-3">
          {products.map((product, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 px-3 py-2 rounded-lg bg-[#f8fefe]"
            >
              <div>
                <p className="font-medium text-gray-800">{product.name}</p>
                {product.description && (
                  <p className="text-xs text-gray-400">{product.description}</p>
                )}
              </div>
              <div className="text-right text-sm">
                <p className="text-[#0D9899] font-semibold">{formatCurrency(product.price)}</p>
                <p className="text-xs text-gray-400">x{product.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Address & Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="border border-[#e6f4f4] rounded-lg p-3 bg-[#f8fefe]">
          <h4 className="font-semibold text-[#0D9899] mb-1 text-xs uppercase tracking-wide">Billing Address</h4>
          <p className="text-gray-700">{user?.name}</p>
          <p className="text-gray-500">{user?.address}</p>
          <p className="mt-1 text-xs text-gray-400">Email: {user?.email}</p>
        </div>
        <div className="border border-[#e6f4f4] rounded-lg p-3 bg-[#f8fefe]">
          <h4 className="font-semibold text-[#0D9899] mb-1 text-xs uppercase tracking-wide">Shipping Address</h4>
          <p className="text-gray-700">{user?.name}</p>
          <p className="text-gray-500">{user?.address}</p>
          <p className="mt-1 text-xs text-gray-400">Email: {user?.email}</p>
        </div>
        <div className="border border-[#e6f4f4] rounded-lg p-3 bg-[#f8fefe] sm:col-span-2">
          <h4 className="font-semibold text-[#0D9899] mb-1 text-xs uppercase tracking-wide">Order Notes</h4>
          <p className="text-xs text-gray-600">{notes || <span className="text-gray-400">No notes</span>}</p>
        </div>
      </div>
      <div className="mt-6 text-center">
        <span className="inline-block text-xs text-gray-400">
          Expected Arrival:{" "}
          <span className="text-[#0D9899] font-semibold">{formatDate(expectedArrival)}</span>
        </span>
      </div>
    </div>
  );
}
