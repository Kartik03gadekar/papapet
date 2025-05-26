import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";
import RelatedProduct from "./RelatedProduct";

const ProductExtraInfo = ({food}) => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-4 mb-4">
      {/* Description + Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {/* Description */}
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
<div dangerouslySetInnerHTML={{ __html: food?.discription || "<p > No description </p>" }} />

          {/* <ul className="list-disc pl-5 text-gray-700 space-y-2 text-sm">
            <li>ORAL CARE TREAT: Healthy and tasty oral care dog treat recommended by vets.</li>
            <li>QUALITY INGREDIENTS: Zinc Sulphate & Sodium Tripolyphosphate for oral care.</li>
            <li>SUPPORTS GUM HEALTH: x-shape and abrasive texture to keep teeth and gums strong.</li>
            <li>REDUCES TARTAR BUILD-UP: Helps reduce tartar build-up by up to 80%.</li>
            <li>NO ARTIFICIAL ADDITIVES: No added artificial colours or flavours.</li>
          </ul> */}
        </div>

        {/* Features */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Feature</h2>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>🚚 Fast Shipping & Delivery</li>
            <li>🛌 100% Trusted Product</li>
            <li>📡 24/7 Customer support</li>
            <li>💳 Secure payment method</li>
          </ul>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProduct foodcategories={food?.categories}/>
    </div>
  );
};

export default ProductExtraInfo;