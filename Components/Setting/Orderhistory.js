"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/Axios/axios";
import { useRouter } from "next/navigation" // your axios setup
import { useSelector } from "react-redux";

const statusClasses = {
  "IN PROGRESS": "text-orange-500",
  COMPLETED: "text-green-600",
  CANCELED: "text-red-500",
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [trackingData, setTrackingData] = useState({});
  const itemsPerPage = 6;
  const router = useRouter();

  // Fetch user from redux state
  const { user } = useSelector((state) => state.auth); // ✅ correct slice
  const userId = user?._id;

  // 1️⃣ Fetch user orders on mount
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
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, [userId]);

  // 2️⃣ Pagination logic
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const paginateData = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 3️⃣ Fetch tracking for a single order on click
  const handleViewDetails = async (awb) => {
    if (!awb) return;

    try {
      // Fetch tracking info
      const trackRes = await axiosInstance.post("/delivery/order_tracking", {
        awb_number_list: awb,
      });

      // Merge into state
      setTrackingData((prev) => ({
        ...prev,
        [awb]: trackRes.data.data || trackRes.data,
      }));
    } catch (err) {
      console.error("Error fetching tracking:", err);
    }
  };

  return (
    <div className="w-full p-4 overflow-x-auto bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Order History</h2>
      <table className="min-w-full table-auto text-left">
        <thead className="border-b-2">
          <tr className="text-gray-700">
            <th className="py-2 px-4">ORDER ID</th>
            <th className="py-2 px-4">STATUS</th>
            <th className="py-2 px-4">DATE</th>
            <th className="py-2 px-4">TOTAL</th>
            <th className="py-2 px-4">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {paginateData.map((order, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4">{order.order}</td>
              <td
                className={`py-2 px-4 ${
                  statusClasses[order.status || "IN PROGRESS"]
                }`}
              >
                {order.status || "IN PROGRESS"}
              </td>
              <td className="py-2 px-4">
                {order.date ? new Date(order.date).toLocaleString() : ""}
              </td>
              <td className="py-2 px-4">
                ₹{order.totalAmount} ({order.products?.length || 0} Products)
              </td>
              <td
                className="py-2 px-4 text-blue-600 cursor-pointer"
                onClick={() =>
                  router.push(`/papapet/dashboard/trackorder/${order.order}`)
                }
              >
                View Details →
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 4️⃣ Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
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

      {/* 5️⃣ Tracking Info Modal (Optional inline display) */}
      {Object.entries(trackingData).map(([awb, data]) => (
        <div key={awb} className="mt-4 p-3 border rounded bg-gray-50">
          <h3 className="font-semibold text-lg mb-2">
            Tracking for AWB: {awb}
          </h3>
          <pre className="text-sm overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
