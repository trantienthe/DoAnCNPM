/* eslint-disable array-callback-return */
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/user/homePage";
import ProfilePage from "./pages/user/profilePage";
import { ROUTER } from "./utils/router";
import MasterLayout from "./pages/user/theme/masterLayout";

const renderUserRouter = () => {
    const userRouters = [
        {
            path: ROUTER.USER.HOME,
            component: < HomePage />,
        },
        {
            path: ROUTER.USER.PROFILE,
            component: < ProfilePage />,
        },
    ];

    return (
        <MasterLayout>
            <Routes>
                {userRouters.map((item, key) => (
                    < Route key={key} path={item.path} element={item.component} />
                ))}
            </Routes>
        </MasterLayout>
    );
};

const RouterCustom = () => {
    return renderUserRouter();
};

export default RouterCustom;