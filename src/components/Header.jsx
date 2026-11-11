
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoMdPhonePortrait, IoIosArrowDown } from "react-icons/io";
import {
  FaFacebookF,
  FaList,
  FaLock,
  FaUser,
  FaLinkedin,
  FaGithub,
  FaPhoneAlt,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import { FaTwitter, FaHeart, FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { useSelector } from "react-redux";

const Header = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(searchParams.get("value") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  const { categorys = [] } = useSelector((state) => state.home);
  const { userInfo } = useSelector((state) => state.auth);
  const { cart_product_count } = useSelector((state) => state.cart);

  const navLinks = [
    { to: "/", label: "HOME" },
    { to: "/shops", label: "SHOP" },
    { to: "/blog", label: "BLOG" },
    { to: "/about", label: "ABOUT US" },
    { to: "/contact", label: "CONTACT US" },
  ];

  const socialLinks = [FaFacebookF, FaTwitter, FaLinkedin, FaGithub];

  const search = (e) => {
    e.preventDefault();
    navigate(
      `/products/search?category=${encodeURIComponent(category)}&value=${encodeURIComponent(searchValue)}`
    );
  };

  const isActive = (path) => pathname === path;

  const closeSidebar = () => setSidebarOpen(false);

  return (
<header className="sticky top-0 z-[100] w-full h-auto bg-white/95 border-b border-slate-100 shadow-[0_4px_25px_rgba(15,23,42,0.04)] font-sans">
      <div className="hidden md:block bg-slate-950 text-slate-300">
        <div className="w-[92%] max-w-[1400px] mx-auto">
          <div className="h-10 flex items-center justify-between text-xs">

            <div className="flex items-center gap-7">
              <a
                href="mailto:support@gmail.com"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <MdEmail size={15} className="text-emerald-400" />
                support@gmail.com
              </a>

              <a
                href="tel:09391177395"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <IoMdPhonePortrait size={15} className="text-emerald-400" />
                09391177395
              </a>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                {socialLinks.map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 text-slate-300 hover:bg-emerald-500 hover:text-white transition-all duration-300"
                  >
                    <Icon size={11} />
                  </a>
                ))}
              </div>

              <span className="w-px h-4 bg-white/10" />

              <div className="relative group flex items-center gap-2 cursor-pointer px-2 py-1 rounded-lg hover:bg-white/5 transition">
                <img
                  src="/images/language.png"
                  alt="language"
                  className="w-4 h-4"
                />
                <span>EN</span>
                <IoIosArrowDown
                  size={12}
                  className="group-hover:rotate-180 transition-transform"
                />

                <ul className="absolute top-full right-0 mt-2 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 w-32 bg-white text-slate-700 rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                  <li className="px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600 transition">
                    English
                  </li>
                  <li className="px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600 transition">
                    فارسی
                  </li>
                </ul>
              </div>

              <Link
                to={userInfo ? userInfo.name : "/login"}
                className="flex items-center gap-2 font-semibold hover:text-emerald-400 transition-colors"
              >
                {userInfo ? <FaUser size={12} /> : <FaLock size={12} />}
                {userInfo?.name || "Login"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[92%] max-w-[1400px] mx-auto">

        <div className="h-[72px] lg:h-[82px] flex items-center justify-between gap-5">

          <div className="flex items-center justify-between w-full lg:w-auto">
            <Link to="/" className="shrink-0 group">
              <img
                src="/images/logo.png"
                alt="Easy Shop"
                className="h-9 lg:h-10 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-emerald-500 hover:text-white transition-all"
            >
              <FaList size={17} />
            </button>
          </div>

          <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-[13px] font-bold tracking-wide">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative py-3 transition-colors duration-300 ${
                  isActive(to)
                    ? "text-emerald-600"
                    : "text-slate-600 hover:text-emerald-600"
                }`}
              >
                {label}

                <span
                  className={`absolute bottom-1 left-0 h-[2px] rounded-full bg-emerald-500 transition-all duration-300 ${
                    isActive(to) ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 hover:bg-rose-500 hover:text-white transition-all duration-300 group"
            >
              <FaHeart size={17} />
              {cart_product_count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[19px] h-[19px] px-1 flex items-center justify-center rounded-full bg-rose-500 text-white text-[10px] font-bold border-2 border-white">
                  {cart_product_count}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              aria-label="Cart"
              className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 hover:bg-emerald-500 hover:text-white transition-all duration-300"
            >
              <FaCartShopping size={17} />
              {cart_product_count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[19px] h-[19px] px-1 flex items-center justify-center rounded-full bg-emerald-600 text-white text-[10px] font-bold border-2 border-white">
                  {cart_product_count}
                </span>
              )}
            </Link>

            <Link
              to={userInfo ? userInfo.name : "/login"}
              className="ml-1 px-6 h-11 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-bold transition-all duration-300 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 hover:-translate-y-0.5"
            >
              <FaUser size={13} />
              {userInfo?.name || "Login"}
            </Link>
          </div>
        </div>
      </div>

      <div className="w-[92%] max-w-[1400px] mx-auto pb-4">
        <div className="flex items-center gap-3 lg:gap-5">

          <div className="hidden lg:block relative w-[230px] shrink-0">
            <button
              onClick={() => setCategoryOpen((v) => !v)}
              className="w-full h-12 flex items-center justify-between px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-600/20"
            >
              <span className="flex items-center gap-3">
                <FaList size={15} />
                All Category
              </span>

              <IoIosArrowDown
                size={16}
                className={`transition-transform duration-300 ${
                  categoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`absolute top-[calc(100%+10px)] left-0 w-full bg-white rounded-2xl border border-slate-100 shadow-2xl shadow-slate-300/40 z-50 overflow-hidden transition-all duration-300 origin-top ${
                categoryOpen
                  ? "visible opacity-100 scale-100"
                  : "invisible opacity-0 scale-95"
              }`}
            >
              <ul className="py-2 max-h-[380px] overflow-y-auto">
                {categorys?.map((c) => (
                  <li key={c._id}>
                    <Link
                      to={`/products?category=${encodeURIComponent(c.name)}`}
                      onClick={() => setCategoryOpen(false)}
                      className="flex items-center px-5 py-3 text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all border-l-[3px] border-transparent hover:border-emerald-500"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <form
            onSubmit={search}
            className="flex flex-1 h-12 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden transition-all duration-300 focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/10"
          >
            <div className="hidden md:flex items-center px-3 border-r border-slate-200">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="max-w-[150px] bg-transparent text-sm text-slate-600 font-medium outline-none cursor-pointer"
              >
                <option value="">All Categories</option>
                {categorys?.map((c) => (
                  <option key={c._id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for products..."
              className="flex-1 min-w-0 bg-transparent outline-none px-4 text-sm text-slate-700 placeholder:text-slate-400"
            />

            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-5 md:px-7 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors"
            >
              <FaSearch size={14} />
              <span className="hidden sm:inline">SEARCH</span>
            </button>
          </form>

          <div className="hidden xl:flex items-center gap-3 shrink-0 pl-2">
            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <FaPhoneAlt size={16} />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-slate-800 tracking-wide">
                09391177395
              </span>
              <span className="text-[11px] text-slate-400">
                Support 24/7
              </span>
            </div>
          </div>
        </div>
      </div>

      
<div
  onClick={closeSidebar}
  className={`fixed inset-0 z-[998] h-screen bg-slate-950/60 backdrop-blur-sm lg:hidden transition-all duration-500 ${
    sidebarOpen ? "visible opacity-100" : "invisible opacity-0"
  }`}
/>

<aside
  className={`fixed top-0 left-0 z-[999] w-[320px] max-w-[88vw] h-screen bg-white lg:hidden shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
  <div className="h-full flex flex-col overflow-y-auto">

    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-500 px-6 pt-7 pb-9">
      <div className="absolute -top-16 -right-12 w-44 h-44 rounded-full bg-white/10" />
      <div className="absolute -bottom-16 -left-10 w-36 h-36 rounded-full bg-white/10" />

      <div className="relative flex items-center justify-between">
        <Link to="/" onClick={closeSidebar}>
          <img
            src="/images/logo.png"
            alt="Easy Shop"
            className="h-9 object-contain brightness-0 invert"
          />
        </Link>

        <button
          onClick={closeSidebar}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/15 text-white hover:bg-white/25 transition"
          aria-label="Close menu"
        >
          <FaTimes size={17} />
        </button>
      </div>

      <div className="relative mt-8 flex items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white shadow-lg">
          <FaUser size={23} />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-white/70 text-xs mb-1">
            Welcome to Easy Shop
          </p>
          <p className="text-white font-bold text-base truncate">
            {userInfo?.name || "Hello, Guest!"}
          </p>
          <p className="text-emerald-50 text-[11px] mt-1">
            {userInfo ? "Your account" : "Sign in to your account"}
          </p>
        </div>
      </div>

      <Link
        to={userInfo ? userInfo.name : "/login"}
        onClick={closeSidebar}
        className="relative mt-6 w-full h-11 rounded-xl bg-white text-emerald-700 flex items-center justify-center gap-2 text-sm font-bold shadow-lg hover:bg-emerald-50 transition"
      >
        <FaUser size={13} />
        {userInfo ? "My Account" : "Login / Register"}
      </Link>
    </div>

    <div className="px-5 pt-6">
      <p className="px-3 mb-3 text-[11px] font-bold text-slate-400 tracking-widest">
        MAIN MENU
      </p>

      <nav className="flex flex-col gap-1.5">
        {[
          { to: "/", label: "Home", icon: "⌂" },
          { to: "/shops", label: "Shop", icon: "▣" },
          { to: "/blog", label: "Blog", icon: "▤" },
          { to: "/about", label: "About Us", icon: "◉" },
          { to: "/contact", label: "Contact Us", icon: "✉" },
        ].map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            onClick={closeSidebar}
            className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 ${
              isActive(to)
                ? "bg-emerald-50 text-emerald-700 shadow-sm"
                : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
            }`}
          >
            <span
              className={`w-9 h-9 rounded-lg flex items-center justify-center text-xl transition-all ${
                isActive(to)
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600"
              }`}
            >
              {icon}
            </span>

            <span className="flex-1 text-sm font-semibold">{label}</span>

            <IoIosArrowDown
              className="-rotate-90 text-slate-300 group-hover:text-emerald-500"
              size={15}
            />
          </Link>
        ))}
      </nav>
    </div>

    <div className="px-5 mt-7">
      <p className="px-3 mb-3 text-[11px] font-bold text-slate-400 tracking-widest">
        QUICK ACCESS
      </p>

      <div className="grid grid-cols-2 gap-3">
        <Link
          to="/wishlist"
          onClick={closeSidebar}
          className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition"
        >
          <FaHeart size={20} />
          <span className="text-xs font-bold">Wishlist</span>
        </Link>

        <Link
          to="/cart"
          onClick={closeSidebar}
          className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"
        >
          <FaCartShopping size={20} />
          <span className="text-xs font-bold">My Cart</span>
          {cart_product_count > 0 && (
            <span className="text-[10px] font-bold">
              {cart_product_count} items
            </span>
          )}
        </Link>
      </div>
    </div>

    <div className="px-5 mt-7">
      <p className="px-3 mb-3 text-[11px] font-bold text-slate-400 tracking-widest">
        CATEGORIES
      </p>

      <div className="rounded-2xl bg-slate-50 p-2">
        {categorys?.slice(0, 5).map((c) => (
          <Link
            key={c._id}
            to={`/products?category=${encodeURIComponent(c.name)}`}
            onClick={closeSidebar}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-white hover:text-emerald-600 transition"
          >
            <span>{c.name}</span>
            <IoIosArrowDown className="-rotate-90 text-slate-300" size={13} />
          </Link>
        ))}

        <Link
          to="/shops"
          onClick={closeSidebar}
          className="block px-3 py-2.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
        >
          View All Categories
        </Link>
      </div>
    </div>

    <div className="mt-auto px-5 pt-7 pb-6">
      <div className="rounded-2xl bg-slate-950 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <FaPhoneAlt size={16} />
          </div>

          <div>
            <p className="text-xs text-slate-400">Need help?</p>
            <a
              href="tel:09391177395"
              className="text-sm font-bold tracking-wide"
            >
              09391177395
            </a>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Support available 24/7
          </span>

          <div className="flex gap-2">
            {[FaFacebookF, FaTwitter, FaLinkedin, FaGithub].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-slate-300 hover:bg-emerald-500 hover:text-white transition"
              >
                <Icon size={11} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>

  </div>
</aside>

    </header>
  );
};

export default Header;
