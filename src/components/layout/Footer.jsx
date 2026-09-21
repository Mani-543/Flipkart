import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mx-auto mt-14 min-h-[72px] w-full max-w-[1500px] rounded-2xl border border-slate-800 bg-[#0b1424] text-slate-300">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.35fr_1fr_1fr_1.15fr] lg:gap-14 lg:px-10 lg:py-14">
        {/* ABOUT */}
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-white">
            Flip Pro
          </h2>

          <p className="mt-4 max-w-xs text-sm leading-7 text-slate-400">
            A modern e-commerce project built with
            React, Tailwind CSS, Node.js, Express and
            MongoDB.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
            Quick Links
          </h3>

          <div className="mt-5 space-y-3 text-sm">
            <Link
              to="/"
              className="block transition hover:translate-x-1 hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="block transition hover:translate-x-1 hover:text-white"
            >
              Products
            </Link>

            <Link
              to="/wishlist"
              className="block transition hover:translate-x-1 hover:text-white"
            >
              Wishlist
            </Link>

            <Link
              to="/cart"
              className="block transition hover:translate-x-1 hover:text-white"
            >
              Cart
            </Link>
          </div>
        </div>

        {/* CUSTOMER */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
            Customer
          </h3>

          <div className="mt-5 space-y-3 text-sm">
            <Link
              to="/login"
              className="block transition hover:translate-x-1 hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="block transition hover:translate-x-1 hover:text-white"
            >
              Create Account
            </Link>

            <Link
              to="/profile"
              className="block transition hover:translate-x-1 hover:text-white"
            >
              My Profile
            </Link>

            <Link
              to="/orders"
              className="block transition hover:translate-x-1 hover:text-white"
            >
              My Orders
            </Link>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
            Contact
          </h3>

          <div className="mt-5 space-y-3 text-sm text-slate-400">
            <p>support@flippro.com</p>
            <p>+91 98765 43210</p>
            <p>India</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-2 px-5 py-5 text-center text-xs text-slate-500 sm:flex-row sm:px-8 lg:px-10">
          <p>
            © {new Date().getFullYear()} Flip Pro.
            All rights reserved.
          </p>

          <p>
            Built with React + Tailwind CSS + MERN
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;