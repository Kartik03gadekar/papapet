"use client ";
import {
  FaMinus,
  FaPlus,
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";

import { FiShoppingCart } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "@/store/Action/auth";
import { addToCart } from "@/store/slices/cartSlices";

// ✅ Razorpay Script Loader
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const ProductDetail = ({ product }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  console.log(product);

  useEffect(() => {
    dispatch(checkUser);
  }, []);
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  // ✅ Razorpay Payment Handler
  const handleBuyNow = async () => {
    const razorpayLoaded = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!razorpayLoaded) {
      alert("Failed to load Razorpay SDK.");
      return;
    }

    const amount = (product?.discountprice || product?.price || 0) * quantity;

    // 1️⃣ Create order from backend
    const backendOrderRes = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const order = await backendOrderRes.json();

    if (!order.id) {
      alert("Failed to create Razorpay order");
      return;
    }

    // 2️⃣ Razorpay Payment options
    const options = {
      key: "rzp_test_29scEy2F7YK7wF",
      amount: order.amount,
      currency: order.currency,
      name: "Papapet",
      description: product?.name || "Product Purchase",
      order_id: order.id, // ✅ VERY IMPORTANT
      handler: async function (response) {
        // 3️⃣ Verify signature with backend
        const verifyRes = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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

        // 4️⃣ Optional: Create internal order record here
        alert(
          `✅ Payment Success!\nPayment ID: ${response.razorpay_payment_id}`
        );
        window.location.href = "/papapet/order/successful";
      },
      prefill: {
        name: user?.name || "Customer",
        email: user?.email || "test@example.com",
        contact: user?.phone || "9999999999",
      },
      notes: {
        product_id: product?._id,
        quantity: quantity,
      },
      theme: { color: "#f97316" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      alert("❌ Payment failed: " + response.error.description);
    });
  };

  const handleAddToCart = () => {
    if (!product) return;

    const item = {
      ...product,
      quantity,
    };

    dispatch(addToCart(item));
    alert("Item added to cart!");
  };

  return (
    <div className="overflow-hidden">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 capitalize">
        {product?.name || "PEDIGREE® Chicken and Vegetables for Adult Dogs"}
      </h1>

      <p className="text-orange-500 font-semibold text-lg mb-4 capitalize">
        {product?.stock[0]?.value || "00 Kg"}
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

      {/* Price Display */}
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

      {/* Quantity & Actions */}
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

      {/* Share Options */}
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
