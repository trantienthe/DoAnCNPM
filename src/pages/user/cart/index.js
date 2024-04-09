import React from "react";
import "./style.scss";
import anhsp1 from "assets/user/image/product/thuoc4.jpg";

const Cart = () => {
  return (
    <>
      <div className="container">
        <div className="cart">
          <div className="cart-left">
            <div class="item">
              <div class="item-image">
                <img src={anhsp1} alt="Mô tả ảnh sản phẩm" />
              </div>
              <div class="item-details">
                <p class="item-name">Kem chống nắng</p>
                <p class="item-price">100000 VND</p>
                <input
                  type="number"
                  class="quantity-input"
                  value="1"
                  min="1"
                  max=""
                />
                <p class="item-total">100000 VND</p>
                <button class="update-btn">Cập nhật</button>
                <button class="remove-btn">Xóa</button>
              </div>
            </div>
          </div>
          <div className="cart-right">
            <h2>Tổng tiền : 1000000 VNĐ</h2>
            <hr />
            <h2>Phí vận chuyển: 0đ</h2>
            <hr />
            <h2>Thành tiền: 1000000 VNĐ</h2>
            <button className="cart_right_button">Hoàn tất</button>
            <p>
              Bằng việc tiến hành đặt mua hàng, bạn đồng ý với điều khoản dịch
              vụ, Chính sách thu nhập và xử lý dữ liệu cá nhân của Nhà Thuốc An
              Tâm
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
