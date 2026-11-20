import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router";
import { IoIosArrowForward } from "react-icons/io";
import Rating from "../components/Rating";
import {
  FaHeart,
  FaStar,
  FaRegStar,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaShoppingBag,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaMinus,
  FaPlus,
  FaCheckCircle,
} from "react-icons/fa";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineShoppingCart,
} from "react-icons/hi2";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { get_details_product } from "../store/Reducers/homeReducers";
import {
  add_to_cart,
  get_cart_product,
  messageClear,
} from "../store/Reducers/cartReducer";
import toast from "react-hot-toast";

const ModernReviews = () => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const reviewsData = [
    {
      id: 1,
      name: "Kazi Ariyan",
      date: "7 Jan 2024",
      rating: 4,
      text: "Great product with excellent quality. The overall experience was amazing.",
    },
    {
      id: 2,
      name: "Ali Rezaei",
      date: "5 Feb 2024",
      rating: 5,
      text: "عالی بود! کیفیت محصول فوق‌العاده بود و دقیقاً همون چیزی بود که انتظار داشتم.",
    },
    {
      id: 3,
      name: "Sara Ahmadi",
      date: "12 Mar 2024",
      rating: 3,
      text: "رنگ محصول کمی با عکس متفاوت بود، اما در کل راضی هستم. بسته‌بندی خیلی خوب بود.",
    },
    {
      id: 4,
      name: "Reza Karimi",
      date: "20 Apr 2024",
      rating: 4,
      text: "Very good quality and beautiful packaging. Recommended!",
    },
  ];

  const getAvatarColor = (name) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    return colors[name.charCodeAt(0) % colors.length];
  };

  const submitReview = () => {
    if (!reviewText.trim()) {
      toast.error("Please write your review");
      return;
    }

    toast.success("Review submitted successfully");
    setReviewText("");
    setRating(5);
  };

  return (
    <div className="space-y-8 py-8">
      {/* Review Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="sm:col-span-1 bg-gradient-to-br from-[#059473] to-[#04745c] rounded-3xl p-7 text-white flex flex-col items-center justify-center">
          <h2 className="text-5xl font-black">4.8</h2>
          <div className="flex gap-1 text-yellow-300 my-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <FaStar key={s} />
            ))}
          </div>
          <p className="text-sm text-white/80">Based on 24 reviews</p>
        </div>

        <div className="sm:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-center gap-4">
          {[5, 4, 3, 2, 1].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <span className="text-sm text-slate-500 w-3">{s}</span>
              <FaStar className="text-yellow-400 text-xs" />
              <div className="h-2.5 flex-1 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-[#059473] rounded-full"
                  style={{
                    width: `${s === 5 ? 75 : s === 4 ? 18 : s === 3 ? 7 : 0}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-800">Customer Reviews</h3>
          <span className="text-sm text-slate-400">
            {reviewsData.length} Reviews
          </span>
        </div>

        {reviewsData.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 hover:border-[#059473]/30 hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-start gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full ${getAvatarColor(
                    review.name,
                  )} flex items-center justify-center text-white font-bold text-lg`}
                >
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{review.name}</h4>
                  <p className="text-xs text-slate-400 mt-1">{review.date}</p>
                </div>
              </div>

              <div className="flex gap-0.5 text-yellow-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s}>
                    {s <= review.rating ? <FaStar /> : <FaRegStar />}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-7 mt-5">
              {review.text}
            </p>
          </div>
        ))}
      </div>

      {/* Write Review */}
      <div className="bg-slate-50 rounded-3xl p-5 sm:p-8 border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-[#059473]/10 text-[#059473] rounded-xl flex items-center justify-center text-xl">
            <HiOutlineChatBubbleLeftRight />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Write a Review</h3>
            <p className="text-xs text-slate-400">
              Share your experience with others
            </p>
          </div>
        </div>

        <p className="text-sm font-semibold text-slate-600 mb-3">Your Rating</p>

        <div className="flex gap-2 text-3xl mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => setRating(s)}
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(0)}
              className="transition-transform hover:scale-125"
            >
              {s <= (hover || rating) ? (
                <FaStar className="text-yellow-400" />
              ) : (
                <FaRegStar className="text-slate-300" />
              )}
            </button>
          ))}
        </div>

        <textarea
          rows="4"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Tell us what you think about this product..."
          className="w-full bg-white border border-slate-200 rounded-2xl p-5 outline-none focus:border-[#059473] focus:ring-4 focus:ring-[#059473]/10 transition-all resize-none text-sm"
        />

        <div className="flex justify-end mt-4">
          <button
            onClick={submitReview}
            className="px-8 py-3 bg-[#059473] hover:bg-[#04745c] text-white rounded-xl font-semibold transition-all shadow-lg shadow-[#059473]/20"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

const Details = () => {
  const { product, relatedProducts, moreProducts } = useSelector(
    (state) => state.home,
  );
  const { succsussMessage, errorMessage } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [state, setState] = useState("reviews");
  const [favorite, setFavorite] = useState(false);

  const discount = 10;

  useEffect(() => {
    dispatch(get_details_product(slug));
  }, [slug, dispatch]);

  useEffect(() => {
    if (userInfo?.id) {
      dispatch(get_cart_product(userInfo.id));
    }
  }, [dispatch, userInfo?.id]);

  useEffect(() => {
    if (succsussMessage) {
      toast.success(succsussMessage);
      dispatch(messageClear());
    }
  }, [succsussMessage, dispatch]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, dispatch]);

  useEffect(() => {
    setImage("");
    setQuantity(1);
  }, [slug]);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 4 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 3 },
  };

  const inc = () => {
    if (quantity >= (product?.stock || 0)) {
      toast.error("Out of stock");
      return;
    }
    setQuantity((prev) => prev + 1);
  };

  const dec = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const addToCart = () => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

    dispatch(
      add_to_cart({
        userId: userInfo.id,
        quantity,
        productId: product._id,
      }),
    );
  };

  const oldPrice = product?.price || 0;
  const finalPrice = oldPrice - Math.floor((oldPrice * discount) / 100);
  const inStock = product?.stock > 0;

  if (!product?._id) {
    return (
      <div>
        <Header />
        <div className="min-h-[55vh] flex flex-col justify-center items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#059473] border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500">Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#fafbfc] min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative mt-5 h-[180px] sm:h-[220px] overflow-hidden">
        <img
          src="/images/banner/shop.png"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Shop banner"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#092f29]/90 via-[#092f29]/65 to-black/40" />

        <div className="relative z-10 w-[92%] lg:w-[85%] mx-auto h-full flex flex-col justify-center text-white">
          <span className="text-[#75e4c5] text-xs font-bold tracking-[4px] uppercase mb-3">
            Discover Quality
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">Product Details</h1>
          <p className="text-white/70 text-sm mt-3">
            Explore our collection and find something special.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="w-[92%] lg:w-[85%] mx-auto py-5">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
          <Link to="/" className="hover:text-[#059473] transition-colors">
            Home
          </Link>
          <IoIosArrowForward />
          <Link
            to={`/products?category=${product.category}`}
            className="hover:text-[#059473] transition-colors"
          >
            {product.category}
          </Link>
          <IoIosArrowForward />
          <span className="text-slate-700 font-semibold">{product.name}</span>
        </div>
      </div>

      {/* Main Product */}
      <section className="w-[92%] lg:w-[85%] mx-auto pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          {/* Gallery */}
          <div>
            <div className="relative bg-white rounded-[30px] border border-slate-100 p-5 sm:p-8 shadow-sm group">
              <span className="absolute top-5 left-5 z-10 bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                {discount}% OFF
              </span>

              <button
                onClick={() => setFavorite(!favorite)}
                className={`absolute right-5 top-5 z-10 w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all ${
                  favorite
                    ? "bg-red-500 text-white"
                    : "bg-white text-slate-400 hover:text-red-500"
                }`}
              >
                <FaHeart />
              </button>

              <img
                className="h-[300px] sm:h-[430px] w-full object-contain transition-transform duration-500 group-hover:scale-105"
                src={image || product?.images?.[0]}
                alt={product.name}
              />

              <div className="absolute bottom-5 right-5 text-xs text-slate-400 bg-slate-50 px-3 py-2 rounded-lg">
                Premium Collection
              </div>
            </div>

            {/* Thumbnail Slider */}
            <div className="mt-5 px-1">
              <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={12}
                slidesPerView={3}
                breakpoints={{
                  480: { slidesPerView: 4 },
                  768: { slidesPerView: 5 },
                }}
                className="product-thumbnails-swiper"
              >
                {product.images?.map((img, i) => (
                  <SwiperSlide key={i}>
                    <button
                      type="button"
                      onClick={() => setImage(img)}
                      className={`w-full h-24 rounded-xl border bg-white p-2 transition-all ${
                        (image || product?.images?.[0]) === img
                          ? "border-[#059473] ring-2 ring-[#059473]/15"
                          : "border-slate-200 hover:border-[#059473]/50"
                      }`}
                    >
                      <img
                        src={img}
                        className="w-full h-full object-contain"
                        alt={`Product ${i + 1}`}
                      />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#059473]/10 text-[#059473] px-3 py-1.5 rounded-full text-xs font-bold uppercase">
                {product.category}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-400">Premium Quality</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 leading-tight">
              {product.name}
            </h2>

            <div className="flex flex-wrap items-center gap-4 mt-5 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Rating ratings={4.5} />
                <span className="text-sm font-bold text-slate-700">4.5</span>
              </div>
              <span className="text-sm text-slate-400">
                (24 Customer Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-7 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <p className="text-sm text-slate-400 mb-2">Special Price</p>

              <div className="flex items-center flex-wrap gap-3">
                <h3 className="text-3xl sm:text-4xl font-black text-[#059473]">
                  ${finalPrice.toLocaleString()}
                </h3>
                <span className="text-lg text-slate-400 line-through">
                  ${oldPrice.toLocaleString()}
                </span>
                <span className="bg-red-50 text-red-500 text-xs font-bold px-3 py-1.5 rounded-full">
                  Save {discount}%
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-3">
                Inclusive of all applicable taxes.
              </p>
            </div>

            <p className="text-slate-500 text-sm sm:text-base leading-8 mt-6">
              {product.description}
            </p>

            {/* Stock */}
            <div className="flex items-center gap-2 mt-6">
              <FaCheckCircle
                className={inStock ? "text-[#059473]" : "text-red-500"}
              />
              <span
                className={`text-sm font-semibold ${
                  inStock ? "text-[#059473]" : "text-red-500"
                }`}
              >
                {inStock
                  ? `In Stock (${product.stock} available)`
                  : "Currently Out Of Stock"}
              </span>
            </div>

            {/* Quantity */}
            {inStock && (
              <div className="flex flex-wrap items-center gap-4 mt-7">
                <div className="flex items-center bg-white border border-slate-200 rounded-xl h-[52px] overflow-hidden">
                  <button
                    onClick={dec}
                    className="w-12 h-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
                  >
                    <FaMinus size={12} />
                  </button>

                  <span className="w-12 text-center font-bold text-slate-800">
                    {quantity}
                  </span>

                  <button
                    onClick={inc}
                    className="w-12 h-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>

                <button
                  onClick={addToCart}
                  className="flex-1 min-w-[170px] h-[52px] rounded-xl bg-[#059473] hover:bg-[#04745c] text-white font-bold flex items-center justify-center gap-3 shadow-lg shadow-[#059473]/20 hover:shadow-[#059473]/40 transition-all active:scale-95"
                >
                  <HiOutlineShoppingCart size={22} />
                  Add To Cart
                </button>
              </div>
            )}

            {/* Buy Now */}
            {inStock && (
              <button
                onClick={() => {
                  if (!userInfo) {
                    navigate("/login");
                    return;
                  }
                  addToCart();
                  navigate("/cart");
                }}
                className="w-full mt-3 h-[52px] rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex justify-center items-center gap-3 transition-all"
              >
                <FaShoppingBag />
                Buy Now
              </button>
            )}

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
              <div className="bg-white rounded-2xl p-4 border border-slate-100 text-center">
                <FaTruck className="mx-auto text-[#059473] text-2xl mb-3" />
                <h4 className="font-bold text-xs text-slate-700">
                  Free Delivery
                </h4>
                <p className="text-[10px] text-slate-400 mt-1">
                  On selected orders
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-slate-100 text-center">
                <FaShieldAlt className="mx-auto text-[#059473] text-2xl mb-3" />
                <h4 className="font-bold text-xs text-slate-700">
                  Secure Payment
                </h4>
                <p className="text-[10px] text-slate-400 mt-1">Safe checkout</p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-slate-100 text-center">
                <FaUndo className="mx-auto text-[#059473] text-2xl mb-3" />
                <h4 className="font-bold text-xs text-slate-700">
                  Easy Returns
                </h4>
                <p className="text-[10px] text-slate-400 mt-1">
                  Simple process
                </p>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center gap-4 mt-7 pt-6 border-t border-slate-200">
              <span className="text-sm font-bold text-slate-600">Share:</span>

              {[
                { icon: <FaFacebookF />, color: "hover:bg-blue-600" },
                { icon: <FaTwitter />, color: "hover:bg-sky-500" },
                { icon: <FaLinkedin />, color: "hover:bg-blue-700" },
                { icon: <FaGithub />, color: "hover:bg-slate-800" },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-white ${item.color} transition-all`}
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Details & Reviews */}
      <section className="bg-white py-14 border-y border-slate-100">
        <div className="w-[92%] lg:w-[85%] mx-auto">
          <div className="flex gap-3 border-b border-slate-100">
            <button
              onClick={() => setState("reviews")}
              className={`px-6 py-4 font-bold text-sm transition-all border-b-2 ${
                state === "reviews"
                  ? "border-[#059473] text-[#059473]"
                  : "border-transparent text-slate-400 hover:text-slate-700"
              }`}
            >
              Customer Reviews
            </button>

            <button
              onClick={() => setState("description")}
              className={`px-6 py-4 font-bold text-sm transition-all border-b-2 ${
                state === "description"
                  ? "border-[#059473] text-[#059473]"
                  : "border-transparent text-slate-400 hover:text-slate-700"
              }`}
            >
              Description
            </button>
          </div>

          {state === "reviews" ? (
            <ModernReviews />
          ) : (
            <div className="py-10 max-w-4xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-5">
                Product Description
              </h3>
              <p className="text-slate-500 leading-9 text-sm sm:text-base">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* From Easy Shop */}
      <section className="w-[92%] lg:w-[85%] mx-auto py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[#059473] text-xs font-bold tracking-widest uppercase">
              Our Collection
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
              From Easy Shop
            </h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-bold text-[#059473] hover:underline"
          >
            View All →
          </Link>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          // autoplay={}
          slidesPerView={1.7}
          breakpoints={{
            480: { slidesPerView: 1.7 },
            640: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
          }}
          className="easy-shop-swiper pb-[50px]"
        >
          {moreProducts.map((p) => (
            <SwiperSlide key={p._id} className="h-auto">
              <Link
                to={`/product/details/${p.slug}`}
                className="group block h-full bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all"
              >
                <div className="relative h-[260px] bg-slate-50 p-5">
                  <img
                    src={p.images?.[0]}
                    alt="Product"
                    className="w-full object-cover pt-5 h-full  group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1.5 rounded-full">
                    {discount}% OFF
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-slate-800 text-lg">
                    Product Name
                  </h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xl font-black text-[#059473]">
                      $434
                    </span>
                    <div className="flex gap-1 items-center">
                      <Rating ratings={4.5} />
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Related Products */}
      <section className="related-section pb-20">
        <div className="w-[92%] lg:w-[85%] mx-auto">
          <div className="mb-8">
            <span className="text-[#059473] text-xs font-bold tracking-widest uppercase">
              You May Also Like
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
              Related Products
            </h2>
          </div>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            slidesPerView={1}
            breakpoints={{
              480: { slidesPerView: 1.5 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            spaceBetween={10}
            pagination={{
              clickable: true,
              el: ".custom_bullet",
            }}
          >
            {relatedProducts.map((p) => (
              <SwiperSlide key={p._id}>
                <Link
                  to={`/product/details/${p.slug}`}
                  className="block bg-white rounded-3xl overflow-hidden border border-slate-100 group hover:shadow-xl transition-all mb-8"
                >
                  <div className="relative h-[250px]  bg-slate-50 p-5">
                    <img
                      src={p.images?.[0]}
                      alt="Related product"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />

                    <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1.5 rounded-full">
                      {discount}% OFF
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-slate-800">Product Name</h3>
                    <div className="flex justify-between items-center mt-3">
                      <span className="font-black text-xl text-[#059473]">
                        $434
                      </span>
                      <div className="flex gap-1 items-center">
                        <Rating ratings={4.5} />
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="custom_bullet flex justify-center gap-2 mt-4" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Details;
