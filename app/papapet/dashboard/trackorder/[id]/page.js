"use client";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "@/Axios/axios";
import TrackOrder from "@/Components/Setting/TrackOrder";

export default function TrackOrderDetail() {
  const { id: orderNumber } = useParams();
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
        const normalize = (val = "") => val.toString().replace(/^ORD[-]?/, "");
        const matchedOrder = allOrders.find(
          (o) => normalize(o.order) === normalize(orderNumber)
        );

        if (!matchedOrder?.AWB) throw new Error("Order or AWB not found");

        // 2️⃣ Fetch live tracking info from backend
        const trackRes = await axiosInstance.post("/delivery/order_tracking", {
          awb_number_list: matchedOrder.AWB.toString(),
        });

        // unwrap iThink response safely
        const rawTracking =
          trackRes.data?.trackingData || trackRes.data?.data || {};
        const awbKey = matchedOrder.AWB.toString();
        const awbData =
          rawTracking[awbKey] ||
          rawTracking[String(awbKey)] ||
          rawTracking[Number(awbKey)] ||
          Object.values(rawTracking)[0] ||
          {};

        // 3️⃣ Merge tracking info + DB order for TrackOrder component
        setOrderDetails({
          ...awbData,
          order: {
            ...matchedOrder,
            orderDate: matchedOrder.date || matchedOrder.createdAt,
            totalAmount: matchedOrder.totalAmount || matchedOrder.amount || 0,
            expectedArrival:
              awbData.edd || awbData.expected_delivery_date || null,
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
      {/* ✅ now TrackOrder receives both full details + filtered movements */}
      <TrackOrder
        details={orderDetails}
        awb={orderDetails?.awb}
      />
    </div>
  );
}
