import React, { useEffect, useState } from "react";
import "./style.scss";
import anhsanpham from "assets/user/image/product/thuoc1.jpg";
import { Link, useParams } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import Slideshow from "../theme/slider";
import parse from "html-react-parser";

const ProductDetail = () => {
  const [showMore, setShowMore] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/thuoc/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

  return (
    <>
      {product && (
        <div className="container">
          <div className="product-detail-container">
            <div className="product-detail-left">
              <div className="product-image">
                <img
                  src={`http://127.0.0.1:8000/static/${product.image}`}
                  alt="Product"
                />
              </div>
            </div>
            <div className="product-detail-right">
              <h2 className="product-title">{product.name_medicine}</h2>
              <div className="product-price">{product.price}</div>
              <div className="product-quantity">
                <label htmlFor="quantity">Chọn số lượng : </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
              <p className="product-description">{parse(product.content)}</p>

              <button className="add-to-cart-button">Thêm vào giỏ hàng</button>
            </div>
          </div>

          <div className="container-information-more">
            <h2>THÔNG TIN LIÊN QUAN</h2>
            <div className="table-container">
              <div className="table-column">
                <div className="table-header">Danh Mục :</div>
                <div className="table-content">{product.category.name}</div>
              </div>
              <div className="table-column">
                <div className="table-header">Thành phần :</div>
                <div className="table-content">{product.ingredient}</div>
              </div>
              <div className="table-column">
                <div className="table-header">Phản ứng phụ :</div>
                <div className="table-content">{product.side_effects}</div>
              </div>
              <div className="table-column">
                <div className="table-header">Hạn sử dụng :</div>
                <div className="table-content">{product.expiry}</div>
              </div>
              <div className="table-column">
                <div className="table-header">Đối tượng sử dụng :</div>
                <div className="table-content">{product.uses}</div>
              </div>
              <div className="table-column">
                <div className="table-header">Cách đóng gói :</div>
                <div className="table-content">{product.pack}</div>
              </div>
              <div className="table-column">
                <div className="table-header">Nơi sản xuất :</div>
                <div className="table-content">{product.source}</div>
              </div>
            </div>
          </div>

          <div className="container-mota">
            <div className="container-text-mota">
              <h1>MÔ TẢ SẢN PHẨM</h1>
              <h2 className={showMore ? "show" : "hidden"}>
                {parse(product.description)}
              </h2>
              <div className="btnXemthem">
                <button
                  className="btnXemthem_link"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "Rút gọn" : "Xem thêm"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
