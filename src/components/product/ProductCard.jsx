
import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import Rating from "../common/Rating";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const productId = product._id || product.id;
  const liked = isInWishlist(productId);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      _id: productId,
    });
  };

  const handleWishlist = () => {
    toggleWishlist({
      ...product,
      _id: productId,
    });
  };

  return (
    <article
      className="
        group
        relative
        px-1
        py-1
        flex
        h-full
        min-w-0
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-100
        hover:shadow-xl
      "
    >
      {/* IMAGE */}
      <div className="relative bg-slate-50">

        {/* Discount */}
        {product.discount > 0 && (
          <div className="absolute left-2.5 top-2.5 z-10 rounded-md bg-green-500 px-2 py-1 text-[9px] font-bold text-white">
            {product.discount}% OFF
          </div>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label="Toggle wishlist"
          className={`
            absolute
            right-2.5
            top-2.5
            z-10
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border
            bg-white
            text-base
            shadow-sm
            transition-all
            hover:scale-110
            ${
              liked
                ? "border-red-100 text-red-500"
                : "border-slate-200 text-slate-500 hover:text-red-500"
            }
          `}
        >
          {liked ? "♥" : "♡"}
        </button>

        {/* Product Image */}
        <Link
          to={`/products/${productId}`}
          className="flex h-40 w-full items-center justify-center overflow-hidden sm:h-44 md:h-48"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col px-3 pb-3 pt-2.5 sm:px-3.5">

        {/* Badge */}
        <div className="min-h-[18px]">
          {product.badge && (
            <span className="inline-flex rounded-md bg-blue-50 px-1.5 py-0.5 text-[8px] font-bold text-blue-600 sm:text-[9px]">
              {product.badge}
            </span>
          )}
        </div>

        {/* NAME */}
        <Link to={`/products/${productId}`}>
          <h3
            className="
              mt-0.5
              line-clamp-2
              min-h-[36px]
              text-[13px]
              font-semibold
              leading-[18px]
              text-slate-800
              transition-colors
              hover:text-blue-600
              sm:text-sm
            "
          >
            {product.name}
          </h3>
        </Link>

        {/* BRAND */}
        <p className=" truncate text-[10px] font-medium text-slate-400 sm:text-[11px]">
          {product.brand}
        </p>

        {/* RATING */}
        <div className="mt-1">
          <Rating
            rating={product.rating}
            reviews={product.reviews}
          />
        </div>

        {/* PRICE */}
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <span className="text-base font-extrabold text-slate-900 sm:text-lg">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </span>

          {product.originalPrice && (
            <span className="text-[10px] text-slate-400 line-through sm:text-xs">
              ₹{Number(product.originalPrice).toLocaleString("en-IN")}
            </span>
          )}

          {product.discount > 0 && (
            <span className="text-[10px] font-bold text-green-600 sm:text-xs">
              {product.discount}% off
            </span>
          )}
        </div>

        {/* STOCK */}
        <div className="mt-1 min-h-[16px]">
          {product.stock !== undefined &&
            (product.stock === 0 ? (
              <span className="text-[10px] font-semibold text-red-500">
                Out of Stock
              </span>
            ) : product.stock <= 5 ? (
              <span className="text-[10px] font-semibold text-orange-600">
                Only {product.stock} left
              </span>
            ) : (
              <span className="text-[10px] font-medium text-green-600">
                ✓ In stock
              </span>
            ))}
        </div>

        {/* CART BUTTON */}
        <div className="mt-auto">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="
              flex
              h-9
              mx-1 my-1
              w-full
              items-center
              justify-center
              gap-1.5
              rounded-lg
              bg-yellow-400
              px-3
              text-[11px]
              font-extrabold
              text-slate-900
              shadow-sm
              transition-all
              hover:bg-yellow-500
              hover:shadow-md
              active:scale-[0.97]
              disabled:cursor-not-allowed
              disabled:bg-slate-200
              disabled:text-slate-400
              sm:h-10
              sm:text-xs
            "
          >
            🛒
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
