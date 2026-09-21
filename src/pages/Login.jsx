import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            setError("");

            await login(email, password);

            navigate(location.state?.from || "/", {
                replace: true,
            });
        } catch (error) {
            console.error("Login error:", error);

            setError(
                error.response?.data?.message ||
                "Invalid email or password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main
            className="
                flex
                min-h-[calc(100vh-80px)]
                w-full
                items-center
                justify-center
                bg-slate-100

                px-4
                py-8

                sm:px-6
                sm:py-10

                lg:px-8
                lg:py-12
            "
        >
            <div
                className="
                    grid
                    w-full
                    max-w-5xl
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    shadow-xl
                    shadow-slate-300/40

                    md:grid-cols-12

                    lg:rounded-3xl
                "
            >
                {/* =====================================================
                    LEFT PROMOTIONAL PANEL
                ====================================================== */}
                <section
                    className="
                        relative
                        hidden
                        overflow-hidden
                        bg-gradient-to-br
                        from-blue-600
                        via-blue-700
                        to-indigo-800
                        text-white

                        md:col-span-5
                        md:flex
                        md:flex-col
                        md:justify-between

                        p-8

                        lg:p-10

                        xl:p-12
                    "
                >
                    {/* Decorative shapes */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-20
                            -top-20
                            h-56
                            w-56
                            rounded-full
                            bg-white/10
                            blur-3xl
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -bottom-20
                            -left-20
                            h-64
                            w-64
                            rounded-full
                            bg-blue-400/20
                            blur-3xl
                        "
                    />

                    {/* Brand + Introduction */}
                    <div className="relative z-10">
                        <Link
                            to="/"
                            className="
                                inline-flex
                                items-center
                                gap-3
                                text-2xl
                                font-black
                                tracking-tight
                                transition
                                hover:opacity-90

                                lg:text-3xl
                            "
                        >
                            <span
                                className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-white/20
                                    bg-white/15
                                    text-xl
                                    shadow-sm
                                "
                            >
                                F
                            </span>

                            Flip Pro
                        </Link>

                        <div
                            className="
                                mt-10
                                space-y-4

                                lg:mt-16
                                lg:space-y-5
                            "
                        >
                            <span
                                className="
                                    inline-flex
                                    rounded-full
                                    border
                                    border-blue-300/30
                                    bg-white/10
                                    px-3
                                    py-1.5
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.15em]
                                    text-blue-100
                                "
                            >
                                Pro Shopping
                            </span>

                            <h2
                                className="
                                    max-w-sm
                                    text-3xl
                                    font-extrabold
                                    leading-[1.12]
                                    tracking-tight

                                    lg:text-4xl

                                    xl:text-[42px]
                                "
                            >
                                Shop smarter.
                                <br />
                                Find more of what you love.
                            </h2>

                            <p
                                className="
                                    max-w-sm
                                    text-sm
                                    leading-6
                                    text-blue-100/90

                                    lg:text-[15px]
                                "
                            >
                                Discover curated deals across tech,
                                fashion, and everyday essentials.
                            </p>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div
                        className="
                            relative
                            z-10
                            mt-10
                            space-y-3

                            lg:mt-12
                        "
                    >
                        <div
                            className="
                                rounded-xl
                                border
                                border-white/15
                                bg-white/10
                                p-4
                                backdrop-blur-sm
                            "
                        >
                            <p className="text-sm font-bold">
                                Express Delivery
                            </p>

                            <p className="mt-1 text-xs leading-5 text-blue-100/80">
                                Fast and reliable doorstep fulfillment
                            </p>
                        </div>

                        <div
                            className="
                                rounded-xl
                                border
                                border-white/15
                                bg-white/10
                                p-4
                                backdrop-blur-sm
                            "
                        >
                            <p className="text-sm font-bold">
                                Buyer Protection
                            </p>

                            <p className="mt-1 text-xs leading-5 text-blue-100/80">
                                Secure end-to-end checkout
                            </p>
                        </div>

                        <p
                            className="
                                border-t
                                border-white/15
                                pt-4
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.2em]
                                text-blue-200
                            "
                        >
                            Explore · Shop · Save
                        </p>
                    </div>
                </section>

                {/* =====================================================
                    LOGIN FORM
                ====================================================== */}
                <section
                    className="
                        p-6

                        sm:p-8

                        md:col-span-7
                        md:p-10

                        lg:p-12

                        xl:p-14
                    "
                >
                    {/* Mobile Brand */}
                    <div className="mb-8 md:hidden">
                        <Link
                            to="/"
                            className="
                                inline-flex
                                items-center
                                gap-2
                                text-2xl
                                font-extrabold
                                tracking-tight
                                text-blue-700
                            "
                        >
                            <span
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-blue-600
                                    text-sm
                                    font-black
                                    text-white
                                "
                            >
                                F
                            </span>

                            Flip Pro
                        </Link>
                    </div>

                    {/* Heading */}
                    <div className="max-w-xl">
                        <p
                            className="
                                text-[13px]
                                font-bold
                                uppercase
                                tracking-[0.5em]
                                text-blue-600

                                sm:text-xs
                            "
                        >
                            Welcome back
                        </p>

                        <h1
                            className="
                                mt-2
                                text-2xl
                                font-extrabold
                                leading-tight
                                tracking-tight
                                text-slate-900

                                sm:text-3xl

                                lg:text-4xl
                            "
                        >
                            Sign in to your account
                        </h1>

                        <p
                            className="
                                mt-2
                                text-sm
                                leading-6
                                text-slate-500

                                sm:text-[15px]
                            "
                        >
                            Enter your details to continue shopping.
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div
                            className="
                                mt-6
                                rounded-xl
                                border
                                border-red-200
                                bg-red-50
                                px-4
                                py-3.5
                                text-sm
                                font-medium
                                leading-5
                                text-red-700
                            "
                        >
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="
                            mt-7
                            space-y-6

                            sm:mt-8
                        ">

                        {/* EMAIL */}
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            autoComplete="email"
                            placeholder="you@example.com"
                            className="h-12 w-full rounded-xl border  border-slate-300 bg-slate-50 !px-6 text-sm
                             text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-400
                             focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />

                        {/* PASSWORD */}
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                                minLength={6}
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 !px-6 !pr-24
                                            text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400
                                            hover:border-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4
                                            focus:ring-blue-100"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword((visible) => !visible)
                                }
                                className="absolute inset-y-0 right-0 flex items-center justify-center px-5 text-xs font-bold text-blue-600 transition hover:text-blue-800"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {/* SIGN IN BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                       mt-2
                                       flex
                                       h-12
                                       w-full
                                       items-center
                                       justify-center
                                       rounded-xl
                                       bg-blue-600
                                       !px-10
                                       text-sm
                                       font-bold
                                       text-white
                                       shadow-lg
                                       shadow-blue-500/20
                                       transition-all
                                       hover:bg-blue-700
                                       hover:shadow-blue-500/30
                                       active:scale-[0.99]
                                      disabled:cursor-not-allowed
                                      disabled:opacity-60"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>

                    {/* Register */}
                    <div
                        className="
                            mt-8
                            border-t
                            border-slate-200
                            pt-6
                            text-center

                            sm:mt-10
                        "
                    >
                        <p className="text-sm text-slate-500">
                            New to Flip Pro?{" "}
                            <Link
                                to="/register"
                                className="
                                    font-bold
                                    text-blue-600
                                    transition
                                    hover:text-blue-700
                                    hover:underline
                                "
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Login;