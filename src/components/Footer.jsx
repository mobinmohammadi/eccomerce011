
import { Link } from 'react-router';
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMapPin, FiPhone, FiMail, FiArrowUpRight, FiSend } from "react-icons/fi";

const Footer = () => {
    const usefulLinks = [
        "About Us",
        "About Our Shop",
        "Delivery Information",
        "Privacy Policy",
        "Blogs",
    ];

    const serviceLinks = [
        "Our Services",
        "Company Profile",
        "Support Center",
        "Terms & Conditions",
        "Contact Us",
    ];

    const socialLinks = [
        { icon: <FaFacebookF />, link: "#", label: "Facebook" },
        { icon: <FaXTwitter />, link: "#", label: "Twitter" },
        { icon: <FaLinkedinIn />, link: "#", label: "LinkedIn" },
        { icon: <FaGithub />, link: "#", label: "Github" },
    ];

    return (
        <footer className="bg-[#f5f8f7] text-slate-700 overflow-hidden">

            {/* Main Footer */}
            <div className="w-[90%] lg:w-[85%] mx-auto pt-16 pb-12">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">

                    {/* Brand Section */}
                    <div className="lg:col-span-3">
                        <div className="flex flex-col items-center lg:items-start">
                            <img
                                src="/images/logo.png"
                                alt="Logo"
                                className="w-[170px] object-contain mb-5"
                            />

                            <p className="text-sm leading-7 text-slate-500 text-center lg:text-left max-w-xs">
                                We bring quality products and a wonderful shopping
                                experience right to your doorstep.
                            </p>

                            <div className="flex flex-col gap-4 mt-7 w-full text-sm">

                                <div className="flex items-center justify-center lg:justify-start gap-3 group">
                                    <span className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#059473] group-hover:bg-[#059473] group-hover:text-white transition-all">
                                        <FiMapPin size={17} />
                                    </span>
                                    <span className="text-slate-600">
                                        Urmia, Iran
                                    </span>
                                </div>

                                <div className="flex items-center justify-center lg:justify-start gap-3 group">
                                    <span className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#059473] group-hover:bg-[#059473] group-hover:text-white transition-all">
                                        <FiPhone size={17} />
                                    </span>
                                    <span className="text-slate-600">
                                        09391177395
                                    </span>
                                </div>

                                <div className="flex items-center justify-center lg:justify-start gap-3 group">
                                    <span className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#059473] group-hover:bg-[#059473] group-hover:text-white transition-all">
                                        <FiMail size={17} />
                                    </span>
                                    <span className="text-slate-600 break-all">
                                        mobinmohammadi@gmail.com
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Useful Links */}
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-bold text-slate-800 mb-7 text-center lg:text-left">
                            Useful Links
                            <span className="block w-10 h-[3px] bg-[#059473] rounded-full mt-3 mx-auto lg:mx-0" />
                        </h3>

                        <ul className="flex flex-col gap-4 items-center lg:items-start">
                            {usefulLinks.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to="#"
                                        className="text-sm text-slate-500 hover:text-[#059473] transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <FiArrowUpRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-bold text-slate-800 mb-7 text-center lg:text-left">
                            Customer Care
                            <span className="block w-10 h-[3px] bg-[#059473] rounded-full mt-3 mx-auto lg:mx-0" />
                        </h3>

                        <ul className="flex flex-col gap-4 items-center lg:items-start">
                            {serviceLinks.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to="#"
                                        className="text-sm text-slate-500 hover:text-[#059473] transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <FiArrowUpRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100">

                            <div className="w-12 h-12 rounded-2xl bg-[#e8f6f1] text-[#059473] flex items-center justify-center mb-5">
                                <FiSend size={23} />
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 mb-3">
                                Join Our Newsletter
                            </h3>

                            <p className="text-sm text-slate-500 leading-7 mb-6">
                                Subscribe to get updates about our latest products,
                                exclusive offers and special discounts.
                            </p>

                            <form
                                onSubmit={(e) => e.preventDefault()}
                                className="flex flex-col sm:flex-row gap-3"
                            >
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email address"
                                    className="w-full min-w-0 h-12 px-4 rounded-xl border border-slate-200 bg-[#f9fbfa] outline-none text-sm focus:border-[#059473] focus:ring-4 focus:ring-[#059473]/10 transition-all"
                                />

                                <button
                                    type="submit"
                                    className="h-12 px-6 rounded-xl bg-[#059473] hover:bg-[#04785e] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-[#059473]/20 active:scale-95 whitespace-nowrap"
                                >
                                    Subscribe
                                    <FiArrowUpRight size={17} />
                                </button>
                            </form>

                            <p className="text-xs text-slate-400 mt-4">
                                We respect your privacy. Unsubscribe anytime.
                            </p>

                            {/* Social Media */}
                            <div className="mt-7 pt-6 border-t border-slate-100">
                                <p className="text-sm font-semibold text-slate-700 mb-4">
                                    Follow us on social media
                                </p>

                                <div className="flex items-center gap-3">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.link}
                                            aria-label={social.label}
                                            className="w-10 h-10 rounded-xl bg-[#f3f7f5] text-slate-500 flex items-center justify-center hover:bg-[#059473] hover:text-white hover:-translate-y-1 transition-all duration-300"
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-slate-200/80">
                <div className="w-[90%] lg:w-[85%] mx-auto py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-center">

                    <p className="text-xs sm:text-sm text-slate-500">
                        © 2026 All Rights Reserved.
                    </p>

                    <p className="text-xs sm:text-sm text-slate-500">
                        Designed with <span className="text-red-500">♥</span> for a better shopping experience.
                    </p>

                </div>
            </div>

        </footer>
    );
};

export default Footer;
