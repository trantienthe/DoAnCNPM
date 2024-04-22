import React from "react";
import "./style.scss";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import { formater } from "utils/fomater";

const SlideCategories = ({ title, responsive, latestProducts }) => {
  return (
    <div className="container container_categories_slider">
      <div className="featured">
        <div className="section-title">
          <h2>{title}</h2>
        </div>
      </div>
      <Carousel responsive={responsive} className="container_slider">
        {latestProducts.map((product, index) => (
          <Link
            to={`/chi-tiet-san-pham/${product.id_medicine}`}
            className="text"
          >
            <div
              key={index}
              className="container_slider_item"
              style={{
                backgroundImage: `url(http://127.0.0.1:8000/static/${product.image})`,
              }}
            ></div>
            <div className="name_medicine">{product.name_medicine}</div>
            <div className="price_medicine">{formater(product.price)}</div>
            {/* <div className="container_slider_link">Xem chi tiết</div> */}
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default SlideCategories;
