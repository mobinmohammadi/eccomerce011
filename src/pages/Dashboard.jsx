
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, Outlet, useLocation } from "react-router";
import {
  FaBorderAll,
  FaHeart,
  FaRegUser,
  FaBars,
} from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { get_dashboard_index_data } from "../store/Reducers/dashboardReducer";

const navigation = [
  {
    title: "WORKSPACE",
    items: [
      { label: "Dashboard", to: "/dashboard", icon: IoIosHome },
      { label: "My Orders", to: "/dashboard/myorders", icon: FaBorderAll },
      { label: "Wishlist", to: "/dashboard/wishlist", icon: FaHeart },
      { label: "Messages", to: "/dashboard/chat", icon: IoChatbubbleEllipsesSharp },
    ],
  },
  {
    title: "PREFERENCES",
    items: [
      {
        label: "Security",
        to: "/dashboard/change-password",
        icon: RiLockPasswordLine,
      },
      { label: "Logout", to: "/logout", icon: IoMdLogOut, danger: true },
    ],
  },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo?.id) {
      dispatch(get_dashboard_index_data(userInfo.id));
    }
  }, [dispatch, userInfo?.id]);

  const activeRoute = (to) =>
    to === "/dashboard"
      ? pathname === to
      : pathname === to || pathname.startsWith(to + "/");

  return (
    <div className="min-h-screen bg-[#f3f5f9]">
      <Header />

      <div className="mx-auto flex min-h-[85vh] max-w-[1800px] p-3 sm:p-5 lg:p-7">

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-[#10182d]/60 backdrop-blur-sm lg:hidden"
          />
        )}

        <aside
          className={`
            z-100
            fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col
            bg-[#111a2e] text-white shadow-2xl
            transition-transform duration-300
            lg:sticky lg:top-5 lg:z-20 lg:mr-6 lg:h-[calc(100vh-40px)]
            lg:translate-x-0 lg:rounded-[28px]
            xl:w-[290px]
            ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }
          `}
        >
          <div className="flex items-center justify-between px-6 pb-7 pt-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#b7f36b] text-xl font-black text-[#152137] shadow-lg shadow-lime-400/20">
                S
              </div>
              <div>
                <h2 className="text-lg font-black tracking-wide">
                  STORE<span className="text-[#b7f36b]">.</span>
                </h2>
                <p className="text-[10px] tracking-[2px] text-slate-400">
                  CUSTOMER SPACE
                </p>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg bg-white/10 p-2 text-slate-300 lg:hidden"
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>

          <div className="mx-4 mb-7 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#b7f36b] to-[#68cfa5] text-lg text-[#152137]">
                <FaRegUser />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-slate-400">
                  Welcome back
                </p>
                <p className="mt-1 truncate text-sm font-bold text-white">
                  {userInfo?.name || userInfo?.username || "Customer"}
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 pb-5">
            {navigation.map((group) => (
              <div key={group.title} className="mb-8">
                <p className="mb-3 px-3 text-[10px] font-bold tracking-[2px] text-slate-500">
                  {group.title}
                </p>

                <div className="space-y-1.5">
                  {group.items.map(({ label, to, icon: Icon, danger }) => {
                    const active = activeRoute(to);

                    return (
                      <Link
                        key={to}
                        to={to}
                        onClick={() => setSidebarOpen(false)}
                        title={label}
                        className={`
                          group relative flex items-center gap-3
                          rounded-xl px-3 py-3 transition-all duration-200
                          ${
                            danger
                              ? "text-rose-300 hover:bg-rose-500/10"
                              : active
                                ? "bg-[#b7f36b] font-bold text-[#152137] shadow-lg shadow-lime-400/10"
                                : "text-slate-400 hover:bg-white/[0.07] hover:text-white"
                          }
                        `}
                      >
                        <Icon className="shrink-0 text-lg" />
                        <span className="flex-1 text-sm">{label}</span>

                        {active && !danger && (
                          <span className="h-2 w-2 rounded-full bg-[#152137]" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="m-4 rounded-2xl border border-white/10 bg-gradient-to-br from-[#263750] to-[#18243a] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold text-white">
                Need Help?
              </span>
              <HiOutlineArrowUpRight className="text-[#b7f36b]" />
            </div>
            <p className="text-[11px] leading-5 text-slate-400">
              Our support team is here to help you with your orders.
            </p>
            <Link
              to="/dashboard/chat"
              onClick={() => setSidebarOpen(false)}
              className="mt-3 block rounded-xl bg-[#b7f36b] px-3 py-2.5 text-center text-xs font-black text-[#152137] transition hover:bg-white"
            >
              Contact Support
            </Link>
          </div>
        </aside>

        <main className="min-w-0 flex-1">

          <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-white bg-white/80 p-3 shadow-sm sm:p-4 lg:rounded-[22px]">
            <div className="flex min-w-0 items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#111a2e] text-white transition hover:bg-[#263750] lg:hidden"
                aria-label="Open sidebar"
              >
                <FaBars />
              </button>

              <div className="min-w-0">
                <p className="hidden text-[11px] font-semibold uppercase tracking-widest text-slate-400 sm:block">
                  CUSTOMER PORTAL / ACCOUNT
                </p>
                <h1 className="truncate text-base font-black text-[#17233a] sm:mt-1 sm:text-xl">
                  Welcome to your space
                </h1>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-xl bg-[#f3f7ed] px-3 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold text-emerald-700 sm:text-xs">
                ONLINE
              </span>
            </div>
          </div>

          <section className="min-h-[70vh] overflow-hidden rounded-2xl sm:rounded-[28px]">
            <Outlet />
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
