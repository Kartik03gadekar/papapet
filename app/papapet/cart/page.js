"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
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
import axios from "@/Axios/axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { isUserRequest } from "@/store/Reducer/auth";
import Link from "next/link";
import { setSelectedAddress, applyCoupon } from "@/store/slices/cartSlices";
import { addToCart } from "@/store/slices/cartSlices";

// A simple, reusable modal component.
function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed overflow-y-auto inset-0 z-50 flex items-center justify-center bg-black/40">
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

function ProductCard({ product }) {

  return (
    <Link href={`/papapet/product/${product._id}`}>
      <div className="flex-shrink-0 w-48 border border-neutral-200 rounded-xl p-3 flex flex-col gap-2 shadow-sm bg-white">
        <div className="w-full h-32 bg-neutral-100 rounded-lg overflow-hidden">
          <img
            src={product.image[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="font-medium text-sm text-neutral-800 line-clamp-2 h-10">
          {product.name}
        </h4>
        <div className="flex-grow"></div>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-semibold text-neutral-900">
            ₹{product.price}
          </span>
          <button
            
            className="px-4 py-2 bg-[#FB923C] text-white font-bold rounded-xl"
            aria-label="Add to cart"
          >
            View...
          </button>
        </div>
      </div>
    </Link>
  );
}

const useUserAddresses = (userId) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [addressError, setAddressError] = useState("");
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

  useEffect(() => {
    if (!userId) return;

    const fetchAddresses = async () => {
      try {
        const { data } = await axios.get(`/user/getAllAddresses/${userId}`);
        const addressesWithId = (data?.addresses || []).map((addr) => ({
          ...addr,
          id: addr._id,
        }));
        setAddresses(addressesWithId);
        if (addressesWithId.length > 0) {
          setSelectedAddressId(addressesWithId[0].id);
        }
      } catch (err) {
        console.error("Error fetching addresses:", err);
        setAddresses([]);
      }
    };
    fetchAddresses();
  }, [userId]);

  const addNewAddress = async (e) => {
    e.preventDefault();
    setAddressError("");

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

    try {
      const payload = { userId, ...newAddress };
      const { data } = await axios.post("/user/newAddress", payload);
      const updatedAddresses = (data.addresses || []).map((addr) => ({
        ...addr,
        id: addr._id,
      }));
      setAddresses(updatedAddresses);
      // Select the newly added address
      setSelectedAddressId(updatedAddresses[updatedAddresses.length - 1]?._id);
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
      toast.success("Address added successfully.");
    } catch (err) {
      setAddressError("Failed to add address. Please try again.");
      toast.error("Failed to add address.");
      console.error("Error adding address:", err);
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const { data } = await axios.delete("/user/deleteAddress", {
        data: { userId, addressId },
      });
      const updatedAddresses = (data?.addresses || []).map((addr) => ({
        ...addr,
        id: addr._id,
      }));
      setAddresses(updatedAddresses);

      // If the deleted address was selected, select the first one as default
      if (selectedAddressId === addressId) {
        setSelectedAddressId(updatedAddresses[0]?._id || null);
      }
      toast.success("Address deleted successfully.");
    } catch (err) {
      console.error("Error deleting address:", err);
      toast.error("Failed to delete address.");
    }
  };

  const handleAddressInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return {
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    showAddAddressModal,
    setShowAddAddressModal,
    newAddress,
    addNewAddress,
    deleteAddress,
    handleAddressInputChange,
    addressError,
    setAddressError,
  };
};

/**
 * Custom hook for managing shopping cart state and actions.
 * Handles fetching items, updating quantities, and removing items.
 */
const useCart = (userId) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetchCartItems = async () => {
      try {
        const { data } = await axios.get(`/user/getCart?userId=${userId}`);
        setCartItems(data.cart || []);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        toast.error("Failed to load cart.");
      }
    };
    fetchCartItems();
  }, [userId]);

  const updateCartQuantity = useCallback(
    async (foodId, quantity) => {
      try {
        // Optimistic UI update
        setCartItems((prev) =>
          prev.map((item) =>
            item._id === foodId ? { ...item, quantity } : item
          )
        );
        await axios.post("/user/updateCartQuantity", {
          foodId,
          quantity,
        });
      } catch (err) {
        console.error("Error updating cart quantity:", err);
        toast.error("Failed to update quantity.");
        // Revert on error if necessary
      }
    },
    [] // No dependencies as it gets foodId and quantity as arguments
  );

  const handleIncrement = useCallback(
    (id) => {
      const item = cartItems.find((i) => i._id === id);
      if (item) {
        updateCartQuantity(id, (item.quantity || 1) + 1);
      }
    },
    [cartItems, updateCartQuantity]
  );

  const handleDecrement = useCallback(
    (id) => {
      const item = cartItems.find((i) => i._id === id);
      if (item && (item.quantity || 1) > 1) {
        updateCartQuantity(id, item.quantity - 1);
      }
    },
    [cartItems, updateCartQuantity]
  );

  const handleRemove = useCallback(
    async (foodId) => {
      try {
        // Optimistic UI update
        setCartItems((prev) => prev.filter((item) => item._id !== foodId));
        await axios.post("/user/removeFromCart", { foodId });
        toast.success("Item removed from cart.");
      } catch (err) {
        console.error("Error removing from cart:", err);
        toast.error("Failed to remove item.");
        // Revert on error if necessary
      }
    },
    [] // No dependencies
  );

  return {
    cartItems,
    handleIncrement,
    handleDecrement,
    handleRemove,
  };
};

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux state
  const authUser = useSelector((state) => state.auth.user);
  const appliedCoupon = useSelector((state) => state.cart.appliedCoupon);
  const discount = useSelector((state) => state.cart.discount);

  // Custom hooks for logic separation
  const {
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    showAddAddressModal,
    setShowAddAddressModal,
    newAddress,
    addNewAddress,
    deleteAddress,
    handleAddressInputChange,
    addressError,
    setAddressError,
  } = useUserAddresses(authUser?._id);

  const { cartItems, handleIncrement, handleDecrement, handleRemove } = useCart(
    authUser?._id
  );

  // Local state for UI elements
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const addressDropdownRef = useRef(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const { data } = await axios.get("/other/get/all/food");
        setAllProducts(data.food || []);
      } catch (error) {
        console.error("Failed to fetch all products:", error);
      }
    };

    fetchAllProducts();
  }, []);

  const recommendedProducts = useMemo(() => {
    if (!cartItems?.length || !allProducts?.length) {
      return [];
    }

    const cartCategoriesSet = new Set();
    cartItems.forEach((item) => {
      const categoryValue = item.categories || item.category;
      if (typeof categoryValue === "string") {
        cartCategoriesSet.add(categoryValue.trim().toLowerCase());
      }
    });

    if (cartCategoriesSet.size === 0) {
      return [];
    }

    const cartItemIds = new Set(cartItems.map((item) => item._id));

    const potentialRecommendations = allProducts.filter((product) => {
      const productCategoryValue = (
        product.categories ||
        product.category ||
        ""
      )
        .trim()
        .toLowerCase();
      const isInCategory = cartCategoriesSet.has(productCategoryValue);
      const notInCart = !cartItemIds.has(product._id);
      return isInCategory && notInCart;
    });

    const groupedByCategory = potentialRecommendations.reduce(
      (acc, product) => {
        const category = (product.categories || product.category || "")
          .trim()
          .toLowerCase();
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(product);
        return acc;
      },
      {}
    );

    const shuffleArray = (array) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    const finalRecommendations = [];
    const maxItemsPerCategory = 5;

    cartCategoriesSet.forEach((category) => {
      const productsInCategory = groupedByCategory[category];
      if (productsInCategory) {
        const shuffledProducts = shuffleArray(productsInCategory);
        finalRecommendations.push(
          ...shuffledProducts.slice(0, maxItemsPerCategory)
        );
      }
    });

    return shuffleArray(finalRecommendations).slice(0, 10);
  }, [cartItems, allProducts]);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) =>
        sum + (item.discountprice ?? item.price) * (item.quantity || 1),
      0
    );
  }, [cartItems]);

  const total = useMemo(
    () => Math.round(subtotal - discount),
    [subtotal, discount]
  );

  // Effect to handle closing address dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        addressDropdownRef.current &&
        !addressDropdownRef.current.contains(event.target)
      ) {
        setShowAddressDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Effect to clear coupon if cart becomes empty
  useEffect(() => {
    if (cartItems.length === 0 && appliedCoupon) {
      dispatch(applyCoupon(null));
      setCouponCode("");
      setCouponError("");
    }
  }, [cartItems, appliedCoupon, dispatch]);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();

    if (!code) {
      setCouponError("Please enter a coupon code.");
      return;
    }

    setIsCouponLoading(true);
    setCouponError("");

    try {
      const { data } = await axios.post("/coupon/applyCoupon", {
        couponCode: code,
        price: subtotal,
        userId: authUser?._id,
      });

      const coupon = data.coupon || data;
      let discountValue = (subtotal * Number(coupon.discount)) / 100;
      discountValue = Math.min(
        discountValue,
        Number(coupon.maxDiscount) || Infinity
      );

      dispatch(
        applyCoupon({
          code: coupon.couponCode,
          discount: Math.floor(discountValue),
          details: coupon,
        })
      );
    } catch (err) {
      const backendMessage = err?.response?.data?.message;
      setCouponError(
        backendMessage || "Failed to validate coupon. Please try again."
      );
      dispatch(applyCoupon(null));
    } finally {
      setIsCouponLoading(false);
    }
  };

  const handleSelectAddress = (address) => {
    dispatch(setSelectedAddress(address));
  };

  const checkUserLoggedIn = () => {
    if (!authUser?._id) {
      router.push("/papapet/auth");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items before checkout.");
      return;
    }

    router.push("/papapet/cart/checkout");
  };

  const selectedAddress = useMemo(
    () => addresses.find((a) => a.id === selectedAddressId),
    [addresses, selectedAddressId]
  );

  const renderStars = (rating) => {
    // Logic for rendering stars, kept for context if needed in JSX
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
            {/* Main Content */}
            <section className="lg:col-span-2">
              {/* Address Section */}
              <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 border border-neutral-100">
                <h2 className="text-lg font-semibold mb-3 text-neutral-900">
                  Delivery Address
                </h2>
                {addresses.length === 0 ? (
                  <div className="flex flex-col gap-2">
                    <div className="text-red-500 mb-2">
                      Please add an address first.
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
                <form className="mt-0" onSubmit={addNewAddress}>
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
                              src={item.image[0]}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <h3 className="font-medium text-neutral-900 text-base leading-tight line-clamp-2">
                                {item.name}
                              </h3>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="font-semibold text-xl text-neutral-900">
                                ₹{item.discountprice ?? item.price}
                              </span>
                              {item.discountprice &&
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
                      </div>
                      {/* Desktop Table Row */}
                      <div className="hidden md:grid grid-cols-12 gap-4 items-center px-4 py-4">
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
                              src={item.image[0]}
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
                        <div className="md:col-span-2 text-center mt-2 md:mt-0">
                          <div className="flex items-center justify-center gap-2">
                            {item.discountprice &&
                              item.discountprice < item.price && (
                                <span className="text-neutral-700 line-through text-sm">
                                  ₹{Math.round(item.price)}
                                </span>
                              )}
                            <span className="font-semibold text-base text-neutral-900">
                              ₹{Math.round(item.discountprice ?? item.price)}
                            </span>
                          </div>
                        </div>
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
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-neutral-400 py-12 text-lg font-medium">
                    Your cart is empty.
                  </div>
                )}
              </div>
              {/* Recommendations Section */}
              {recommendedProducts.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mt-6 border border-neutral-100">
                  <h2 className="text-xl font-semibold mb-4 text-neutral-800">
                    You Might Also Like
                  </h2>
                  <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
                    {recommendedProducts.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                </div>
              )}
            </section>
            {/* Cart Summary */}
            <aside className="lg:col-span-1">
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
                    Please add an address first to proceed.
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
