import Header from "../components/Header";
import Banner from "../components/Banner";
import Categorys from "../components/Categorys";
import FeatureProducts from "../components/products/FeatureProducts";
import Products from "../components/products/Products";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { get_category, get_products } from "../store/Reducers/homeReducers";
import { get_user_info } from "../store/Reducers/authReducer";
import { get_cart_product } from "../store/Reducers/cartReducer";

const Home = () => {
  const distpatch = useDispatch();
  const {
    categorys,
    products,
    latest_Product,
    topRated_Product,
    discount_product,
  } = useSelector((state) => state.home);
  const { userInfo } = useSelector((state) => state.auth);
  const { cart_products } = useSelector((state) => state.cart);


  useEffect(() => {
    distpatch(get_category());
    distpatch(get_products());
    distpatch(get_cart_product());
    console.log(cart_products);
    
  }, []);

  useEffect(() => {
    distpatch(get_user_info());
  }, []);

  return (
    <div className="w-full">
      <Header categoris={categorys} />
      <Banner />
      <Categorys categoris={categorys} />
      <div className="py-[45px]">
        <FeatureProducts products={products} />
      </div>

      <div className="py-10">
        <div className="w-[85%] flex flex-wrap mx-auto">
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:lg:grid-cols-3 gap-7">
            <div className="overflow-hidden">
              <Products products={latest_Product} title="Latest Product" />
            </div>

            <div className="overflow-hidden">
              <Products products={topRated_Product} title="Top Rated Product" />
            </div>

            <div className="overflow-hidden">
              <Products products={discount_product} title="Discount Product" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
