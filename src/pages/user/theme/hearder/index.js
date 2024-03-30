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
                                    tranthe2k2ak@gmail.com
                                </li>
                                <li>
                                    Miễn phí ship từ đơn {formater(200000)}
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
                                        <span>Đăng nhập</span>
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
                            <h1>T Shop</h1>
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
                                    <Link to="/cart">
                                        <AiOutlineShoppingCart /> <span>5</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row hero_categories_container">
                    <div className="col-lg-3 hero_categories">
                        <div className="hero_categories_all" onClick={() => setShowCategories(!isShowCategories)}>
                            <AiOutlineMenu />
                            Danh sách sản phẩm
                        </div>
                        <ul className={isShowCategories ? "" : "hidden"}>
                            <li>
                                <Link to={"#"}>Người lớn</Link>
                            </li>
                            <li>
                                <Link to={"#"}>Trẻ em</Link>
                            </li>
                            <li>
                                <Link to={"#"}>Đàn ông</Link>
                            </li>
                            <li>
                                <Link to={"#"}>Phụ nữ</Link>
                            </li>
                            <li>
                                <Link to={"#"}>Tất cả</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-9 hero_search_container">
                        <div className="hero_search">
                            <div className="hero_search_form">
                                <form>
                                    <input type="text" value="" placeholder="Bạn đang tìm gì?"></input>
                                    <button type="submit">Search</button>
                                </form>
                            </div>

                            <div className="hero_search_phone">
                                <form>
                                    <div className="hero_search_phone_icon">
                                        <AiOutlinePhone />
                                    </div>
                                    <div className="hero_search_phone_text">
                                        <p>0123456789</p>
                                        <span>Hỗ trợ 24/7</span>
                                    </div>
                                </form>
                            </div>

                            <div className="hero_item">
                                <div className="hero_item_text">
                                    <span>Mang lại niềm tin cho khách hàng</span>
                                    <h2>
                                        AN TÂM <br />
                                        100%
                                    </h2>
                                    <p>Miễn phí giao hàng tận nơi.</p>
                                    <Link to="#" className="primary-btn">
                                        Mua ngay
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>


    );



};

export default memo(Header);