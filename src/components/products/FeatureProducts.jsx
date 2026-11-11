
import { useEffect, useState } from "react";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from "../Rating";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  add_to_cart,
  messageClear,
} from "../../store/Reducers/cartReducer";
import toast from "react-hot-toast";

const FeatureProducts = ({ products }) => {
  const [endIndex, setEndIndex] = useState(6);

  const { succsussMessage, errorMessage } = useSelector(
    (state) => state.cart
  );

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (succsussMessage) {
      toast.success(succsussMessage);
      dispatch(messageClear());
    }
  }, [succsussMessage, dispatch]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, dispatch]);

  const changMoorProduct = () => {
    setEndIndex((prev) => prev + 3);
  };

  const addToBasket = (productId) => {
    if (userInfo) {
      dispatch(
        add_to_cart({
          userId: userInfo.id,
          quantity: 1,
          productId,
        })
      );
    } else {
      navigate("/login");
    }
  };

  const hasMore = products && endIndex < products.length;

  return (
    <section className="relative mx-auto w-[94%] max-w-[1400px] py-14 md:w-[92%] md:py-20">
      <div className="mb-10 flex flex-col items-center text-center md:mb-14">
        <span className="mb-4 rounded-full border border-emerald-100 bg-emerald-50 px-5 py-2 text-[10px] font-extrabold uppercase tracking-[3px] text-emerald-600">
          Our Collection
        </span>

        <h2 className="text-2xl font-black tracking-tight text-slate-800 sm:text-3xl md:text-4xl lg:text-5xl">
          Featured <span className="text-emerald-600">Products</span>
        </h2>

        <p className="mt-3 max-w-lg px-2 text-xs leading-7 text-slate-400 sm:text-sm md:text-base">
          Discover our handpicked collection of premium products, carefully
          selected to bring style and quality to your everyday life.
        </p>

        <div className="mt-5 flex items-center gap-2">
          <span className="h-1 w-7 rounded-full bg-emerald-200" />
          <span className="h-1.5 w-12 rounded-full bg-emerald-600" />
          <span className="h-1 w-7 rounded-full bg-emerald-200" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-7">
        {products &&
          [...products].slice(0, endIndex).map((p) => (
            <div
              key={p._id}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-[0_20px_50px_rgba(16,185,129,0.12)] sm:rounded-3xl"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-[#f8faf9] to-[#edf3ef]">
                <Link
                  to={`/product/details/new/${p._id}`}
                  className="block"
                >
                  <img
                    className="h-[145px] w-full object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-110 sm:h-[220px] sm:p-6 md:h-[260px]"
                    src={p.images?.[0]}
                    alt={p.name}
                    loading="lazy"
                  />
                </Link>

                {p.discount > 0 && (
                  <span className="absolute left-2 top-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-2 py-1 text-[9px] font-extrabold text-white shadow-lg sm:left-4 sm:top-4 sm:px-3.5 sm:py-1.5 sm:text-[10px]">
                    {p.discount}% OFF
                  </span>
                )}

                <span className="absolute right-2 top-2 rounded-full border border-white/80 bg-white/85 px-2 py-1 text-[8px] font-bold text-emerald-700 backdrop-blur-md sm:right-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[10px]">
                  Featured
                </span>

                <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 sm:bottom-4 sm:left-0 sm:right-0 sm:justify-center sm:gap-2">
                  <button
                    title="Add to wishlist"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-600 shadow-md transition-all duration-300 hover:bg-rose-500 hover:text-white sm:h-11 sm:w-11 sm:translate-y-8 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
                  >
                    <FaRegHeart size={14} />
                  </button>

                  <Link
                    to={`/product/details/new/${p._id}`}
                    title="Quick view"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-600 shadow-md transition-all duration-300 hover:bg-emerald-600 hover:text-white sm:h-11 sm:w-11 sm:translate-y-8 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
                  >
                    <FaEye size={15} />
                  </Link>

                  <button
                    onClick={() => addToBasket(p._id)}
                    title="Add to cart"
                    className="flex h-9 min-w-0 flex-1 items-center justify-center gap-1 rounded-xl bg-emerald-600 px-2 text-[10px] font-bold text-white shadow-md transition-all duration-300 hover:bg-emerald-700 active:scale-95 sm:h-11 sm:w-11 sm:flex-none sm:translate-y-8 sm:px-0 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
                  >
                    <RiShoppingCartLine size={16} />
                    <span className="hidden">Add to Cart</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2 p-3 sm:gap-3 sm:p-5">
                <Link
                  to={`/product/details/new/${p._id}`}
                  className="line-clamp-2 min-h-10 text-xs font-bold leading-5 text-slate-800 transition-colors duration-300 hover:text-emerald-600 sm:min-h-12 sm:text-[15px] sm:leading-6"
                >
                  {p.name || "Product Name"}
                </Link>

                <div className="flex flex-wrap items-center gap-1.5">
                  <Rating ratings={4.5} />
                  <span className="text-[10px] font-medium text-slate-400 sm:text-xs">
                    (4.5)
                  </span>
                </div>

                <div className="mt-1 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 sm:pt-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 sm:text-[10px]">
                      Price
                    </span>
                    <span className="text-base font-black tracking-tight text-emerald-600 sm:text-xl">
                      ${p.price || 656}
                    </span>
                  </div>

                  {p.discount > 0 && (
                    <span className="rounded-lg bg-emerald-50 px-2 py-1.5 text-[8px] font-bold text-emerald-600 sm:rounded-xl sm:px-3 sm:text-[10px]">
                      Special Offer
                    </span>
                  )}
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition-all duration-500 group-hover:ring-emerald-100 sm:rounded-3xl" />
            </div>
          ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center md:mt-14">
          <button
            onClick={changMoorProduct}
            className="group flex items-center gap-3 rounded-full bg-emerald-600 px-7 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-xl active:scale-95 sm:px-10 sm:py-3.5 sm:text-sm"
          >
            Load More
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-y-1">
              ↓
            </span>
          </button>
        </div>
      )}
    </section>
  );
};

export default FeatureProducts;
