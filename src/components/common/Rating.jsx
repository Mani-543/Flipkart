
function Rating({ rating, reviews }) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex items-center gap-1.5 rounded-md bg-green-600 px-3 py-2 text-xs font-bold text-white">
        <span>{rating}</span>
        <span className="text-sm">★</span>
      </span>

      {reviews && (
        <span className="text-xs text-gray-500">
          {reviews.toLocaleString()} ratings
        </span>
      )}
    </div>
  );
}

export default Rating;
