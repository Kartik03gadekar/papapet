import { LuShare } from "react-icons/lu";

const ShareDoctor = ({ product }) => {
  // Build correct Google Maps URL
  const productUrl = product?.place_id
    ? `https://www.google.com/maps/search/?api=1&query=${product.geometry.location.lat},${product.geometry.location.lng}`
    : product?.geometry?.location
    ? `https://www.google.com/maps/search/?api=1&query=${product.geometry.location.lat},${product.geometry.location.lng}`
    : (typeof window !== "undefined" ? window.location.href : "");

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name || "Check this clinic",
          text: `Check out this clinic: ${product?.name}`,
          url: productUrl,
        });
      } catch (error) {
        console.error("Sharing failed", error);
      }
    } else {
      navigator.clipboard.writeText(productUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex items-center rounded-full">
      <LuShare
        className="text-white font-black cursor-pointer text-2xl"
        onClick={handleShare}
      />
    </div>
  );
};

export default ShareDoctor;
