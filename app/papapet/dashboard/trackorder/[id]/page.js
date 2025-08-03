"use client";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "@/Axios/axios";
import TrackOrder from "@/Components/Setting/TrackOrder";

export default function TrackOrderDetail() {
  const { id: orderNumber } = useParams(); // e.g., ORD510576
  const { user } = useSelector((state) => state.auth);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        // 1️⃣ Fetch all user orders from DB
        const ordersRes = await axiosInstance.post("/delivery/getOrders", {
          userId: user?._id,
        });

        const allOrders = ordersRes.data?.orders || [];
        const matchedOrder = allOrders.find(
          (o) => o.order?.toString() === orderNumber
        );

        if (!matchedOrder?.AWB) throw new Error("Order or AWB not found");

        // 2️⃣ Fetch live tracking info from backend
        const trackRes = await axiosInstance.post("/delivery/order_tracking", {
          // Convert AWB to string (iThink expects comma-separated string if multiple)
          awb_number_list: matchedOrder.AWB.toString(),
        });

        // ✅ Expecting backend to return: { success: true, trackingData: {...} }
        const awbData =
          trackRes.data?.trackingData?.[matchedOrder.AWB] ||
          trackRes.data?.trackingData?.[matchedOrder.AWB.toString()] ||
          {};

        // 3️⃣ Merge tracking info + DB order for TrackOrder component
        setOrderDetails({
          ...awbData,
          order: {
            ...matchedOrder,
            // Add fallback fields if DB doesn't store them
            orderDate: matchedOrder.date || matchedOrder.createdAt,
            totalAmount: matchedOrder.totalAmount || matchedOrder.amount || 0,
            expectedArrival: awbData.edd || awbData.expected_delivery_date || null,
            productCount: matchedOrder.products?.length || 0,
          },
          awb: matchedOrder.AWB,
        });
      } catch (err) {
        console.error("Failed to fetch order details", err);
        setOrderDetails(null);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchOrderDetail();
  }, [orderNumber, user?._id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!orderDetails)
    return <div className="p-4 text-red-500">Order not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Order #{orderNumber}</h1>
      <TrackOrder details={orderDetails} awb={orderDetails?.awb} />
    </div>
  );
}
