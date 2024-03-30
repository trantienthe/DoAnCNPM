import { memo, useState } from "react";
import './style.scss';
import {
    AiOutlineFacebook,
    AiOutlineGlobal,
    AiOutlineInstagram,
    AiOutlineLinkedin,
    AiOutlineMail,
    AiOutlineMenu,
    AiOutlinePhone,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { formater } from "utils/fomater";
import { ROUTER } from "utils/router";

const Header = () => {
    const [isShowCategories, setShowCategories] = useState(true);

    const [menus] = useState([
        {
            name: "Trang chủ",
            path: ROUTER.USER.HOME,
        },
        {
            name: "Cửa hàng",
            path: ROUTER.USER.PRODUCTS,
        },
        {
            name: "Sản phẩm",
            path: "",
            isShowSubmenu: false,
            child: [
                {
                    name: "Thuốc lẻ",
                    path: ROUTER.USER.HOME,
                },
                {
                    name: "Thuốc hộp",
                    path: ROUTER.USER.HOME,
                },
                {
                    name: "Hỗ trợ",
                    path: ROUTER.USER.HOME,
                },
            ],
        },
        {
            name: "Bài viết",
            path: "ROUTER.USER.PRODUCTS",
        },
        {
            name: "Liên hệ",
            path: "ROUTER.USER.PRODUCTS",
        },
    ]);

    return (
        <>
            <div className="header_top">
                <div className="container">
                    <div className="row">
                        <div className="col-6 header_top_left">
                            <ul>
                                <li>
                                    <AiOutlineMail />
                                    antam@gmail.com
                                </li>
                                <li>
                                    Trung tâm tiêm chủng An Tâm
                                </li>
                            </ul>
                        </div>
                        <div className="col-6 header_top_right">
                            <div>
                                <ul>
                                    <li>
                                        <Link to={""}>
                                            <AiOutlineFacebook />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={""}>
                                            <AiOutlineInstagram />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={""}>
                                            <AiOutlineLinkedin />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={""}>
                                            <AiOutlineGlobal />
                                        </Link>
                                    </li>
                                    <li>
                                        <span>
                                            <a href="/dang-nhap">Đăng nhập</a>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-xl-3">
                        <div className="header_logo">
                            <h1>An Tâm</h1>
                        </div>
                    </div>

                    <div className="col-xl-6">
                        <nav className="header_menu">
                            <ul>
                                {menus?.map((menu, menuKey) => (
                                    <li key={menuKey} className={menuKey === 0 ? "active" : ""}>
                                        <Link to={menu?.path}> {menu?.name} </Link>
                                        {menu.child && (
                                            <ul className="header_menu_child">
                                                {menu.child.map((childItem, childItemKey) => (
                                                    <li key={'${menuKey}' - '${childItemKey}'}>
                                                        <Link to={childItem.path}>{childItem.name}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className="col-xl-3">
                        <div className="header_cart">
                            <div className="header_cart_price">
                                <span>{formater(10123456)}</span>
                            </div>
                            <ul>
                                <li>
                                    <Link to="/gio-hang">
                                        <AiOutlineShoppingCart /> <span>5</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>


    );



};

export default memo(Header);