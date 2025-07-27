"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "@/store/slices/cartSlices";
import NavPapaPet from "@/Components/Nav/NavPapaPet";

// Remove static COUPONS, use API instead

export default function CheckoutPage() {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const dispatch = useDispatch();
  // Assuming your cart slice shape: { cart: { items: [...] } } or just { cart: [...] }
  // Adjust selector as per your store structure
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  // Example browsing history (static for now)
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
      // Fetch coupon details from backend
      const res = await fetch(`/api/coupons?code=${encodeURIComponent(code)}`);
      if (!res.ok) {
        throw new Error("Coupon not found or invalid.");
      }
      const coupon = await res.json();

      // Check if coupon is active, not expired, and usage limits
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
        // Calculate discount
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
        className={`text-sm ${
          i < rating ? "text-orange-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <>
      <NavPapaPet />
      <h1
        className="text-black font-semibold 
            text-xl sm:text-2xl md:text-3xl 
            w-full  pt-40 mt-5 sm:pt-28 p-2 sm:p-4 xl:px-32"
      >
        Shopping Cart
      </h1>
      <div className="mx-auto p-2 sm:p-4 xl:px-32 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-lg p-2 sm:p-4 mb-6">
              {/* Table header: hide on xs, show on md+ */}
              <div className="grid-cols-12 gap-4 text-xs sm:text-sm font-medium text-gray-600 mb-4 hidden md:grid">
                <div className="col-span-6">PRODUCTS</div>
                <div className="col-span-2 text-center">PRICE</div>
                <div className="col-span-2 text-center">QUANTITY</div>
                <div className="col-span-2 text-center">SUB-TOTAL</div>
              </div>

              {cartItems && cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item._id || item.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-4 items-center py-4 border-b border-gray-200 last:border-b-0"
                  >
                    {/* Product Info */}
                    <div className="md:col-span-6 flex items-center gap-2 sm:gap-4">
                      <button
                        onClick={() => handleRemove(item._id || item.id)}
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:text-red-500 flex-shrink-0"
                        aria-label="Remove item"
                      >
                        ×
                      </button>
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                        <img
                          src={
                            item.image
                              ? typeof item.image === "string"
                                ? item.image
                                : // If image is array/object, try to get first image
                                item.image[0]?.filename
                                ? `http://localhost:8080/api/v1/admin/get/image/${
                                    item.image[0]?.filename
                                  }/${item.image[0]?.mimetype?.split("/")[0]}/${
                                    item.image[0]?.mimetype?.split("/")[1]
                                  }`
                                : "/placeholder.svg"
                              : "/placeholder.svg"
                          }
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800 text-xs sm:text-sm leading-tight">
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
                            <span className="text-gray-400 line-through text-xs sm:text-sm">
                              ₹{item.price}
                            </span>
                          )}
                        <span className="font-semibold text-xs sm:text-base">
                          ₹
                          {item.discountprice ? item.discountprice : item.price}
                        </span>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 flex items-center justify-center mt-2 md:mt-0">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() => handleDecrement(item._id || item.id)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-10 sm:w-12 h-8 flex items-center justify-center text-xs sm:text-sm font-medium">
                          {(item.quantity || 1).toString().padStart(2, "0")}
                        </span>
                        <button
                          onClick={() => handleIncrement(item._id || item.id)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="md:col-span-2 text-center mt-2 md:mt-0">
                      <span className="font-semibold text-xs sm:text-base">
                        ₹
                        {(item.discountprice
                          ? item.discountprice
                          : item.price) * (item.quantity || 1)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Your cart is empty.
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pr-0 sm:pr-5">
              <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 border-2 border-orange-400 text-orange-400 rounded font-medium hover:bg-orange-50 transition-colors text-xs sm:text-base">
                <ArrowLeft size={16} />
                <span className="hidden xs:inline">RETURN TO SHOP</span>
                <span className="inline xs:hidden">SHOP</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 border-2 border-orange-400 text-orange-400 rounded font-medium hover:bg-orange-50 transition-colors text-xs sm:text-base">
                UPDATE CART
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="mb-6">
              <form
                className="flex flex-col sm:flex-row gap-2"
                onSubmit={handleApplyCoupon}
              >
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-2 sm:px-3 py-2 sm:py-3 border border-gray-300 rounded text-xs sm:text-sm"
                  disabled={!!appliedCoupon || isCouponLoading}
                />
                <button
                  type="submit"
                  className={`px-4 sm:px-6 py-2 sm:py-3 bg-orange-400 text-white rounded font-medium hover:bg-orange-500 transition-colors text-xs sm:text-base ${
                    appliedCoupon || isCouponLoading
                      ? "opacity-60 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={!!appliedCoupon || isCouponLoading}
                >
                  {isCouponLoading
                    ? "CHECKING..."
                    : appliedCoupon
                    ? "COUPON APPLIED"
                    : "APPLY COUPON"}
                </button>
              </form>
              {couponError && (
                <div className="text-red-500 text-xs mt-2">{couponError}</div>
              )}
              {appliedCoupon && (
                <div className="text-green-600 text-xs mt-2">
                  Coupon <span className="font-bold">{appliedCoupon.code}</span>{" "}
                  applied! You saved ₹{appliedCoupon.value}.
                  <button
                    className="ml-2 underline text-orange-400"
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

            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6">
              <h3 className="text-base sm:text-lg font-semibold mb-4">
                Cart Totals
              </h3>

              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sub-total</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium">
                    ₹{discount}
                    {appliedCoupon && (
                      <span className="text-xs text-green-600 ml-1">
                        ({appliedCoupon.code})
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">₹{tax}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold text-base sm:text-lg">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-orange-400 text-white rounded font-medium hover:bg-orange-500 transition-colors flex items-center justify-center gap-2 text-xs sm:text-base">
                PROCEED TO CHECKOUT
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Browsing History */}
        <div className="mt-10 sm:mt-12">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2">
            <h2 className="text-lg sm:text-xl font-semibold text-center sm:text-left w-full sm:w-auto">
              BROWSING HISTORY
            </h2>
            <button className="text-orange-400 font-medium flex items-center gap-2 hover:text-orange-500 text-xs sm:text-base">
              View All
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {browsingHistory.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg transition-shadow"
              >
                <div className="relative mb-3 sm:mb-4">
                  <div className="w-full h-32 sm:h-48 bg-gray-100 rounded overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-orange-400 text-white text-xs font-bold px-2 py-1 rounded">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 mb-1 sm:mb-2">
                  {renderStars(product.rating)}
                  <span className="text-gray-500 text-xs sm:text-sm ml-1">
                    ({product.reviews})
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-medium text-gray-800 mb-1 sm:mb-2 line-clamp-2 leading-tight">
                  {product.name}
                </h3>

                <div className="text-base sm:text-lg font-semibold text-blue-500">
                  ₹{product.price}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
            <button className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border border-orange-400 flex items-center justify-center text-orange-400 hover:bg-orange-50">
              <ArrowLeft size={16} />
            </button>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-400"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
            <button className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border border-orange-400 flex items-center justify-center text-orange-400 hover:bg-orange-50">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
