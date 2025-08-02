// app/dashboard/trackorder/[id]/page.js
"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import TrackOrder from "@/Components/Setting/TrackOrder";

export default function TrackOrderDetail() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const searchParams = useSearchParams();
  const orderString = searchParams.get("data");

  const order = orderString ? JSON.parse(orderString) : null;

  if (!order) return <p className="p-4">Order not found or data missing.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Order #{id}</h1>
      <TrackOrder user={user} order={order} />
    </div>
  );
}
