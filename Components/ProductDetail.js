import {
  FaMinus,
  FaPlus,
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useState } from "react";

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  console.log(product);
  

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 capitalize">
        {product?.name || "PEDIGREE® Chicken and Vegetables for Adult Dogs"}
      </h1>
      <p className="text-orange-500 font-semibold text-lg mb-4 capitalize">{product?.stock[0]?.value || "10 Kg"}</p>
      <p className="text-gray-600 text-sm mb-2 capitalize">
        <span className="font-semibold">Brand:</span> {product?.brand || "Pedigree"}
      </p>
      <p className="text-gray-600 text-sm mb-2 capitalize">
        <span className="font-semibold">Animal Category:</span> {product?.animalCategory || "Dog"}
      </p>
      <p className="text-gray-600 text-sm mb-4 capitalize">
        <span className="font-semibold">Category:</span> {product?.category || "Dry Food"}
      </p>
   {product?.stock?.length > 0 && product.stock[0].quantity > 0 ? (
  <p className="text-green-600 font-semibold mb-8">In Stock</p>
) : (
  <p className="text-red-600 font-semibold mb-8">Out of Stock</p>
)}


      {/* Pricing */}
      <div className="flex items-center gap-4 mb-8">
        <p className="text-2xl text-blue-600 font-bold">₹{product?.price || 1699}</p>
        <p className="text-gray-400 line-through">₹{product?.originalPrice || 1999}</p>
        <span className="bg-yellow-400 text-xs font-semibold px-2 py-1 rounded">
          {product?.discount || "21% OFF"}
        </span>
      </div>

      {/* Quantity & Action */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center border rounded">
          <button
            className={`p-2 ${quantity <= 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-black"}`}
            onClick={handleDecrement}
            disabled={quantity <= 1}
          >
            <FaMinus />
          </button>
          <span className="px-4">{quantity < 10 ? `0${quantity}` : quantity}</span>
          <button
            className="p-2 text-gray-600 hover:text-black"
            onClick={handleIncrement}
          >
            <FaPlus />
          </button>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded flex items-center gap-2">
          <FiShoppingCart /> ADD TO CART
        </button>
        <button className="border border-orange-500 hover:bg-orange-50 text-orange-500 font-semibold px-6 py-3 rounded">
          BUY NOW
        </button>
      </div>

      {/* Share Options */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-gray-500 text-sm">Share product:</span>
        <FaFacebookF className="text-gray-500 hover:text-blue-600 cursor-pointer" />
        <FaTwitter className="text-gray-500 hover:text-blue-400 cursor-pointer" />
        <FaPinterestP className="text-gray-500 hover:text-red-500 cursor-pointer" />
      </div>
    </div>
  );
};

export default ProductDetail;
