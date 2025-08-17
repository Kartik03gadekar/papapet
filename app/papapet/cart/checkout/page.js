"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Edit, Plus, X, Save, XCircle, ArrowLeft } from "lucide-react";
import NavPapaPet from "@/Components/Nav/NavPapaPet";
import { applyCoupon } from "@/store/slices/cartSlices";
import axios from "@/Axios/axios";
import { useRouter } from "next/navigation";

// Razorpay script loader (idempotent)
function loadRazorpayScript(src) {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// Helper: get address from cart or fallback, using payload mapping from cart/page.js
function getAddressFromCart(cart, type) {
  const addr = cart?.[`${type}Address`];
  if (addr && typeof addr === "object") {
    return {
      name: addr.fullName || addr.name || "",
      street: addr.streetAddress || addr.street || addr.addressLine || "",
      city: addr.city || "",
      pin: addr.pincode || addr.pin || "",
      phone: addr.phoneNumber || addr.phone || "",
      email: addr.email || "",
      addressId: addr._id || addr.addressId || undefined,
    };
  }
  return {
    name: "",
    street: "",
    city: "",
    pin: "",
    phone: "",
    email: "",
    addressId: undefined,
  };
}

function getImageUrl(item) {
  if (!item.image) return "/placeholder.svg";
  if (typeof item.image === "string") return item.image;
  if (
    Array.isArray(item.image) &&
    item.image[0]?.filename &&
    item.image[0]?.mimetype
  ) {
    const [type, subtype] = item.image[0].mimetype.split("/");
    return `${axios.defaults.baseURL}admin/get/image/${item.image[0].filename}/${type}/${subtype}`;
  }
  return "/placeholder.svg";
}

export default function CheckoutPage() {
  const router = useRouter(); // <-- useRouter must be called inside the component

  const cart = useSelector((state) => state.cart);
  const authUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [orderNotes, setOrderNotes] = useState("");
  const [showNotesInput, setShowNotesInput] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const couponCode = cart.appliedCoupon;
  const couponDiscount = cart.discount;

  // Map address from cart page, and update if cart changes
  const [billingAddress, setBillingAddress] = useState(() =>
    getAddressFromCart(cart, "billing")
  );
  const [shippingAddress, setShippingAddress] = useState(() =>
    getAddressFromCart(cart, "shipping")
  );

  useEffect(() => {
    setBillingAddress(getAddressFromCart(cart, "billing"));
  }, [cart?.billingAddress]);
  useEffect(() => {
    setShippingAddress(getAddressFromCart(cart, "shipping"));
  }, [cart?.shippingAddress]);

  // Fetch default address from backend if user is logged in
  useEffect(() => {
    const fetchDefaultAddress = async () => {
      if (!authUser || !authUser._id) return;
      try {
        const { data } = await axios.get(`/user/getAllAddresses/${authUser._id}`);
        const defaultAddress =
          data?.addresses?.find((addr) => addr.isDefault) ||
          data?.addresses?.[0];

        if (defaultAddress) {
          const formatted = {
            name: defaultAddress.fullName,
            street: defaultAddress.streetAddress,
            city: defaultAddress.city,
            pin: defaultAddress.pincode,
            phone: defaultAddress.phoneNumber,
            email: defaultAddress.email,
            addressId: defaultAddress._id,
          };
          setShippingAddress(formatted);
          setBillingAddress(formatted);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to load address:", error);
      }
    };

    fetchDefaultAddress();
  }, [authUser]);

  // Edit state for addresses
  const [editAddressType, setEditAddressType] = useState(null); // "billing" | "shipping" | null
  const [editAddress, setEditAddress] = useState({
    name: "",
    street: "",
    city: "",
    pin: "",
    phone: "",
    email: "",
    addressId: undefined,
  });
  const [editAddressId, setEditAddressId] = useState(undefined);
  const [isSavingAddress, setIsSavingAddress] = useState(false);

  // When edit is triggered, populate editAddress with current values and store addressId
  const handleEditAddress = useCallback(
    (type) => {
      let addressObj = type === "billing" ? billingAddress : shippingAddress;
      setEditAddressType(type);
      setEditAddress({ ...addressObj });
      setEditAddressId(addressObj.addressId);
    },
    [billingAddress, shippingAddress]
  );

  const handleCancelEditAddress = useCallback(() => {
    setEditAddressType(null);
    setEditAddress({
      name: "",
      street: "",
      city: "",
      pin: "",
      phone: "",
      email: "",
      addressId: undefined,
    });
    setEditAddressId(undefined);
  }, []);

  const handleChangeEditAddress = useCallback((e) => {
    const { name, value } = e.target;
    setEditAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Integrate API to edit and save address
  const handleSaveEditAddress = useCallback(async () => {
    if (!authUser || !authUser._id) {
      window.alert("You must be logged in to edit your address.");
      return;
    }
    if (!editAddressId) {
      window.alert(
        "Could not determine which address to update (missing addressId)."
      );
      return;
    }
    setIsSavingAddress(true);
    try {
      const payload = {
        userId: authUser._id,
        addressId: editAddressId,
        updatedAddress: {
          fullName: editAddress.name,
          streetAddress: editAddress.street,
          city: editAddress.city,
          pincode: editAddress.pin,
          phoneNumber: editAddress.phone,
          email: editAddress.email,
        },
        type: editAddressType,
      };

      const { data } = await axios.put("/user/editAddress", payload);

      if (data && data.success) {
        if (editAddressType === "billing") {
          setBillingAddress({ ...editAddress, addressId: editAddressId });
        } else if (editAddressType === "shipping") {
          setShippingAddress({ ...editAddress, addressId: editAddressId });
        }
        setEditAddressType(null);
        setEditAddressId(undefined);
      } else {
        window.alert(
          data?.message || "Failed to update address. Please try again."
        );
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      window.alert(
        err?.response?.data?.message ||
          "Failed to update address. Please try again."
      );
    } finally {
      setIsSavingAddress(false);
    }
  }, [authUser, editAddress, editAddressId, editAddressType]);

  const handleAddNotes = useCallback(() => setShowNotesInput(true), []);
  const handleNotesChange = useCallback(
    (e) => setOrderNotes(e.target.value),
    []
  );
  const handleRemoveCoupon = useCallback(
    () => dispatch(applyCoupon({ code: null, discount: 0 })),
    [dispatch]
  );

  const subtotal = useMemo(() => Number(cart.subtotal) || 0, [cart.subtotal]);
  const shipping = 0;
  const discount = useMemo(() => Number(cart.discount) || 0, [cart.discount]);
  const tax = useMemo(
    () => (subtotal > 0 ? Math.round(subtotal * 0.18) : 0),
    [subtotal]
  );
  const total = useMemo(
    () => Math.round(subtotal + shipping - discount + tax),
    [subtotal, shipping, discount, tax]
  );

  // Place Order with Razorpay + Backend order creation
  const handlePlaceOrder = useCallback(async () => {
    if (isPlacingOrder) return;
    if (!authUser || !authUser._id) {
      window.alert("You must be logged in to place an order.");
      return;
    }
    if (!cart.cartItems || cart.cartItems.length === 0) {
      window.alert("Your cart is empty.");
      return;
    }
    if (
      !shippingAddress ||
      !shippingAddress.name ||
      !shippingAddress.street ||
      !shippingAddress.pin
    ) {
      window.alert("Please provide a valid shipping address.");
      return;
    }
    if (
      !billingAddress ||
      !billingAddress.name ||
      !billingAddress.street ||
      !billingAddress.pin
    ) {
      window.alert("Please provide a valid billing address.");
      return;
    }
    setIsPlacingOrder(true);

    try {
      // 1️⃣ Load Razorpay SDK
      const res = await loadRazorpayScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        window.alert("Razorpay SDK failed to load.");
        setIsPlacingOrder(false);
        return;
      }

      // 2️⃣ Create Razorpay Order from backend
      const { data: backendOrder } = await axios.post("/payment/create-order", {
        amount: total, // total in INR
      });

      if (!backendOrder || !backendOrder.id) {
        window.alert("Failed to create Razorpay order. Please try again.");
        setIsPlacingOrder(false);
        return;
      }

      // 3️⃣ Normalize phone number for Razorpay prefill
      let userPhone =
        cart.user?.phone ||
        cart.user?.mobile ||
        cart.user?.contact ||
        billingAddress.phone ||
        "";
      userPhone = String(userPhone).replace(/\D/g, "");
      if (userPhone.length > 10 && userPhone.startsWith("91")) {
        userPhone = userPhone.slice(userPhone.length - 10);
      }
      if (!/^[6-9]\d{9}$/.test(userPhone)) {
        userPhone = user?.phone;
      }

      // 4️⃣ Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: backendOrder.amount, // amount in paise from backend
        currency: "INR",
        name: "PapaPet",
        description: "Payment for checkout",
        image: "/logo.png",
        order_id: backendOrder.id,
        handler: async function (response) {
          try {
            // 5️⃣ Verify payment with backend
            const verifyPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };
console.log(verifyPayload);

            const { data: verifyRes } = await axios.post(
              "/payment/verify",
              verifyPayload
            );

            console.log(verifyRes);
            
            if (verifyRes.success) {
              // 6️⃣ Create order in your backend after payment verification
              let userId = null;
              if (
                authUser &&
                authUser._id &&
                /^[a-f\d]{24}$/i.test(authUser._id)
              ) {
                userId = authUser._id;
              }

              const payload = {
                order: `ORD-${Date.now()}`,
                order_date: new Date().toISOString().slice(0, 10),
                total_amount: total,
                name: shippingAddress.name,
               
                add: shippingAddress.street,
                pin: shippingAddress.pin || "462022",
                phone: shippingAddress.phone,
                email: shippingAddress.email,
                billing_name: billingAddress.name,
                billing_add: billingAddress.street,
                billing_pin: billingAddress.pin || "462022",
                billing_phone: billingAddress.phone,
                products: cart.cartItems.map((item) => ({
                  product_name: item.name,
                  product_quantity: item.quantity,
                  product_price: item.price,
                  product_sku: item._id || "",
                  product_img_url: getImageUrl(item),
                })),
                shipment_length: "10",
                shipment_width: "10",
                shipment_height: "10",
                weight: "0.5",
                discount: discount,
                shipping: shipping,
                tax: tax,
                notes: orderNotes,
                userId: userId || null,
               email: authUser?.email,
                payment: verifyPayload,
              };
console.log(payload);

              const { data: createRes } = await axios.post(
                "delivery/order_creation",
                payload
              );

              console.log(createRes);
              
              if (!createRes.success) {
                window.alert(
                  createRes.message ||
                    "Order creation failed after payment. Please contact support."
                );
                setIsPlacingOrder(false);
                return;
              }

              // On successful order creation, redirect to success page
              window.location.href = "/papapet/order/sucessfull";
            } else {
              window.alert("Payment verification failed.");
            }
          } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
            window.alert("Payment verification failed. Please try again.");
          } finally {
            setIsPlacingOrder(false);
          }
        },
        prefill: {
          name: billingAddress.name,
          email: billingAddress.email,
          contact: userPhone,
        },
        notes: {
          billingAddress: JSON.stringify(billingAddress),
          shippingAddress: JSON.stringify(shippingAddress),
        },
        theme: { color: "#f59e42" },
        modal: { ondismiss: () => setIsPlacingOrder(false) },
      };

      if (typeof window.Razorpay !== "function") {
        window.alert("Razorpay SDK not available. Please try again.");
        setIsPlacingOrder(false);
        return;
      }
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err?.response?.data || err?.message || err);
      window.alert(err?.response?.data?.message || "Something went wrong");
      setIsPlacingOrder(false);
    }
  }, [
    isPlacingOrder,
    authUser,
    cart,
    shippingAddress,
    billingAddress,
    total,
    discount,
    shipping,
    tax,
    orderNotes,
  ]);

  // Move goToCart inside the component so it can use the router hook
  const goToCart = useCallback(() => {
    router.push("/papapet/cart");
  }, [router]);

  return (
    <>
      <div className="overflow-hidden">
        <NavPapaPet />
      </div>
      <div className="max-h-screen bg-surface p-2  sm:p-4 md:px-6 md:py-8 mb-4 lg:p-8  mt-8 md:mt-4 ">
        <div className="mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl  pl-2 font-semibold text-black mb-4 tracking-wide">
  Checkout
</h1>

{/* Breadcrumb */}
<div className="flex flex-wrap items-center gap-2  pl-2 text-sm sm:text-base md:text-lg text-black mb-4 sm:mb-6">
  <span
    onClick={goToCart}
    className="font-medium text-black hover:text-warning cursor-pointer 
               text-base sm:text-lg md:text-xl"
  >
    Cart
  </span>
  <span className="text-black font-medium text-base sm:text-lg md:text-xl">/</span>
  <span className="text-black font-medium text-base sm:text-lg md:text-xl">
    Review Order
  </span>
</div>


          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-5">
            {/* Left Column - Order Items & Details */}
            <div className="lg:col-span-2 flex flex-col space-y-4 sm:space-y-2 ">
              {/* Items Section */}
               {/* //  h-[45vh] */}
              <div className="bg-card
              //  h-fit
                rounded-lg border border-border shadow-sm overflow-y-auto py-2">
                <div className="p-4 sm:p-6 pb-2 sm:pb-4 ">
                  <h2 className="text-base sm:text-lg font-semibold text-card-foreground">
                    Items
                  </h2>
                </div>
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-3 sm:space-y-4">
  {!cart.cartItems || cart.cartItems.length === 0 ? (
    <div className="text-center text-muted-foreground py-8">
      No items in cart.
    </div>
  ) : (
    cart.cartItems.map((item) => (
      <div
  key={item._id}
  className="
    flex flex-row
    items-start md:items-center
    gap-3 sm:gap-4 p-3 sm:p-4
    rounded-lg bg-surface border border-border
  "
>
  {/* Product Image */}
  <div className="w-20 h-20 md:w-16 md:h-16 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
    <img
      src={getImageUrl(item)}
      alt={item.name}
      className="w-full h-full object-cover"
      loading="lazy"
      onError={(e) => {
        e.target.src = '/placeholder.svg';
      }}
    />
  </div>

  {/* Content (Details + Price) */}
  <div className="flex flex-1 flex-col md:flex-row md:items-center md:justify-between min-w-0">
    {/* Product Details */}
    <div className="min-w-0">
      <h3 className="font-medium text-foreground mb-1 text-sm sm:text-base">
        {item.name}
      </h3>
      {item.attributes && (
        <div className="space-y-1">
          {item.attributes.map((attr, index) => (
            <p
              key={index}
              className="text-xs sm:text-sm text-warning"
            >
              {attr}
            </p>
          ))}
        </div>
      )}
      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
        Qty: {item.quantity}
      </p>
    </div>

    {/* Price */}
    <div className="text-right mt-2 md:mt-0 md:ml-4 shrink-0">
      <p className="font-semibold text-foreground text-sm sm:text-base">
        Rs. {Number(item.price).toFixed(2)}
      </p>
    </div>
  </div>
</div>

    ))
  )}
</div>

              </div>

              {/* Address Sections */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-2  md:pb-6 ">
                {/* Billing Address */}
                <div className="bg-card rounded-lg border border-border shadow-sm">
                  <div className="p-4 sm:p-6 pb-2 sm:pb-4 flex items-center justify-between">
                    <h2 className="text-sm sm:text-base font-semibold text-card-foreground">
                      Billing Address
                    </h2>
                    {editAddressType === "billing" ? (
                      <div className="flex gap-2">
                        <button
                          className="p-2 text-success hover:text-success/80 transition-colors rounded-md hover:bg-accent"
                          onClick={handleSaveEditAddress}
                          type="button"
                          title="Save"
                          disabled={isSavingAddress}
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-destructive hover:text-destructive/80 transition-colors rounded-md hover:bg-accent"
                          onClick={handleCancelEditAddress}
                          type="button"
                          title="Cancel"
                          disabled={isSavingAddress}
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                        onClick={() => handleEditAddress("billing")}
                        type="button"
                        aria-label="Edit Billing Address"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-1 sm:space-y-2">
                    {/* Show image for billing address */}
                    <div className="flex items-center mb-2">
                      <img
                        src="/user-billing.png"
                        alt="Billing"
                        className="w-10 h-10 rounded-full object-cover mr-2 border border-border"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      <p className="font-medium text-foreground text-sm sm:text-base w-full">
                        {editAddressType === "billing" ? (
                          <input
                            className="border rounded px-2 py-1 text-sm w-full"
                            name="name"
                            value={editAddress.name}
                            onChange={handleChangeEditAddress}
                            placeholder="Name"
                            disabled={isSavingAddress}
                            autoComplete="name"
                          />
                        ) : (
                          billingAddress.name || (
                            <span className="text-muted-foreground">
                              No name
                            </span>
                          )
                        )}
                      </p>
                    </div>
                    {editAddressType === "billing" ? (
                      <>
                        <input
                          className="w-full border rounded px-2 py-1 text-sm mb-1"
                          name="street"
                          value={editAddress.street}
                          onChange={handleChangeEditAddress}
                          placeholder="Street Address"
                          disabled={isSavingAddress}
                          autoComplete="address-line1"
                        />
                        <div className="flex gap-2 mb-1">
                          <input
                            className="w-1/2 border rounded px-2 py-1 text-sm"
                            name="city"
                            value={editAddress.city}
                            onChange={handleChangeEditAddress}
                            placeholder="City"
                            disabled={isSavingAddress}
                            autoComplete="address-level2"
                          />
                          <input
                            className="w-1/2 border rounded px-2 py-1 text-sm"
                            name="pin"
                            value={editAddress.pin}
                            onChange={handleChangeEditAddress}
                            placeholder="PIN"
                            disabled={isSavingAddress}
                            autoComplete="postal-code"
                          />
                        </div>
                        <input
                          className="w-full border rounded px-2 py-1 text-sm mb-1"
                          name="phone"
                          value={editAddress.phone}
                          onChange={handleChangeEditAddress}
                          placeholder="Phone"
                          disabled={isSavingAddress}
                          autoComplete="tel"
                        />
                        <input
                          className="w-full border rounded px-2 py-1 text-sm"
                          name="email"
                          value={editAddress.email}
                          onChange={handleChangeEditAddress}
                          placeholder="Email"
                          disabled={isSavingAddress}
                          autoComplete="email"
                        />
                      </>
                    ) : (
                      <>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {billingAddress.street || (
                            <span className="italic">No street</span>
                          )}
                          {billingAddress.city
                            ? `, ${billingAddress.city}`
                            : ""}
                          {billingAddress.pin ? `, ${billingAddress.pin}` : ""}
                        </p>
                        <div className="space-y-1 pt-1 sm:pt-2">
                          <p className="text-xs sm:text-sm text-foreground">
                            <span className="font-medium">Phone Number:</span>{" "}
                            {billingAddress.phone || (
                              <span className="text-muted-foreground">
                                No phone
                              </span>
                            )}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {/* Shipping Address */}
                <div className="bg-card rounded-lg border border-border shadow-sm">
                  <div className="p-4 sm:p-6 pb-2 sm:pb-4 flex items-center justify-between">
                    <h2 className="text-sm sm:text-base font-semibold text-card-foreground">
                      Shipping Address
                    </h2>
                    {editAddressType === "shipping" ? (
                      <div className="flex gap-2">
                        <button
                          className="p-2 text-success hover:text-success/80 transition-colors rounded-md hover:bg-accent"
                          onClick={handleSaveEditAddress}
                          type="button"
                          title="Save"
                          disabled={isSavingAddress}
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-destructive hover:text-destructive/80 transition-colors rounded-md hover:bg-accent"
                          onClick={handleCancelEditAddress}
                          type="button"
                          title="Cancel"
                          disabled={isSavingAddress}
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                        onClick={() => handleEditAddress("shipping")}
                        type="button"
                        aria-label="Edit Shipping Address"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-1 sm:space-y-2">
                    {/* Show image for shipping address */}
                    <div className="flex items-center mb-2">
                      <img
                        src="/user-shipping.png"
                        alt="Shipping"
                        className="w-10 h-10 rounded-full object-cover mr-2 border border-border"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      <p className="font-medium text-foreground text-sm sm:text-base w-full">
                        {editAddressType === "shipping" ? (
                          <input
                            className="border rounded px-2 py-1 text-sm w-full"
                            name="name"
                            value={editAddress.name}
                            onChange={handleChangeEditAddress}
                            placeholder="Name"
                            disabled={isSavingAddress}
                            autoComplete="name"
                          />
                        ) : (
                          shippingAddress.name || (
                            <span className="text-muted-foreground">
                              No name
                            </span>
                          )
                        )}
                      </p>
                    </div>
                    {editAddressType === "shipping" ? (
                      <>
                        <input
                          className="w-full border rounded px-2 py-1 text-sm mb-1"
                          name="street"
                          value={editAddress.street}
                          onChange={handleChangeEditAddress}
                          placeholder="Street Address"
                          disabled={isSavingAddress}
                          autoComplete="address-line1"
                        />
                        <div className="flex gap-2 mb-1">
                          <input
                            className="w-1/2 border rounded px-2 py-1 text-sm"
                            name="city"
                            value={editAddress.city}
                            onChange={handleChangeEditAddress}
                            placeholder="City"
                            disabled={isSavingAddress}
                            autoComplete="address-level2"
                          />
                          <input
                            className="w-1/2 border rounded px-2 py-1 text-sm"
                            name="pin"
                            value={editAddress.pin}
                            onChange={handleChangeEditAddress}
                            placeholder="PIN"
                            disabled={isSavingAddress}
                            autoComplete="postal-code"
                          />
                        </div>
                        <input
                          className="w-full border rounded px-2 py-1 text-sm mb-1"
                          name="phone"
                          value={editAddress.phone}
                          onChange={handleChangeEditAddress}
                          placeholder="Phone"
                          disabled={isSavingAddress}
                          autoComplete="tel"
                        />
                        <input
                          className="w-full border rounded px-2 py-1 text-sm"
                          name="email"
                          value={editAddress.email}
                          onChange={handleChangeEditAddress}
                          placeholder="Email"
                          disabled={isSavingAddress}
                          autoComplete="email"
                        />
                      </>
                    ) : (
                      <>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {shippingAddress.street || (
                            <span className="italic">No street</span>
                          )}
                          {shippingAddress.city
                            ? `, ${shippingAddress.city}`
                            : ""}
                          {shippingAddress.pin
                            ? `, ${shippingAddress.pin}`
                            : ""}
                        </p>
                        <div className="space-y-1 pt-1 sm:pt-2">
                          <p className="text-xs sm:text-sm text-foreground">
                            <span className="font-medium">Phone Number:</span>{" "}
                            {shippingAddress.phone || (
                              <span className="text-muted-foreground">
                                No phone
                              </span>
                            )}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {/* Order Notes */}
                <div className="bg-card rounded-lg border border-border shadow-sm">
                  <div className="p-4 sm:p-6 pb-2 sm:pb-4 flex items-center justify-between">
                    <h2 className="text-sm sm:text-base font-semibold text-card-foreground">
                      Order Notes
                    </h2>
                    <button
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                      onClick={handleAddNotes}
                      type="button"
                      aria-label="Add Order Notes"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                    {showNotesInput ? (
                      <textarea
                        className="w-full border rounded-md p-2 text-sm"
                        rows={3}
                        value={orderNotes}
                        onChange={handleNotesChange}
                        placeholder="Add your order notes here..."
                        aria-label="Order Notes"
                      />
                    ) : orderNotes ? (
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {orderNotes}
                      </p>
                    ) : (
                      <p className="text-xs sm:text-sm text-muted-foreground italic">
                        None
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1 mt-4 lg:mt-0 pb-10">
              <div className="bg-card rounded-lg border border-border shadow-sm sticky top-4 lg:top-6">
                <div className="p-4 sm:p-6 pb-2 sm:pb-4">
                  <h2 className="text-base sm:text-lg font-semibold text-card-foreground">
                    Cart Totals
                  </h2>
                </div>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-3 sm:space-y-4">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Sub-total</span>
                      <span className="font-medium">
                        Rs {subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Tax.</span>
                      <span className="font-medium text-success">
                        Rs. {tax}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="font-medium">
                        Rs {discount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-border my-3 sm:my-4"></div>

                  <div className="flex justify-between text-base sm:text-lg font-semibold">
                    <span>Total</span>
                    <span>Rs {total.toFixed(2)}</span>
                  </div>

                  <button
                    className="w-full mt-4 sm:mt-6 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg shadow-sm h-11 sm:h-12 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base transition-colors"
                    onClick={handlePlaceOrder}
                    type="button"
                    disabled={isPlacingOrder}
                    aria-busy={isPlacingOrder}
                  >
                    {isPlacingOrder ? "Processing..." : "PLACE YOUR ORDER"}
                  </button>

                  {/* Coupon Applied */}
                  {couponCode && (
                    <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-warning/10 rounded-lg border border-warning/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex-1 flex items-center gap-2">
                        {/* Show coupon image */}
                        <img
                          src="/coupon.png"
                          alt="Coupon"
                          className="w-8 h-8 object-contain rounded"
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                        <div>
                          <p className="text-xs sm:text-sm text-warning-foreground">
                            <span className="font-medium">
                              Coupon applied: {couponCode}
                            </span>
                          </p>
                          <p className="text-xs text-warning-foreground/80">
                            -Rs {couponDiscount?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <button
                        className="text-warning-foreground hover:text-warning-foreground/80 h-auto p-1 transition-colors"
                        onClick={handleRemoveCoupon}
                        type="button"
                        aria-label="Remove Coupon"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}