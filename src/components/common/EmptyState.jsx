import { Link } from "react-router-dom";

function EmptyState({
  title = "Nothing here yet",
  message = "There is nothing to display right now.",
  buttonText = "Continue Shopping",
  buttonLink = "/products",
}) {
  return (
    <div className="rounded-lg bg-white px-6 py-14 text-center shadow-sm">
      <div className="text-5xl">📦</div>

      <h2 className="mt-4 text-xl font-bold text-gray-900">
        {title}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
        {message}
      </p>

      <Link
        to={buttonLink}
        className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
      >
        {buttonText}
      </Link>
    </div>
  );
}

export default EmptyState;