import React, { useState } from "react";
import "./style.scss";
import anhsanpham from "assets/user/image/product/thuoc.jpg";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

  return (
    <>
      <div className="container">
        <div className="product-detail-container">
          <div className="product-detail-left">
            <div className="product-image">
              <img src={anhsanpham} alt="Product" />
            </div>
          </div>
          <div className="product-detail-right">
            <h2 className="product-title">
              Viên uống Perfect White Jpanwell hỗ trợ làm đẹp da, giúp da trắng
              sáng (60 viên)
            </h2>
            <div className="product-price">1.790.000đ</div>
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
            <p className="product-description">
              Viên uống làm đẹp da Perfect White JpanWell hỗ trợ làm đẹp da,
              giúp da trắng sáng, căng mịn. Hỗ trợ cải thiện các vết thâm nám,
              hạn chế lão hóa da. Giảm tác hại của tia cực tím cho da.
            </p>

            <button className="add-to-cart-button">Thêm vào giỏ hàng</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
