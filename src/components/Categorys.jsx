import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Categorys = ({ categoris }) => {
  const breakpoints = {
    0: { slidesPerView: 2, spaceBetween: 12 },
    440: { slidesPerView: 2, spaceBetween: 12 },
    640: { slidesPerView: 3, spaceBetween: 16 },
    1024: { slidesPerView: 4, spaceBetween: 16 },
    3000: { slidesPerView: 6, spaceBetween: 20 },
  };

  return (
    <section className="w-[92%] max-w-[1400px] mx-auto py-12">
      <div className="text-center flex flex-col items-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
          Top Categories
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-md">
          Browse our most popular categories and find what you need.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mt-4" />
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        breakpoints={breakpoints}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true, dynamicBullets: true }}
        className="!pb-12"
      >
        {categoris?.length
          ? categoris.map((c, i) => (
              <SwiperSlide key={i}>
                <Link
                  to={c.slug}
                  className="group relative flex flex-col items-center justify-center h-[200px] bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1.5 hover:border-emerald-200"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-transparent to-emerald-50/0 group-hover:from-emerald-50/60 transition-all duration-500" />

                  <div className="relative w-[100px] h-[100px] flex items-center justify-center mb-4">
                    <div className="absolute inset-0 rounded-full bg-emerald-50 scale-0 group-hover:scale-100 transition-transform duration-500" />
                    <img
                      src={c.image}
                      alt={c.name}
                      className="relative w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <span className="relative px-5 py-1.5 bg-slate-800/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full group-hover:bg-emerald-600 transition-colors duration-300">
                    {c.name}
                  </span>

                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-emerald-100 pointer-events-none transition-all duration-300" />
                </Link>
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </section>
  );
};

export default Categorys;