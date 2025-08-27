"use client";

import {
  FaMinus,
  FaPlus,
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";
import { useRouter } from "next/navigation"

import { FiShoppingCart } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "@/store/Action/auth";
import { addToCart, clearCart } from "@/store/slices/cartSlices";
import axiosInstance from "@/Axios/axios";
import { toast } from "react-toastify"; // <-- Import toastify

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const ProductDetail = ({ product, i }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [pincodeMessage, setPincodeMessage] = useState("");
   const router = useRouter();

  useEffect(() => {
    dispatch(checkUser);
  }, [dispatch]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleCheckPincode = async () => {
    if (!pincode || pincode.length < 6) {
      setPincodeStatus("error");
      setPincodeMessage("Please enter a valid 6-digit pincode.");
      return;
    }

    setPincodeStatus("checking");
    setPincodeMessage("Checking delivery availability...");

    try {
      const res = await axiosInstance.post(`/delivery/pincode`, { pincode });
      const data = res.data;

      if (data.status === "success" && data.data) {
        const courierData = data.data[pincode];
        if (courierData) {
          const isAvailable = Object.values(courierData).some(
            (courier) => courier.prepaid === "Y" || courier.cod === "Y"
          );

          if (isAvailable) {
            setPincodeStatus("available");
            setPincodeMessage("Delivery is available to this pincode!");
          } else {
            setPincodeStatus("unavailable");
            setPincodeMessage("Sorry, no courier delivers to this pincode.");
          }
        } else {
          setPincodeStatus("unavailable");
          setPincodeMessage("Pincode not serviceable.");
        }
      } else {
        setPincodeStatus("error");
        setPincodeMessage("Failed to check pincode. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setPincodeStatus("error");
      setPincodeMessage("Failed to check pincode. Please try again.");
    }
  };

  // const handleBuyNow = async () => {

  //   const razorpayLoaded = await loadScript(
  //     "https://checkout.razorpay.com/v1/checkout.js"
  //   );
  //   if (!razorpayLoaded) {
  //     toast.error("Failed to load Razorpay SDK.");
  //     return;
  //   }

  //   try {
  //     const amount = Math.round(
  //       (product?.discountprice || product?.price || 0) * quantity * 100
  //     );

  //     const backendOrderRes = await axiosInstance.post(
  //       "/payment/create-order",
  //       { amount: (amount / 100).toFixed(2) }
  //     );
  //     const order = backendOrderRes.data;

  //     if (!order.id) {
  //       toast.error("Failed to create Razorpay order");
  //       return;
  //     }

  //     const options = {
  //       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  //       amount: order.amount,
  //       currency: order.currency,
  //       name: "Papapet",
  //       description: product?.name || "Product Purchase",
  //       order_id: order.id,
  //       handler: async function (response) {
  //         try {
  //           const verifyRes = await axiosInstance.post("/payment/verify", {
  //             razorpay_order_id: response.razorpay_order_id,
  //             razorpay_payment_id: response.razorpay_payment_id,
  //             razorpay_signature: response.razorpay_signature,
  //           });

  //           const verifyData = verifyRes.data;
  //           if (!verifyData.success) {
  //             toast.error("Payment verification failed.");
  //             return;
  //           }

  //           const orderPayload = {
  //             waybill: "",
  //             order: "ORD" + Date.now().toString().slice(-6),
  //             order_date: new Date().toISOString().split("T")[0],
  //             total_amount: Math.round(amount / 100),
  //             shipping: 0,
  //             discount: product?.discount || 0,
  //             tax: 0,
  //             name: user?.name || "Customer",
  //             add: user?.address || "123 MG Road",
  //             pin: user?.pincode || "462001",
  //             phone: user?.phone || "9876543210",
  //             billing_name: user?.billing_name || user?.name || "Customer",
  //             billing_add:
  //               user?.billing_address || user?.address || "123 MG Road",
  //             billing_pin: user?.billing_pincode || user?.pincode || "462001",
  //             billing_phone: user?.billing_phone || user?.phone || "9876543210",
  //             email: user?.email || "test@example.com",
  //             userId: user?._id || "68238557a668edc0ee872d33",
  //             products: [
  //               {
  //                 product_name: product?.name,
  //                 product_quantity: quantity,
  //                 product_price: product?.discountprice || product?.price,
  //                 product_id: product?._id || product?.id || "",
  //                 product_sku: product?.sku || "",
  //                 product_image: product?.image || product?.img || "",
  //                 product_category: product?.category || "",
  //                 product_brand: product?.brand || "",
  //               },
  //             ],
  //             applied_coupon: null,
  //             shipment_length: 20,
  //             shipment_width: 10,
  //             shipment_height: 5,
  //             weight: 1.5,
  //             payment_id: response.razorpay_payment_id,
  //           };

  //           const saveOrderRes = await axiosInstance.post(
  //             "/delivery/order_creation",
  //             orderPayload
  //           );

  //           if (
  //             !saveOrderRes.status ||
  //             saveOrderRes.status < 200 ||
  //             saveOrderRes.status >= 300
  //           ) {
  //             const errData = saveOrderRes.data || {};
  //             console.error("Order saving failed:", errData);
  //             toast.error("Order could not be saved. Please contact support.");
  //             return;
  //           }

  //           toast.success("Order placed successfully!");
  //           window.location.href = "/papapet/order/sucessfull";
  //         } catch (error) {
  //           console.error("Error in order handler:", error);
  //           toast.error("Something went wrong. Please try again.");
  //         }
  //       },
  //       prefill: {
  //         name: user?.name || "Customer",
  //         email: user?.email || "test@example.com",
  //         contact: user?.phone || "9999999999",
  //       },
  //       theme: { color: "#f97316" },
  //     };

  //     const paymentObject = new window.Razorpay(options);
  //     paymentObject.open();

  //     paymentObject.on("payment.failed", function (response) {
  //       toast.error("Payment failed.");
  //       console.error(response.error);
  //     });
  //   } catch (error) {
  //     console.error("Checkout error:", error);
  //     toast.error("Something went wrong during checkout. Please try again.");
  //   }
  // };

   const handleBuyNow = (e) => {
      e.preventDefault();
      // Clear cart and add only this product, then go to cart page
      dispatch(clearCart());
      dispatch(addToCart({ ...i, quantity: 1 }));
      router.push("/papapet/cart");
    };

  const handleAddToCart = () => {
    if (!product) return;

    const item = {
      ...product,
      quantity,
    };

    dispatch(addToCart(item));
    toast.success("Item added to cart!");
  };

  return (
    <div className="overflow-hidden">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 capitalize">
        {product?.name || "PEDIGREE® Chicken and Vegetables for Adult Dogs"}
      </h1>

      <p className="text-orange-500 font-semibold text-lg mb-4 capitalize">
        {product?.stock?.[0]?.value || "00 Kg"}
      </p>

      <p className="text-gray-600 text-sm mb-2 capitalize">
        <span className="font-semibold">Brand:</span>{" "}
        {product?.brand || "Pedigree"}
      </p>

      <p className="text-gray-600 text-sm mb-2 uppercase">
        <span className="font-semibold">Animal Category:</span>{" "}
        {product?.animalCategory || "Dog"}
      </p>

      <p className="text-gray-600 text-sm mb-4 capitalize">
        <span className="font-semibold">Category:</span>{" "}
        {product?.category || "Dry Food"}
      </p>

      {product?.stock?.length > 0 && product.stock[0].quantity > 0 ? (
        <p className="text-green-600 font-semibold mb-8">In Stock</p>
      ) : (
        <p className="text-red-600 font-semibold mb-8">Out of Stock</p>
      )}

      <div className="mb-8">
        <div className="flex items-center gap-2">
          <input
            type="text"
            maxLength={6}
            minLength={6}
            pattern="[0-9]{6}"
            placeholder="Enter pincode"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value.replace(/\D/g, ""));
              setPincodeStatus(null);
              setPincodeMessage("");
            }}
            className="border border-gray-300 rounded px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            onClick={handleCheckPincode}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded"
            disabled={pincodeStatus === "checking"}
          >
            {pincodeStatus === "checking" ? "Checking..." : "Check Delivery"}
          </button>
        </div>
        {pincodeStatus && (
          <div
            className={`mt-2 text-sm ${
              pincodeStatus === "available"
                ? "text-green-600"
                : pincodeStatus === "unavailable"
                ? "text-red-600"
                : "text-orange-500"
            }`}
          >
            {pincodeMessage}
          </div>
        )}
      </div>

      <div className="mb-8">
        {product?.discountprice ? (
          <div className="flex items-center gap-4">
            <p className="text-2xl text-blue-600 font-bold">
              ₹{product.discountprice}
            </p>
            <p className="text-gray-400 line-through">₹{product.price}</p>
            <span className="bg-yellow-400 text-xs font-semibold px-2 py-1 rounded">
              {product.discount + "% OFF" || "0.00% OFF"}
            </span>
          </div>
        ) : (
          <p className="text-2xl text-blue-600 font-bold">
            ₹{product?.price || "0000"}
          </p>
        )}
      </div>

      <div className="">
        <div className="w-32 flex items-center border rounded justify-center">
          <button
            className={`p-2 ${
              quantity <= 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:text-black"
            }`}
            onClick={handleDecrement}
            disabled={quantity <= 1}
          >
            <FaMinus />
          </button>
          <span className="px-4">
            {quantity < 10 ? `0${quantity}` : quantity}
          </span>
          <button
            className="p-2 text-gray-600 hover:text-black"
            onClick={handleIncrement}
          >
            <FaPlus />
          </button>
        </div>
        <div className="flex items-center justify-start gap-5 py-5">
          <button
            onClick={handleAddToCart}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded flex items-center gap-2"
          >
            <FiShoppingCart /> ADD TO CART
          </button>

          <button
            onClick={handleBuyNow}
            className="border border-orange-500 hover:bg-orange-50 text-orange-500 font-semibold px-6 py-3 rounded"
          >
            BUY NOW
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <span className="text-gray-500 text-sm">Share product:</span>
        <FaFacebookF className="text-gray-500 hover:text-blue-600 cursor-pointer text-lg" />
        <FaInstagram className="text-gray-500 hover:text-red-500 cursor-pointer text-xl" />
        <FaWhatsapp className="text-gray-500 hover:text-green-400 cursor-pointer text-xl" />
      </div>
    </div>
  );
};

export default ProductDetail;
