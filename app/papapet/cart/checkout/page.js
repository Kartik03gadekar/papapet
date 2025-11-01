"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Edit, Plus, X, Save, XCircle } from "lucide-react";
import NavPapaPet from "@/Components/Nav/NavPapaPet";
import { applyCoupon, setSelectedAddress } from "@/store/slices/cartSlices";
import axios from "@/Axios/axios";
import { useRouter } from "next/navigation";
import { fetchCart } from "@/store/slices/cartSlices";
import { Ri24HoursLine } from "react-icons/ri";
import { toast } from "react-hot-toast";

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

function getImageUrl(item) {
  if (!item.image) return "/placeholder.svg";

  if (typeof item.image === "string") return item.image;

  if (Array.isArray(item.image)) {
    if (typeof item.image[0] === "string") {
      return item.image[0];
    }

    if (item.image[0]?.filename && item.image[0]?.mimetype) {
      const [type, subtype] = item.image[0].mimetype.split("/");
      return `${axios.defaults.baseURL}admin/get/image/${item.image[0].filename}/${type}/${subtype}`;
    }
  }
  return "/placeholder.svg";
}

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useSelector((state) => state.cart);
  const selectedAddress = cart.shippingAddress;
  const authUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [orderNotes, setOrderNotes] = useState("");
  const [showNotesInput, setShowNotesInput] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [shippingAddress, setShippingAddress] = useState(
    selectedAddress || {
      name: "",
      street: "",
      city: "",
      pin: "",
      phone: "",
      email: "",
      addressId: undefined,
    }
  );

  const couponCode = cart.appliedCoupon;
  const couponDiscount = cart.discount;

  const isBhopalDelivery = useMemo(() => {
    const bhopalPincodes = new Set([
      "462001",
      "462002",
      "462003",
      "462004",
      "462007",
      "462008",
      "462010",
      "462011",
      "462013",
      "462016",
      "462018",
      "462020",
      "462021",
      "462022",
      "462023",
      "462024",
      "462026",
      "462027",
      "462030",
      "462031",
      "462032",
      "462033",
      "462036",
      "462037",
      "462038",
      "462039",
      "462040",
      "462041",
      "462042",
      "462043",
      "462044",
      "462045",
      "462046",
      "462047",
      "462051",
      "462052",
      "462053",
      "462054",
      "462055",
      "463106",
      "463111",
      "464993",
      "466114",
    ]);
    const currentPincode = shippingAddress?.pincode || shippingAddress?.pin;
    return bhopalPincodes.has(currentPincode);
  }, [shippingAddress]);

  // ✅ Only shipping address

  const { cartItems, subtotal, discount, shipping, total } = useSelector(
    (state) => state.cart
  );

  const appliedCoupon = useSelector((state) => state.cart.appliedCoupon);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (selectedAddress) {
      setShippingAddress(selectedAddress);
    }
  }, [selectedAddress]);

  // Fetch default shipping address
  useEffect(() => {
    const fetchDefaultAddress = async () => {
      if (!authUser || !authUser._id) return;
      if (selectedAddress) return;

      try {
        const { data } = await axios.get(
          `/user/getAllAddresses/${authUser._id}`
        );
        const defaultAddress =
          data?.addresses?.find((addr) => addr.isDefault) ||
          data?.addresses?.[0];

        if (defaultAddress) {
          setShippingAddress({
            name: defaultAddress.fullName,
            street: defaultAddress.streetAddress,
            city: defaultAddress.city,
            pin: defaultAddress.pincode,
            phone: defaultAddress.phoneNumber,
            email: defaultAddress.email,
            addressId: defaultAddress._id,
          });
        }
      } catch (error) {
        console.error("Failed to load address:", error);
      }
    };

    fetchDefaultAddress();
  }, [authUser, selectedAddress]);

  useEffect(() => {
    if (subtotal < 500) {
      router.replace("/papapet/cart");
    }
  }, [subtotal, router]);

  if (subtotal < 500) return null;

  // Edit state
  const [editAddressType, setEditAddressType] = useState(null); // only "shipping"
  const [editAddress, setEditAddress] = useState(shippingAddress);
  const [editAddressId, setEditAddressId] = useState(undefined);
  const [isSavingAddress, setIsSavingAddress] = useState(false);

  const handleEditAddress = useCallback(() => {
    setEditAddressType("shipping");
    setEditAddress({ ...shippingAddress });
    setEditAddressId(shippingAddress.addressId);
  }, [shippingAddress]);

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

  const handleSaveEditAddress = useCallback(async () => {
    if (!authUser || !authUser._id) {
      window.alert("You must be logged in to edit your address.");
      return;
    }
    if (!editAddressId) {
      window.alert("Missing addressId.");
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
      };

      const { data } = await axios.put("/user/editAddress", payload);

      if (data && data.success) {
        setShippingAddress({ ...editAddress, addressId: editAddressId });
        setEditAddressType(null);
        setEditAddressId(undefined);
      } else {
        window.alert(data?.message || "Failed to update address.");
      }
    } catch (err) {
      console.error(err);
      window.alert("Failed to update address.");
    } finally {
      setIsSavingAddress(false);
    }
  }, [authUser, editAddress, editAddressId]);

  const handleAddNotes = useCallback(() => setShowNotesInput(true), []);
  const handleNotesChange = useCallback(
    (e) => setOrderNotes(e.target.value),
    []
  );
  const handleRemoveCoupon = useCallback(
    () => dispatch(applyCoupon({ code: null, discount: 0 })),
    [dispatch]
  );

  // const subtotal = useMemo(() => Number(cart.subtotal) || 0, [cart.subtotal]);
  // const shipping = 0;
  // const discount = useMemo(() => Number(cart.discount) || 0, [cart.discount]);
  // const tax = useMemo(
  //   () => (subtotal > 0 ? Math.round(subtotal * 0.18) : 0),
  //   [subtotal]
  // );
  // const total = useMemo(
  //   () => Math.round(subtotal + shipping - discount + tax),
  //   [subtotal, shipping, discount, tax]
  // );

  // ✅ Place order only with shipping address

  const totalShipmentLength = cart.cartItems.reduce(
    (sum, item) => sum + Number(item.dimensions?.length || 1),
    0
  );
  const totalShipmentWidth = cart.cartItems.reduce(
    (sum, item) => sum + Number(item.dimensions?.width || 1),
    0
  );
  const totalShipmentHeight = cart.cartItems.reduce(
    (sum, item) => sum + Number(item.dimensions?.height || 1),
    0
  );
  const totalWeight = cart.cartItems.reduce(
    (sum, item) => sum + Number(item.dimensions?.weight || 0.1),
    0
  );

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
      !shippingAddress.fullName ||
      !shippingAddress.streetAddress ||
      !shippingAddress.pincode
    ) {
      window.alert("Please provide a valid shipping address.");
      return;
    }

    setIsPlacingOrder(true);

    try {
      const res = await loadRazorpayScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        window.alert("Razorpay SDK failed to load.");
        setIsPlacingOrder(false);
        return;
      }

      const { data: backendOrder } = await axios.post("/payment/create-order", {
        amount: total * 100,
      });

      if (!backendOrder || !backendOrder.id) {
        window.alert("Failed to create Razorpay order.");
        setIsPlacingOrder(false);
        return;
      }

      let userPhone =
        shippingAddress.phoneNumber ||
        cart.user?.phone ||
        cart.user?.mobile ||
        "9123456789";

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: backendOrder.amount,
        currency: "INR",
        name: "PapaPet",
        description: "Making Pets Life Better Together.",
        image: "/logo.png",
        order_id: backendOrder.id,
        handler: async function (response) {
          try {
            const verifyPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            const { data: verifyRes } = await axios.post(
              "/payment/verify",
              verifyPayload
            );

            if (verifyRes.success) {
              const payload = {
                order: `ORD-${Date.now()}`,
                order_date: new Date().toISOString().slice(0, 10),
                total_amount: total,
                name: shippingAddress.fullName,
                add: shippingAddress.streetAddress,
                pin: shippingAddress.pincode,
                phone: shippingAddress.phoneNumber,
                email: authUser.email,
                billing_name: shippingAddress.fullName,
                billing_add: shippingAddress.streetAddress,
                billing_pin: shippingAddress.pincode,
                billing_phone: shippingAddress.phoneNumber,
                products: cart.cartItems.map((item) => ({
                  product_name: item.name,
                  product_quantity: item.quantity || 1,
                  product_price: item.price,
                  product_sku: item._id || "",
                })),
                shipment_length: totalShipmentLength.toString(),
                shipment_width: totalShipmentWidth.toString(),
                shipment_height: totalShipmentHeight.toString(),
                weight: totalWeight.toString(),
                discount: discount,
                shipping: shipping,
                tax: 0,
                notes: orderNotes,
                userId: authUser._id,
                payment: verifyPayload,
                couponCode: couponCode,
              };

              const { data: createRes } = await axios.post(
                "delivery/order_creation",
                payload
              );

              if (!createRes.success) {
                window.alert(createRes.message || "Order creation failed.");
                setIsPlacingOrder(false);
                return;
              }

              window.location.href = "/papapet/order/successfull";
            } else {
              window.alert("Payment verification failed.");
            }
          } catch (err) {
            console.error(err);
            window.alert("Payment verification failed.");
          } finally {
            setIsPlacingOrder(false);
          }
        },
        prefill: {
          name: shippingAddress.name,
          email: shippingAddress.email,
          contact: shippingAddress.phoneNumber || userPhone,
        },
        notes: {
          shippingAddress: JSON.stringify(shippingAddress),
        },
        theme: { color: "#f59e42" },
        modal: { ondismiss: () => setIsPlacingOrder(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err?.response?.data || err?.message || err);
      window.alert("Something went wrong");
      setIsPlacingOrder(false);
    }
  }, [
    isPlacingOrder,
    authUser,
    cart,
    shippingAddress,
    total,
    discount,
    shipping,
    orderNotes,
  ]);

  const goToCart = useCallback(() => {
    router.push("/papapet/cart");
  }, [router]);

  return (
    <>
      <div className="overflow-hidden z-50">
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
            <span className="text-black font-medium text-base sm:text-lg md:text-xl">
              /
            </span>
            <span className="text-black font-medium text-base sm:text-lg md:text-xl">
              Review Order
            </span>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-5">
            {/* Left Column - Order Items & Details */}
            <div className="lg:col-span-2 flex flex-col space-y-4 sm:space-y-2 ">
              {/* Items Section */}
              {/* //  h-[45vh] */}
              <div
                className="bg-card
              //  h-fit
                rounded-lg border border-border shadow-sm overflow-y-auto py-2"
              >
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
                    cartItems.map((item) => (
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
                              e.target.src = "/placeholder.svg";
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
                              Rs. {item.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Address Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-2  md:pb-6 ">
                {/* Billing Address */}
                {/* <div className="bg-card rounded-lg border border-border shadow-sm">
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
                </div> */}
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
                          shippingAddress.fullName || (
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
                          {shippingAddress.streetAddress || (
                            <span className="italic">No street</span>
                          )}
                          {shippingAddress.city
                            ? `, ${shippingAddress.city}`
                            : ""}
                          {shippingAddress.pincode
                            ? `, ${shippingAddress.pincode}`
                            : ""}
                        </p>
                        <div className="space-y-1 pt-1 sm:pt-2">
                          <p className="text-xs sm:text-sm text-foreground">
                            <span className="font-medium">Phone Number:</span>{" "}
                            {shippingAddress.phoneNumber || (
                              <span className="text-muted-foreground">
                                No phone
                              </span>
                            )}
                          </p>
                          {/* <p className="text-xs sm:text-sm text-foreground">
                            <span className="font-medium">Email:</span>{" "}
                            {shippingAddress.email || (
                              <span className="text-muted-foreground">
                                No Email
                              </span>
                            )}
                          </p> */}
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
                      <span className="font-medium">Rs {subtotal}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Shipping.</span>
                      <span className="font-medium text-success">
                        <span className="line-through text-red-400">Rs. 99</span> Free 
                      </span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="font-medium">Rs {discount}</span>
                    </div>
                  </div>

                  <div className="border-t border-border my-3 sm:my-4"></div>

                  <div className="flex justify-between text-base sm:text-lg font-semibold">
                    <span>Total</span>
                    <span>Rs {total}</span>
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
                              Coupon applied: {appliedCoupon.code}
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

                  {isBhopalDelivery && (
                    <label
                      htmlFor="sameDayDelivery"
                      className="mt-4 block bg-white border rounded-xl shadow-sm cursor-pointer hover:border-primary transition-colors"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
                        <input
                          type="checkbox"
                          id="sameDayDelivery"
                          name="deliveryOption"
                          value="sameDay"
                          checked={deliveryOption === "sameDay"}
                          onChange={() => setDeliveryOption("sameDay")}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-sm sm:text-base text-card-foreground">
                            Same Day Delivery
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Available for your location in Bhopal.
                          </p>
                        </div>
                        <Ri24HoursLine className="text-3xl sm:text-4xl text-primary flex-shrink-0" />
                      </div>
                    </label>
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
