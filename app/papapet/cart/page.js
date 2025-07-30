"use client";

import React, { useState, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "@/store/slices/cartSlices";
import NavPapaPet from "@/Components/Nav/NavPapaPet";



// Modern minimal: subtle colors, more whitespace, less border, soft shadow, rounded corners, clean font, less clutter

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutPage() {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const user = useSelector((state) => state.auth.user);
  const browsingHistory = [
    {
      id: 1,
      name: "TOZO T6 True Wireless Earbuds Bluetooth Headphones",
      price: 70,
      rating: 5,
      reviews: 738,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Samsung Electronics Samsung Galaxy S21 5G",
      price: 2300,
      rating: 5,
      reviews: 536,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/60Hz)",
      price: 360,
      rating: 5,
      reviews: 423,
      image: "/placeholder.svg",
      badge: "BEST DEALS",
    },
    {
      id: 4,
      name: "Portable Washing Machine, 11lbs capacity Model 18NMF...",
      price: 80,
      rating: 4,
      reviews: 816,
      image: "/placeholder.svg",
    },
  ];

  // Redux-based quantity update
  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  // Coupon logic (fetch from backend)
  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponError("Please enter a coupon code.");
      setAppliedCoupon(null);
      return;
    }
    setIsCouponLoading(true);
    setCouponError("");
    setAppliedCoupon(null);

    try {
      const res = await fetch(`/api/coupons?code=${encodeURIComponent(code)}`);
      if (!res.ok) {
        throw new Error("Coupon not found or invalid.");
      }
      const coupon = await res.json();

      const now = new Date();
      if (!coupon.isActive) {
        setCouponError("This coupon is not active.");
      } else if (coupon.expiresAt && new Date(coupon.expiresAt) < now) {
        setCouponError("This coupon has expired.");
      } else if (
        typeof coupon.usageLimit === "number" &&
        typeof coupon.usedCount === "number" &&
        coupon.usedCount >= coupon.usageLimit
      ) {
        setCouponError("This coupon has reached its usage limit.");
      } else if (
        typeof coupon.minPurchase === "number" &&
        subtotal < coupon.minPurchase
      ) {
        setCouponError(
          `Minimum purchase of ₹${coupon.minPurchase} required for this coupon.`
        );
      } else {
        let discountValue = 0;
        if (coupon.discountType === "fixed") {
          discountValue = coupon.discountValue;
        } else if (coupon.discountType === "percentage") {
          discountValue = (subtotal * coupon.discountValue) / 100;
          if (
            typeof coupon.maxDiscount === "number" &&
            coupon.maxDiscount > 0
          ) {
            discountValue = Math.min(discountValue, coupon.maxDiscount);
          }
        }
        setAppliedCoupon({
          code: coupon.code,
          value: Math.floor(discountValue),
          details: coupon,
        });
        setCouponError("");
      }
    } catch (err) {
      setCouponError(
        err?.message === "Coupon not found or invalid."
          ? "Invalid coupon code."
          : "Failed to validate coupon. Please try again."
      );
      setAppliedCoupon(null);
    } finally {
      setIsCouponLoading(false);
    }
  };

  // Calculate subtotal
  const subtotal =
    cartItems && cartItems.length
      ? cartItems.reduce(
          (sum, item) =>
            sum +
            (item.discountprice
              ? item.discountprice * (item.quantity || 1)
              : item.price * (item.quantity || 1)),
          0
        )
      : 0;

  const shipping = 0;
  const discount = appliedCoupon ? appliedCoupon.value : 0;
  const tax = subtotal > 0 ? subtotal * 0.18 : 0;
  const total = subtotal + shipping - discount + tax;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-base ${
          i < rating ? "text-orange-400" : "text-gray-200"
        }`}
      >
        ★
      </span>
    ));
  };

  
const handleCheckout = useCallback(async () => {
  const razorpayLoaded = await loadRazorpayScript();
  if (!razorpayLoaded) {
    alert("Failed to load Razorpay SDK.");
    return;
  }

  const backendOrderRes = await fetch("http://localhost:8080/api/payment/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ amount: total.toFixed(2) }),
  });

  const order = await backendOrderRes.json();

  if (!order.id) {
    alert("Failed to create Razorpay order");
    return;
  }

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: "Papapet",
    description: "Order Payment",
    order_id: order.id,
    handler: async function (response) {
      try {
        const verifyRes = await fetch("http://localhost:8080/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        const verifyData = await verifyRes.json();
        if (!verifyData.success) {
          alert("Payment verification failed.");
          return;
        }

        const orderPayload = {
          order: "ORD" + Date.now().toString().slice(-6),
          order_date: new Date().toISOString().split("T")[0],
          total_amount: total,
          name: user?.name || "Rohit",
          add: user?.address || "123 MG Road",
          pin: user?.pincode || "462001",
          phone: user?.phone || "9876543210",
          billing_name: user?.billing_name || user?.name || "Rohit",
          billing_add: user?.billing_address || user?.address || "123 MG Road",
          billing_pin: user?.billing_pincode || user?.pincode || "462001",
          billing_phone: user?.billing_phone || user?.phone || "9876543210",
          email: user?.email || "rm459567@gmail.com",
          userId: user?._id || "68238557a668edc0ee872d33",
          products: cartItems.map((item) => ({
            product_name: item.name,
            product_quantity: item.quantity || 1,
            product_price: item.discountprice || item.price,
          })),
          shipment_length: 20,
          shipment_width: 10,
          shipment_height: 5,
          weight: 1.5,
          payment_id: response.razorpay_payment_id,
        };

        const saveOrder = await fetch("http://localhost:8080/api/v1/delivery/order_creation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(orderPayload),
        });

        const orderResult = await saveOrder.json();
        if (!saveOrder.ok) {
          console.error("Order saving failed:", orderResult);
          alert("Order could not be saved. Please contact support.");
          return;
        }

        alert("Order placed successfully!");
        window.location.href = "/thank-you";
      } catch (error) {
        console.error("Error in order handler:", error);
        alert("Something went wrong. Please try again.");
      }
    },
    prefill: {
      name: "Customer",
      email: "test@example.com",
      contact: "9999999999",
    },
    theme: { color: "#f97316" },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();

  paymentObject.on("payment.failed", function (response) {
    alert("Payment failed.");
    console.error(response.error);
  });
}, [user, cartItems, total]);

  // --- UI ---

  return (
    <>
      <NavPapaPet />
      <main className="bg-neutral-50 min-h-screen pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-8 tracking-tight">
            Shopping Cart
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <section className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm p-0 sm:p-2 md:p-4 mb-6 border border-neutral-100">
                {/* Table header */}
                <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-medium text-neutral-500 px-4 py-2 border-b border-neutral-100">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Qty</div>
                  <div className="col-span-2 text-center">Subtotal</div>
                </div>
                {cartItems && cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div
                      key={item._id || item.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-4 py-4 border-b last:border-b-0 border-neutral-100"
                    >
                      {/* Product Info */}
                      <div className="md:col-span-6 flex items-center gap-4 w-full">
                        <button
                          onClick={() => handleRemove(item._id || item.id)}
                          className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-red-500 hover:border-red-200 transition-colors duration-150"
                          aria-label="Remove item"
                        >
                          <span className="text-lg font-light">×</span>
                        </button>
                        <div className="w-16 h-16 bg-neutral-100 rounded-xl flex-shrink-0 overflow-hidden border border-neutral-100">
                          <img
                            src={
                              item.image
                                ? typeof item.image === "string"
                                  ? item.image
                                  : item.image[0]?.filename
                                  ? `http://localhost:8080/api/v1/admin/get/image/${
                                      item.image[0]?.filename
                                    }/${
                                      item.image[0]?.mimetype?.split("/")[0]
                                    }/${item.image[0]?.mimetype?.split("/")[1]}`
                                  : "/placeholder.svg"
                                : "/placeholder.svg"
                            }
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-neutral-900 text-base truncate">
                            {item.name}
                          </h3>
                        </div>
                      </div>
                      {/* Price */}
                      <div className="md:col-span-2 text-center mt-2 md:mt-0">
                        <div className="flex items-center justify-center gap-2">
                          {item.price &&
                            item.discountprice &&
                            item.discountprice < item.price && (
                              <span className="text-neutral-300 line-through text-sm">
                                ₹{item.price}
                              </span>
                            )}
                          <span className="font-semibold text-base text-neutral-900">
                            ₹
                            {item.discountprice
                              ? item.discountprice
                              : item.price}
                          </span>
                        </div>
                      </div>
                      {/* Quantity */}
                      <div className="md:col-span-2 flex items-center justify-center mt-2 md:mt-0">
                        <div className="flex items-center bg-neutral-100 rounded-lg px-2 py-1">
                          <button
                            onClick={() => handleDecrement(item._id || item.id)}
                            className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 rounded transition"
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <span className="text-lg">−</span>
                          </button>
                          <span className="w-10 text-center font-medium text-neutral-900 text-base">
                            {(item.quantity || 1).toString().padStart(2, "0")}
                          </span>
                          <button
                            onClick={() => handleIncrement(item._id || item.id)}
                            className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 rounded transition"
                            aria-label="Increase quantity"
                          >
                            <span className="text-lg">+</span>
                          </button>
                        </div>
                      </div>
                      {/* Subtotal */}
                      <div className="md:col-span-2 text-center mt-2 md:mt-0">
                        <span className="font-semibold text-base text-neutral-900">
                          ₹
                          {(item.discountprice
                            ? item.discountprice
                            : item.price) * (item.quantity || 1)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-neutral-400 py-12 text-lg font-medium">
                    Your cart is empty.
                  </div>
                )}
              </div>
              {/* Cart Actions */}
              <div className="flex flex-col xs:flex-row gap-3 mt-2">
                <button className="flex items-center justify-center gap-2 px-6 py-2 border border-neutral-200 text-neutral-700 rounded-lg font-medium hover:bg-neutral-100 transition w-full xs:w-auto shadow-sm">
                  <ArrowLeft size={18} />
                  <span className="hidden xs:inline">Return to Shop</span>
                  <span className="inline xs:hidden">Shop</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-2 border border-neutral-200 text-neutral-700 rounded-lg font-medium hover:bg-neutral-100 transition w-full xs:w-auto shadow-sm">
                  Update Cart
                </button>
              </div>
            </section>
            {/* Cart Summary */}
            <aside className="lg:col-span-1">
              {/* Coupon */}
              <div className="mb-6">
                <form
                  className="flex flex-col xs:flex-row gap-2"
                  onSubmit={handleApplyCoupon}
                >
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-4 py-2 bg-neutral-100 border border-neutral-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-orange-200 transition"
                    disabled={!!appliedCoupon || isCouponLoading}
                  />
                  <button
                    type="submit"
                    className={`px-6 py-2 bg-orange-400 text-white rounded-lg font-semibold hover:bg-orange-500 transition text-base shadow-sm ${
                      appliedCoupon || isCouponLoading
                        ? "opacity-60 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={!!appliedCoupon || isCouponLoading}
                  >
                    {isCouponLoading
                      ? "Checking..."
                      : appliedCoupon
                      ? "Applied"
                      : "Apply"}
                  </button>
                </form>
                {couponError && (
                  <div className="text-red-500 text-sm mt-2">{couponError}</div>
                )}
                {appliedCoupon && (
                  <div className="text-green-600 text-sm mt-2 flex items-center gap-2">
                    <span>
                      Coupon{" "}
                      <span className="font-bold">{appliedCoupon.code}</span>{" "}
                      applied! You saved ₹{appliedCoupon.value}.
                    </span>
                    <button
                      className="underline text-orange-400 text-xs"
                      onClick={() => {
                        setAppliedCoupon(null);
                        setCouponCode("");
                        setCouponError("");
                      }}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
              {/* Totals */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-neutral-100">
                <h3 className="text-lg font-semibold mb-4 text-neutral-900">
                  Cart Totals
                </h3>
                <div className="space-y-3 text-base">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Subtotal</span>
                    <span className="font-medium text-neutral-900">
                      ₹{subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Discount</span>
                    <span className="font-medium text-neutral-900">
                      ₹{discount}
                      {appliedCoupon && (
                        <span className="text-xs text-green-600 ml-1">
                          ({appliedCoupon.code})
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Tax</span>
                    <span className="font-medium text-neutral-900">₹{tax}</span>
                  </div>
                  <div className="border-t border-neutral-100 pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-neutral-900">
                        Total
                      </span>
                      <span className="font-semibold text-xl text-orange-500">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full mt-6 px-6 py-3 bg-orange-400 text-white rounded-lg font-semibold hover:bg-orange-500 transition flex items-center justify-center gap-2 text-base shadow-md"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </button>
              </div>
            </aside>
          </div>
          {/* Browsing History */}
          <section className="mt-16">
            <div className="flex flex-col xs:flex-row items-center justify-between mb-6 gap-2">
              <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 text-center xs:text-left w-full xs:w-auto tracking-tight">
                Browsing History
              </h2>
              <button className="text-orange-400 font-medium flex items-center gap-2 hover:text-orange-500 text-base transition">
                View All
                <ArrowRight size={18} />
              </button>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {browsingHistory.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-neutral-100 rounded-2xl p-4 hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="relative mb-4">
                    <div className="w-full h-40 bg-neutral-100 rounded-xl overflow-hidden flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(product.rating)}
                    <span className="text-neutral-400 text-xs ml-1">
                      ({product.reviews})
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-neutral-900 mb-2 line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                  <div className="text-lg font-semibold text-orange-500 mt-auto">
                    ₹{product.price}
                  </div>
                </div>
              ))}
            </div>
            {/* Navigation Dots */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <button className="w-10 h-10 rounded-full border border-orange-400 flex items-center justify-center text-orange-400 hover:bg-orange-50 transition">
                <ArrowLeft size={18} />
              </button>
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-200"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-200"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-200"></div>
              </div>
              <button className="w-10 h-10 rounded-full border border-orange-400 flex items-center justify-center text-orange-400 hover:bg-orange-50 transition">
                <ArrowRight size={18} />
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
