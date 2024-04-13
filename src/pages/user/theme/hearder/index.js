import logo from "assets/user/image/background/logorm.png";
import ToastNotify from "pages/component/ToastNotify";
import { memo, useEffect, useState } from "react";
import {
  AiOutlineFacebook,
  AiOutlineGlobal,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineMail,
} from "react-icons/ai";
import { BsCartCheckFill } from "react-icons/bs";
import { RiChatHistoryFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { ROUTER } from "utils/router";
import "./style.scss";
import { IoMdPhonePortrait } from "react-icons/io";

const Header = () => {
  const navigate = useNavigate();
  const [isShowCategories, setShowCategories] = useState(true);
  const [activeMenu, setActiveMenu] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [cartCount, setCartCount] = useState(0);

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
      path: ROUTER.USER.PRODUCTPAGE,
      // isShowSubmenu: false,
      // child: [
      //   {
      //     name: "Thuốc lẻ",
      //     path: "/",
      //   },
      //   {
      //     name: "Thuốc hộp",
      //     path: "/",
      //   },
      //   {
      //     name: "Hỗ trợ",
      //     path: "/gioi-thieu",
      //   },
      // ],
    },
    {
      name: "Bài viết",
      path: ROUTER.USER.POSTPAGE,
    },
    {
      name: "Liên hệ",
      path: ROUTER.USER.CONTACTPAGE,
    },
  ]);

  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem("isLoggedIn");
    const storedUsername = window.localStorage.getItem("username");

    if (isLoggedIn) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/cart/item/${username}/`
        );
        if (response.ok) {
          const data = await response.json();
          const newCartCount = data.reduce((count, cartItem) => {
            return count + cartItem.quantity;
          }, 0);
          setCartCount(newCartCount);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  const handleLogout = () => {
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/", {
      state: {
        notify: {
          type: "success",
          message: "Đăng xuất thành công",
        },
      },
    });
  };

  return (
    <div className="containerHeader">
      <ToastNotify />
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
                <Link className="linkToPage" to={"/lien-he"}>
                  <li>
                    <IoMdPhonePortrait />
                    Tư vấn: 1800 1008
                  </li>
                </Link>
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
                  {isLoggedIn ? (
                    <>
                      <li>
                        <span style={{ color: "white" }}>
                          Xin chào, {username}
                        </span>
                      </li>
                      <li>
                        <span onClick={handleLogout}>Đăng xuất</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <span>
                          <Link to="/dang-nhap">Đăng nhập</Link>
                        </span>
                      </li>
                      <li>
                        <span>
                          <Link to="/dang-ky">Đăng ký</Link>
                        </span>
                      </li>
                    </>
                  )}
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
                <Link to="/">An Tâm</Link>
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
                {/* <span>{formater(10123456)}</span> */}
              </div>
              <ul>
                {isLoggedIn && (
                  <li>
                    <Link to="/lich-su-don-hang">
                      <RiChatHistoryFill className="icon_header_icon" />
                      Lịch sử
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="/gio-hang">
                    <BsCartCheckFill className="icon_header_icon" />{" "}
                    {cartCount > 0 && <span>{cartCount}</span>}
                    Giỏ hàng
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
