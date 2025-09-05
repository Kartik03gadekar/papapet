"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/Axios/axios";
import { useSelector } from "react-redux";

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
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.post("/delivery/getOrders", {
          userId: user?._id,
        });
        setOrders(res.data.orders || []);
      } catch (err) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    if (user?._id) {
      fetchOrders();
    }
  }, [user?._id]);

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
          {loading ? (
            <div className="text-center text-gray-400 py-16">
              <span className="text-lg">Loading orders...</span>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center text-gray-400 py-16">
              <span className="text-5xl mb-4 block">📦</span>
              <p className="text-lg">No orders found.</p>
            </div>
          ) : (
            orders.map((order, index) => (
              <button
                key={index}
                onClick={() =>
                  router.push(`/papapet/dashboard/trackorder/${order.order}`)
                }
                className="w-full text-left bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 group"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 py-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition">
                        Order{" "}
                        <span className="font-semibold">#{order.order}</span>
                      </span>
                      {order.steps &&
                        typeof order.currentStepIndex === "number" && (
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                              order.currentStepIndex === order.steps.length - 1
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {order.steps[order.currentStepIndex]}
                          </span>
                        )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span>
                        {order.productCount} product
                        {order.productCount > 1 ? "s" : ""}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span>Placed: {formatDate(order.date)}</span>
                      <span className="hidden sm:inline">•</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end min-w-[90px]">
                    <span className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
                      ₹{order.totalAmount}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      {order.products && order.products[0]?.name}
                      {order.productCount > 1 ? " +" : ""}
                      {order.productCount > 1 ? order.productCount - 1 : ""}
                    </span>
                  </div>
                </div>
                <div className="border-t border-gray-100 px-5 py-2 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{order.notes}</span>
                  <span
                    className={`text-xs font-medium group-hover:underline ${
                      order.isCancelled ? "text-red-500" : "text-orange-500"
                    }`}
                  >
                    {order.isCancelled ? "Cancelled" : "View details →"}
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
