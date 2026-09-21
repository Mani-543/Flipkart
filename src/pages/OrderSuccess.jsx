import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();

  const order = location.state?.order;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f6f9] px-4 py-12 sm:py-16">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200/80 bg-white p-7 text-center shadow-xl shadow-slate-900/5 sm:p-12">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-100 text-4xl text-emerald-700">
          ✓
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Order Placed Successfully!
        </h1>

        <p className="mt-3 text-gray-500">
          Thank you for shopping with Flip Pro.
        </p>

        {order && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left">

            <div className="flex justify-between gap-4 border-b pb-4">
              <span className="text-sm text-gray-500">
                Order ID
              </span>

              <span className="max-w-[60%] break-all text-right text-sm font-semibold">
                {order._id}
              </span>
            </div>

            <div className="mt-4 flex justify-between">
              <span className="text-sm text-gray-500">
                Payment
              </span>

              <span className="text-sm font-semibold">
                {order.paymentMethod}
              </span>
            </div>

            <div className="mt-4 flex justify-between">
              <span className="text-sm text-gray-500">
                Status
              </span>

              <span className="font-semibold text-green-600">
                {order.status}
              </span>
            </div>

            <div className="mt-4 flex justify-between border-t pt-4">
              <span className="font-semibold">
                Total Amount
              </span>

              <span className="text-lg font-bold">
                ₹
                {Number(order.totalAmount).toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>
          </div>
        )}

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            to="/orders"
            className="rounded-lg bg-[#0755b8] px-6 py-3 font-bold text-white transition hover:bg-[#06499f]"
          >
            View My Orders
          </Link>

          <Link
            to="/products"
            className="rounded-lg border border-slate-300 px-6 py-3 font-bold text-gray-800 transition hover:bg-slate-50"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

export default OrderSuccess;