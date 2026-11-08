import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useSearchParams } from "react-router";
import { IoIosArrowForward } from "react-icons/io";
import { Range } from "react-range";
import { AiFillStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import Products from "../components/products/Products";
import { BsFillGridFill } from "react-icons/bs";
import { FaThList, FaFilter, FaTimes } from "react-icons/fa";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import ShopProducts from "../components/products/ShopProduct";
import {
  get_category,
  get_product_Price,
  query_products,
} from "../store/Reducers/homeReducers";

const SearchProducts = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchValue = searchParams.get("value");
  console.log(searchValue);
  console.log(category);



  const dispatch = useDispatch();
  const {
    products,
    categorys,
    priceRange,
    totalProduct,
    latest_Product,
    parPage,
  } = useSelector((state) => state.home);

  const [filter, setFilter] = useState(false);
  const [state, setState] = useState({
    values: [priceRange.low, priceRange.high],
  });
  const [rating, setRating] = useState("");
  const [styles, setStyles] = useState("grid");
  const [sortPrice, setSortPrice] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(get_product_Price());
    dispatch(get_category());
  }, []);

  useEffect(() => {
    setState({ values: [priceRange.low, priceRange.high] });
  }, [priceRange]);

  const queryChangeCategory = (e, value) => {
    setCategory(e.target.checked ? value : "");
  };

  useEffect(() => {
    dispatch(
      query_products({
        low: state.values[0] || "",
        high: state.values[1] || "",
        sortPrice,
        category,
        rating,
        pageNumber,
        searchValue,
      }),
    );
    console.log("searchValue", searchValue);
  }, [
    state,
    sortPrice,
    category,
    rating,
    pageNumber,
    searchValue,
    searchParams,
  ]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />

      <section className='relative h-[240px] mt-6 bg-[url("http://localhost:3000/images/banner/shop.png")] bg-cover bg-center overflow-hidden rounded-2xl w-[92%] mx-auto'>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/50 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Category</h1>
          <div className="flex items-center gap-2 text-sm text-slate-200">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <IoIosArrowForward className="text-xs" />
            <span className="text-emerald-400 font-medium">Category</span>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="w-[92%] lg:w-[90%] mx-auto">
          <div className="lg:hidden mb-5 flex gap-2">
            <button
              onClick={() => setFilter(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold shadow-sm"
            >
              <FaFilter className="text-emerald-600" />
              Filters
            </button>
          </div>

          <div className="flex flex-wrap gap-6">
            <aside
              className={`
                lg:w-3/12 lg:block lg:relative
                ${
                  filter
                    ? "fixed inset-0 z-50 w-full bg-black/40 lg:bg-transparent flex"
                    : "hidden lg:block"
                }
              `}
            >
              <div
                className={`
                  w-full lg:w-auto bg-slate-50 lg:bg-transparent
                  lg:static lg:shadow-none
                  ${filter ? "absolute right-0 top-0 h-full w-[85%] max-w-sm p-4 overflow-y-auto shadow-2xl bg-white" : ""}
                `}
              >
                {filter && (
                  <button
                    onClick={() => setFilter(false)}
                    className="lg:hidden mb-4 flex items-center gap-2 text-slate-600 font-medium"
                  >
                    <FaTimes /> Close
                  </button>
                )}

                <div className="lg:sticky lg:top-4 space-y-4">
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
                      Category
                    </h3>
                    <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
                      {categorys.map((c, i) => (
                        <label
                          key={i}
                          htmlFor={c.name}
                          className={`flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer transition ${
                            category === c.name
                              ? "bg-emerald-50 text-emerald-700"
                              : "hover:bg-slate-50 text-slate-600"
                          }`}
                        >
                          <input
                            type="checkbox"
                            id={c.name}
                            checked={category === c.name}
                            onChange={(e) => queryChangeCategory(e, c.name)}
                            className="accent-emerald-600 w-4 h-4"
                          />
                          <span className="text-sm font-medium">{c.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
                      Price
                    </h3>
                    <Range
                      step={5}
                      min={priceRange.low}
                      max={priceRange.high}
                      values={state.values}
                      onChange={(values) => setState({ values })}
                      renderTrack={({ props, children }) => (
                        <div
                          {...props}
                          className="relative w-full h-[6px] bg-slate-200 rounded-full cursor-pointer"
                        >
                          {children}
                        </div>
                      )}
                      renderThumb={({ props }) => (
                        <div
                          {...props}
                          className="w-4 h-4 bg-white border-2 border-emerald-600 rounded-full shadow"
                        />
                      )}
                    />
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="px-3 py-1 bg-slate-100 rounded-lg text-slate-700 font-semibold">
                        ${Math.floor(state.values[0])}
                      </span>
                      <span className="text-slate-400">—</span>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg font-semibold">
                        ${Math.floor(state.values[1])}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
                      Rating
                    </h3>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((r) => (
                        <button
                          key={r}
                          onClick={() => setRating(r)}
                          className={`w-full text-left px-2 py-1.5 rounded-lg transition flex items-center gap-1 ${
                            rating === r ? "bg-emerald-50" : "hover:bg-slate-50"
                          }`}
                        >
                          {[1, 2, 3, 4, 5].map((i) =>
                            i <= r ? (
                              <AiFillStar key={i} className="text-amber-400" />
                            ) : (
                              <CiStar key={i} className="text-slate-300" />
                            ),
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hidden lg:block">
                    <Products
                      title="Latest Product"
                      products={latest_Product}
                    />
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1 min-w-0 w-full">
              <div className="bg-white rounded-2xl px-5 py-3 mb-6 shadow-sm border border-slate-100 flex flex-wrap justify-between items-center gap-3">
                <h2 className="text-slate-700">
                  <span className="font-bold text-emerald-600 text-lg">
                    {totalProduct}
                  </span>{" "}
                  <span className="text-sm">Products</span>
                </h2>
                <div className="flex items-center gap-3">
                  <select
                    value={sortPrice}
                    onChange={(e) => setSortPrice(e.target.value)}
                    className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none text-slate-600 font-medium cursor-pointer"
                  >
                    <option value="">Sort By</option>
                    <option value="low-to-high">Low to High</option>
                    <option value="high-to-low">High to Low</option>
                  </select>
                  <div className="hidden md:flex items-center bg-slate-50 rounded-lg p-1 border border-slate-200">
                    <button
                      onClick={() => setStyles("grid")}
                      className={`p-2 rounded-md transition ${
                        styles === "grid"
                          ? "bg-emerald-600 text-white"
                          : "text-slate-500"
                      }`}
                    >
                      <BsFillGridFill size={16} />
                    </button>
                    <button
                      onClick={() => setStyles("list")}
                      className={`p-2 rounded-md transition ${
                        styles === "list"
                          ? "bg-emerald-600 text-white"
                          : "text-slate-500"
                      }`}
                    >
                      <FaThList size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="pb-8">
                <ShopProducts products={products} styles={styles} />
              </div>

              <div className="flex justify-center pb-6">
                {totalProduct > parPage && (
                  <Pagination
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    totalItem={totalProduct}
                    parPage={parPage}
                    showItem={Math.floor(totalProduct / parPage)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SearchProducts;
