import React, { memo, useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import "./style.scss";

import axios from "axios";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { formater } from "utils/fomater";
import { toast } from "react-toastify";
import anhbacsi from "assets/user/image/hero/bacsi.png";

const ProductPage = () => {
  const [medicines, setMedicines] = useState([]);
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

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/thuoc/");
        console.log(response);

        const allMedicines = response.data.map((medicine) => ({
          img: `http://127.0.0.1:8000/static/${medicine.image}`,
          id: medicine.id_medicine,
          name: medicine.name_medicine,
          price: medicine.price,
          discount_price: medicine.discount_price,
        }));

        setMedicines(allMedicines);
      } catch (error) {
        console.error("Lỗi khi tải danh sách thuốc:", error);
      }
    };
    fetchMedicines();
  }, []);

  const filteredMedicines = medicines.filter((medicine) => {
    if (filterOptions.under150 && medicine.price < 150000) return true;
    if (
      filterOptions.between150And300 &&
      medicine.price >= 150000 &&
      medicine.price < 300000
    )
      return true;
    if (
      filterOptions.between300And500 &&
      medicine.price >= 300000 &&
      medicine.price < 500000
    )
      return true;
    if (filterOptions.above500 && medicine.price >= 500000) return true;
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
        <div className="section-title">
          <h2>Tất cả sản phẩm</h2>
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
        <div className="row">
          {filteredMedicines.length > 0 ? (
            filteredMedicines.map((item, index) => (
              <div className="col-lg-3" key={index}>
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
                      -{" "}
                      {((item.price - item.discount_price) / item.price) * 100}{" "}
                      %
                    </div>
                    <ul className="featured_item_pic_hover featured_item_pic_hover_custom">
                      <li>
                        <Link to={`/chi-tiet-san-pham/${item.id}`}>
                          <AiOutlineEye />
                        </Link>
                      </li>
                      <li>
                        <AiOutlineShoppingCart
                          onClick={() => handleAddToCart(item.id)}
                        />
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
            ))
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
    </div>
  );
};

export default memo(ProductPage);
