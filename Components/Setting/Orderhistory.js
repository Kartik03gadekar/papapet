"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/Axios/axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const statusClasses = {
  "IN PROGRESS": "bg-orange-100 text-orange-600",
  COMPLETED: "bg-green-100 text-green-600",
  CANCELLED: "bg-red-100 text-red-600",
  PENDING: "bg-yellow-100 text-yellow-600",
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [trackingStatuses, setTrackingStatuses] = useState({}); // store status per AWB
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const router = useRouter();

  // Fetch user from redux state
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;

  // Fetch user orders on mount
  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.post("/delivery/getOrders", { userId });

        if (res.data.success) {
          const fetchedOrders = Array.isArray(res.data.orders)
            ? res.data.orders
            : Object.values(res.data.orders || {});
          setOrders(fetchedOrders);

          // also fetch tracking for each order
          fetchedOrders.forEach((order) => {
            if (order.AWB) fetchTracking(order.AWB);
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, [userId]);

  // Fetch tracking status for a given AWB
  const fetchTracking = async (awb) => {
    try {
      const res = await axiosInstance.post("/delivery/order_tracking", {
        awb_number_list: awb,
      });

      const trackingInfo =
        res.data?.data?.[awb]?.[0]?.current_status || "IN PROGRESS";

      setTrackingStatuses((prev) => ({
        ...prev,
        [awb]: trackingInfo,
      }));
    } catch (err) {
      console.error("Tracking error:", err);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const paginateData = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Order History</h2>

      {paginateData.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {paginateData.map((order, index) => {
            // pick status: cancelled → CANCELLED, else → tracking status, else fallback
            const status = order.isCancelled
              ? "CANCELLED"
              : trackingStatuses[order.awb] || "IN PROGRESS";

            return (
              <div
                key={index}
                className="p-5 border rounded-xl shadow-md bg-white hover:shadow-lg transition"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-lg">
                    Order <br /> #{order.order}
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      statusClasses[status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {status}
                  </span>
                </div>

                {/* Info */}
                <p className="text-sm text-gray-500">
                  Date:{" "}
                  {order.date ? new Date(order.date).toLocaleDateString() : "—"}
                </p>
                <p className="text-sm text-gray-500">
                  Total:{" "}
                  {order.isCancelled ? (
                    <span className="line-through">₹{order.totalAmount}</span>
                  ) : (
                    <>₹{order.totalAmount}</>
                  )}{" "}
                  ({order.products?.length || 0} items)
                </p>

                {/* Action */}
                {order.isCancelled ? (
                  <button
                    disabled
                    className="mt-4 w-full py-2 px-4 bg-gray-300 text-gray-600 text-sm rounded-lg cursor-not-allowed"
                  >
                    Cancelled
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      router.push(
                        `/papapet/dashboard/trackorder/${order.order}`
                      )
                    }
                    className="mt-4 w-full py-2 px-4 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition"
                  >
                    View Details →
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 border rounded hover:bg-gray-200"
            disabled={currentPage === 1}
          >
            ←
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {`0${i + 1}`}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-3 py-1 border rounded hover:bg-gray-200"
            disabled={currentPage === totalPages || totalPages === 0}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
