"use client";

import React, { useState } from "react";
import axiosInstance from "@/Axios/axios";

const TRACKING_STEPS = [
  "Order Placed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

export default function TrackOrder({ details, awb }) {
  if (!details) return null;

  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(null);
  const [cancelError, setCancelError] = useState(null);
  const [printLoading, setPrintLoading] = useState(false);
  const [printError, setPrintError] = useState(null);

  const order = details.order || {};
  const products = Array.isArray(order.products) ? order.products : [];
  const productCount = products.length;
  const orderDate =
    order.orderDate || order.createdAt || details.booking_date || null;
  const totalAmount =
    order.totalAmount || order.amount || details.total_amount || 0;
  const expectedArrival =
    order.expectedArrival ||
    details.edd ||
    details.expected_delivery_date ||
    details.promised_delivery_date ||
    null;
  const notes = order.notes || details.remarks || "";

  // AWB number
  const awbNumber =
    awb || details.awb_number || details.awb || details.AWB || order.AWB || "";

  console.log("Tracking details:", awbNumber);
  // Steps and current step index
  const steps = TRACKING_STEPS;
  const statusMap = {
    "Order Placed": 0,
    Packed: 1,
    Shipped: 2,
    "Out for Delivery": 3,
    Delivered: 4,
  };
  let currentStepIndex = 0;
  if (details.current_status) {
    const status = details.current_status.trim().toLowerCase();
    const foundIdx = steps.findIndex((step) => step.toLowerCase() === status);
    if (foundIdx !== -1) {
      currentStepIndex = foundIdx;
    } else if (typeof statusMap[details.current_status] === "number") {
      currentStepIndex = statusMap[details.current_status];
    } else {
      const partialIdx = steps.findIndex((step) =>
        status.includes(step.toLowerCase())
      );
      if (partialIdx !== -1) currentStepIndex = partialIdx;
    }
  }

  // Activity timeline
  const activity =
    Array.isArray(details.shipment_track_activities) &&
    details.shipment_track_activities.length > 0
      ? details.shipment_track_activities
      : [];

  // User info (billing/shipping) fallback
  const user = order.user || order.customer || {};
  const userName =
    user.name || order.orderName || details.consignee_name || "N/A";
  const userAddress =
    user.address ||
    order.address ||
    [
      details.consignee_address,
      details.consignee_city,
      details.consignee_pincode,
    ]
      .filter(Boolean)
      .join(", ") ||
    "N/A";
  const userEmail =
    user.email || order.email || details.consignee_email || "N/A";

  // Helper for currency
  const formatCurrency = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  // Helper for date
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handler for order cancellation
  const handleCancelOrder = async () => {
    setCancelLoading(true);
    setCancelSuccess(null);
    setCancelError(null);
    try {
      const orderId = order.order || order.id || order._id;
      if (!orderId) throw new Error("Order ID not found");
      const res = await axiosInstance.post("/delivery/order_cancellation", {
        awb_numbers: awbNumber,
      });
      if (res.data && res.data.success) {
        setCancelSuccess("Order cancelled successfully.");
      } else {
        setCancelError(res.data?.message || "Failed to cancel order.");
      }
    } catch (err) {
      setCancelError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to cancel order."
      );
    } finally {
      setCancelLoading(false);
    }
  };

  // Handler for printing invoice
  const handlePrintInvoice = async () => {
    setPrintLoading(true);
    setPrintError(null);
    try {
      const res = await axiosInstance.post("/delivery/print_invoice", {
        awb_numbers: awbNumber,
      });

      const pdfUrl = res.data?.data_to_send?.file_name;
      if (!pdfUrl) throw new Error("No PDF URL received");

      // Open the PDF directly
      window.open(pdfUrl, "_blank");
    } catch (err) {
      setPrintError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to print invoice."
      );
    } finally {
      setPrintLoading(false);
    }
  };

  const canCancel =
    typeof currentStepIndex === "number" &&
    currentStepIndex < steps.length - 1 &&
    !(order.status || details.current_status || "")
      .toLowerCase()
      .includes("cancel");

  return (
    <div className="w-[80vw] mx-auto px-5 md:px-20 sm:px-6 py-5 rounded-2xl shadow-sm border border-[#e6f4f4] bg-white">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 md:justify-end justify-center mb-4">
        <button
          onClick={handlePrintInvoice}
          disabled={printLoading}
          className="px-4 py-2 rounded-lg bg-[#0D9899] text-white font-semibold text-xs hover:bg-[#0b7c7d] transition disabled:opacity-60"
          type="button"
        >
          {printLoading ? "Printing..." : "Print Invoice"}
        </button>
        {order.isCancelled ? (
          <button
            disabled
            className="px-4 py-2 rounded-lg bg-gray-400 text-white font-semibold text-xs cursor-not-allowed"
            type="button"
          >
            Cancelled
          </button>
        ) : canCancel ? (
          <button
            onClick={handleCancelOrder}
            disabled={cancelLoading}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold text-xs hover:bg-red-600 transition disabled:opacity-60"
            type="button"
          >
            {cancelLoading ? "Cancelling..." : "Cancel Order"}
          </button>
        ) : null}
      </div>

      {/* Order Summary */}
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center border-b border-[#e6f4f4] pb-4 mb-4 w-full bg-white">
        <div>
          <h2 className="text-base font-semibold text-[#0D9899] tracking-wide">
            Order #{order.order || order.id || order._id || "N/A"}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {productCount} Product{productCount !== 1 ? "s" : ""} • Placed on{" "}
            {formatDate(orderDate)}
          </p>
          {awbNumber && (
            <p className="text-xs text-gray-400 mt-1">
              <span className="font-semibold">AWB:</span> {awbNumber}
            </p>
          )}
        </div>
        <div className="text-lg font-bold text-[#0D9899] sm:text-right">
          {formatCurrency(totalAmount)}
        </div>
      </div>

      {/* Progress Steps */}
      {/* <div className="flex max-md:flex-col items-start md:items-center md:justify-between gap-2 mb-6 overflow-x-auto">
        {steps.map((step, idx) => (
          <div key={idx} className="flex-1 min-w-[60px] flex md:flex-col items-center max-md:justify-center gap-3">
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
              className={`mt-1 max-md:text-lg text-[11px] text-center leading-tight ${
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
      </div> */}
      <div className="flex max-md:flex-col items-start md:items-center md:justify-between gap-2 mb-6 overflow-x-auto">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex-1 min-w-[60px] flex md:flex-col items-center max-md:justify-center gap-3 relative"
          >
            <div
              className={`w-7 h-7 flex items-center justify-center rounded-full border-2 z-10
          ${
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
              className={`mt-1 max-md:text-lg text-[11px] text-center leading-tight
          ${
            idx <= currentStepIndex
              ? "text-[#0D9899] font-medium"
              : "text-gray-400"
          }`}
              style={{ minHeight: 28 }}
            >
              {step}
            </span>

            {/* Connector line (only between steps) */}
            {idx < steps.length - 1 && (
              <div className="absolute max-md:hidden top-3 left-[50%] w-full h-0.5 bg-gray-200 -z-0" />
            )}
          </div>
        ))}
      </div>

      {/* Order Activity */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-[#0D9899] mb-2 uppercase tracking-wide">
          Order Activity
        </h3>
        <ul className="text-sm text-gray-600 space-y-1">
          {activity.length === 0 ? (
            <li className="text-gray-400">No activity found.</li>
          ) : (
            activity.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span
                  className={` w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold ${
                    (item.activity_type || item.status || "")
                      .toLowerCase()
                      .includes("delivered") ||
                    (item.activity_type || item.status || "")
                      .toLowerCase()
                      .includes("success")
                      ? "bg-green-100 text-green-600"
                      : "bg-[#e6f4f4] text-[#0D9899]"
                  }`}
                >
                  ✓
                </span>
                <span className="text-gray-700">
                  {item.activity ||
                    item.status ||
                    item.activity_type ||
                    "Status Update"}
                  {item.date_time && (
                    <span className="ml-2 text-xs text-gray-400">
                      ({formatDate(item.date_time)})
                    </span>
                  )}
                  {item.location && (
                    <span className="ml-2 text-xs text-gray-300">
                      {item.location}
                    </span>
                  )}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Product Details */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-[#0D9899] mb-2 uppercase tracking-wide">
          Product{productCount !== 1 ? "s" : ""} ({productCount})
        </h3>
        <div className="space-y-3">
          {products.length === 0 ? (
            <div className="text-gray-400 text-xs">
              No product details available.
            </div>
          ) : (
            products.map((product, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 px-3 py-2 rounded-lg bg-[#f8fefe]"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {product.name || product.title || "Product"}
                  </p>
                </div>
                <div className="text-right text-sm">
                  <p className="text-[#0D9899] font-semibold">
                    {formatCurrency(product.price || product.amount || 0)}
                  </p>
                  <p className="text-xs text-gray-400">
                    x{product.quantity || 1}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Address & Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="border border-[#e6f4f4] rounded-lg p-3 bg-[#f8fefe]">
          <h4 className="font-semibold text-[#0D9899] mb-1 text-xs uppercase tracking-wide">
            Billing Address
          </h4>
          <p className="text-gray-700 font-bold capitalize">{userName}</p>
          <p className="text-gray-500">{userAddress}</p>
          <p className="mt-1 text-xs text-gray-400">Email: {userEmail}</p>
        </div>
        <div className="border border-[#e6f4f4] rounded-lg p-3 bg-[#f8fefe]">
          <h4 className="font-semibold text-[#0D9899] mb-1 text-xs uppercase tracking-wide">
            Shipping Address
          </h4>
          <p className="text-gray-700 font-bold capitalize">{userName}</p>
          <p className="text-gray-500">{userAddress}</p>
          <p className="mt-1 text-xs text-gray-400">Email: {userEmail}</p>
        </div>
        <div className="border border-[#e6f4f4] rounded-lg p-3 bg-[#f8fefe] sm:col-span-2">
          <h4 className="font-semibold text-[#0D9899] mb-1 text-xs uppercase tracking-wide">
            Order Notes
          </h4>
          <p className="text-xs text-gray-600">
            {notes ? notes : <span className="text-gray-400">No notes</span>}
          </p>
        </div>
      </div>
      {/* <div className="mt-6 text-center">
        <span className="inline-block text-xs text-gray-400">
          Expected Arrival:{" "}
          <span className="text-[#0D9899] font-semibold">
            {formatDate(expectedArrival)}
          </span>
        </span>
      </div> */}
    </div>
  );
}
