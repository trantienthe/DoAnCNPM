import { memo, useEffect, useState } from "react";
import "./style.scss";
import "react-multi-carousel/lib/styles.css";
import { FcCancel } from "react-icons/fc";

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
import bottombg1 from "assets/user/image/background/bottombg1.webp";

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
import SlideCategories from "pages/component/SlideCategories";

const HomePage = () => {
  const [medicines, setMedicines] = useState({});
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  //useEffect gọi api sản phẩm mới nhất
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/thuoc/");
        setLatestProducts(response.data.slice(0, 8));
        console.log("Sản phẩm liên quan", response);
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
        let response = await axios.get("http://127.0.0.1:8000/thuoc/");
        const medicineAll = response.data;
        console.log(response);

        response = await axios.get("http://127.0.0.1:8000/api/category/");
        const categoryAll = response.data;

        // const groupedMedicines = response.data.reduce((acc, medicine) => {
        //   // Kiểm tra nếu danh mục có parent là null
        //   const category = medicine.category.id;
        //   if (!acc[category]) {
        //     acc[category] = {
        //       title: medicine.category.name,
        //       products: [],
        //     };
        //   }
        //   acc[category].products.push({
        //     img: `http://127.0.0.1:8000/static/${medicine.image}`,
        //     id: medicine.id_medicine,
        //     name: medicine.name_medicine,
        //     price: medicine.price,
        //     active: medicine.active,
        //     discount_price: medicine.discount_price,
        //   });
        //   // Sắp xếp sản phẩm theo thời gian giảm dần
        //   acc[category].products.sort(
        //     (a, b) => new Date(b.created_at) - new Date(a.created_at)
        //   );
        //   // Chỉ lấy 8 sản phẩm đầu tiên
        //   acc[category].products = acc[category].products.slice(0, 8);

        //   return acc;
        // }, {});

        const groupedMedicines = {};

        medicineAll.forEach((medicine) => {
          const categoryParent = categoryAll.find(
            (category) =>
              (medicine.category.parent !== null &&
                category.id === medicine.category.parent) ||
              (medicine.category.parent === null &&
                category.id === medicine.category.id)
          );
          if (categoryParent)
            groupedMedicines[categoryParent.id] = {
              title: categoryParent.name,
              products: [],
            };
        });

        medicineAll.forEach((medicine) => {
          if (medicine.category.parent !== null) {
            groupedMedicines[medicine.category.parent].products.push({
              img: `http://127.0.0.1:8000/static/${medicine.image}`,
              id: medicine.id_medicine,
              name: medicine.name_medicine,
              price: medicine.price,
              active: medicine.active,
              discount_price: medicine.discount_price,
            });

            // Sắp xếp sản phẩm theo thời gian giảm dần
            groupedMedicines[medicine.category.parent].products.sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
            // Chỉ lấy 8 sản phẩm đầu tiên
            groupedMedicines[medicine.category.parent].products =
              groupedMedicines[medicine.category.parent].products.slice(0, 8);
          }
        });

        setMedicines({ ...groupedMedicines });
      } catch (error) {
        console.error("Lỗi khi tải danh sách thuốc:", error);
      }
    };

    fetchMedicines();
  }, []);

  //useEffect gọi api sản phẩm giảm giá
  useEffect(() => {
    const fetchDiscountedProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/thuoc/");
        const filterProducts = response.data.filter(
          (productItem) => productItem.discount_price
        );
        setDiscountedProducts(filterProducts.slice(0, 4));
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm giảm giá:", error);
      }
    };
    fetchDiscountedProducts();
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

  const handleNotToCart = () => {
    toast.error("Sản phẩm đã hết!");
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
                <div
                  className="featured_item_picc"
                  style={item.discount_price ? {} : { display: "none" }}
                >
                  - {((item.price - item.discount_price) / item.price) * 100} %
                </div>
                <ul className="featured_item_pic_hover">
                  <li>
                    <Link to={`/chi-tiet-san-pham/${item.id}`}>
                      <AiOutlineEye />
                    </Link>
                  </li>
                  <li>
                    {item.active ? (
                      <Link onClick={() => handleAddToCart(item.id)}>
                        <AiOutlineShoppingCart />
                      </Link>
                    ) : (
                      <Link onClick={() => handleNotToCart()}>
                        <FcCancel />
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
              <div className="featured_item_text">
                <h6>
                  <Link to="">{item.name}</Link>
                </h6>
                <h5 className="featured_item_text_price">
                  {item.discount_price && formater(item.price)}
                </h5>
                <h5>
                  {" "}
                  {item.discount_price
                    ? formater(item.discount_price)
                    : formater(item.price)}
                </h5>
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
      {/*Featured Sale*/}
      <div className="container container_custom_sale">
        <div className="featured">
          <div className="section-title section-title-custom">
            <img src={bottombg1} />
            <h3>Flash sale cuối tuần</h3>
          </div>
          <div className="row">
            {discountedProducts.map((product) => (
              <div className="col-lg-3" key={product.id_medicine}>
                <div className="featured_item">
                  <div
                    className="featured_item_pic"
                    style={{
                      background: `url(http://localhost:8000/static/${product.image})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                    }}
                  >
                    <div
                      className="featured_item_picc"
                      style={product.discount_price ? {} : { display: "none" }}
                    >
                      -{" "}
                      {((product.price - product.discount_price) /
                        product.price) *
                        100}{" "}
                      %
                    </div>
                    <ul className="featured_item_pic_hover featured_item_pic_hover_custom">
                      <li>
                        <Link to={`/chi-tiet-san-pham/${product.id_medicine}`}>
                          <AiOutlineEye />
                        </Link>
                      </li>
                      <li>
                        {product.active ? (
                          <AiOutlineShoppingCart
                            onClick={() => handleAddToCart(product.id_medicine)}
                          />
                        ) : (
                          <FcCancel
                            onClick={() => handleNotToCart(product.id_medicine)}
                          />
                        )}
                      </li>
                    </ul>
                  </div>
                  <div className="featured_item_text featured_item_text_custom">
                    <h6>
                      <Link
                        to={`/chi-tiet-san-pham/${product.id_medicine}`}
                        className="custom_color"
                      >
                        {product.name_medicine}
                      </Link>
                    </h6>
                    <h5 className="featured_item_text_price">
                      {product.discount_price && formater(product.price)}
                    </h5>
                    <h5 className="featured_item_text_price_custom">
                      {" "}
                      {product.discount_price
                        ? formater(product.discount_price)
                        : formater(product.price)}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*Featured Sale*/}

      {/*Categories Begin*/}
      <div style={{ marginTop: "50px" }}>
        <SlideCategories
          title="Sản phẩm mới nhất"
          responsive={responsive}
          latestProducts={latestProducts}
        />
      </div>
      {/*Categories End*/}

      {/*Featured Begin*/}
      <div className="container">
        <div className="featured">
          <div className="section-title">
            <h2>Sản phẩm cửa hàng</h2>
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
