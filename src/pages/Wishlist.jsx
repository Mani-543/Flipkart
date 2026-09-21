import { Link } from "react-router-dom";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import EmptyState from "../components/common/EmptyState";

function Wishlist() {
  const {
    wishlist,
    wishlistCount,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    const productId = product._id || product.id;

    addToCart({
      ...product,
      _id: productId,
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 px-3 py-6 sm:px-4">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="text-7xl">
              ♡
            </div>

            <h1 className="mt-5 text-2xl font-bold">
              Your Wishlist is Empty
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Save products you love and find them here
              whenever you want.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-block rounded-md bg-blue-600 px-7 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-3 py-5 sm:px-4 sm:py-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm sm:p-5">
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">
              My Wishlist
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {wishlistCount}{" "}
              {wishlistCount === 1
                ? "product"
                : "products"}
            </p>
          </div>

          <button
            onClick={clearWishlist}
            className="text-sm font-semibold text-red-500 hover:text-red-600"
          >
            Clear Wishlist
          </button>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((product) => {
            const productId = product._id || product.id;
            const price = Number(product.price ?? 0);
            const originalPrice = Number(product.originalPrice ?? price);
            const discount = Number(product.discount ?? 0);

            return (
              <article
                key={productId}
                className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Remove */}
                <button
                  onClick={() => removeFromWishlist(productId)}
                  className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg text-red-500 shadow-sm"
                  aria-label="Remove from wishlist"
                >
                  ♥
                </button>

                {/* Image */}
                <Link
                  to={`/products/${productId}`}
                  className="flex h-56 items-center justify-center bg-gray-50"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain p-6 transition duration-300 group-hover:scale-105"
                  />
                </Link>

                {/* Info */}
                <div className="p-4">
                  <p className="text-xs text-gray-500">
                    {product.brand}
                  </p>

                  <Link
                    to={`/products/${productId}`}
                    className="mt-1 block line-clamp-2 text-sm font-semibold text-gray-800 hover:text-blue-600"
                  >
                    {product.name}
                  </Link>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="rounded bg-green-600 px-2 py-1 text-xs font-semibold text-white">
                      {product.rating ?? 0} ★
                    </span>

                    <span className="text-xs text-gray-500">
                      {product.reviews?.toLocaleString?.() ?? "0"} ratings
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-lg font-bold">
                      ₹{price.toLocaleString("en-IN")}
                    </span>

                    {originalPrice > price && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}

                    {discount > 0 && (
                      <span className="text-xs font-semibold text-green-600">
                        {discount}% off
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 w-full rounded-md bg-yellow-400 py-2.5 text-sm font-bold transition hover:bg-yellow-500"
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;