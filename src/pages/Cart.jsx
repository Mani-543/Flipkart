import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    cartCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const deliveryCharge = cartTotal >= 500 ? 0 : 40;
  const finalTotal = cartTotal + deliveryCharge;

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#f4f6f9] px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200/80 bg-white px-6 py-14 text-center shadow-sm sm:px-10">
          <div className="text-7xl">🛒</div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Your cart is empty
          </h1>

          <p className="mt-2 text-gray-500">
            Add products to your cart and they will appear here.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-flex rounded-lg bg-[#0755b8] px-8 py-3 font-bold text-white shadow-lg shadow-blue-900/10 transition hover:bg-[#06499f]"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f6f9] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-[1440px]">

        {/* Header */}
        <div className="mb-7 border-b border-slate-200 pb-5">
          <h1 className="text-2xl font-bold text-gray-900">
            My Cart
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">

          {/* Cart Items */}
          <section className="space-y-4 lg:col-span-2">

            {cart.map((item) => {
              const productId = item._id || item.id;

              return (
                <div
                  key={productId}
                  className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
                >
                  <div className="flex gap-4">

                    {/* Image */}
                    <Link
                      to={`/products/${productId}`}
                      className="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-slate-50 sm:h-36 sm:w-36"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain p-2"
                      />
                    </Link>

                    {/* Product information */}
                    <div className="min-w-0 flex-1">

                      <Link
                        to={`/products/${productId}`}
                        className="font-semibold text-gray-900 hover:text-blue-600"
                      >
                        {item.name}
                      </Link>

                      <p className="mt-1 text-sm text-gray-500">
                        {item.brand}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-2">

                        <span className="text-lg font-bold text-gray-900">
                          ₹
                          {Number(item.price).toLocaleString(
                            "en-IN"
                          )}
                        </span>

                        {item.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ₹
                            {Number(
                              item.originalPrice
                            ).toLocaleString("en-IN")}
                          </span>
                        )}

                      </div>

                      {item.stock !== undefined &&
                        item.stock > 0 && (
                          <p className="mt-1 text-xs font-semibold text-green-600">
                            In Stock
                          </p>
                        )}

                      {/* Quantity */}
                      <div className="mt-4 flex flex-wrap items-center gap-3">

                        <div className="flex items-center rounded border border-gray-300">

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                productId,
                                Math.max(
                                  1,
                                  item.quantity - 1
                                )
                              )
                            }
                            className="h-9 w-9 text-lg hover:bg-gray-100"
                          >
                            −
                          </button>

                          <span className="flex h-9 w-10 items-center justify-center border-x border-gray-300 text-sm font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                productId,
                                item.quantity + 1
                              )
                            }
                            className="h-9 w-9 text-lg hover:bg-gray-100"
                          >
                            +
                          </button>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(productId)
                          }
                          className="text-sm font-semibold text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                    {/* Item total */}
                    <div className="hidden text-right sm:block">

                      <p className="text-sm text-gray-500">
                        Item Total
                      </p>

                      <p className="mt-1 text-lg font-bold text-gray-900">
                        ₹
                        {(
                          Number(item.price) *
                          item.quantity
                        ).toLocaleString("en-IN")}
                      </p>

                    </div>

                  </div>

                  {/* Mobile item total */}
                  <div className="mt-4 border-t pt-3 sm:hidden">

                    <div className="flex items-center justify-between">

                      <span className="text-sm text-gray-500">
                        Item Total
                      </span>

                      <span className="font-bold">
                        ₹
                        {(
                          Number(item.price) *
                          item.quantity
                        ).toLocaleString("en-IN")}
                      </span>

                    </div>

                  </div>

                </div>
              );
            })}

          </section>

          {/* Price Details */}
          <aside className="h-fit rounded-2xl border border-slate-200/80 bg-white shadow-sm lg:sticky lg:top-28">

            <div className="border-b p-5">

              <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">
                Price Details
              </h2>

            </div>

            <div className="space-y-4 p-5">

              <div className="flex justify-between text-sm">
                <span>
                  Price ({cartCount} items)
                </span>

                <span>
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Delivery Charges</span>

                {deliveryCharge === 0 ? (
                  <span className="font-semibold text-green-600">
                    FREE
                  </span>
                ) : (
                  <span>
                    ₹{deliveryCharge}
                  </span>
                )}
              </div>

              <div className="border-t pt-4">

                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>

                  <span>
                    ₹{finalTotal.toLocaleString("en-IN")}
                  </span>
                </div>

              </div>

              <p className="rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
                You will save on delivery for orders above ₹500
              </p>

              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="w-full rounded-lg bg-[#ff9f1c] py-3.5 font-bold text-slate-950 shadow-md shadow-orange-900/10 transition hover:bg-[#f58f08]"
              >
                Place Order
              </button>

              <Link
                to="/products"
                className="block text-center text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Continue Shopping
              </Link>

            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}

export default Cart;