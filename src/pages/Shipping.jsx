import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useLocation, useNavigate } from "react-router";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { place_orders } from "../store/Reducers/orderReducer";

const Shipping = () => {
  let { state } = useLocation();
  console.log(state);
  const { items, price, products, shipping_fee } = state || {};
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)
  const navigate = useNavigate()

  const [res, setRes] = useState(false);
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    post: "",
    province: "",
    city: "",
    area: "",
  });

  const inputHandle = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const save = (e) => {
    e.preventDefault();
    const { name, address, phone, post, province, city, area } = form;
    if (name && address && phone && post && province && city && area) {
      setRes(true);
    }

    dispatch(place_orders({
      price,
      products,
      shipping_fee,
      items,
      shippingInfo : form,
      userId : userInfo,
      navigate
        }))

  };

  useEffect(() => {
    console.log('state' , form);
    
  },[])





  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />

      <section className='bg-[url("/images/banner/shop.png")] h-64 mt-6 bg-cover bg-center relative'>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-emerald-950/50">
          <div className="w-[90%] h-full mx-auto flex flex-col justify-center items-center text-white gap-3">
            <h2 className="text-4xl font-extrabold tracking-tight">
              Shipping Details
            </h2>
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <Link to="/" className="hover:text-emerald-400 transition">
                Home
              </Link>
              <IoIosArrowForward />
              <span className="text-emerald-400 font-semibold">Shipping</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="w-[92%] sm:w-[90%] lg:w-[85%] mx-auto py-10 md:py-16">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-[67%]">
              <div className="flex flex-col gap-5">
                <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-4 mb-7 border-b border-slate-100 pb-5">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl">
                      📍
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-800">
                        Shipping Information
                      </h2>
                      <p className="text-sm text-slate-400 mt-1">
                        Enter your delivery details
                      </p>
                    </div>
                  </div>

                  {!res && (
                    <form onSubmit={save}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-slate-600">
                        {[
                          {
                            name: "name",
                            label: "Full Name",
                            placeholder: "Enter your full name",
                          },
                          {
                            name: "address",
                            label: "Street Address",
                            placeholder: "Enter your address",
                          },
                          {
                            name: "phone",
                            label: "Phone Number",
                            placeholder: "Enter your phone number",
                          },
                          {
                            name: "post",
                            label: "Postal Code",
                            placeholder: "Enter postal code",
                          },
                          {
                            name: "province",
                            label: "Province",
                            placeholder: "Enter province",
                          },
                          {
                            name: "city",
                            label: "City",
                            placeholder: "Enter city",
                          },
                          {
                            name: "area",
                            label: "Area",
                            placeholder: "Enter your area",
                          },
                        ].map((field) => (
                          <div key={field.name} className="flex flex-col gap-2">
                            <label
                              htmlFor={field.name}
                              className="text-sm font-semibold text-slate-700"
                            >
                              {field.label}
                            </label>
                            <input
                              onChange={inputHandle}
                              value={form[field.name]}
                              type="text"
                              name={field.name}
                              id={field.name}
                              placeholder={field.placeholder}
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm text-slate-700 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                            />
                          </div>
                        ))}

                        <div className="flex flex-col justify-end">
                          <button className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5">
                            Save Shipping Address
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {res && (
                    <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-5">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
                            Delivery Address
                          </p>
                          <h2 className="text-lg font-bold text-slate-800 mt-1">
                            Deliver To {form.name}
                          </h2>
                        </div>
                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-bold">
                          Home
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-slate-600">
                        <p>📞 {form.phone}</p>
                        <p>
                          📍 {form.address}, {form.area}, {form.city},{" "}
                          {form.province}
                        </p>
                        <p>📮 {form.post}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setRes(false)}
                        className="mt-5 text-sm font-bold text-emerald-700 hover:text-emerald-900 transition"
                      >
                        Edit Address
                      </button>
                    </div>
                  )}
                </div>

                {products.map((p, i) => (
                  <div
                    key={i}
                    className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
                  >
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                        🏪
                      </div>
                      <div>
                        <h2 className="font-bold text-slate-800">
                          {p.shopName}
                        </h2>
                        <p className="text-xs text-slate-400 mt-1">
                          Order products
                        </p>
                      </div>
                    </div>

                    {p.products.map((pt, j) => (
                      <div
                        key={j}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b last:border-0 border-slate-100"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden">
                            <img
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                              src={pt.productInfo.images[0]}
                              alt="Product"
                            />
                          </div>
                          <div>
                            <h2 className="font-bold text-slate-800">
                              Product Name : {pt.productInfo.name}
                            </h2>
                            <p className="text-sm text-slate-400 mt-1">
                              Brand: {pt.productInfo.brand}
                            </p>
                            <span className="inline-block mt-2 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                              In Stock
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between sm:justify-end items-center gap-6">
                          <div>
                            <h2 className="text-xl font-extrabold text-emerald-600">
                              $
                              {(
                                pt.productInfo.price -
                                Math.floor(
                                  (pt.productInfo.price *
                                    pt.productInfo.discount) /
                                    100,
                                )
                              ).toLocaleString()}
                            </h2>
                            {pt.productInfo.discount ? (
                              <div className="flex items-center gap-2 mt-1">
                                <p className="line-through text-xs text-slate-400">
                                  ${pt.productInfo.price.toLocaleString()}
                                </p>
                                <span className="text-xs text-red-500 font-bold">
                                  -{pt.productInfo.discount}%
                                </span>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-[33%]">
              <div className="lg:sticky lg:top-6">
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-lg shadow-slate-200/50">
                  <div className="bg-gradient-to-br from-slate-900 to-emerald-900 p-6 text-white">
                    <p className="text-emerald-300 text-xs font-semibold uppercase tracking-widest">
                      Almost There
                    </p>
                    <h2 className="text-2xl font-extrabold mt-2">
                      Order Summary
                    </h2>
                    <p className="text-sm text-slate-300 mt-2">
                      Review your order before payment
                    </p>
                  </div>

                  <div className="p-5 flex flex-col gap-5">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">
                        Items Total ({items})
                      </span>
                      <span className="font-bold text-slate-800">$343</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Delivery Fee</span>
                      <span className="font-bold text-slate-800">${price}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Total Payment</span>
                      <span className="font-bold text-slate-800">
                        ${shipping_fee}
                      </span>
                    </div>

                    <div className="border-t border-dashed border-slate-200 pt-5">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-800">Total</span>
                        <span className="text-2xl font-extrabold text-emerald-600">
                          ${price +   shipping_fee}
                        </span>
                      </div>
                    </div>

                    <button
                      disabled={!res}
                      className={`w-full py-4 px-5 rounded-xl text-sm font-bold uppercase flex items-center justify-between transition-all duration-300 ${
                        res
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20"
                          : "bg-slate-200 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      <span>Place Order</span>
                      <span className="text-xl">→</span>
                    </button>

                    <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                      <span className="text-emerald-500">🔒</span>
                      Secure and encrypted checkout
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shipping;
