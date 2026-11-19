import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CategoryShop from "./pages/CategoryShop";
import SearchProducts from "./pages/SearchProducts";
import Payment from "./pages/Payment";
import ProtectedRoute from "./utils/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Index from "./components/dashboard/Index";
import Orders from "./components/dashboard/myorders";
import changePassword from "./components/dashboard/ChangePassword";
import OrderDetails from "./components/dashboard/OrderDetails";
import Wishlist from './components/dashboard/WishList';

let router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/shops",
    Component: Shops,
  },

  {
    path: "/cart",
    Component: Cart,
  },
  {
    path: "/shipping",
    Component: Shipping,
  },
  {
    path: "/payment",
    Component: Payment,
  },
  {
    path: "/product/details/:slug",
    Component: Details,
  },
  {
    path: "/products/?",
    Component: CategoryShop,
  },
  {
    path: "/products/search?",
    Component: SearchProducts,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },

  {
    path: "/dashboard",
    Component: ProtectedRoute,
    children: [
      {
        Component: Dashboard,
        children: [
          {
            index: true,
            Component: Index,
          },
          {
            path: "myorders",
            Component: Orders,
          },
          {
            path: "order-details/:orderId",
            Component: OrderDetails,
          },
          {
            path: "change-password",
            Component: changePassword,
          },
          {
            path: "wishlist",
            Component: Wishlist,
          },
        ],
      },
    ],
  },
]);

export default router;
