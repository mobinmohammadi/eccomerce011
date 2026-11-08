import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router";
import { IoIosArrowForward } from "react-icons/io";

const Card = () => {
  const navigate = useNavigate();
  const card_products = [1, 2];
  const outOfStockProduct = [1, 2];
  const redirect = () => {
    navigate("/shipping", {
      state: {
        products: [],
        price: 500,
        shipping_fee: 40,
        items: 2,
      },
    });
  };

  return (
    <div>
      <Header />
      <section className='bg-[url("/images/banner/shop.png")] h-55 mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">Card Page </h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Home</Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>Card </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
          {card_products.length > 0 || outOfStockProduct > 0 ? (
            <div className="flex flex-col sm:flex-row sm:flex-wrap">
              <div className="w-full  md:w-[67%]">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="bg-white p-4">
                      <h2 className="text-md text-green-500 font-semibold">
                        Stock Products {card_products.length}
                      </h2>
                    </div>

                    {card_products.map((p, i) => (
                      <div className="flex bg-white p-4 flex-col md:flex-col gap-8">
                        <div className="flex justify-start items-center">
                          <h2 className="text-md text-slate-600 font-bold">
                            Easy Shop
                          </h2>
                        </div>

                        {[1, 2].map((p, i) => (
                          <div className="w-full flex flex-col gap-5 md:flex-row md:flex-wrap">
                            <div className="flex sm:w-full gap-2 md:w-5/12 transition-all duration-1000">
                              <div className="flex gap-2 justify-start items-center">
                                <img
                                  className="w-[80px] h-[80px]"
                                  src={`/images/products/${i + 1}.webp`}
                                  alt=""
                                />
                                <div className="pr-4 text-slate-600">
                                  <h2 className="text-md font-semibold">
                                    Product Name{" "}
                                  </h2>
                                  <span className="text-sm">Brand: Nike</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between w-12/12 md:w-5/12 sm:w-full sm:mt-3">
                              <div className="pl-4 sm:pl-0">
                                <h2 className="text-lg text-orange-500">
                                  $240
                                </h2>
                                <p className="line-through">$300</p>
                                <p>-15%</p>
                              </div>
                              <div className="flex gap-2 flex-col">
                                <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                  <div className="px-3 cursor-pointer">-</div>
                                  <div className="px-3">2</div>
                                  <div className="px-3 cursor-pointer">+</div>
                                </div>
                                <button className="px-5 py-[3px] bg-red-500 text-white">
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}

                    {outOfStockProduct.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <div className="bg-white p-4">
                          <h2 className="text-md text-red-500 font-semibold">
                            Out of Stock {outOfStockProduct.length}
                          </h2>
                        </div>

                        <div className="bg-white p-4">
                          {[1].map((p, i) => (
                            <div className="w-full flex flex-wrap">
                              <div className="flex sm:w-full gap-2 w-7/12">
                                <div className="flex gap-2 justify-start items-center">
                                  <img
                                    className="w-[80px] h-[80px]"
                                    src={`/images/products/${i + 1}.webp`}
                                    alt=""
                                  />
                                  <div className="pr-4 text-slate-600">
                                    <h2 className="text-md font-semibold">
                                      Product Name{" "}
                                    </h2>
                                    <span className="text-sm">Brand: Nike</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                                <div className="pl-4 sm:pl-0">
                                  <h2 className="text-lg text-orange-500">
                                    $240
                                  </h2>
                                  <p className="line-through">$300</p>
                                  <p>-15%</p>
                                </div>
                                <div className="flex gap-2 flex-col">
                                  <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                    <div className="px-3 cursor-pointer">-</div>
                                    <div className="px-3">2</div>
                                    <div className="px-3 cursor-pointer">+</div>
                                  </div>
                                  <button className="px-5 py-[3px] bg-red-500 text-white">
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full pr-3 md:pl-5 sm:pr-0 mt-5 sm:mt-0  md:w-[33%]">
                <div className="md:pl-3 md-lg:pl-0 ">
                  {card_products.length > 0 && (
                    <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
                      <h2 className="text-xl font-bold">Order Summary</h2>
                      <div className="flex justify-between items-center">
                        <span>2 Items </span>
                        <span>$343 </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Shipping Fee </span>
                        <span>$40 </span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500 rounded-sm"
                          type="text"
                          placeholder="Input Vauchar Coupon"
                        />
                        <button className="px-5 py-[1px] bg-[#059473] text-white rounded-sm uppercase text-sm">
                          Apply
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        <span>Total</span>
                        <span className="text-lg text-[#059473]">$430 </span>
                      </div>
                      <button
                        onClick={redirect}
                        className="px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg bg-red-500 text-sm text-white uppercase "
                      >
                        Process to Checkout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link className="px-4 py-1 bg-indigo-500 text-white" to="/shops">
                {" "}
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Card;
