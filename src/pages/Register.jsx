
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await register(name, email, password);

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error("Registration error:", error);

      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eef3f9] px-4 py-8 sm:px-6">

      {/* MAIN CARD */}
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 md:grid-cols-2">

        {/* ================= LEFT SECTION ================= */}
        <section className="relative hidden min-h-[680px] overflow-hidden bg-[#0755b8] p-10 text-white md:flex md:flex-col md:justify-between lg:p-12">

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[40px] border-white/10" />

          <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full border-[45px] border-[#ffd43b]/20" />

          <div className="relative z-10">
            <Link
              to="/"
              className="text-3xl font-extrabold tracking-[-0.05em]"
            >
              Flip Pro
            </Link>

            <p className="mt-16 max-w-md text-4xl font-bold leading-tight">
              Make room for things you will love.
            </p>

            <p className="mt-5 max-w-md text-sm leading-7 text-blue-100">
              Create your account and discover thoughtful deals across
              technology, fashion, electronics, and more.
            </p>
          </div>

          <div className="relative z-10 mx-auto flex h-40 w-48 items-center justify-center rounded-[2rem] border border-white/20 bg-white/10 text-7xl backdrop-blur-sm">
            <span aria-hidden="true">🛍️</span>
          </div>

          <p className="relative z-10 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
            Explore · Shop · Save
          </p>
        </section>

        {/* ================= RIGHT REGISTER SECTION ================= */}
        <section className="flex min-h-[680px] items-center justify-center p-6 sm:p-10 lg:p-12">

          {/* CENTERED FORM CONTENT */}
          <div className="w-full max-w-md">

            {/* LOGO */}
            <div className="mb-7 text-center">
              <Link
                to="/"
                className="text-2xl font-extrabold tracking-[-0.05em] text-[#0755b8]"
              >
                Flip Pro
              </Link>
            </div>

            {/* HEADING */}
            <div className="text-center">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0755b8] sm:text-sm">
                Get started
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                Create your account
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Join Flip Pro and make every shopping trip count.
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {error}
              </div>
            )}

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-4"
            >

              {/* NAME */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  placeholder="Enter your full name"
                  style={{
                    paddingLeft: "24px",
                    paddingRight: "24px",
                  }}
                  className="block h-12 w-full rounded-xl border border-slate-300 bg-white text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-400 focus:border-[#0755b8] focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  placeholder="Enter your email"
                  style={{
                    paddingLeft: "24px",
                    paddingRight: "24px",
                  }}
                  className="block h-12 w-full rounded-xl border border-slate-300 bg-white text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-400 focus:border-[#0755b8] focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  placeholder="Enter your password"
                  style={{
                    paddingLeft: "24px",
                    paddingRight: "24px",
                  }}
                  className="block h-12 w-full rounded-xl border border-slate-300 bg-white text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-400 focus:border-[#0755b8] focus:ring-4 focus:ring-blue-100"
                />

                <p className="mt-1.5 text-xs text-slate-500">
                  Use at least 6 characters.
                </p>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Confirm password
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  style={{
                    paddingLeft: "24px",
                    paddingRight: "24px",
                  }}
                  className="block h-12 w-full rounded-xl border border-slate-300 bg-white text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-400 focus:border-[#0755b8] focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-[#0755b8] px-8 text-sm font-extrabold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-[#06499f] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            {/* LOGIN */}
            <div className="mt-7 border-t border-slate-200 pt-5 text-center">
              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-[#0755b8] hover:text-[#06499f]"
                >
                  Sign in
                </Link>
              </p>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}

export default Register;
