
import { useRef } from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Grocery", icon: "🛒" },
  { name: "Mobiles", icon: "📱" },
  { name: "Fashion", icon: "👕" },
  { name: "Electronics", icon: "💻" },
  { name: "Home", icon: "🏠" },
  { name: "Appliances", icon: "📺" },
  { name: "Travel", icon: "✈️" },
  { name: "Beauty", icon: "💄" },
  { name: "Toys", icon: "🧸" },
];

function CategoryNav() {
  const scrollRef = useRef(null);

  const scrollByAmount = (direction) => {
    const container = scrollRef.current;

    if (!container) return;

    const amount = window.innerWidth < 640 ? 150 : 220;

    container.scrollBy({
      left: direction * amount,
      behavior: "smooth",
    });
  };

  return (
    <nav className="mx-auto mt-2 min-h-[72px] w-full max-w-[1500px] rounded-2xl border border-yellow-200 bg-yellow-100 shadow-sm">
      <div className="relative mx-auto w-full sm:px-6 lg:px-8 xl:px-10">

        {/* Left Arrow */}
        <button
          type="button"
          aria-label="Scroll categories left"
          onClick={() => scrollByAmount(-1)}
          className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-lg font-bold text-gray-700 shadow-md transition hover:scale-110 hover:bg-blue-50 sm:hidden"
        >
          ‹
        </button>

        {/* Right Arrow */}
        <button
          type="button"
          aria-label="Scroll categories right"
          onClick={() => scrollByAmount(1)}
          className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-lg font-bold text-gray-700 shadow-md transition hover:scale-110 hover:bg-blue-50 sm:hidden"
        >
          ›
        </button>

        {/* Category List */}
        <div
          ref={scrollRef}
          className="flex min-h-[72px] w-full items-stretch gap-2 overflow-x-auto scroll-smooth px-2 py-2 [scrollbar-width:none] [-ms-overflow-style:none] sm:gap-3 sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={`/products?category=${category.name.toLowerCase()}`}
              className="group flex min-w-[88px] flex-1 basis-[88px] flex-col items-center justify-center rounded-xl px-2 py-3 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md sm:min-w-[110px] sm:basis-[110px]"
            >
              {/* Animated Icon */}
              <span
                className="category-blink text-2xl"
                style={{
                  animationDelay: `${index * 0.35}s`,
                }}
              >
                {category.icon}
              </span>

              {/* Name */}
              <span className="mt-1 whitespace-nowrap text-[11px] font-semibold text-gray-700 transition-colors duration-300 group-hover:text-blue-600 sm:text-xs">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default CategoryNav;

