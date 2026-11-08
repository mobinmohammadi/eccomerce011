import { useState } from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiShoppingBag } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";

const Products = ({ title, products }) => {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  const breakpoints = {
    0: { slidesPerView: 1, spaceBetween: 16 },
    464: { slidesPerView: 1, spaceBetween: 16 },
    1024: { slidesPerView: 1, spaceBetween: 16 },
    3000: { slidesPerView: 1, spaceBetween: 16 },
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center pb-3 border-b border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 relative pl-3">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-emerald-500 rounded-full" />
          {title}
        </h3>
        <div className="flex justify-center items-center gap-2">
          <button
            ref={(node) => setPrevEl(node)}
            type="button"
            aria-label="Previous"
            className="w-9 h-9 flex justify-center items-center bg-white border border-slate-200 rounded-full text-slate-600 shadow-sm hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-600 disabled:hover:border-slate-200"
          >
            <IoIosArrowBack />
          </button>
          <button
            ref={(node) => setNextEl(node)}
            type="button"
            aria-label="Next"
            className="w-9 h-9 flex justify-center items-center bg-white border border-slate-200 rounded-full text-slate-600 shadow-sm hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-600 disabled:hover:border-slate-200"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={breakpoints}
        loop={false}
        navigation={{ prevEl, nextEl }}
        className="w-full"
      >
        {products?.map((p, i) => (
          <SwiperSlide key={i}>
            <div className="flex flex-col gap-3">
              {p?.map((pl, j) => (
                <Link
                  key={j}
                  to="/product/details/new"
                  className="group flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-100 hover:border-emerald-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="relative w-[90px] h-[90px] shrink-0 overflow-hidden rounded-lg bg-slate-50">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={pl.images[0]}
                      alt={pl.name || "product"}
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-1 min-w-0 flex-1">
                    <h4 className="text-sm font-medium text-slate-700 truncate group-hover:text-emerald-600 transition-colors">
                      {pl.name || "Product Name"}
                    </h4>
                    <span className="text-base font-bold text-emerald-600">
                      ${pl.price || 434}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                      <FiShoppingBag size={11} /> Shop now
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </SwiperSlide>
          
        ))}
      </Swiper>
    </div>
  );
};

export default Products;