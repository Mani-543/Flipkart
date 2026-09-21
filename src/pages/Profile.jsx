import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Profile() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <main className="min-h-screen bg-[#f4f6f9] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-4xl">

        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          My Profile
        </h1>

        {/* User Card */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-center gap-5 sm:flex-row">

            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-[#0755b8] text-4xl font-bold text-white shadow-lg shadow-blue-900/10">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900">
                {user?.name}
              </h2>

              <p className="mt-1 text-gray-500">
                {user?.email}
              </p>

              <span className="mt-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase text-blue-600">
                {user?.role || "user"}
              </span>
            </div>
          </div>
        </section>

        {/* Account Options */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">

          <Link
            to="/orders"
            className="flex items-center justify-between border-b p-5 transition hover:bg-blue-50/50 sm:p-6"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">📦</span>

              <div>
                <p className="font-bold text-gray-900">
                  My Orders
                </p>

                <p className="text-sm text-gray-500">
                  View and track your orders
                </p>
              </div>
            </div>

            <span className="text-xl text-gray-400">
              →
            </span>
          </Link>

          <Link
            to="/wishlist"
            className="flex items-center justify-between border-b p-5 transition hover:bg-blue-50/50 sm:p-6"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">♡</span>

              <div>
                <p className="font-bold text-gray-900">
                  Wishlist
                </p>

                <p className="text-sm text-gray-500">
                  View your saved products
                </p>
              </div>
            </div>

            <span className="text-xl text-gray-400">
              →
            </span>
          </Link>

          <Link
            to="/cart"
            className="flex items-center justify-between border-b p-5 transition hover:bg-blue-50/50 sm:p-6"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">🛒</span>

              <div>
                <p className="font-bold text-gray-900">
                  My Cart
                </p>

                <p className="text-sm text-gray-500">
                  View products in your cart
                </p>
              </div>
            </div>

            <span className="text-xl text-gray-400">
              →
            </span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-4 border-t border-red-100 bg-red-50/30 p-5 text-left transition hover:bg-red-50 sm:p-6"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-lg font-bold text-red-600">
              ↪
            </span>

            <div>
              <p className="font-bold text-red-700">
                Sign out
              </p>

              <p className="text-sm text-gray-500">
                Sign out of your account
              </p>
            </div>
          </button>

        </section>
      </div>
    </main>
  );
}

export default Profile;