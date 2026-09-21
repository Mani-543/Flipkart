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
    button: "Shop Mobiles",
    link: "/products?category=mobiles",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1400",
  },
  {
    title: "Upgrade Your Tech",
    subtitle: "Laptops and electronics for work and entertainment.",
    button: "Explore Electronics",
    link: "/products?category=electronics",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1400",
  },
  {
    title: "New Looks. Better Prices.",
    subtitle: "Refresh your wardrobe with trending styles.",
    button: "Shop Fashion",
    link: "/products?category=fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400",
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
      (a, b) =>
        Number(b.rating || 0) - Number(a.rating || 0)
    )
    .slice(0, 5);

  return (
    <main className="flex min-h-screen flex-col gap-8 bg-[#f4f6f9] pb-10 sm:gap-10">

{/* HERO */}
<section className="mx-auto w-full max-w-[1480px] px-0 sm:px-3 lg:px-5">
  <div className="relative h-[240px] w-full overflow-hidden rounded-none sm:rounded-2xl sm:h-[320px] lg:h-[400px]">

    {banners.map((banner, index) => (
      <div
        key={banner.title}
        className={`absolute inset-0 transition-opacity duration-700 ${
          index === bannerIndex
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <img
          src={banner.image}
          alt={banner.title}
          className="block h-full w-full object-cover"
        />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-xl px-6 sm:px-10 lg:px-16">

            <p className="text-[10px] font-bold uppercase tracking-[0.8em] text-blue-200 sm:text-xs">
              Flip Pro
            </p>

            <h1 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-2xl lg:text-3xl xl:text-3xl">
              {banner.title}
            </h1>

            <p className="mt-3 max-w-md text-xs text-gray-200 sm:text-sm lg:text-base">
              {banner.subtitle}
            </p>

            <Link
              to={banner.link}
               className="mt-4 inline-flex rounded-lg bg-[#ffd43b] px-5 py-2 text-xs font-bold text-slate-950 transition hover:bg-[#ffca1a] sm:px-6 sm:py-3 sm:text-sm"            >
              {banner.button}
            </Link>

          </div>
        </div>
      </div>
    ))}

    {/* Previous */}
    <button
      type="button"
      onClick={() =>
        setBannerIndex(
          bannerIndex === 0
            ? banners.length - 1
            : bannerIndex - 1
        )
      }
      aria-label="Previous promotion"
      className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-2xl text-gray-800 shadow-md transition hover:scale-105 sm:left-5 sm:h-10 sm:w-10"
    >
      ‹
    </button>

    {/* Next */}
    <button
      type="button"
      onClick={() =>
        setBannerIndex(
          bannerIndex === banners.length - 1
            ? 0
            : bannerIndex + 1
        )
      }
      aria-label="Next promotion"
      className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-2xl text-gray-800 shadow-md transition hover:scale-105 sm:right-5 sm:h-10 sm:w-10"
    >
      ›
    </button>

    {/* Dots */}
    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
      {banners.map((banner, index) => (
        <button
          key={banner.title}
          type="button"
          onClick={() => setBannerIndex(index)}
          aria-label={`Go to slide ${index + 1}`}
          className={`h-1.5 rounded-full transition-all ${
            index === bannerIndex
              ? "w-6 bg-white"
              : "w-1.5 bg-white/60"
          }`}
        />
      ))}
    </div>

  </div>
</section>

      {/* CATEGORIES */}
      <section className="mx-auto w-full max-w-[1480px] px-3 pt-5 sm:px-6 lg:px-8">
    <div className="rounded-2xl border border-slate-200/80 bg-gray-400 px-4 py-6 shadow-sm sm:px-7">

          <h2 className="mb-5 text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
            Shop by Category
          </h2>

          <div className="flex gap-5 overflow-x-auto pb-1 sm:justify-between sm:gap-3">
            {categories.map((category) => (
              <Link
                key={category.value}
                to={`/products?category=${category.value}`}
                className="group flex min-w-[72px] flex-col items-center sm:min-w-[90px]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl transition group-hover:-translate-y-1 group-hover:bg-blue-50 sm:h-16 sm:w-16">
                  {category.icon}
                </div>

                <span className="mt-2 whitespace-nowrap text-xs font-semibold text-gray-700 group-hover:text-blue-600 sm:text-sm">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DEALS */}
      <section className="mx-auto w-full max-w-[1480px] px-3 pt-5 sm:px-6 lg:px-8">
<div className="w-full rounded-xl bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 lg:p-7">
          <div className="mb-5 flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                Deals of the Day
              </h2>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
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
<div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
                {deals.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-gray-500">
              No deals available.
            </p>
          )}
        </div>
      </section>

      {/* SINGLE PROMO */}
      <section className="mx-auto w-full max-w-[1480px] px-3 pt-5 sm:px-6 lg:px-8">
        <div className="relative h-[210px] overflow-hidden rounded-2xl shadow-lg shadow-slate-900/10 sm:h-[250px] lg:h-[290px]">

          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400"
            alt="Shopping"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 flex items-center px-6 sm:px-10 lg:px-14">
            <div className="text-white">

              <p className="text-2xl font-bold uppercase tracking-widest text-yellow-300 sm:text-xs">
                Flip Pro Exclusive
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
                Shop More. Save More.
              </h2>

              <p className="mt-2 text-xs text-gray-200 sm:text-sm">
                Find products you'll love at prices you'll love.
              </p>

             <Link
               to="/products"
                 className="mt-4 inline-flex rounded-lg bg-[#ffd43b] px-12 py-3 text-xs font-bold text-slate-950 shadow-lg transition hover:bg-[#ffca1a] sm:text-sm"
                >
                Start Shopping
             </Link>


            </div>
          </div>
        </div>
      </section>

      {/* TOP RATED */}
      <section className="mx-auto w-full max-w-[1480px] px-3 pt-5 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-7">

          <div className="mb-5 flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-lg p-4 font-bold text-gray-900 sm:text-xl">
                Top Rated Products
              </h2>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
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
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
              {topRated.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          )}

        </div>
      </section>

    </main>
  );
}

export default Home;