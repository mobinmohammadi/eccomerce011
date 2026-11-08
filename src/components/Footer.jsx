import { Link } from 'react-router';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className='bg-[#f3f6fa]'>
            {/* بخش اصلی */}
            <div className='w-[90%] sm:w-[85%] flex flex-wrap mx-auto border-b py-10 sm:py-12 lg:py-16 gap-y-8'>

                {/* ستون 1: لوگو و اطلاعات تماس */}
                <div className='w-full lg:w-3/12'>
                    <div className='flex flex-col gap-3 items-center lg:items-start text-center lg:text-right'>
                        <img
                            className='w-[150px] sm:w-[190px] h-auto'
                            src="/images/logo.png"
                            alt="logo"
                        />
                        <ul className='flex flex-col gap-2 text-slate-600 text-sm sm:text-base'>
                            <li>Address : iran, urmie</li>
                            <li>Phone : 09391177395</li>
                            <li className='break-all'>Email : mobinmohammadi@gmail.com</li>
                        </ul>
                    </div>
                </div>

                {/* ستون 2: لینک‌های مفید */}
                <div className='w-full sm:w-1/2 lg:w-5/12'>
                    <div className='flex justify-center lg:justify-center w-full'>
                        <div className='w-full max-w-md'>
                            <h2 className='font-bold text-base sm:text-lg mb-3 text-center lg:text-right'>
                                Usefull Links
                            </h2>
                            <div className='flex justify-between gap-6 sm:gap-10 lg:gap-[60px]'>
                                <ul className='flex flex-col gap-2 text-slate-600 text-xs sm:text-sm font-semibold'>
                                    <li><Link className='hover:text-[#059473]'>About Us</Link></li>
                                    <li><Link className='hover:text-[#059473]'>About Our Shop</Link></li>
                                    <li><Link className='hover:text-[#059473]'>Delivery Information</Link></li>
                                    <li><Link className='hover:text-[#059473]'>Privacy Policy</Link></li>
                                    <li><Link className='hover:text-[#059473]'>Blogs</Link></li>
                                </ul>

                                <ul className='flex flex-col gap-2 text-slate-600 text-xs sm:text-sm font-semibold'>
                                    <li><Link className='hover:text-[#059473]'>Our Service</Link></li>
                                    <li><Link className='hover:text-[#059473]'>Company Profile</Link></li>
                                    <li><Link className='hover:text-[#059473]'>Delivery Information</Link></li>
                                    <li><Link className='hover:text-[#059473]'>Privacy Policy</Link></li>
                                    <li><Link className='hover:text-[#059473]'>Blogs</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ستون 3: عضویت در خبرنامه */}
                <div className='w-full sm:w-1/2 lg:w-4/12'>
                    <div className='w-full flex flex-col gap-4 lg:gap-5'>
                        <h2 className='font-bold text-base sm:text-lg mb-1'>Join Our Shop</h2>
                        <span className='text-sm sm:text-base text-slate-600'>
                            Get Email updates about our latest and shop specials offers
                        </span>

                        {/* فرم اشتراک - روی موبایل دکمه زیر input می‌رود */}
                        <div className='w-full bg-white border relative h-auto sm:h-[50px] flex flex-col sm:flex-row rounded-md overflow-hidden'>
                            <input
                                className='h-[46px] sm:h-full bg-transparent w-full px-3 outline-0 text-sm'
                                type="text"
                                placeholder='Enter Your Email'
                            />
                            <button className='h-[46px] sm:h-full w-full sm:w-auto sm:absolute sm:right-0 bg-[#059473] text-white uppercase px-4 font-bold text-xs sm:text-sm'>
                                Subscribe
                            </button>
                        </div>

                        <ul className='flex justify-start items-center gap-3'>
                            <li>
                                <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full transition-colors' href="#"><FaFacebookF /></a>
                            </li>
                            <li>
                                <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full transition-colors' href="#"><FaTwitter /></a>
                            </li>
                            <li>
                                <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full transition-colors' href="#"><FaLinkedin /></a>
                            </li>
                            <li>
                                <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full transition-colors' href="#"><FaGithub /></a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            {/* کپی‌رایت */}
            <div className='w-[90%] flex flex-wrap justify-center items-center text-slate-600 mx-auto py-5 text-center text-xs sm:text-sm'>
                <span>Copyright @ 2026 All Rights Reserved</span>
            </div>
        </footer>
    );
};

export default Footer;  