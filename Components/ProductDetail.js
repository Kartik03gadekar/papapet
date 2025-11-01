"use client";

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
import { addToCart, clearCart } from "@/store/slices/cartSlices";
import axiosInstance from "@/Axios/axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import ShareProduct from "./ShareProduct";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const ProductDetail = ({ i, product }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [pincodeMessage, setPincodeMessage] = useState("");
  const [selectedStock, setSelectedStock] = useState(
    product?.stock?.[0] || null
  );

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

      if (err.response?.status === 401) {
        setPincodeStatus("unauthorized");
        setPincodeMessage("Please login to check delivery availability.");
      } else {
        setPincodeStatus("error");
        setPincodeMessage("Failed to check pincode. Please try again.");
      }
    }
  };

  const handleBuyNow = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosInstance.post("/user/addToCart", {
        foodId: product._id,
        quantity: 1,
      });

      if (data.success) {
        const item = {
          ...i,
          quantity: 1,
        };
        dispatch(addToCart(item));

        toast.success("Item added to cart!");
        router.push("/papapet/cart");
      } else {
        toast.error(data.message || "Failed to add item");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      router.push("/papapet/auth");
      toast.error(
        error.response?.data?.message || "Something went wrong. Try again!"
      );
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/user/addToCart", {
        foodId: i._id,
        quantity: 1,
      });

      if (data.success) {
        const item = {
          ...i,
          quantity: 1,
        };
        dispatch(addToCart(item));

        toast.success("Item added to cart!");
      } else {
        toast.error(data.message || "Failed to add item");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      router.push("/papapet/auth");
      toast.error(error.response?.data?.message || "Please Login to continue!");
    }
  };

  return (
    <div className="overflow-hidden">
      <h1 className="text-2xl md:text-3xl max-w-lg font-semibold text-gray-800 mb-6 capitalize">
        {product?.name || "PEDIGREE® Chicken and Vegetables for Adult Dogs"}
      </h1>

      <p className="text-gray-600 text-sm mb-2 capitalize">
        <span className="font-semibold">Brand:</span>{" "}
        {product?.brand || "Pedigree"}
      </p>

      <p className="text-gray-600 text-sm mb-2 capitalize">
        <span className="font-semibold">animal category:</span>{" "}
        {product?.animalCategory || "Dog"}
      </p>

      <p className="text-gray-600 text-sm mb-4 capitalize">
        <span className="font-semibold">Category:</span>{" "}
        {product?.categories}
      </p>

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
        {selectedStock?.discountprice ? (
          <div className="flex items-center gap-4">
            <p className="text-2xl text-blue-600 font-bold">
              ₹{selectedStock.discountprice}
            </p>
            <p className="text-gray-400 line-through">₹{selectedStock.price}</p>
            <span className="bg-yellow-400 text-xs font-semibold px-2 py-1 rounded">
              {selectedStock.discount + "% OFF" || "0% OFF"}
            </span>
          </div>
        ) : (
          <p className="text-2xl text-blue-600 font-bold">
            ₹{selectedStock?.sellingprice || product?.discountprice}
          </p>
        )}
      </div>

      <div className="mb-6 flex gap-3 flex-wrap">
        {(!product?.stock || product.stock.length === 0) && (
          <div className="p-3 rounded bg-yellow-50 text-yellow-800 border border-yellow-100">
            This product has no stock available
          </div>
        )}

        {product?.stock?.map((stockItem, idx) => {
          const out = !(stockItem && Number(stockItem.quantity) > 0);
          const selected =
            selectedStock && selectedStock.value === stockItem.value;
          return (
            <button
              key={idx}
              onClick={() => {
                if (!out) setSelectedStock(stockItem);
              }}
              className={`px-4 py-2 rounded border font-semibold flex items-center gap-3 ${
                selected
                  ? "bg-orange-500 text-white border-orange-500"
                  : out
                  ? "bg-white text-gray-300 border-gray-200 cursor-not-allowed opacity-70"
                  : "bg-white text-gray-700 border-gray-300 hover:shadow-sm"
              }`}
              disabled={out}
              title={
                out
                  ? `Out of stock (${stockItem.value})`
                  : `Select ${stockItem.value} - ${
                      stockItem.quantity ?? 0
                    } left`
              }
            >
              <span>{stockItem.value}</span>

              {out ? (
                <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded">
                  Out of stock
                </span>
              ) : (
                <span className="text-xs text-gray-600 bg-gray-50 px-2 py-0.5 rounded">
                  {stockItem.quantity ?? 0} left
                </span>
              )}
            </button>
          );
        })}
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
            className="border border-orange-500 text-orange-500 font-semibold px-6 py-3 rounded flex items-center gap-2"
          >
            <FiShoppingCart /> ADD TO CART
          </button>

          <button
            onClick={handleBuyNow}
            className="bg-orange-500  hover:bg-orange-50 text-white font-semibold px-6 py-3 rounded"
          >
            BUY NOW
          </button>
        </div>
      </div>

      <div className="fixed top-10 right-5 xl:right-20 flex items-center gap-xl:4 mb-6">
        <ShareProduct product={product} />
      </div>
    </div>
  );
};

export default ProductDetail;
