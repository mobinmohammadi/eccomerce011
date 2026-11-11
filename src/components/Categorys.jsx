
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const Categorys = ({ categoris }) => {
  const backgrounds = [
    "bg-[#f2f0e9]",
    "bg-[#edf2f0]",
    "bg-[#f5eeee]",
    "bg-[#eff0f5]",
    "bg-[#f5f1e8]",
    "bg-[#eef2e9]",
  ];

  return (
    <section className="w-[94%] max-w-[1400px] mx-auto py-16 md:py-24">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10 md:mb-14">
        <div>
          <span className="text-xs font-bold uppercase tracking-[4px] text-emerald-600">
            Discover More
          </span>

          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-slate-900">
            Shop by <span className="text-emerald-600">Category.</span>
          </h2>

          <p className="mt-3 text-sm text-slate-400 max-w-md leading-7">
            Explore our collections and find your favorite products.
          </p>
        </div>

        <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
          {categoris?.length || 0} Collections Available
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {categoris?.map((c, i) => (
          <Link
            key={c._id || c.slug}
            to={c.slug}
            className={`group relative flex min-h-[210px] overflow-hidden rounded-[25px] ${
              backgrounds[i % backgrounds.length]
            } transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60`}
          >
            <div className="relative z-10 flex w-[55%] flex-col justify-between p-5 sm:p-6">
              <span className="text-[11px] font-bold tracking-[3px] text-slate-400">
                COLLECTION / {String(i + 1).padStart(2, "0")}
              </span>

              <div>
                <h3 className="text-xl sm:text-2xl font-black leading-tight text-slate-800 transition-colors duration-300 group-hover:text-emerald-700 line-clamp-2">
                  {c.name}
                </h3>

                <div className="mt-5 flex items-center gap-2 text-xs font-bold text-slate-600 transition-all duration-300 group-hover:gap-4 group-hover:text-emerald-700">
                  Explore
                  <FaArrowRight size={11} />
                </div>
              </div>
            </div>

            <div className="absolute right-0 top-0 h-full w-[52%] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/[0.02]" />

              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="h-full w-full object-contain p-3 sm:p-5 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-3"
              />
            </div>

            <span className="absolute -bottom-10 -right-3 text-[100px] font-black leading-none text-black/[0.035] transition-transform duration-500 group-hover:-translate-y-3">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="absolute bottom-0 left-0 h-1 w-0 bg-emerald-600 transition-all duration-500 group-hover:w-full" />
          </Link>
        ))}
      </div>

    </section>
  );
};

export default Categorys;
