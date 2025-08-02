"use client";

import React from "react";
import { useRouter } from "next/navigation";

const orders = [
  {
    id: "1234",
    totalAmount: 2999,
    productCount: 3,
    orderDate: "2025-08-02",
    expectedArrival: "2025-08-05",
    steps: ["Order Placed", "Packaging", "On The Road", "Delivered"],
    currentStepIndex: 2,
    activity: [
      { type: "info", message: "Your order has been confirmed." },
      { type: "info", message: "Your order is on the way to last mile hub." },
    ],
    products: [
      {
        name: "Dog Bed",
        description: "Soft and cozy",
        price: 999,
        quantity: 1,
      },
    ],
    notes: "Leave at the door.",
  },
  {
    id: "5678",
    totalAmount: 1599,
    productCount: 1,
    orderDate: "2025-07-30",
    expectedArrival: "2025-08-03",
    steps: ["Order Placed", "Packaging", "On The Road", "Delivered"],
    currentStepIndex: 1,
    activity: [{ type: "info", message: "Your order has been confirmed." }],
    products: [
      {
        name: "Cat Toy",
        description: "With feathers",
        price: 1599,
        quantity: 1,
      },
    ],
    notes: "Gift wrap it please.",
  },
];

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function TrackOrderPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full bg-white py-8 px-2 sm:px-6">
      <div className="w-full mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Your Orders
          </h1>
          <p className="text-gray-500 mt-2 text-base">
            Track and manage your recent orders.
          </p>
        </header>
        <section className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center text-gray-400 py-16">
              <span className="text-5xl mb-4 block">📦</span>
              <p className="text-lg">No orders found.</p>
            </div>
          ) : (
            orders.map((order) => (
              <button
                key={order.id}
                onClick={() =>
                  router.push(
                    `/papapet/dashboard/trackorder/${order.id}?data=${encodeURIComponent(
                      JSON.stringify(order)
                    )}`
                  )
                }
                className="w-full text-left bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 group"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 py-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition">
                        Order <span className="font-semibold">#{order.id}</span>
                      </span>
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                          order.currentStepIndex === order.steps.length - 1
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.steps[order.currentStepIndex]}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span>
                        {order.productCount} product
                        {order.productCount > 1 ? "s" : ""}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span>
                        Placed: {formatDate(order.orderDate)}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span>
                        Expected: {formatDate(order.expectedArrival)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end min-w-[90px]">
                    <span className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
                      ₹{order.totalAmount}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      {order.products[0]?.name}
                      {order.productCount > 1 ? " +" : ""}
                      {order.productCount > 1
                        ? order.productCount - 1
                        : ""}
                    </span>
                  </div>
                </div>
                <div className="border-t border-gray-100 px-5 py-2 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {order.notes}
                  </span>
                  <span className="text-xs text-blue-500 font-medium group-hover:underline">
                    View details &rarr;
                  </span>
                </div>
              </button>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
