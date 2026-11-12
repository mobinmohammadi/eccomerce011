import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  delete_cart_product,
  get_cart_product,
  messageClear,
  inccrement_product,
  deccrement_product_quantity,
} from "../store/Reducers/cartReducer";
import toast from "react-hot-toast";

const Card = () => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const {
    cart_products,
    price,
    // cart_product_count,
    succsussMessage,
    errorMessage,
    shipping_fee,
    outOfStockProduct,
    buy_product_item,
  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_cart_product(userInfo?.id));
  }, []);

  useEffect(() => {
    if (succsussMessage) {
      toast.success(succsussMessage);
      dispatch(get_cart_product(userInfo.id));
      dispatch(messageClear());
    }
  }, [succsussMessage]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage]);

  const card_products = [1, 2];

  const redirect = () => {
    navigate("/shipping", {
      state: {
        products: cart_products,
        price: price,
        shipping_fee: shipping_fee,
        items: buy_product_item,
      },
    });
  };

  const inc = (quantity, stock, cartId) => {
    const temp = quantity + 1;
    if (temp <= stock) {
      dispatch(inccrement_product(cartId));
    }
  };

  const dec = (quantity, stock, cartId) => {
    const temp = quantity - 1;
    if (temp > 0) {
      dispatch(deccrement_product_quantity(cartId));
    }
  };

  return (
    
<div>
  <Header />

  <section className='bg-[url("/images/banner/shop.png")] h-64 mt-6 bg-cover bg-center relative'>
    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-emerald-950/50">
      <div className="w-[90%] h-full mx-auto flex flex-col justify-center items-center text-white gap-3">
        <h2 className="text-4xl font-extrabold tracking-tight">Shopping Cart</h2>
        <div className="flex items-center gap-3 text-sm text-slate-200">
          <Link to="/" className="hover:text-emerald-400 transition">Home</Link>
          <IoIosArrowForward />
          <span className="text-emerald-400 font-semibold">Cart</span>
        </div>
      </div>
    </div>
  </section>

  <section className="bg-[#f8fafc]">
    <div className="w-[90%] mx-auto py-12 md:py-16">
      {cart_products.length > 0 || outOfStockProduct?.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-6">

          <div className="w-full md:w-[67%]">
            <div className="flex flex-col gap-5">

              {cart_products.length > 0 && (
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Available Products</h2>
                    <p className="text-sm text-slate-400 mt-1">Products ready for checkout</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-bold">
                    {cart_products.length} Items
                  </span>
                </div>
              )}

              {cart_products?.map((p, i) => (
                <div key={p._id ?? p.shopName ?? i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow duration-300">

                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-lg">
                      🏪
                    </div>
                    <h2 className="font-bold text-slate-800">{p.shopName}</h2>
                  </div>

                  {p?.products.map((pt, j) => (
                    <div key={pt._id ?? j} className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 py-5 border-b last:border-0 border-slate-100">

                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                          <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src={pt?.productInfo.images[0]} alt={pt?.productInfo.name} />
                        </div>
                        <div className="min-w-0">
                          <h2 className="font-bold text-slate-800 line-clamp-2">{pt.productInfo.name}</h2>
                          <p className="text-sm text-slate-400 mt-2">
                            Brand: <span className="text-slate-600 font-medium">{pt?.productInfo.brand}</span>
                          </p>
                          <div className="mt-2">
                            <span className="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">In Stock</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-5">
                        <div>
                          <h2 className="text-xl font-extrabold text-emerald-600">
                            ${(
                              pt.productInfo.price -
                              Math.floor((pt.productInfo.price * pt.productInfo.discount) / 100)
                            ).toLocaleString()}
                          </h2>
                          {pt.productInfo.discount ? (
                            <div className="flex items-center gap-2 mt-1">
                              <p className="line-through text-xs text-slate-400">
                                ${pt.productInfo.price.toLocaleString()}
                              </p>
                              <span className="text-xs text-red-500 font-bold">-{pt.productInfo.discount}%</span>
                            </div>
                          ) : null}
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg h-9">
                            <button type="button" onClick={() => dec(pt.quantity, pt.productInfo.stock, pt._id)} className="px-3 h-full text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-l-lg transition">−</button>
                            <span className="px-2 text-sm font-bold text-slate-700">{pt.quantity}</span>
                            <button type="button" onClick={() => inc(pt.quantity, pt.productInfo.stock, pt._id)} className="px-3 h-full text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-r-lg transition">+</button>
                          </div>

                          <button onClick={() => dispatch(delete_cart_product(pt._id))} className="flex items-center justify-center gap-1.5 text-xs text-red-500 hover:bg-red-50 rounded-lg py-1.5 transition">
                            <span>✕</span> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {outOfStockProduct?.length > 0 && (
                <div className="flex flex-col gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-red-100 shadow-sm flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">Out of Stock</h2>
                      <p className="text-sm text-slate-400 mt-1">These products are currently unavailable</p>
                    </div>
                    <span className="bg-red-50 text-red-500 px-4 py-2 rounded-xl text-sm font-bold">
                      {outOfStockProduct.length} Items
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm divide-y divide-slate-100">
                    {outOfStockProduct.map((p) =>
                      p.products.map((ou) => (
                        <div key={ou.id ?? ou._id ?? ou.name} className="flex flex-col sm:flex-row justify-between items-center gap-5 py-5 first:pt-0 last:pb-0">
                          <div className="flex items-center gap-4 w-full">
                            <img className="w-24 h-24 rounded-xl object-cover border border-slate-100 opacity-60" src={ou.images?.[0]} alt={ou.name} />
                            <div>
                              <h2 className="font-bold text-slate-700">{ou.name}</h2>
                              <p className="text-sm text-slate-400 mt-2">Brand: {ou.brand}</p>
                              <span className="inline-block mt-2 text-xs text-red-500 bg-red-50 px-3 py-1 rounded-full">Out of Stock</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto">
                            <div>
                              <h2 className="text-lg font-bold text-slate-500">
                                ${(
                                  ou.price - Math.floor((ou.price * ou.discount) / 100)
                                ).toLocaleString()}
                              </h2>
                              <p className="line-through text-xs text-slate-400">${ou.price.toLocaleString()}</p>
                              <span className="text-xs text-red-500">-{ou.discount}%</span>
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center bg-slate-100 rounded-lg h-9 opacity-50">
                                <button disabled className="px-3">−</button>
                                <span className="px-2 text-sm">{ou.quantity || 0}</span>
                                <button disabled className="px-3">+</button>
                              </div>
                              <button type="button" className="text-xs text-red-500 hover:bg-red-50 rounded-lg py-1.5 transition">Remove</button>
                            </div>
                          </div>
                        </div>
                      )),
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-[33%]">
            <div className="md:sticky md:top-6">
              {card_products.length > 0 && (
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-lg shadow-slate-200/50">
                  <div className="bg-gradient-to-br from-slate-900 to-emerald-900 p-6 text-white">
                    <p className="text-emerald-300 text-xs font-semibold uppercase tracking-widest">Your Shopping Cart</p>
                    <h2 className="text-2xl font-extrabold mt-2">Order Summary</h2>
                    <p className="text-sm text-slate-300 mt-3">{buy_product_item} Products in your cart</p>
                  </div>

                  <div className="p-5 flex flex-col gap-5">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Subtotal</span>
                      <span className="font-bold text-slate-800">${price.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Shipping Fee</span>
                      <span className="font-bold text-slate-800">${shipping_fee.toLocaleString()}</span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-sm font-bold text-slate-700 mb-3">Have a coupon?</p>
                      <div className="flex gap-2">
                        <input type="text" placeholder="Enter coupon code" className="w-full min-w-0 bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-emerald-500 transition" />
                        <button className="bg-slate-900 hover:bg-emerald-700 text-white rounded-lg px-4 text-sm font-bold transition">Apply</button>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-slate-200 pt-5">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-800">Total</span>
                        <span className="text-2xl font-extrabold text-emerald-600">${(price + shipping_fee).toLocaleString()}</span>
                      </div>
                    </div>

                    <button onClick={redirect} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-4 px-5 flex items-center justify-between transition-all duration-300 shadow-lg shadow-emerald-600/20 font-bold">
                      <span className="text-sm uppercase">Proceed to Checkout</span>
                      <span className="flex items-center gap-2">
                        <span className="bg-white/20 rounded-lg px-2 py-1 text-xs">{buy_product_item}</span>
                        <span className="text-xl">→</span>
                      </span>
                    </button>

                    <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                      <span className="text-emerald-500">🔒</span>
                      Secure and encrypted checkout
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-20 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-4xl mb-5">🛒</div>
          <h2 className="text-2xl font-bold text-slate-800">Your Cart is Empty</h2>
          <p className="text-slate-400 text-sm mt-2 mb-6">Looks like you haven't added anything yet.</p>
          <Link className="px-7 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition" to="/shops">
            Start Shopping
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
