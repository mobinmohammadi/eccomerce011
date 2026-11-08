import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router';
import { IoIosArrowForward } from "react-icons/io";

const Shipping = () => {
  const [res, setRes] = useState(false);
  const [state, setState] = useState({
    name: '',
    address: '',
    phone: '',
    post: '',
    province: '',
    city: '',
    area: ''
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const save = (e) => {
    e.preventDefault();
    const { name, address, phone, post, province, city, area } = state;
    if (name && address && phone && post && province && city && area) {
      setRes(true);
    }
  };

  return (
    <div>
      <Header />

      {/* ===== Banner ===== */}
      <section className='bg-[url("/images/banner/shop.png")] h-[160px] sm:h-[200px] md:h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
          <div className='w-[90%] sm:w-[90%] md:w-[90%] lg:w-[85%] h-full mx-auto'>
            <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
              <h2 className='text-2xl sm:text-3xl font-bold'>Shipping Page</h2>
              <div className='flex justify-center items-center gap-2 text-lg sm:text-xl md:text-2xl w-full'>
                <Link to='/'>Home</Link>
                <span className='pt-1'><IoIosArrowForward /></span>
                <span>Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Main ===== */}
      <section className='bg-[#eeeeee]'>
        <div className='w-[92%] sm:w-[90%] md:w-[90%] lg:w-[85%] mx-auto py-8 sm:py-12 md:py-16'>
          <div className='w-full flex flex-wrap gap-y-5'>

            {/* ---- ستون چپ (فرم و محصولات) ---- */}
            <div className='w-full lg:w-[67%] lg:pr-3'>
              <div className='flex flex-col gap-3'>

                {/* ---- فرم آدرس ---- */}
                <div className='bg-white p-4 sm:p-6 shadow-sm rounded-md'>
                  <h2 className='text-slate-600 font-bold pb-3'>Shipping Information</h2>

                  {!res && (
                    <form onSubmit={save}>
                      {/* ردیف 1: Name + Address */}
                      <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 w-full text-slate-600'>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                          <label htmlFor="name">Name</label>
                          <input
                            onChange={inputHandle}
                            value={state.name}
                            type="text"
                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                            name="name" id="name" placeholder='Name'
                          />
                        </div>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                          <label htmlFor="address">Address</label>
                          <input
                            onChange={inputHandle}
                            value={state.address}
                            type="text"
                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                            name="address" id="address" placeholder='Address'
                          />
                        </div>
                      </div>

                      {/* ردیف 2: Phone + Post */}
                      <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 w-full text-slate-600'>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                          <label htmlFor="phone">Phone</label>
                          <input
                            onChange={inputHandle}
                            value={state.phone}
                            type="text"
                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                            name="phone" id="phone" placeholder='Phone'
                          />
                        </div>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                          <label htmlFor="post">Post</label>
                          <input
                            onChange={inputHandle}
                            value={state.post}
                            type="text"
                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                            name="post" id="post" placeholder='Post'
                          />
                        </div>
                      </div>

                      {/* ردیف 3: Province + City */}
                      <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 w-full text-slate-600'>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                          <label htmlFor="province">Province</label>
                          <input
                            onChange={inputHandle}
                            value={state.province}
                            type="text"
                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                            name="province" id="province" placeholder='Province'
                          />
                        </div>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                          <label htmlFor="city">City</label>
                          <input
                            onChange={inputHandle}
                            value={state.city}
                            type="text"
                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                            name="city" id="city" placeholder='City'
                          />
                        </div>
                      </div>

                      {/* ردیف 4: Area + دکمه */}
                      <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 w-full text-slate-600'>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                          <label htmlFor="area">Area</label>
                          <input
                            onChange={inputHandle}
                            value={state.area}
                            type="text"
                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                            name="area" id="area" placeholder='Area'
                          />
                        </div>
                        <div className='flex flex-col gap-1 sm:mt-7 mb-2 w-full'>
                          <button className='px-3 py-[6px] rounded-sm hover:shadow-green-500/50 hover:shadow-lg bg-green-500 text-white'>
                            Save Change
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {res && (
                    <div className='flex flex-col gap-1'>
                      <h2 className='text-slate-600 font-semibold pb-2'>
                        Deliver To {state.name}
                      </h2>
                      <p className='break-words'>
                        <span className='bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded'>
                          Home
                        </span>
                        <span>
                          {state.phone} {state.address} {state.province} {state.city} {state.area}
                        </span>
                        <span
                          onClick={() => setRes(false)}
                          className='text-indigo-500 cursor-pointer ml-2'
                        >
                          Change
                        </span>
                      </p>
                      <p className='text-slate-600 text-sm'>Email To ariyan@gmail.com</p>
                    </div>
                  )}
                </div>

                {/* ---- کارت‌های محصول ---- */}
                {[1, 2].map((_, i) => (
                  <div key={i} className='flex bg-white p-4 flex-col gap-2 rounded-md'>
                    <div className='flex justify-start items-center'>
                      <h2 className='text-md text-slate-600 font-bold'>Easy Shop</h2>
                    </div>

                    {[1, 2].map((_, j) => (
                      <div key={j} className='w-full flex flex-col sm:flex-row gap-2'>
                        {/* تصویر + نام */}
                        <div className='flex w-full sm:w-7/12 gap-2'>
                          <div className='flex gap-2 justify-start items-center'>
                            <img
                              className='w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] object-cover'
                              src={`/images/products/${j + 1}.webp`}
                              alt=""
                            />
                            <div className='pr-4 text-slate-600'>
                              <h2 className='text-md font-semibold'>Product Name</h2>
                              <span className='text-sm'>Brand: Jara</span>
                            </div>
                          </div>
                        </div>

                        {/* قیمت + کنترل تعداد */}
                        <div className='flex justify-between w-full sm:w-5/12 sm:mt-0 mt-2'>
                          <div className='sm:pl-4 pl-0'>
                            <h2 className='text-lg text-orange-500'>$240</h2>
                            <p className='line-through'>$300</p>
                            <p>-15%</p>
                          </div>
                          <div className='flex gap-2 flex-col'>
                            <div className='flex bg-slate-200 h-[30px] justify-center items-center text-xl'>
                              <div className='px-3 cursor-pointer'>-</div>
                              <div className='px-3'>2</div>
                              <div className='px-3 cursor-pointer'>+</div>
                            </div>
                            <button className='px-5 py-[3px] bg-red-500 text-white text-sm rounded-sm'>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* ---- ستون راست (خلاصه سفارش) ---- */}
            <div className='w-full lg:w-[33%]'>
              <div className='pl-0 lg:pl-3 mt-4 lg:mt-0'>
                <div className='bg-white p-4 text-slate-600 flex flex-col gap-3 rounded-md'>
                  <h2 className='text-xl font-bold'>Order Summary</h2>
                  <div className='flex justify-between items-center'>
                    <span>Items Total (5)</span>
                    <span>$343</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span>Delivery Fee</span>
                    <span>$40</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span>Total Payment</span>
                    <span>$450</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span>Total</span>
                    <span className='text-lg text-[#059473]'>$490</span>
                  </div>
                  <button
                    disabled={!res}
                    className={`px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg ${
                      res ? 'bg-red-500' : 'bg-red-300'
                    } text-sm text-white uppercase`}
                  >
                    Place Order
                  </button>
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