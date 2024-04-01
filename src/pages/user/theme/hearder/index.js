import { memo, useState } from "react";
import "./style.scss";
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
import logo from "assets/user/image/background/logorm.png";

const Header = () => {
  const [isShowCategories, setShowCategories] = useState(true);
  const [activeMenu, setActiveMenu] = useState(0);

  const [menus] = useState([
    {
      name: "Trang chủ",
      path: "/",
    },
    {
      name: "Giới thiệu",
      path: ROUTER.USER.PROFILE,
    },
    {
      name: "Sản phẩm",
      path: "/gioi-thieu",
      isShowSubmenu: false,
      child: [
        {
          name: "Thuốc lẻ",
          path: "/",
        },
        {
          name: "Thuốc hộp",
          path: "/",
        },
        {
          name: "Hỗ trợ",
          path: "/gioi-thieu",
        },
      ],
    },
    {
      name: "Bài viết",
      path: "/",
    },
    {
      name: "Liên hệ",
      path: "/",
    },
  ]);

  return (
    <div className="containerHeader">
      <div className="header_top">
        <div className="container">
          <div className="row">
            <div className="col-6 header_top_left">
              <ul>
                <li>
                  <AiOutlineMail />
                  antam@gmail.com
                </li>
                <li>Trung tâm tiêm chủng An Tâm</li>
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
                  <li>
                    <span>
                      <a href="/dang-ky">Đăng ký</a>
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
              <img src={logo} alt="logo" />
              <h1>
                <Link to="/">AN TÂM</Link>
              </h1>
            </div>
          </div>

          <div className="col-xl-6">
            <nav className="header_menu">
              <ul>
                {menus?.map((menu, menuKey) => (
                  <li
                    key={menuKey}
                    className={menuKey === activeMenu ? "active" : ""}
                    onClick={() => setActiveMenu(menuKey)}
                  >
                    <Link to={menu?.path}> {menu?.name} </Link>
                    {menu.child && (
                      <ul className="header_menu_child">
                        {menu.child.map((childItem, childItemKey) => (
                          <li key={`${menuKey}-${childItemKey}`}>
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
    </div>
  );
};

export default memo(Header);
