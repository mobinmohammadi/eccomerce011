
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from "../Rating";
import { Link } from "react-router";

const ShopProducts = ({ products, styles }) => {
  return (
    <div
      className={`grid w-full gap-6 ${
        styles === "grid"
          ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
          : "grid-cols-1"
      }`}
    >
      {products.map((p) => (
        <div
          key={p._id}
          className={`group relative overflow-hidden rounded-3xl border border-slate-100 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-[0_20px_50px_rgba(16,185,129,0.12)] ${
            styles === "grid"
              ? "flex flex-col"
              : "flex items-center gap-6 p-3 sm:p-4"
          }`}
        >
          <div
            className={`relative overflow-hidden bg-[#f7f9f8] ${
              styles === "grid"
                ? "h-[210px] w-full sm:h-[260px]"
                : "h-32 w-32 shrink-0 rounded-2xl sm:h-44 sm:w-44"
            }`}
          >
            <Link
              to={`/product/details/new/${p._id}`}
              className="block h-full w-full"
            >
              <img
                src={p.images?.[0]}
                alt={p.name}
                className="h-full w-full object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </Link>

            {p.discount > 0 && (
              <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-3 py-1.5 text-[10px] font-extrabold tracking-wider text-white shadow-lg shadow-rose-500/20">
                {p.discount}% OFF
              </span>
            )}

            <div
              className={`absolute flex items-center gap-2 transition-all duration-500 ${
                styles === "grid"
                  ? "bottom-3 left-1/2 -translate-x-1/2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                  : "right-3 top-1/2 -translate-y-1/2 translate-x-12 flex-col opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              <button
                title="Wishlist"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-md transition-all duration-300 hover:scale-110 hover:bg-rose-500 hover:text-white"
              >
                <FaRegHeart size={15} />
              </button>

              <Link
                to={`/product/details/new/${p._id}`}
                title="Quick view"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-md transition-all duration-300 hover:scale-110 hover:bg-emerald-600 hover:text-white"
              >
                <FaEye size={16} />
              </Link>

              <button
                title="Add to cart"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-md transition-all duration-300 hover:scale-110 hover:bg-emerald-600 hover:text-white"
              >
                <RiShoppingCartLine size={17} />
              </button>
            </div>
          </div>

          <div
            className={`flex min-w-0 flex-1 flex-col ${
              styles === "grid" ? "gap-3 p-4 sm:p-5" : "gap-3 py-2 pr-2"
            }`}
          >
            <Link
              to={`/product/details/new/${p._id}`}
              className="line-clamp-2 text-sm font-bold leading-6 text-slate-800 transition-colors duration-300 hover:text-emerald-600 sm:text-[15px]"
            >
              {p.name || "Product Name"}
            </Link>

            <div className="flex items-center gap-2">
              <Rating ratings={4.5} />
              <span className="text-xs font-medium text-slate-400">
                4.5
              </span>
            </div>

            <div className="mt-1 flex items-center justify-between border-t border-slate-100 pt-3">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400">
                  Price
                </span>
                <span className="text-lg font-extrabold tracking-tight text-emerald-600 sm:text-xl">
                  ${p.price}
                </span>
              </div>

              {p.discount > 0 && (
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-600">
                  Special Offer
                </span>
              )}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-transparent transition-all duration-500 group-hover:ring-emerald-100" />
        </div>
      ))}
    </div>
  );
};

export default ShopProducts;
