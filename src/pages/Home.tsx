import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setCurrentPage } from "../features/productSlice";
import { addToCart } from "../features/cartSlice";
import type { AppDispatch, RootState } from "../app/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error, currentPage, total, limit } = useSelector(
    (state: RootState) => state.products
  );

  const totalPages = Math.ceil(total / limit);
  const visiblePages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [currentPage, dispatch]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      dispatch(setCurrentPage(page));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Products</h1>
          <p className="mt-1 text-slate-600">
            Browse products page by page and add them to your cart.
          </p>
        </div>
        <p className="text-sm font-medium text-slate-500">
          Page {currentPage} of {totalPages || 1}
        </p>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-40 w-full rounded-xl object-cover"
            />
            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              {product.title}
            </h2>
            <p className="mt-2 text-base font-medium text-slate-600">
              ${product.price}
            </p>
            <button
              className="mt-4 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {loading ? (
        <p className="mt-6 text-sm font-medium text-slate-500">
          Loading products...
        </p>
      ) : null}

      {totalPages > 1 ? (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          {visiblePages.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => handlePageChange(page)}
              disabled={loading}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                page === currentPage
                  ? "bg-indigo-600 text-white"
                  : "border border-slate-300 text-slate-700 hover:border-indigo-500 hover:text-indigo-600"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
