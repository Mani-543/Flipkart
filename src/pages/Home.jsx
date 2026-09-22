import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import Loader from "../components/common/Loader";
import ProductCard from "../components/product/ProductCard";

const categories = [
  { name: "Mobiles", icon: "📱", value: "mobiles" },
  { name: "Laptops", icon: "💻", value: "laptops" },
  { name: "Fashion", icon: "👕", value: "fashion" },
  { name: "Electronics", icon: "🎧", value: "electronics" },
  { name: "Shoes", icon: "👟", value: "shoes" },
  { name: "Watches", icon: "⌚", value: "watches" },
  { name: "Home", icon: "🏠", value: "home" },
];

const banners = [
  {
    title: "Smartphones for Every Budget",
    subtitle: "Discover powerful phones at great prices.",
    button: "  Shop Mobiles  ",
    link: "/products?category=mobiles",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1600",
  },
  {
    title: "Upgrade Your Tech",
    subtitle: "Laptops and electronics for work and entertainment.",
    button: "  Explore Electronics  ",
    link: "/products?category=electronics",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1600",
  },
  {
    title: "New Looks. Better Prices.",
    subtitle: "Refresh your wardrobe with trending styles.",
    button: "  Shop Fashion  ",
    link: "/products?category=fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600",
  },
];

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((current) =>
        current === banners.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const deals = products
    .filter((product) => Number(product.discount) >= 20)
    .slice(0, 5);

  const topRated = products
    .slice()
    .sort(
      (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
    )
    .slice(0, 5);

  return (
    <main className="w-full overflow-x-hidden bg-[#f4f6f9] pb-8">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="mx-auto w-full max-w-[1505px] px-3 pt-2 sm:px-3 lg:px-4">
        <div className="relative h-[245px] w-full overflow-hidden rounded-2xl sm:h-[320px] lg:h-[365px]">

          {banners.map((banner, index) => (
            <div
              key={banner.title}
              className={`absolute inset-0 transition-opacity duration-700 ${index === bannerIndex
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
                }`}
            >
              {/* HERO IMAGE */}
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#031b3d]/90 via-[#062c5e]/55 to-transparent" />

              {/* HERO CONTENT - CENTERED */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex w-full flex-col items-center px-4 text-center sm:px-10 lg:px-14 xl:px-20">

                  {/* Flip Pro */}
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.45em] text-blue-200 sm:text-xs">
                    Flip Pro
                  </p>

                  {/* Hero Title */}
                  <h1 className="mt-2 max-w-[700px] text-center text-3xl font-black leading-[1.08] text-white sm:text-4xl md:text-5xl lg:text-6xl">
                    {banner.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="mt-2 max-w-[700px] text-center text-xs font-medium text-blue-50 sm:text-sm lg:text-base">
                    {banner.subtitle}
                  </p>

                  {/* CTA BUTTON - CENTER */}
                  <Link
                    to={banner.link}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#ffd43b] px-6 py-3 text-sm font-extrabold text-slate-950 shadow-md transition hover:bg-[#ffca1a]"
                  >
                    <span>{banner.button}</span>
                    <span className="text-base leading-none">→</span>
                  </Link>

                </div>
              </div>
            </div>
          ))}

          {/* =================================================
              HERO NAVIGATION ARROWS
              BOTTOM RIGHT
          ================================================= */}
          <div className="absolute bottom-5 right-5 flex items-center gap-2 sm:bottom-6 sm:right-8">

            {/* PREVIOUS */}
            <button
              type="button"
              onClick={() =>
                setBannerIndex(
                  bannerIndex === 0
                    ? banners.length - 1
                    : bannerIndex - 1
                )
              }
              aria-label="Previous banner"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl font-bold text-slate-800 shadow-lg transition hover:bg-slate-100 sm:h-11 sm:w-11"
            >
              ‹
            </button>

            {/* NEXT */}
            <button
              type="button"
              onClick={() =>
                setBannerIndex(
                  bannerIndex === banners.length - 1
                    ? 0
                    : bannerIndex + 1
                )
              }
              aria-label="Next banner"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl font-bold text-slate-800 shadow-lg transition hover:bg-slate-100 sm:h-11 sm:w-11"
            >
              ›
            </button>

          </div>

          {/* =================================================
              BANNER INDICATORS
              BOTTOM CENTER
          ================================================= */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
            {banners.map((banner, index) => (
              <button
                key={banner.title}
                type="button"
                onClick={() => setBannerIndex(index)}
                aria-label={`Go to banner ${index + 1}`}
                className={`h-1.5 rounded-full transition-all ${index === bannerIndex
                    ? "w-7 bg-white"
                    : "w-1.5 bg-white/60"
                  }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================
          SHOP BY CATEGORY
      ========================================================= */}
      <section className="mx-auto mt-4 w-full max-w-[1505px] px-3 sm:px-3 lg:px-4">

        <div className="mb-3 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
              Shop by Category
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Explore products from every category
            </p>
          </div>

          <Link
            to="/products"
            className="text-xs font-bold text-blue-600 sm:text-sm"
          >
            View All →
          </Link>
        </div>

        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
          {categories.map((category, index) => (
            <Link
              key={category.value}
              to={`/products?category=${category.value}`}
              className="group flex min-h-[112px] w-full flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-4 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              <span
                className="category-blink text-3xl"
                style={{
                  animationDelay: `${index * 0.35}s`,
                }}
              >
                {category.icon}
              </span>

              <span className="mt-2.5 text-xs font-bold text-slate-700 group-hover:text-blue-600 sm:text-sm">
                {category.name}
              </span>
            </Link>
          ))}
        </div>

      </section>

      {/* =========================================================
          DEALS OF THE DAY
      ========================================================= */}
      <section className="mx-auto mt-8 w-full max-w-[1520px] px-3 sm:px-3 lg:px-4">

        <div className="w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5 lg:p-6">

          <div className="mb-4 flex items-end justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 sm:text-2xl">
                🔥 Deals of the Day
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Great products. Better prices.
              </p>
            </div>

            <Link
              to="/products"
              className="text-xs font-bold text-blue-600 sm:text-sm"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <Loader />
          ) : deals.length > 0 ? (
            <div className="grid w-full grid-cols-1 justify-items-center gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
              {deals.map((product) => (
                <div
                  key={product._id}
                  className="w-[82%] sm:w-full"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-slate-500">
              No deals available.
            </p>
          )}

        </div>
      </section>

      {/* =========================================================
          FLIP PRO EXCLUSIVE
      ========================================================= */}
      <section className="mx-auto mt-5 w-full max-w-[1505px] px-2 sm:px-3 lg:px-4">

        <div className="relative h-[190px] w-full overflow-hidden rounded-2xl sm:h-[230px] lg:h-[270px]">

          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600"
            alt="Flip Pro shopping"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />

          <div className="absolute inset-0 flex items-center px-6 sm:px-10 lg:px-14">
            <div className="text-white">

              <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-yellow-300 sm:text-xs">
                Flip Pro Exclusive
              </p>

              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                Shop More. Save More.
              </h2>

              <p className="mt-2 text-xs text-gray-200 sm:text-sm">
                Find products you'll love at prices you'll love.
              </p>

              <Link
                to="/products"
                className="mt-4 inline-flex items-center rounded-lg bg-[#ffd43b] px-6 py-2.5 text-xs font-extrabold text-slate-950 sm:px-8 sm:py-3 sm:text-sm"
              >
                Start Shopping →
              </Link>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          TOP RATED PRODUCTS
      ========================================================= */}
      <section className="mx-auto mt-8 w-full max-w-[1505px] px-3 sm:px-3 lg:px-4">

        <div className="w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5 lg:p-6">

          <div className="mb-4 flex items-end justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 sm:text-2xl">
                ⭐ Top Rated Products
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Popular picks from our store
              </p>
            </div>

            <Link
              to="/products"
              className="text-xs font-bold text-blue-600 sm:text-sm"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <Loader />
          ) : topRated.length > 0 ? (
            <div className="grid w-full grid-cols-1 justify-items-center gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">

              {topRated.map((product) => (
                <div
                  key={product._id}
                  className="w-[82%] sm:w-full"
                >
                  <ProductCard product={product} />
                </div>
              ))}

            </div>
          ) : (
            <p className="py-8 text-center text-sm text-slate-500">
              No products available.
            </p>
          )}

        </div>
      </section>

    </main>
  );
}

export default Home;