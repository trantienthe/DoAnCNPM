/* eslint-disable array-callback-return */
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/user/homePage";
import ProfilePage from "./pages/user/profilePage";
import { ROUTER } from "./utils/router";
import MasterLayout from "./pages/user/theme/masterLayout";
import Cart from "pages/user/cart";
import Login from "pages/user/login";
import Register from "pages/user/register";
import { Fragment } from "react";
import BuyLayout from "pages/user/theme/buyLayout";
import ProductDetail from "pages/user/productDetail";
import productPage from "pages/user/productPage";
import Payment from "pages/user/payment";
import Search from "pages/user/search";
import ProductCategory from "pages/user/productCategory";
import PostPage from "pages/user/postPage";
import ContactPage from "pages/user/contactPage";
import HistoryPage from "pages/user/historyPage";
import DetailHistory from "pages/user/detailHistory";

const renderUserRouter = () => {
  const userRouters = [
    {
      path: ROUTER.USER.HOME,
      component: HomePage,
      layout: MasterLayout,
    },
    {
      path: ROUTER.USER.PRODUCTPAGE,
      component: productPage,
      layout: BuyLayout,
    },
    {
      path: ROUTER.USER.PROFILE,
      component: ProfilePage,
      layout: BuyLayout,
    },
    {
      path: ROUTER.USER.CART,
      component: Cart,
      layout: BuyLayout,
    },
    {
      path: ROUTER.USER.LOGIN,
      component: Login,
      layout: null,
    },
    {
      path: ROUTER.USER.REGISTER,
      component: Register,
      layout: null,
    },
    {
      path: ROUTER.USER.PRODUCTDETAIL,
      component: ProductDetail,
      layout: BuyLayout,
    },
    {
      path: ROUTER.USER.PAYMENT,
      component: Payment,
      layout: BuyLayout,
    },
    {
      path: ROUTER.USER.SEARCH,
      component: Search,
      layout: BuyLayout,
    },
    {
      path: ROUTER.USER.PRODUCTCATEGORY,
      component: ProductCategory,
      layout: BuyLayout,
    },
    {
      path: ROUTER.USER.POSTPAGE,
      component: PostPage,
      layout: BuyLayout,
    },
    {
      path: ROUTER.USER.CONTACTPAGE,
      component: ContactPage,
      layout: BuyLayout,
    },
    {
      path: ROUTER.USER.HISTORYPAGE,
      component: HistoryPage,
      layout: BuyLayout,
    },
    {
      path: ROUTER.USER.DETAILHISTORY,
      component: DetailHistory,
      layout: BuyLayout,
    },
  ];

  return (
    <Routes>
      {userRouters.map((item, key) => {
        const Page = item.component;
        let Layout = Fragment;
        if (item.layout !== null) {
          Layout = item.layout;
        }

        return (
          <Route
            key={key}
            path={item.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
};

const RouterCustom = () => {
  return renderUserRouter();
};

export default RouterCustom;
