import ProductCard from "./ProductCard";
import EmptyState from "../common/EmptyState";

function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        message="Try searching for another product or browse all products."
      />
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard
          key={product._id || product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductGrid;