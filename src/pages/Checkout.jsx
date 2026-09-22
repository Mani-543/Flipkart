import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Checkout() {
  const navigate = useNavigate();

  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "COD",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deliveryCharge = cartTotal >= 500 ? 0 : 40;
  const totalAmount = cartTotal + deliveryCharge;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const orderData = {
        items: cart.map((item) => ({
          product: item._id || item.id,
          name: item.name,
          image: item.image,
          price: Number(item.price),
          quantity: item.quantity,
        })),

        shippingAddress: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },

        paymentMethod: formData.paymentMethod,
        totalAmount,
      };

      const response = await api.post(
        "/orders",
        orderData
      );

      if (response.data.success) {
        clearCart();

        navigate("/order-success", {
          state: {
            order: response.data.order,
          },
        });
      }
    } catch (err) {
      console.error("Order creation failed:", err);

      setError(
        err.response?.data?.message ||
          "Unable to place your order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#f4f6f9] px-4 py-12">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-sm">

          <div className="text-6xl">🛒</div>

          <h1 className="mt-4 text-2xl font-bold">
            Your cart is empty
          </h1>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="mt-6 rounded-lg bg-[#0755b8] px-6 py-3 font-bold text-white transition hover:bg-[#06499f]"
          >
            Continue Shopping
          </button>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f6f9] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

      <div className="mx-auto max-w-[1440px]">

        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 lg:grid-cols-3"
        >

          {/* Delivery Address */}

          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7 lg:col-span-2">

            <h2 className="border-b pb-4 text-lg font-bold">
              Delivery Address
            </h2>

            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            <div className="mt-5 grid gap-4 p-2 sm:grid-cols-2">

              <div>
                <label className="text-sm font-semibold">
                  Full Name
                </label>

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3.5 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">
                  Phone Number
                </label>

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3.5 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  placeholder="10 digit mobile number"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-semibold">
                  Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-3.5 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  placeholder="House number, street, area"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">
                  City
                </label>

                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3.5 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  placeholder="City"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">
                  State
                </label>

                <input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3.5 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  placeholder="State"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">
                  Pincode
                </label>

                <input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{6}"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3.5 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  placeholder="6 digit pincode"
                />
              </div>

            </div>

            {/* Payment */}

            <div className="mt-8 border-t pt-6">

              <h2 className="text-lg font-bold">
                Payment Method
              </h2>

              <div className="mt-4 space-y-3">

                <label className="flex cursor-pointer px-3 items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-blue-50/40">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={
                      formData.paymentMethod === "COD"
                    }
                    onChange={handleChange}
                  />

                  <div>
                    <p className="font-semibold">
                      Cash on Delivery
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay when your order arrives
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-blue-50/40">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    checked={
                      formData.paymentMethod === "UPI"
                    }
                    onChange={handleChange}
                  />

                  <div>
                    <p className="font-semibold">
                      UPI
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay using your UPI app
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-blue-50/40">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="CARD"
                    checked={
                      formData.paymentMethod === "CARD"
                    }
                    onChange={handleChange}
                  />

                  <div>
                    <p className="font-semibold">
                      Credit / Debit Card
                    </p>

                    <p className="text-sm text-gray-500">
                      Secure card payment
                    </p>
                  </div>
                </label>

              </div>

            </div>

          </section>

          {/* Order Summary */}

          <aside className="h-fit rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-28">

            <h2 className="border-b pb-4 text-lg font-bold uppercase text-gray-500">
              Order Summary
            </h2>

            <div className="mt-5 space-y-4">

              {cart.map((item) => (
                <div
                  key={item._id || item.id}
                  className="flex gap-3"
                >

                    <div className="h-16 w-16 shrink-0 rounded-xl bg-slate-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-semibold">
                      {item.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>

                  </div>

                  <p className="text-sm font-semibold">
                    ₹
                    {(
                      item.price * item.quantity
                    ).toLocaleString("en-IN")}
                  </p>

                </div>
              ))}

            </div>

            <div className="mt-6 space-y-3 border-t pt-5">

              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Delivery</span>

                <span className="font-semibold text-green-600">
                  {deliveryCharge === 0
                    ? "FREE"
                    : `₹${deliveryCharge}`}
                </span>
              </div>

              <div className="flex justify-between border-t pt-4 text-lg font-bold">
                <span>Total</span>

                <span>
                  ₹{totalAmount.toLocaleString("en-IN")}
                </span>
              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-lg bg-[#ff9f1c] py-3.5 font-bold text-slate-950 shadow-md shadow-orange-900/10 transition hover:bg-[#f58f08] disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </aside>

        </form>
      </div>
    </main>
  );
}

export default Checkout;