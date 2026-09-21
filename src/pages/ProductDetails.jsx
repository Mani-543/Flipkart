import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../services/api";
import Loader from "../components/common/Loader";
import Rating from "../components/common/Rating";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/products/" + id);

        setProduct(response.data.product);
      } catch (err) {
        console.error("Product details error:", err);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4f6f9] p-6">
        <Loader />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-sm">
          <div className="text-5xl">😕</div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Product not found
          </h1>

          <p className="mt-3 text-gray-500">
            {error || "This product does not exist."}
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex rounded-lg bg-[#0755b8] px-6 py-3 font-semibold text-white transition hover:bg-[#06499f]"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const productId = product._id;
  const liked = isInWishlist(productId);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <main className="min-h-screen bg-[#f4f6f9] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-[1440px]">

        <div className="mb-4 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            to="/products"
            className="hover:text-blue-600"
          >
            Products
          </Link>

          <span className="mx-2">/</span>

          <span>{product.name}</span>
        </div>

        <div className="grid overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm lg:grid-cols-2">

          <div className="relative flex min-h-[360px] items-center justify-center bg-slate-50 p-6 sm:min-h-[500px] sm:p-10">

            <button
              type="button"
              onClick={handleWishlist}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-white text-2xl shadow-sm"
            >
              {liked ? "♥" : "♡"}
            </button>

            <img
              src={product.image}
              alt={product.name}
              className="max-h-[500px] w-full object-contain"
            />

          </div>

          <div className="p-6 sm:p-10">

            {product.badge && (
              <span className="inline-block rounded bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                {product.badge}
              </span>
            )}

            <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
              {product.name}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Brand:{" "}
              <span className="font-semibold text-gray-800">
                {product.brand}
              </span>
            </p>

            <div className="mt-4">
              <Rating
                rating={product.rating}
                reviews={product.reviews}
              />
            </div>

            <div className="my-6 border-y py-6">

              <div className="flex flex-wrap items-center gap-3">

                <span className="text-3xl font-bold text-gray-900">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </span>

                <span className="text-gray-400 line-through">
                  ₹
                  {Number(product.originalPrice).toLocaleString(
                    "en-IN"
                  )}
                </span>

                <span className="font-semibold text-green-600">
                  {product.discount}% off
                </span>

              </div>

              {product.stock > 0 ? (
                <p className="mt-3 font-semibold text-green-600">
                  ✓ In Stock
                </p>
              ) : (
                <p className="mt-3 font-semibold text-red-600">
                  Out of Stock
                </p>
              )}

            </div>

            <h2 className="text-lg font-bold text-gray-900">
              Product Description
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              {product.description ||
                "No description available."}
            </p>

            <div className="mt-6 rounded-lg bg-gray-50 p-4 text-sm text-gray-700">

              <p>🚚 Free delivery available</p>

              <p className="mt-2">
                🔄 7-day replacement available
              </p>

              <p className="mt-2">
                🛡️ Secure payment
              </p>

            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="rounded-lg bg-[#ffd43b] px-6 py-3.5 font-bold text-slate-950 shadow-sm transition hover:bg-[#ffca1a] disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                🛒 Add to Cart
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="rounded-lg bg-[#ff9f1c] px-6 py-3.5 font-bold text-slate-950 shadow-sm transition hover:bg-[#f58f08] disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Buy Now
              </button>

            </div>

            <button
              type="button"
              onClick={handleWishlist}
              className="mt-3 w-full rounded-lg border border-slate-300 px-6 py-3 font-semibold text-gray-800 transition hover:bg-slate-50"
            >
              {liked
                ? "♥ Remove from Wishlist"
                : "♡ Add to Wishlist"}
            </button>

          </div>

        </div>
      </div>
    </main>
  );
}

export default ProductDetails;