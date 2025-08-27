import { RiShareLine } from "react-icons/ri";

const ShareProduct = ({ product }) => {
  const productUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name || "Check this product",
          text: `Check out this product: ${product?.name}`,
          url: productUrl,
        });
      } catch (error) {
        console.error("Sharing failed", error);
      }
    } else {
      // fallback (desktop browsers that don’t support navigator.share)
      navigator.clipboard.writeText(productUrl);
      alert("Product link copied to clipboard!");
    }
  };

  return (
    <div className="flex items-center bg-[#FFB922] p-3 rounded-full">
      <RiShareLine
        className="text-white font-black  cursor-pointer text-2xl"
        onClick={handleShare}
      />
    </div>
  );
};

export default ShareProduct;
