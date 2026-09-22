import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function Navbar() {
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);


const handleSearch = (event) => {
  event.preventDefault();

  const value = search.trim();

  if (!value) {
    navigate("/products");
    setSearch("");
    return;
  }

  navigate(`/products?search=${encodeURIComponent(value)}`);

  // Automatically clear the search box
  setSearch("");

  // Close mobile menu
  setMenuOpen(false);
};


  const handleLogout = async () => {
    await logout();

    setProfileOpen(false);
    setMenuOpen(false);

    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 my-3 min-h-[82px] w-full max-w-[1510px] rounded-2xl border border-blue-700/40 bg-[#0755b8] text-white ">

      {/* NAVBAR INNER */}
      <div
        className="mx-auto flex min-h-[72px] w-full max-w-[1480px] items-center gap-3 px-4 sm:min-h-[78px] sm:px-6 lg:gap-6 lg:px-8 xl:px-10"
      >

        {/* LOGO */}
        <Link
          to="/"
          className="
            flex
            shrink-0
            flex-col
            leading-none
          "
        >
          <span
            className="
              text-[1.35rem]
              font-extrabold
              tracking-[-0.04em]
              sm:text-2xl
              lg:text-[1.75rem]
            "
          >
            Flip Pro
          </span>

          <span
            className="
              mt-1.5
              hidden
              text-[10px]
              font-semibold
              text-blue-100/80

              sm:block
              sm:text-xs
            "
          >
            Explore • Shop • Save
          </span>
        </Link>

  
{/* SEARCH */}
<form
  onSubmit={handleSearch}
  className="
    flex
    h-10
    min-w-0
    flex-1
    sm:h-11
    lg:h-12
    lg:max-w-[650px]
    xl:max-w-[720px]
  "
>
  <div
    className="
      search-box-animation
      flex
      w-full
      overflow-hidden
      rounded-xl
      bg-white
      shadow-md
      shadow-blue-950/10
    "
  >
    <input
      type="text"
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      placeholder="Search for products, brands and more"
      className="
        min-w-0
        flex-1
        bg-transparent
        px-3
        text-xs
        text-gray-800
        outline-none

        sm:px-4
        sm:text-sm

        lg:px-5
        lg:text-base
      "
    />

    <button
      type="submit"
      aria-label="Search"
      className="
        search-button-animation
        flex
        w-10
        shrink-0
        items-center
        justify-center
        bg-[#ffd43b]
        font-bold
        text-base
        text-gray-900
        transition-all
        duration-200
        hover:bg-[#ffca1a]
        hover:scale-105
        active:scale-95

        sm:w-12
        sm:text-lg

        lg:w-14
        lg:text-xl
      "
    >
      🔍
    </button>
  </div>
</form>
 
        {/* FLEXIBLE SPACE */}
        <div className="hidden min-w-4 flex-1 lg:block" />

        {/* DESKTOP ACTIONS */}
        <div
          className="
            hidden
            shrink-0
            items-center
            gap-1

            lg:flex
            xl:gap-2
          "
        >

          {/* PROFILE */}
          {isAuthenticated ? (
            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setProfileOpen((previous) => !previous)
                }
                className="
                  flex
                  h-10
                  items-center
                  gap-2
                  rounded-xl
                  px-2
                  font-semibold
                  transition
                  hover:bg-blue-700/80

                  xl:h-11
                  xl:px-3
                "
              >
                <span
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/95
                    text-sm
                    font-bold
                    text-[#0755b8]
                  "
                >
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>

                <span className="hidden max-w-[90px] truncate xl:block">
                  {user?.name || "Account"}
                </span>

                <span className="text-xs">
                  ▾
                </span>
              </button>

              {profileOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-full
                    mt-2
                    w-56
                    overflow-hidden
                    rounded-xl
                    bg-white
                    py-2
                    text-gray-800
                    shadow-2xl shadow-blue-950/20
                  "
                >
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-5 py-3 text-sm transition hover:bg-blue-50"
                  >
                    👤 My Profile
                  </Link>

                  <Link
                    to="/orders"
                    onClick={() => setProfileOpen(false)}
                    className="block px-5 py-3 text-sm transition hover:bg-blue-50"
                  >
                    📦 My Orders
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 flex w-full items-center gap-3 border-t border-slate-100 px-5 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 text-xs font-bold text-red-600">
                      ↪
                    </span>
                    <span>Sign out</span>
                  </button>
                </div>
              )}

            </div>
          ) : (
            <Link
              to="/login"
              className="
                flex
                h-10
                min-w-[90px]
                items-center
                justify-center
                rounded-xl
                bg-white
                px-4
                text-sm
                font-bold
                text-blue-600
                transition
                shadow-sm transition hover:bg-blue-50

                xl:h-11
                xl:min-w-[100px]
              "
            >
              Login
            </Link>
          )}

          {/* WISHLIST */}
          <Link
            to="/wishlist"
            className="
              relative
              flex
              h-10
              items-center
              gap-1
              rounded-md
              px-2
              text-sm
              font-semibold
              transition
              hover:bg-blue-700/80

              xl:h-11
              xl:gap-2
              xl:px-3
            "
          >
            <span className="text-lg xl:text-xl">
              ♡
            </span>

            <span className="hidden xl:block">
              Wishlist
            </span>

            {wishlistCount > 0 && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  px-1
                  text-[10px]
                  font-bold
                "
              >
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* CART */}
          <Link
            to="/cart"
            className="
              relative
              flex
              h-10
              items-center
              gap-1
              rounded-md
              px-2
              text-sm
              font-semibold
              transition
              hover:bg-blue-700/80

              xl:h-11
              xl:gap-2
              xl:px-3
            "
          >
            <span className="text-lg xl:text-xl">
              🛒
            </span>

            <span className="hidden xl:block">
              Cart
            </span>

            {cartCount > 0 && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  px-1
                  text-[10px]
                  font-bold
                "
              >
                {cartCount}
              </span>
            )}
          </Link>

        </div>

        {/* MOBILE MENU */}
        <button
          type="button"
          onClick={() =>
            setMenuOpen((previous) => !previous)
          }
          aria-label="Toggle menu"
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            text-xl
            transition
            hover:bg-blue-700/80

            sm:h-11
            sm:w-11

            lg:hidden
          "
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className="
            border-t
            border-blue-400/40
            bg-[#06499f]
            px-3
            py-3

            sm:px-5
            sm:py-4

            lg:hidden
          "
        >
          <div className="mx-auto max-w-2xl space-y-1">

            {!isAuthenticated ? (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="
                  block
                  rounded-md
                  bg-white
                  px-4
                  py-3
                  text-center
                  font-bold
                  text-blue-600
                "
              >
                Login
              </Link>
            ) : (
              <>
                <div className="rounded-md bg-blue-800 px-4 py-3">
                  <p className="text-xs text-blue-200">
                    Welcome
                  </p>

                  <p className="font-bold">
                    {user?.name}
                  </p>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-4 py-3 hover:bg-blue-800"
                >
                  👤 My Profile
                </Link>

                <Link
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-4 py-3 hover:bg-blue-800"
                >
                  📦 My Orders
                </Link>
              </>
            )}

            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="
                flex
                items-center
                justify-between
                rounded-md
                px-4
                py-3
                hover:bg-blue-800
              "
            >
              <span>♡ Wishlist</span>

              {wishlistCount > 0 && (
                <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="
                flex
                items-center
                justify-between
                rounded-md
                px-4
                py-3
                hover:bg-blue-800
              "
            >
              <span>🛒 Cart</span>

              {cartCount > 0 && (
                <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-red-300/20
                  px-4
                  py-3
                  text-left
                  font-semibold
                  text-red-100
                  transition
                  hover:border-red-300/40
                  hover:bg-red-500/15
                "
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-400/15 text-sm text-red-200">
                  ↪
                </span>
                <span>Sign out</span>
              </button>
            )}

          </div>
        </div>
      )}

    </header>
  );
}

export default Navbar;