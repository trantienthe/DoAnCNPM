import { memo, useEffect, useState } from "react";
import "./style.scss";
import "react-multi-carousel/lib/styles.css";

import Carousel from "react-multi-carousel";
import slide1 from "assets/user/image/product/thuoc4.jpg";
import slide2 from "assets/user/image/product/thuoc5.jpg";
import slide3 from "assets/user/image/product/thuoc6.jpg";
import slide4 from "assets/user/image/product/thuoc1.jpg";
import slide5 from "assets/user/image/product/thuoc2.jpg";
import slide6 from "assets/user/image/product/thuoc3.jpg";
import featured1 from "assets/user/image/product/thuoc1.jpg";
import featured2 from "assets/user/image/product/thuoc2.jpg";
import featured3 from "assets/user/image/product/thuoc3.jpg";
import featured4 from "assets/user/image/product/thuoc4.jpg";
import featured5 from "assets/user/image/product/thuoc5.jpg";
import banner1 from "assets/user/image/categories/Banner1.webp";
import banner2 from "assets/user/image/categories/Banner2.webp";

import { render } from "@testing-library/react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import {
  AiOutlineEye,
  AiOutlineIdcard,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { formater } from "utils/fomater";
import axios from "axios";
import { toast } from "react-toastify";

const HomePage = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [latestProducts, setLatestProducts] = useState([]);

  //useEffect gọi api sản phẩm mới nhất
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/thuoc/");
        setLatestProducts(response.data.slice(0, 8));
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm mới nhất:", error);
      }
    };
    fetchLatestProducts();
  }, []);

  //useEffect gọi api thuoc theo danh mục
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/thuoc/");
        console.log(response);

        const groupedMedicines = response.data.reduce((acc, medicine) => {
          const category = medicine.category.id;
          if (!acc[category]) {
            acc[category] = {
              title: medicine.category.name,
              products: [],
            };
          }
          acc[category].products.push({
            img: `http://127.0.0.1:8000/static/${medicine.image}`,
            id: medicine.id_medicine,
            name: medicine.name_medicine,
            price: medicine.price,
          });
          // Sắp xếp sản phẩm theo thời gian giảm dần
          acc[category].products.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          // Chỉ lấy 8 sản phẩm đầu tiên
          acc[category].products = acc[category].products.slice(0, 8);
          return acc;
        }, {});

        setMedicines(groupedMedicines);
      } catch (error) {
        console.error("Lỗi khi tải danh sách thuốc:", error);
      }
    };
    fetchMedicines();
  }, []);

  const handleAddToCart = async (id) => {
    const username = window.localStorage.getItem("username");
    if (!username) {
      // toast error login
      toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng !!!");
      return;
    }

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/cart/add/`, {
        medicine_id: id,
        username: username,
      });

      console.log(response.data);
      toast.success("Đã thêm vào giỏ hàng !!!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const sliderItems = [
    {
      bgImg: slide1,
      name: "Sản phẩm 1",
    },
    {
      bgImg: slide2,
      name: "Sản phẩm 2",
    },
    {
      bgImg: slide3,
      name: "Sản phẩm 3",
    },
    {
      bgImg: slide4,
      name: "Sản phẩm 4",
    },
    {
      bgImg: slide5,
      name: "Sản phẩm 5",
    },
    {
      bgImg: slide6,
      name: "Sản phẩm 6",
    },
  ];

  const renderFeaturedProducts = (data) => {
    const tabList = [];
    const tabPanels = [];

    Object.keys(data).forEach((key, index) => {
      tabList.push(<Tab key={index}>{data[key].title}</Tab>);

      const tabPanel = [];
      data[key].products.forEach((item, j) => {
        tabPanel.push(
          <div className="col-lg-3" key={j}>
            <div className="featured_item">
              <div
                className="featured_item_pic"
                style={{
                  background: `url(${item.img})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                }}
              >
                <ul className="featured_item_pic_hover">
                  <li>
                    <Link to={`/chi-tiet-san-pham/${item.id}`}>
                      <AiOutlineEye />
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => handleAddToCart(item.id)}>
                      <AiOutlineShoppingCart />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="featured_item_text">
                <h6>
                  <Link to="">{item.name}</Link>
                </h6>
                <h5>{formater(item.price)}</h5>
              </div>
            </div>
          </div>
        );
      });
      tabPanels.push(tabPanel);
    });

    return (
      <Tabs>
        <TabList>{tabList}</TabList>

        {tabPanels.map((item, key) => (
          <TabPanel key={key}>
            <div className="row">{item}</div>
          </TabPanel>
        ))}
      </Tabs>
    );
  };

  return (
    <>
      {/*Categories Begin*/}
      <div className="container container_categories_slider">
        <div className="featured">
          <div className="section-title">
            <h2 style={{ paddingTop: "50px" }}>Sản phẩm mới nhất</h2>
          </div>
        </div>
        <Carousel responsive={responsive} className="container_slider">
          {latestProducts.map((product, index) => (
            <div
              key={index}
              className="container_slider_item"
              style={{
                backgroundImage: `url(http://127.0.0.1:8000/static/${product.image})`,
              }}
            >
              <Link to={`/chi-tiet-san-pham/${product.id_medicine}`}>
                Xem chi tiết
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
      {/*Categories End*/}

      {/*Featured Begin*/}
      <div className="container">
        <div className="featured">
          <div className="section-title">
            <h2>Sản phẩm nổi bật</h2>
          </div>
          {renderFeaturedProducts(medicines)}
        </div>
      </div>
      {/*Featured End*/}

      {/*Banner Begin*/}
      <div className="container">
        <div className="banner">
          <div className="banner_pic">
            <img src={banner1} alt="banner1" />
          </div>
          <div className="banner_pic">
            <img src={banner2} alt="banner2" />
          </div>
        </div>
      </div>
      {/*Banner End*/}
    </>
  );
};

export default memo(HomePage);
