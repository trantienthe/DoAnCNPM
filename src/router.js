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
