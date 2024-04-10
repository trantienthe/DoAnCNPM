import React, { useState, useEffect } from "react";
import "./style.scss";
import anhsp1 from "assets/user/image/product/thuoc4.jpg";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [username, setUsername] = useState(null);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.medicine.medicine_price * item.quantity;
  }, 0);

  useEffect(() => {
    const newUsername = window.localStorage.getItem("username");
    if (newUsername) {
      setUsername(newUsername);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!username) {
        // toast error login
        //toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng !!!");
        return;
      }
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/cart/item/${username}/`
        );
        if (!response.ok) {
          throw new Error("Không thể lấy thông tin sản phẩm trong giỏ hàng");
        }
        const data = await response.json();
        setCartItems(data);
        console.error(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <>
      <div className="container">
        <div className="cart">
          <div className="cart-left">
            <div className="item-header">
              <div className="item-image">Hình ảnh</div>
              <div className="item-name">Tên sản phẩm</div>
              <div className="item-price">Giá tiền</div>
              <div className="item-quantity">Số lượng</div>
              <div className="item-total">Thành tiền</div>
              <div className="item-actions">Hành động</div>
            </div>
            <hr />
            {cartItems.map((item) => (
              <div key={item.id} className="item">
                <div className="item-image">
                  <img
                    src={`http://localhost:8000/static/${item.medicine.medicine_img}`}
                    alt="Mô tả ảnh sản phẩm"
                  />
                </div>
                <div className="item-details">
                  <p className="item-name">{item.medicine.medicine_name}</p>
                  <p className="item-price">
                    {item.medicine.medicine_price} VND{" "}
                  </p>
                  <input
                    type="number"
                    className="quantity-input"
                    min="1"
                    max=""
                    value={item.quantity}
                  />
                  <p className="item-total">
                    {item.medicine.medicine_price * item.quantity} VNĐ
                  </p>
                  <button className="update-btn">Cập nhật</button>
                  <button className="remove-btn">Xóa</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-right">
            {/* Tính toán tổng giá */}
            <h2>Tổng tiền đơn hàng: {totalPrice} VNĐ</h2>
            <h2>Phí vận chuyển: 0 VNĐ</h2>
            <hr />
            <h2>Thành tiền: {totalPrice} VNĐ</h2>
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
