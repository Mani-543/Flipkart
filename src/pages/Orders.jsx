import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import Loader from "../components/common/Loader";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/orders");

        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Orders error:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load your orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4f6f9] px-4 py-12">
        <Loader />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 px-4 py-10">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-sm">
          <div className="text-5xl">⚠️</div>

          <h1 className="mt-4 text-xl font-bold">
            Unable to load orders
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg bg-[#0755b8] px-6 py-3 font-bold text-white transition hover:bg-[#06499f]"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  if (orders.length === 0) {
    return (
      <main className="min-h-screen bg-[#f4f6f9] px-4 py-12">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200/80 bg-white p-10 text-center shadow-sm">
          <div className="text-7xl">📦</div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            No orders yet
          </h1>

          <p className="mt-2 text-gray-500">
            Your completed orders will appear here.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex rounded-lg bg-[#0755b8] px-8 py-3 font-bold text-white transition hover:bg-[#06499f]"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f6f9] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            My Orders
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {orders.length}{" "}
            {orders.length === 1 ? "order" : "orders"} found
          </p>
        </div>

        <div className="space-y-5">
          {orders.map((order) => (
            <article
              key={order._id}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6"
            >
              {/* Order Header */}
              <div className="flex flex-col justify-between gap-3 border-b pb-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs text-gray-500">
                    ORDER ID
                  </p>

                  <p className="mt-1 break-all text-sm font-semibold text-gray-800">
                    {order._id}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xs text-gray-500">
                    ORDER DATE
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>

                <span className="text-lg font-bold text-gray-900">
                  ₹
                  {Number(order.totalAmount).toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              {/* Products */}
              <div className="mt-5 divide-y">
                {order.items.map((item, index) => (
                  <div
                    key={`${order._id}-${index}`}
                    className="flex gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-slate-50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain p-2"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900">
                        {item.name}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        ₹
                        {Number(item.price).toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery */}
              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-bold text-gray-800">
                  Delivery Address
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  {order.shippingAddress.name}
                  {" • "}
                  {order.shippingAddress.phone}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state} -{" "}
                  {order.shippingAddress.pincode}
                </p>

                <p className="mt-2 text-xs font-semibold text-gray-500">
                  Payment: {order.paymentMethod}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Orders;