import { memo, useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import "./style.scss";

import slide4 from "assets/user/image/product/thuoc1.jpg";
import slide5 from "assets/user/image/product/thuoc2.jpg";
import slide6 from "assets/user/image/product/thuoc3.jpg";
import slide1 from "assets/user/image/product/thuoc4.jpg";
import slide2 from "assets/user/image/product/thuoc5.jpg";
import slide3 from "assets/user/image/product/thuoc6.jpg";

import axios from "axios";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { formater } from "utils/fomater";

const ProductPage = () => {
  const [medicines, setMedicines] = useState([]);

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
        }));

        setMedicines(allMedicines);
      } catch (error) {
        console.error("Lỗi khi tải danh sách thuốc:", error);
      }
    };
    fetchMedicines();
  }, []);

  return (
    <>
      {/*Featured Begin*/}
      <div className="container">
        <div className="featured">
          <div className="section-title">
            <h2>Tất cả sản phẩm</h2>
          </div>
          <div className="row">
            {medicines.map((item, index) => (
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
                    <ul className="featured_item_pic_hover featured_item_pic_hover_custom">
                      <li>
                        <Link to={`/chi-tiet-san-pham/${item.id}`}>
                          <AiOutlineEye />
                        </Link>
                      </li>
                      <li>
                        <AiOutlineShoppingCart />
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
            ))}
          </div>
        </div>
      </div>
      {/*Featured End*/}
    </>
  );
};

export default memo(ProductPage);
