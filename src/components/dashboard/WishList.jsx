import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { Link } from "react-router";
import Rating from "../Rating";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  delete_product_in_wish,
  get_products_in_wish,
  messageClear,
} from "../../store/Reducers/cartReducer";
import toast from "react-hot-toast";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { userinfo } = useSelector((state) => state.auth);
  const { wishlist, loader, succsussMessage, errorMessage } = useSelector(
    (state) => state.cart,
  );

  useEffect(() => {
    dispatch(get_products_in_wish());
  }, []);

  useEffect(() => {
    if (succsussMessage) {
      toast.success(succsussMessage);
      dispatch(messageClear());
    }
  }, [succsussMessage]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage]);

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
      {loader ? (
        <div className="col-span-full flex h-64 w-full flex-col items-center justify-center gap-4">
          <div className="relative flex h-16 w-16 items-center justify-center">
            <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-[#059473]"></div>
            <div className="absolute h-10 w-10 animate-ping rounded-full bg-[#059473]/20"></div>
            <FaRegHeart className="h-6 w-6 animate-pulse text-[#059473]" />
          </div>
          <p className="text-sm font-semibold tracking-wide text-slate-600">
            Loading your wishlist...
          </p>
        </div>
      ) : !wishlist.length ? (
        <div className="col-span-full flex flex-col items-center justify-center py-20">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
            <FaRegHeart className="h-9 w-9 text-slate-400" />
          </div>
          <h2 className="mb-2 text-lg font-bold text-slate-700">
            Your wishlist is empty
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            Looks like you haven't added anything yet.
          </p>
          <Link
            to="/"
            className="rounded-lg bg-[#059473] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#04745a]"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        wishlist.map((p) => (
          <div
            key={p._id}
            className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <button
              onClick={() =>
                dispatch(delete_product_in_wish(p._id ))
              }
              type="button"
              aria-label="Remove from wishlist"
              className="absolute top-2 right-2 z-20 flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-amber-600 text-white shadow-sm transition-colors duration-300 hover:bg-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="relative overflow-hidden">
              {p.discount > 0 && (
                <div className="absolute left-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                  {p.discount}%
                </div>
              )}

              <img
                className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={p.image}
                alt={p.name}
                loading="lazy"
              />

              <ul className="absolute inset-x-0 -bottom-12 flex items-center justify-center gap-2 transition-all duration-300 group-hover:bottom-3">
                <li>
                  <button
                    type="button"
                    aria-label="Add to wishlist"
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-slate-600 shadow-sm transition-all duration-300 hover:rotate-[720deg] hover:bg-[#059473] hover:text-white"
                  >
                    <FaRegHeart />
                  </button>
                </li>
                <li>
                  <Link
                    to={`/product/details/${p.slug}`}
                    aria-label="View product"
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-slate-600 shadow-sm transition-all duration-300 hover:rotate-[720deg] hover:bg-[#059473] hover:text-white"
                  >
                    <FaEye />
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    aria-label="Add to cart"
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-slate-600 shadow-sm transition-all duration-300 hover:rotate-[720deg] hover:bg-[#059473] hover:text-white"
                  >
                    <RiShoppingCartLine />
                  </button>
                </li>
              </ul>
            </div>

            <div className="px-3 py-3 text-slate-600">
              <h2 className="truncate font-bold">{p.name}</h2>
              <div className="mt-1 flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-slate-800">
                  ${p.price}
                </span>
                <div className="flex">
                  <Rating rating={p.rating} />
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;