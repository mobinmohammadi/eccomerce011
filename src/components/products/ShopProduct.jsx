import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from "../Rating";
import { Link } from "react-router";

const ShopProducts = ({ products, styles }) => {
  return (
    <div
      className={`w-full grid gap-5 ${
        styles === "grid"
          ? "grid-cols-2 md-lg:grid-cols-2 md:grid-cols-2"
          : "grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2"
      }`}
    >
      {products.map((p, i) => (
        <div
          key={i}
          className={`group relative bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1.5 hover:border-emerald-200 ${
            styles === "grid"
              ? "flex flex-col"
              : "flex items-center gap-5 md-lg:flex-col md-lg:items-stretch md-lg:gap-0"
          }`}
        >
          <div
            className={`relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 ${
              styles === "grid"
                ? "w-full h-[230px] xs:h-[180px] md:h-[250px]"
                : "w-[150px] h-[150px] md-lg:w-full md-lg:h-[210px] shrink-0"
            }`}
          >
            <img
              className="w-full h-full object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-110"
              src={p.images[0]}
              alt={p.name}
            />

            {p.discount > 0 && (
              <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold text-white bg-gradient-to-r from-rose-500 to-rose-600 rounded-full shadow-lg shadow-rose-500/30">
                {p.discount}% OFF
              </span>
            )}

            <ul
              className={`absolute flex justify-center items-center gap-2 transition-all duration-400 ease-out ${
                styles === "grid"
                  ? "left-0 right-0 -bottom-16 group-hover:bottom-4"
                  : "left-4 top-1/2 -translate-y-1/2 flex-col -translate-x-16 group-hover:translate-x-0 md-lg:flex-row md-lg:left-0 md-lg:right-0 md-lg:top-auto md-lg:-bottom-16 md-lg:translate-x-0 md-lg:translate-y-0 md-lg:group-hover:bottom-4"
              }`}
            >
              <li
                title="Add to wishlist"
                className="w-10 h-10 cursor-pointer bg-white/95 backdrop-blur-md shadow-lg shadow-slate-300/40 flex justify-center items-center rounded-full text-slate-600 hover:bg-emerald-600 hover:text-white hover:scale-110 transition-all duration-300"
              >
                <FaRegHeart size={15} />
              </li>
              <Link
                to={`/product/details/new/${p._id}`}
                title="Quick view"
                className="w-10 h-10 cursor-pointer bg-white/95 backdrop-blur-md shadow-lg shadow-slate-300/40 flex justify-center items-center rounded-full text-slate-600 hover:bg-emerald-600 hover:text-white hover:scale-110 transition-all duration-300"
              >
                <FaEye size={15} />
              </Link>
              <li
                title="Add to cart"
                className="w-10 h-10 cursor-pointer bg-white/95 backdrop-blur-md shadow-lg shadow-slate-300/40 flex justify-center items-center rounded-full text-slate-600 hover:bg-emerald-600 hover:text-white hover:scale-110 transition-all duration-300"
              >
                <RiShoppingCartLine size={15} />
              </li>
            </ul>
          </div>

          <div
            className={`flex flex-col gap-2.5 p-5 ${
              styles === "grid" ? "w-full" : "flex-1 md-lg:w-full"
            }`}
          >
            <Link
              to={`/product/details/new/${p._id}`}
              className="text-[15px] font-semibold text-slate-700 leading-6 line-clamp-2 hover:text-emerald-600 transition-colors duration-200"
            >
              {p.name || "Product Name"}
            </Link>

            <div className="flex justify-between items-center gap-3 mt-1">
              <span className="text-xl font-extrabold text-emerald-600 tracking-tight">
                ${p.price}
              </span>
              <div className="flex items-center">
                <Rating ratings={4.5} />
              </div>
            </div>
          </div>

          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-emerald-100 pointer-events-none transition-all duration-300" />
        </div>
      ))}
    </div>
  );
};

export default ShopProducts;