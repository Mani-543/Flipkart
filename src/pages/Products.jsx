import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductGrid from "../components/product/ProductGrid";
import Loader from "../components/common/Loader";
import api from "../services/api";

function Products() {
  const [searchParams] = useSearchParams();

  const searchQuery = (
    searchParams.get("search") || ""
  ).toLowerCase();

  const categoryQuery = (
    searchParams.get("category") || ""
  ).toLowerCase();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/products");

        setProducts(response.data.products || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);

        setError(
          "Unable to load products. Please make sure the backend server is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !searchQuery ||
        product.name
          .toLowerCase()
          .includes(searchQuery) ||
        product.brand
          .toLowerCase()
          .includes(searchQuery) ||
        product.category
          .toLowerCase()
          .includes(searchQuery);

      const matchesCategory =
        !categoryQuery ||
        product.category.toLowerCase() === categoryQuery;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, categoryQuery]);

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
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-sm">
          <div className="text-5xl">⚠️</div>

          <h1 className="mt-4 text-xl font-bold text-gray-900">
            Something went wrong
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg bg-[#0755b8] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#06499f]"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f6f9] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-7 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
          <h1 className="text-2xl font-bold capitalize text-gray-900">
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : categoryQuery
                ? `${categoryQuery} Products`
                : "All Products"}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {filteredProducts.length} products found
          </p>
        </div>

        <ProductGrid products={filteredProducts} />
      </div>
    </main>
  );
}

export default Products;