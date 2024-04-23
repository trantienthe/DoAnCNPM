import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { formater } from "utils/fomater";
import axios from "axios";
import { toast } from "react-toastify";
import { FcCancel } from "react-icons/fc";
import anhbacsi from "assets/user/image/hero/bacsi.png";
import "./style.scss";

const ProductCategory = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    under150: false,
    between150And300: false,
    between300And500: false,
    above500: false,
  });

  const handleCheckboxChange = (option) => {
    setFilterOptions({
      ...filterOptions,
      [option]: !filterOptions[option],
    });
  };

  const handleAddToCart = async (id) => {
    const username = window.localStorage.getItem("username");
    if (!username) {
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

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/thuoc/`)
      .then((response) => response.json())
      .then((data) => {
        const newProducts = data.filter(
          (product) =>
            product.category.id === parseInt(categoryId) ||
            product.category.parent === parseInt(categoryId)
        );
        setProducts([...newProducts]);
        console.log("data:", data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [categoryId]);

  useEffect(() => {
    const newChildCategories = [];
    products.forEach((product) => {
      if (
        product.category.parent === parseInt(categoryId) &&
        newChildCategories.findIndex(
          (childCategory) => childCategory.id === product.category.id
        ) === -1
      ) {
        newChildCategories.push(product.category);
      }
    });

    console.log(newChildCategories);

    setChildCategories([...newChildCategories]);
  }, [products]);

  const filteredProducts = products.filter((product) => {
    if (filterOptions.under150 && product.price < 150000) return true;
    if (
      filterOptions.between150And300 &&
      product.price >= 150000 &&
      product.price < 300000
    )
      return true;
    if (
      filterOptions.between300And500 &&
      product.price >= 300000 &&
      product.price < 500000
    )
      return true;
    if (filterOptions.above500 && product.price >= 500000) return true;
    if (
      !filterOptions.under150 &&
      !filterOptions.between150And300 &&
      !filterOptions.between300And500 &&
      !filterOptions.above500
    )
      return true;
    return false;
  });

  return (
    <div className="container">
      <div className="featured">
        <div className="featured_flex">
          {childCategories.map((childCategory) => (
            <div
              className="featured_custom"
              key={`child-category-item-${childCategory.id}`}
            >
              <div className="featured_category">
                <Link to={`/san-pham-danh-muc/${childCategory.id}`}>
                  <div className="featured_categories">
                    <img
                      src={`http://localhost:8000/static${childCategory.image}`}
                    />
                    <div>{childCategory.name}</div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="section-title">
          <h2>Danh mục: {products[0]?.category.name}</h2>
        </div>
        <div className="filter-options">
          <label>
            <input
              type="checkbox"
              checked={filterOptions.under150}
              onChange={() => handleCheckboxChange("under150")}
            />
            Dưới 150.000đ
          </label>
          <label>
            <input
              type="checkbox"
              checked={filterOptions.between150And300}
              onChange={() => handleCheckboxChange("between150And300")}
            />
            Từ 150.000đ đến 300.000đ
          </label>
          <label>
            <input
              type="checkbox"
              checked={filterOptions.between300And500}
              onChange={() => handleCheckboxChange("between300And500")}
            />
            Từ 300.000đ đến 500.000đ
          </label>
          <label>
            <input
              type="checkbox"
              checked={filterOptions.above500}
              onChange={() => handleCheckboxChange("above500")}
            />
            Trên 500.000đ
          </label>
        </div>
        {filteredProducts.length > 0 ? (
          <div className="row">
            {filteredProducts.map((product) => (
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
                  <div className="featured_item_text">
                    <h6>
                      <Link to={`/chi-tiet-san-pham/${product.id_medicine}`}>
                        {product.name_medicine}
                      </Link>
                    </h6>
                    <h5 className="featured_item_text_price">
                      {product.discount_price && formater(product.price)}
                    </h5>

                    <h5>
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
        ) : (
          <div className="container_contact container_contact_custom">
            <div className="image-container-image">
              <img src={anhbacsi} alt="Bác sĩ" className="image_size" />
            </div>
            <div className="container_contact_text">
              Thông báo
              <br /> Không có sản phẩm mức giá này !!!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategory;
