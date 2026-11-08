import { useEffect, useState } from "react";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from "../Rating";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { add_to_cart } from "../../store/Reducers/cartReducer";
import toast from "react-hot-toast";
import { messageClear } from "../../store/Reducers/cartReducer";

const FeatureProducts = ({ products }) => {
  const [endIndex, setEndIndex] = useState(6);
  const { succsussMessage, errorMessage } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  useEffect(() => {
    if (succsussMessage) {
      toast.success(succsussMessage);
    }
    dispatch(messageClear());
  }, [succsussMessage]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
    dispatch(messageClear());
  }, [errorMessage]);

  const changMoorProduct = () => {
    setEndIndex((prev) => prev + 3);
  };
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const addToBasket = (productId) => {
    if (userInfo) {
      dispatch(
        add_to_cart({
          userId: userInfo.id,
          quantity: 1,
          productId,
        }),
      );
    } else {
      navigate("/login");
    }
  };

  const hasMore = products && endIndex < products.length;

  return (
    <section className="w-[92%] max-w-[1400px] mx-auto py-12">
      <div className="text-center flex flex-col items-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
          Feature Products
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-md">
          Handpicked selections from our most popular items.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mt-4" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 md-lg:grid-cols-3 gap-6">
        {products &&
          [...products].slice(0, endIndex).map((p, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1.5 hover:border-emerald-200"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
                {p.discount > 0 && (
                  <span className="absolute z-10 top-3 left-3 px-2.5 py-1 text-[11px] font-bold text-white bg-gradient-to-r from-rose-500 to-rose-600 rounded-full shadow-lg shadow-rose-500/30">
                    {p.discount}% OFF
                  </span>
                )}

                <img
                  className="w-full h-[230px] sm:h-[250px] object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-110"
                  src={p.images[0]}
                  alt={p.name}
                />

                <ul className="absolute flex justify-center items-center gap-2 left-0 right-0 -bottom-16 group-hover:bottom-4 transition-all duration-400 ease-out">
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
                    onClick={() => addToBasket(p._id)}
                    title="Add to cart"
                    className="w-10 h-10 cursor-pointer bg-white/95 backdrop-blur-md shadow-lg shadow-slate-300/40 flex justify-center items-center rounded-full text-slate-600 hover:bg-emerald-600 hover:text-white hover:scale-110 transition-all duration-300"
                  >
                    <RiShoppingCartLine size={15} />
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-2.5 p-5">
                <Link
                  to={p.slug}
                  className="text-[15px] font-semibold text-slate-700 leading-6 line-clamp-2 hover:text-emerald-600 transition-colors duration-200"
                >
                  {p.name || "Product Name"}
                </Link>

                <div className="flex justify-between items-center gap-3 mt-1">
                  <span className="text-xl font-extrabold text-emerald-600 tracking-tight">
                    ${p.price || 656}
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

      {hasMore && (
        <div className="w-full mt-10 flex items-center justify-center">
          <button
            onClick={changMoorProduct}
            className="px-10 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 hover:shadow-emerald-600/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default FeatureProducts;
