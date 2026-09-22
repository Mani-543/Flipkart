import { Link } from "react-router-dom";

const categories = [
  {
    name: "Grocery",
    icon: "🛒",
    value: "grocery",
  },
  {
    name: "Mobiles",
    icon: "📱",
    value: "mobiles",
  },
  {
    name: "Fashion",
    icon: "👕",
    value: "fashion",
  },
  {
    name: "Electronics",
    icon: "💻",
    value: "electronics",
  },
  {
    name: "Home",
    icon: "🏠",
    value: "home",
  },
  {
    name: "Appliances",
    icon: "📺",
    value: "appliances",
  },
  {
    name: "Travel",
    icon: "✈️",
    value: "travel",
  },
  {
    name: "Beauty",
    icon: "💄",
    value: "beauty",
  },
  {
    name: "Toys",
    icon: "🧸",
    value: "toys",
  },
];

function CategoryNav() {
  return (

    <div className=" mb-3 mx-auto min-h-[72px] w-full max-w-[1500px] rounded-2xl  bg-[#fff9c9] px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3">
      <nav className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-100 shadow-sm">
        <div className="flex min-h-[78px] w-full items-center justify-between gap-2 overflow-x-auto px-3 py-2 scrollbar-hide sm:px-5 lg:px-8">
          {categories.map((category, index) => (
            <Link
              key={category.value}
              to={`/products?category=${category.value}`}
              className="category-item group flex min-w-[82px] shrink-0 flex-col items-center justify-center rounded-xl px-3 py-2 transition-all duration-200 hover:bg-white hover:shadow-sm sm:min-w-[95px]"
            >
              <span
                className="category-blink text-2xl sm:text-[27px]"
                style={{
                  animationDelay: `${index * 0.25}s`,
                }}
              >
                {category.icon}
              </span>

              <span className="mt-1 text-[11px] font-bold text-slate-800 transition group-hover:text-blue-600 sm:text-xs">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default CategoryNav;