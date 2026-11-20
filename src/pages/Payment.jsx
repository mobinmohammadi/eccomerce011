import { Link, useLocation, useNavigate, Navigate } from "react-router";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import {
  FiCreditCard,
  FiLock,
  FiCheck,
  FiDollarSign,
  FiTruck,
  FiShoppingBag,
} from "react-icons/fi";
import { SiStripe } from "react-icons/si";
import toast from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const price = state?.price ?? 0;
  const shipping_fee = state?.shipping_fee ?? 0;
  const items = state?.items ?? 0;
  const orderId = state?.orderId || "-";

  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [loading, setLoading] = useState(false);

  // Guard: if page opened directly
  if (!state?.orderId) {
    return <Navigate to="/" replace />;
  }

  const total = Number(price) + Number(shipping_fee);

  const handlePay = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (paymentMethod === "stripe") {
        // 🔗 اینجا API واقعی Stripe رو صدا بزن:
        // const { data } = await api.post("/payment/stripe/create-session", { orderId, total });

        await new Promise((r) => setTimeout(r, 1200));

        toast.success("Payment successful!");
        navigate("/payment-success", {
          replace: true,
          state: {
            orderId,
            message: "Your payment was processed via Stripe.",
            total,
            items,
            name: state?.name,
            paymentMethod: "Stripe",
          },
        });
      } else {
        // Cash on Delivery
        toast.success("Order confirmed! Pay on delivery.");
        navigate("/payment-success", {
          replace: true,
          state: {
            orderId,
            message: "Your order is confirmed. Please pay on delivery.",
            total,
            items,
            name: state?.name,
            paymentMethod: "Cash on Delivery",
          },
        });
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const methods = [
    {
      id: "stripe",
      title: "Credit / Debit Card",
      subtitle: "Pay securely with Stripe",
      icon: SiStripe,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      badge: "Recommended",
    },
    {
      id: "cod",
      title: "Cash on Delivery",
      subtitle: "Pay when your order arrives",
      icon: FiTruck,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      badge: null,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Header />

      {/* Banner */}
      <section className='bg-[url("/images/banner/shop.png")] h-36 sm:h-44 md:h-52 mt-4 sm:mt-6 bg-cover bg-center relative'>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-emerald-950/50">
          <div className="w-[92%] sm:w-[90%] h-full mx-auto flex flex-col justify-center items-center text-white gap-1.5 sm:gap-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              Payment
            </h2>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs md:text-sm text-slate-200">
              <Link to="/" className="hover:text-emerald-400 transition">
                Home
              </Link>
              <IoIosArrowForward className="text-[10px]" />
              <Link to="/cart" className="hover:text-emerald-400 transition">
                Cart
              </Link>
              <IoIosArrowForward className="text-[10px]" />
              <span className="text-emerald-400 font-semibold">Payment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 w-[92%] sm:w-[85%] md:w-[70%] lg:w-[60%] xl:w-[50%] max-w-2xl mx-auto py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 sm:gap-5">
          {/* Left: Payment methods */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 overflow-hidden">
            {/* Header */}
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FiCreditCard size={18} />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-800">
                  Choose Payment Method
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  All transactions are secure and encrypted
                </p>
              </div>
            </div>

            {/* Methods */}
            <div className="p-4 sm:p-6 flex flex-col gap-3">
              {methods.map((m) => {
                const active = paymentMethod === m.id;
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    className={`group relative flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                      active
                        ? "border-emerald-500 bg-emerald-50/50 shadow-md shadow-emerald-500/10"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                        active
                          ? "bg-emerald-600 text-white"
                          : `${m.iconBg} ${m.iconColor}`
                      } transition-all`}
                    >
                      <Icon size={20} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-slate-800">
                          {m.title}
                        </p>
                        {m.badge && (
                          <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">
                            {m.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 truncate">
                        {m.subtitle}
                      </p>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        active
                          ? "border-emerald-600 bg-emerald-600"
                          : "border-slate-300"
                      }`}
                    >
                      {active && <FiCheck size={12} className="text-white" />}
                    </div>
                  </button>
                );
              })}

              {/* Stripe card fields (fake, for visual) */}
              {paymentMethod === "stripe" && (
                <div className="mt-2 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-3 animate-[fadeIn_0.2s_ease]">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Card Number
                    </label>
                    <div className="mt-1 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-slate-200">
                      <FiCreditCard className="text-slate-400" size={15} />
                      <span className="text-sm text-slate-400 tracking-widest">
                        4242 4242 4242 4242
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Expiry
                      </label>
                      <div className="mt-1 px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-400">
                        12 / 28
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        CVC
                      </label>
                      <div className="mt-1 px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-400">
                        •••
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1">
                    <FiLock size={10} />
                    Demo card. You'll be redirected to Stripe Checkout.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 overflow-hidden h-fit lg:sticky lg:top-24">
            <div className="bg-gradient-to-br from-slate-900 to-emerald-900 px-4 sm:px-5 py-4 text-white">
              <div className="flex items-center gap-2 text-emerald-300 text-[10px] font-bold uppercase tracking-widest">
                <FiShoppingBag size={12} />
                Order Summary
              </div>
              <p className="text-lg font-extrabold mt-1">
                ${total.toLocaleString()}
              </p>
            </div>

            <div className="p-4 sm:p-5 flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Items ({items})</span>
                <span className="font-bold text-slate-800">
                  ${Number(price).toLocaleString()}
                </span>
              </div>

              <div className="border-t border-dashed border-slate-200 pt-3 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-800">Total</span>
                <span className="text-xl font-extrabold text-emerald-600">
                  ${total.toLocaleString()}
                </span>
              </div>

              <button
                onClick={handlePay}
                disabled={loading}
                className={`mt-1 w-full py-3.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  loading
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5"
                }`}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FiLock size={14} />
                    {paymentMethod === "stripe"
                      ? `Pay $${total.toLocaleString()}`
                      : "Confirm Order"}
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
                <FiLock size={10} />
                Secure & encrypted checkout
              </p>

              <Link
                to="/cart"
                className="text-[11px] text-center text-slate-400 hover:text-emerald-600 transition"
              >
                ← Back to cart
              </Link>
            </div>
          </div>
        </div>

        {/* Order ID small note */}
        <p className="text-center text-[11px] text-slate-400 mt-4">
          Order ID: <code className="text-slate-600">{orderId}</code>
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default Payment;
