"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Trash2,
  Plus,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import NavPapaPet from "@/Components/Nav/NavPapaPet";
import axiosInstance from "@/Axios/axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"; // Import toastify
import { isUserRequest } from "@/store/Reducer/auth";
import { setSelectedAddress, applyCoupon } from "@/store/slices/cartSlices";

// Simple Modal component
function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg relative">
        <button
          className="absolute top-3 right-3 text-neutral-400 hover:text-red-500 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

function updateQuantity(cartItems, id, newQuantity) {
  return cartItems.map((item) => {
    if ((item._id || item.id) === id) {
      return { ...item, quantity: newQuantity };
    }
    return item;
  });
}

export default function CheckoutPage() {
  const [couponCode, setCouponCode] = useState("");
  const appliedCoupon = useSelector((state) => state.cart.appliedCoupon);
  const [couponError, setCouponError] = useState("");
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const authUser = useSelector((state) => state.auth.user);

  // Address management
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  // Dropdown state for address selection
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const addressDropdownRef = useRef(null);

  // Modal state for Add Address
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phoneNumber: "",
    streetAddress: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    addressType: "Home",
    isDefault: false,
  });
  const [addressError, setAddressError] = useState("");

  // Fetch all addresses from DB for the logged-in user
  useEffect(() => {
    const fetchAddresses = async () => {
      dispatch(isUserRequest());
      try {
        if (authUser?._id) {
          const { data } = await axiosInstance.get(
            `/user/getAllAddresses/${authUser?._id}`
          );
          // Ensure each address has a unique id property
          const addressesWithId = (data?.addresses || []).map((addr, idx) => ({
            ...addr,
            id: addr.id || addr._id || idx + 1,
          }));
          setAddresses(addressesWithId);
          // Set default selected address if not set
          if (addressesWithId?.length > 0) {
            setSelectedAddressId(addressesWithId[0]?.id);
          } else {
            setSelectedAddressId(null);
          }
        }
      } catch (err) {
        console.error("Error fetching addresses:", err);
        setAddresses([]);
        setSelectedAddressId(null);
      }
    };

    fetchAddresses();
    // Only refetch when user._id changes
  }, [authUser?._id]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        addressDropdownRef.current &&
        !addressDropdownRef.current.contains(event.target)
      ) {
        setShowAddressDropdown(false);
      }
    }
    if (showAddressDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAddressDropdown]);

  // Delete address function
  const deleteAddress = async (addressId) => {
    try {
      const { data } = await axiosInstance.delete("/user/deleteAddress", {
        data: { userId: authUser?._id, addressId },
      });
      // Ensure each address has a unique id property
      const addressesWithId = (data?.addresses || []).map((addr, idx) => ({
        ...addr,
        id: addr.id || addr._id || idx + 1,
      }));
      setAddresses(addressesWithId);
      // If the deleted address was selected, select another
      if (selectedAddressId === addressId) {
        if (addressesWithId?.length > 0) {
          setSelectedAddressId(addressesWithId[0]?.id);
        } else {
          setSelectedAddressId(null);
        }
      }
      toast.success("Address deleted successfully.");
    } catch (err) {
      console.error("Error deleting address:", err);
      toast.error("Failed to delete address.");
    }
  };

  // Add new address function (using backend schema)
  const addNewAddress = async (addressObj) => {
    try {
      // Prepare payload as per backend schema
      const payload = {
        userId: authUser._id,
        fullName: newAddress.fullName,
        phoneNumber: newAddress.phoneNumber,
        pincode: newAddress.pincode,
        streetAddress: newAddress.streetAddress,
        landmark: newAddress.landmark,
        city: newAddress.city,
        state: newAddress.state,
        addressType: newAddress.addressType || "Home",
        isDefault: newAddress.isDefault || false,
      };

      const { data } = await axiosInstance.post("/user/newAddress", payload);
      // Ensure each address has a unique id property
      const addressesWithId = (data.addresses || []).map((addr, idx) => ({
        ...addr,
        id: addr.id || addr._id || idx + 1,
      }));
      setAddresses(addressesWithId);
      // Set the new address as selected
      if (addressesWithId.length > 0) {
        setSelectedAddressId(addressesWithId[addressesWithId.length - 1].id);
      }
      toast.success("Address added successfully.");
    } catch (err) {
      // Handle backend error for missing fullName
      if (
        err?.response?.data?.message === "fullName is required" ||
        err?.message === "fullName is required"
      ) {
        setAddressError("Full Name is required.");
      } else if (
        err?.response?.data?.message?.toLowerCase().includes("required")
      ) {
        setAddressError("Please fill all required address fields.");
      } else {
        console.error("Error adding address:", err);
        setAddressError("Failed to add address. Please try again.");
      }
      toast.error("Failed to add address.");
    }
  };

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

  const updateCartQuantity = async (id, newQuantity) => {
    try {
      await axiosInstance.post("/user/updateCartQuantity", {
        foodId: id,
        quantity: newQuantity,
      });
    } catch (err) {
      console.error("Error updating cart quantity:", err);
      toast.error("Failed to update quantity.");
    }
  };

  const handleIncrement = (id) => {
    setCartItems((prev) => {
      const item = prev.find((item) => (item._id || item.id) === id);
      if (item) {
        const updatedQuantity = (item.quantity || 1) + 1;
        updateCartQuantity(id, updatedQuantity);
        return updateQuantity(prev, id, updatedQuantity);
      }
      return prev;
    });
  };

  const handleDecrement = (id) => {
    setCartItems((prev) => {
      const item = prev.find((item) => (item._id || item.id) === id);
      if (item && (item.quantity || 1) > 1) {
        const updatedQuantity = (item.quantity || 1) - 1;
        updateCartQuantity(id, updatedQuantity);
        return updateQuantity(prev, id, updatedQuantity);
      }
      return prev;
    });
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (!authUser?._id) return; // only if logged in
        const { data } = await axiosInstance.get(
          `/user/getCart?userId=${authUser._id}`
        );
        setCartItems(data.cart || []);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        toast.error("Failed to load cart.");
      }
    };

    fetchCartItems();
  }, [authUser?._id]);

  const handleRemove = async (id) => {
    try {
      await axiosInstance.post("/user/removeFromCart", {
        foodId: id,
      });

      const { data } = await axiosInstance.get(
        `/user/getCart?userId=${authUser._id}`
      );
      setCartItems(data.cart || []);

      toast.success("Item removed from cart.");
    } catch (err) {
      console.error("Error removing from cart:", err);
      toast.error("Failed to remove item.");
    }
  };

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

  // const handleApplyCoupon = async (e) => {
  //   e.preventDefault();
  //   const code = couponCode.trim().toUpperCase();

  //   if (appliedCoupon && appliedCoupon.code === code) {
  //     setCouponError(`Coupon ${code} is already applied.`);
  //     return;
  //   }
  //   if (!code) {
  //     setCouponError("Please enter a coupon code.");
  //     dispatch(applyCoupon(null));
  //     return;
  //   }

  //   setIsCouponLoading(true);
  //   setCouponError("");

  //   try {
  //     const res = await axiosInstance.post("/coupon/applyCoupon", {
  //       couponCode: code,
  //       price: subtotal,
  //     });

  //     const coupon = res.data.coupon || res.data;

  //     const now = new Date();
  //     let validityDate;
  //     if (coupon.validity) {
  //       if (typeof coupon.validity === "string") {
  //         validityDate = new Date(coupon.validity);
  //       } else if (coupon.validity.$date) {
  //         validityDate = new Date(coupon.validity.$date); // 👈 handle Mongo style
  //       }
  //     }

  //     if (!validityDate || isNaN(validityDate.getTime())) {
  //       setCouponError("Invalid coupon data.");
  //       return;
  //     }

  //     if (validityDate.getTime() < Date.now()) {
  //       setCouponError("This coupon has expired.");
  //       return;
  //     }

  //     const minPurchase = Number(coupon.minPurchase) || 0;
  //     const currentSubtotal = Number(subtotal) || 0;

  //     if (currentSubtotal < minPurchase) {
  //       setCouponError(
  //         `Minimum purchase of ₹${minPurchase} required for this coupon.`
  //       );
  //       return;
  //     }

  //     let discountValue = (currentSubtotal * Number(coupon.discount)) / 100;
  //     const maxDiscount = Number(coupon.maxDiscount) || Infinity;
  //     discountValue = Math.min(discountValue, maxDiscount);

  //     dispatch(
  //       applyCoupon({
  //         code: coupon.couponCode,
  //         discount: Math.floor(discountValue),
  //         details: coupon,
  //       })
  //     );

  //     setCouponError("");
  //   } catch (err) {
  //     const errorMessage =
  //       err?.response?.status === 404 ||
  //       err?.response?.data?.message?.includes("not found") ||
  //       err?.message?.includes("not found")
  //         ? "Invalid coupon code."
  //         : "Failed to validate coupon. Please try again.";

  //     setCouponError(errorMessage);
  //     dispatch(applyCoupon(null));
  //   } finally {
  //     setIsCouponLoading(false);
  //   }
  // };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();

    // 🚨 Prevent reapplying the same coupon
    if (appliedCoupon && appliedCoupon.code === code) {
      setCouponError(`Coupon ${code} is already applied.`);
      return;
    }

    if (!code) {
      setCouponError("Please enter a coupon code.");
      dispatch(applyCoupon(null));
      return;
    }

    setIsCouponLoading(true);
    setCouponError("");

    try {
      const res = await axiosInstance.post("/coupon/applyCoupon", {
        couponCode: code,
        price: subtotal,
        userId: authUser?._id, // 👈 include user if backend needs it
      });

      console.log("Coupon response:", res.data);

      const coupon = res.data.coupon || res.data;

      // 🔎 Handle validity format
      let validityDate;
      if (coupon.validity) {
        if (typeof coupon.validity === "string") {
          validityDate = new Date(coupon.validity);
        } else if (coupon.validity.$date) {
          validityDate = new Date(coupon.validity.$date);
        }
      }

      if (!validityDate || isNaN(validityDate.getTime())) {
        setCouponError("Invalid coupon data.");
        dispatch(applyCoupon(null));
        return;
      }

      // ⏰ Expired check
      if (validityDate.getTime() < Date.now()) {
        setCouponError("This coupon has expired.");
        dispatch(applyCoupon(null));
        return;
      }

      // 💰 Min purchase check
      const minPurchase = Number(coupon.minPurchase) || 0;
      if (subtotal < minPurchase) {
        setCouponError(
          `Minimum purchase of ₹${minPurchase} required for this coupon.`
        );
        dispatch(applyCoupon(null));
        return;
      }

      // ✅ Calculate discount
      let discountValue = (subtotal * Number(coupon.discount)) / 100;
      const maxDiscount = Number(coupon.maxDiscount) || Infinity;
      discountValue = Math.min(discountValue, maxDiscount);

      // Save in Redux
      dispatch(
        applyCoupon({
          code: coupon.couponCode,
          discount: Math.floor(discountValue),
          details: coupon,
        })
      );

      setCouponError("");
    } catch (err) {
      const backendMessage = err?.response?.data?.message;

      if (backendMessage) {
        setCouponError(backendMessage); // show actual backend error (expired, already used, etc.)
      } else if (err?.response?.status === 404) {
        setCouponError("Invalid coupon code.");
      } else {
        setCouponError("Failed to validate coupon. Please try again.");
      }

      dispatch(applyCoupon(null));
    } finally {
      setIsCouponLoading(false);
    }
  };

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      // Remove coupon if cart is empty
      dispatch(applyCoupon(null));
      setCouponCode("");
      setCouponError("");
    }
  }, [cartItems, dispatch]);

  // Address form handlers
  const handleAddressInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Use addNewAddress for adding address
  const handleAddAddress = async (e) => {
    e.preventDefault();
    setAddressError("");
    // Simple validation
    if (
      !newAddress.fullName ||
      !newAddress.phoneNumber ||
      !newAddress.streetAddress ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.pincode
    ) {
      setAddressError("Please fill all required address fields.");
      toast.error("Please fill all required address fields.");
      return;
    }
    await addNewAddress(newAddress);
    setShowAddAddressModal(false);
    setNewAddress({
      fullName: "",
      phoneNumber: "",
      streetAddress: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      addressType: "Home",
      isDefault: false,
    });
  };

  const handleSelectAddress = (address) => {
    dispatch(setSelectedAddress(address));
  };

  const shipping =
    cartItems.length === 0 ? 0 : subtotal > 1000 || subtotal == 1 ? 0 : 99;
  const discount = useSelector((state) => state.cart.discount);
  const total = Math.round(subtotal - discount);

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

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  const checkUserLoggedIn = () => {
    // Check user authentication from Redux state
    if (!authUser || !authUser._id) {
      // Not logged in, redirect to login page
      router.push("/papapet/auth");
      return false;
    }

    // User is logged in, proceed to checkout
    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items before checkout.");
      return;
    }
    // Prepare the data to send
    const checkoutData = {
      products: cartItems.map((item) => ({
        id: item._id || item.id,
        name: item.name,
        price: item.discountprice || item.price,
        quantity: item.quantity || 1,
        image: item.image || item.img || "",
        sku: item.sku || "",
        category: item.category || "",
        brand: item.brand || "",
      })),
      subtotal,
      shipping,
      discount,
      total,
      // Send the full coupon details to the checkout page
      appliedCoupon: appliedCoupon
        ? {
            code: couponCode,
            value: appliedCoupon.value,
            details: appliedCoupon.details, // Pass the full coupon object
          }
        : null,
      user: authUser
        ? {
            name: authUser.name,
            email: authUser.email,
            phone: authUser.phone,
          }
        : null,
      address: selectedAddress || null, // Pass the selected address object
    };

    window.sessionStorage.setItem(
      "papapet_checkout_data",
      JSON.stringify(checkoutData)
    );

    router.push("/papapet/cart/checkout");
    return true;
  };

  return (
    <div className="overflow-x-hidden">
      <NavPapaPet />
      <main className="bg-white min-h-screen pt-3 lg:pt-10 pb-16 overflow-x-hidden">
        <div className="max-w-full mx-auto px-4 sm:px-8">
          <h1 className="font-semibold text-2xl pl-6  sm:pl-1 md:pl-2 sm:text-3xl md:text-4xl text-neutral-900 mb-8 tracking-tight">
            Shopping Cart
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <section className="lg:col-span-2">
              {/* Address Section */}
              <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 border border-neutral-100">
                <h2 className="text-lg font-semibold mb-3 text-neutral-900">
                  Delivery Address
                </h2>
                {addresses.length === 0 ? (
                  <div className="flex flex-col gap-2">
                    <div className="text-red-500 mb-2">
                      Please add address first.
                    </div>
                    <button
                      type="button"
                      className="text-white bg-[#FB923C] px-3 py-2 rounded-full text-sm flex items-center gap-2 md:w-1/4"
                      onClick={() => setShowAddAddressModal(true)}
                    >
                      <Plus size={16} />
                      Add Address
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Your Addresses
                      </label>
                      {/* Dropdown for address selection */}
                      <div
                        className="relative w-full max-w-xl"
                        ref={addressDropdownRef}
                      >
                        <button
                          type="button"
                          className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg bg-neutral-50 text-left transition ${
                            showAddressDropdown
                              ? "border-orange-400 bg-orange-50"
                              : "border-neutral-200 hover:border-orange-200"
                          }`}
                          onClick={() =>
                            setShowAddressDropdown((prev) => !prev)
                          }
                        >
                          <div className="flex flex-col">
                            {selectedAddress ? (
                              <>
                                <span className="font-semibold">
                                  {selectedAddress.fullName}
                                </span>
                                <span className="text-xs text-neutral-500">
                                  {selectedAddress.phoneNumber}
                                </span>
                                <span className="text-sm text-neutral-700">
                                  {selectedAddress.streetAddress}
                                  {selectedAddress.landmark
                                    ? `, ${selectedAddress.landmark}`
                                    : ""}
                                  , {selectedAddress.city},{" "}
                                  {selectedAddress.state} -{" "}
                                  {selectedAddress.pincode}
                                </span>
                                <span className="text-xs text-neutral-400">
                                  {selectedAddress.addressType}
                                  {selectedAddress.isDefault
                                    ? " (Default)"
                                    : ""}
                                </span>
                              </>
                            ) : (
                              <span className="text-neutral-400">
                                Select address
                              </span>
                            )}
                          </div>
                          <span className="ml-2">
                            {showAddressDropdown ? (
                              <ChevronUp size={20} />
                            ) : (
                              <ChevronDown size={20} />
                            )}
                          </span>
                        </button>

                        {showAddressDropdown && (
                          <div className="absolute left-0 right-0 mt-2 z-20 bg-white border border-neutral-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {addresses.map((addr) => (
                              <div
                                key={addr.id}
                                className={`px-4 py-3 cursor-pointer hover:bg-orange-50 transition flex flex-col relative ${
                                  selectedAddressId === addr.id
                                    ? "bg-orange-50 border-l-4 border-orange-400"
                                    : ""
                                }`}
                                onClick={() => {
                                  setSelectedAddressId(addr.id);
                                  setShowAddressDropdown(false);
                                }}
                              >
                                <span className="font-semibold">
                                  {addr.fullName}
                                </span>
                                <span className="text-xs text-neutral-500">
                                  {addr.phoneNumber}
                                </span>
                                <span className="text-sm text-neutral-700">
                                  {addr.streetAddress}
                                  {addr.landmark
                                    ? `, ${addr.landmark}`
                                    : ""}, {addr.city}, {addr.state} -{" "}
                                  {addr.pincode}
                                </span>

                                <button
                                  type="button"
                                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded"
                                  title="Delete address"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteAddress(addr.id);
                                  }}
                                >
                                  <Trash2 size={16} />
                                </button>
                                <button
                                  className="absolute top-2 right-10 text-white bg-[#FB923C] px-3 py-2 rounded-full text-sm flex items-center gap-2"
                                  onClick={() => handleSelectAddress(addr)}
                                >
                                  Use this address
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <h1 className="text-sm text-gray-400">
                      Please choose the address using{" "}
                      <span className="capitalize text-[#FB923C]">
                        use this address
                      </span>{" "}
                      button.
                    </h1>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        className="text-white bg-[#FB923C] px-3 py-2 rounded-full text-sm flex items-center gap-2"
                        onClick={() => setShowAddAddressModal(true)}
                      >
                        <Plus size={16} />
                        Add Another Address
                      </button>
                    </div>
                  </>
                )}
              </div>
              {/* Add Address Modal */}
              <Modal
                open={showAddAddressModal}
                onClose={() => {
                  setShowAddAddressModal(false);
                  setAddressError("");
                }}
              >
                <h3 className="text-lg font-semibold mb-4 text-neutral-900">
                  Add Address
                </h3>
                <form className="mt-0" onSubmit={handleAddAddress}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        Full Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={newAddress.fullName}
                        onChange={handleAddressInputChange}
                        className="w-full px-3 py-2 border border-neutral-200 rounded"
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        Phone Number<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={newAddress.phoneNumber}
                        onChange={handleAddressInputChange}
                        className="w-full px-3 py-2 border border-neutral-200 rounded"
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        Pincode<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={newAddress.pincode}
                        onChange={handleAddressInputChange}
                        className="w-full px-3 py-2 border border-neutral-200 rounded"
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        City<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={newAddress.city}
                        onChange={handleAddressInputChange}
                        className="w-full px-3 py-2 border border-neutral-200 rounded"
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        State<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={newAddress.state}
                        onChange={handleAddressInputChange}
                        className="w-full px-3 py-2 border border-neutral-200 rounded"
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium mb-1">
                        Street Address<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="streetAddress"
                        value={newAddress.streetAddress}
                        onChange={handleAddressInputChange}
                        className="w-full px-3 py-2 border border-neutral-200 rounded"
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium mb-1">
                        Landmark (optional)
                      </label>
                      <input
                        type="text"
                        name="landmark"
                        value={newAddress.landmark}
                        onChange={handleAddressInputChange}
                        className="w-full px-3 py-2 border border-neutral-200 rounded"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  {addressError && (
                    <div className="text-red-500 text-xs mt-2">
                      {addressError}
                    </div>
                  )}
                  <div className="flex gap-2 mt-4">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-orange-400 text-white rounded-lg font-semibold hover:bg-orange-500 transition text-base shadow-sm"
                    >
                      Save Address
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 bg-neutral-200 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-300 transition text-base shadow-sm"
                      onClick={() => {
                        setShowAddAddressModal(false);
                        setAddressError("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Modal>
              {/* Cart Items Table */}
              <div className="bg-white rounded-2xl shadow-sm p-0 sm:p-2 md:p-4 mb-6 border border-neutral-100">
                {/* Table header for md+ */}
                <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-medium text-neutral-500 px-4 py-2 border-b border-neutral-100">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Qty</div>
                </div>
                {cartItems && cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div
                      key={item._id || item.id}
                      className="border-b last:border-b-0 border-neutral-100"
                    >
                      {/* Mobile Card */}
                      <div className=" flex flex-col gap-2 px-2 py-4 md:hidden">
                        <div className="flex gap-3">
                          <div className="w-20 h-20 bg-neutral-100 rounded-xl flex-shrink-0 overflow-hidden border border-neutral-100">
                            <img
                              src={
                                item.image
                                  ? typeof item.image === "string"
                                    ? item.image
                                    : item.image[0]?.filename
                                    ? `${
                                        axiosInstance.defaults.baseURL
                                      }admin/get/image/${
                                        item.image[0]?.filename
                                      }/${
                                        item.image[0]?.mimetype?.split("/")[0]
                                      }/${
                                        item.image[0]?.mimetype?.split("/")[1]
                                      }`
                                    : "/placeholder.svg"
                                  : "/placeholder.svg"
                              }
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <h3 className="font-medium text-neutral-900 text-base leading-tight line-clamp-2">
                                {item.name}
                              </h3>
                              <div className="text-xs text-neutral-500 mt-1">
                                {/* Optionally add brand, seller, etc. */}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="font-semibold text-xl text-neutral-900">
                                ₹
                                {item.discountprice
                                  ? item.discountprice
                                  : item.price}
                              </span>
                              {item.price &&
                                item.discountprice &&
                                item.discountprice < item.price && (
                                  <span className="text-neutral-700 line-through text-sm">
                                    ₹{item.price}
                                  </span>
                                )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center bg-neutral-100 rounded-full px-2 py-1 border border-neutral-200">
                            <button
                              onClick={() =>
                                handleDecrement(item._id || item.id)
                              }
                              className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 rounded-full transition"
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              <span className="text-lg">−</span>
                            </button>
                            <span className="w-10 text-center font-medium text-neutral-900 text-base">
                              {(item.quantity || 1).toString().padStart(2, "0")}
                            </span>
                            <button
                              onClick={() =>
                                handleIncrement(item._id || item.id)
                              }
                              className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 rounded-full transition"
                              aria-label="Increase quantity"
                            >
                              <span className="text-lg">+</span>
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemove(item._id || item.id)}
                            className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-red-500 hover:border-red-200 transition-colors duration-150 ml-2"
                            aria-label="Remove item"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                        {/* Optional: Add delivery, stock, seller info here */}
                      </div>
                      {/* Desktop Table Row */}
                      <div className="hidden md:grid grid-cols-12 gap-4 items-center px-4 py-4">
                        {/* Product Info */}
                        <div className="md:col-span-6 flex items-center gap-4 w-full">
                          <button
                            onClick={() => handleRemove(item._id || item.id)}
                            className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-red-500 hover:border-red-200 transition-colors duration-150"
                            aria-label="Remove item"
                          >
                            <Trash2 size={15} />
                          </button>
                          <div className="w-16 h-16 bg-neutral-100 rounded-xl flex-shrink-0 overflow-hidden border border-neutral-100">
                            <img
                              src={
                                item.image
                                  ? typeof item.image === "string"
                                    ? item.image
                                    : item.image[0]?.filename
                                    ? `${
                                        axiosInstance.defaults.baseURL
                                      }admin/get/image/${
                                        item.image[0]?.filename
                                      }/${
                                        item.image[0]?.mimetype?.split("/")[0]
                                      }/${
                                        item.image[0]?.mimetype?.split("/")[1]
                                      }`
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
                                <span className="text-neutral-700 line-through text-sm">
                                  ₹{Math.round(item.discountprice)}
                                </span>
                              )}
                            <span className="font-semibold text-base text-neutral-900">
                              ₹
                              {Math.round(
                                item.discountprice
                                  ? item.discountprice
                                  : item.price
                              )}
                            </span>
                          </div>
                        </div>
                        {/* Quantity */}
                        <div className="md:col-span-2 flex items-center justify-center mt-2 md:mt-0">
                          <div className="flex items-center bg-neutral-100 rounded-lg px-2 py-1">
                            <button
                              onClick={() =>
                                handleDecrement(item._id || item.id)
                              }
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
                              onClick={() =>
                                handleIncrement(item._id || item.id)
                              }
                              className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 rounded transition"
                              aria-label="Increase quantity"
                            >
                              <span className="text-lg">+</span>
                            </button>
                          </div>
                        </div>
                        {/* Subtotal */}
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
              {/* <div className="flex flex-col md:flex-row xs:flex-row gap-3 mt-2">
                <button className="flex items-center justify-center gap-2 px-6 py-2 border border-neutral-200
                 text-white rounded-full font-medium transition w-full xs:w-auto shadow-sm bg-[#FB923C]
                  hover:bg-[#FB923C]/80">
                  <ArrowLeft size={18} />
                  <span className="hidden xs:inline">Return to Shop</span>
                  <span className="inline xs:hidden">Shop</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-2 border border-neutral-200
                 text-neutral-700 rounded-full font-medium hover:bg-neutral-100 transition w-full xs:w-auto 
                 shadow-sm">
                  Update Cart
                </button>
              </div> */}
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
                      applied! You saved ₹{appliedCoupon.discount}.
                    </span>
                    <button
                      className="underline text-orange-400 text-xs"
                      onClick={() => {
                        dispatch(applyCoupon(null));
                        setCouponCode("");
                        setCouponError("");
                        toast.info("Coupon removed.");
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
                      ₹{Math.round(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Shipping</span>
                    <span className="font-medium text-green-600">
                      Free Shipping
                    </span>
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
                  <div className="border-t border-neutral-100 pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-neutral-900">
                        Total
                      </span>
                      <span className="font-semibold text-xl text-orange-500">
                        ₹{Math.round(total)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={checkUserLoggedIn}
                  className="w-full mt-6 px-6 py-3 bg-orange-400 text-white rounded-lg font-semibold hover:bg-orange-500 transition flex items-center justify-center gap-2 text-base shadow-md"
                  disabled={addresses.length === 0}
                  title={
                    addresses.length === 0 ? "Please add address first" : ""
                  }
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </button>
                {addresses.length === 0 && (
                  <div className="text-red-500 text-xs mt-2">
                    Please add address first to proceed.
                  </div>
                )}
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
    </div>
  );
}
