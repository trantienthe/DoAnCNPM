import React, { useState, useEffect } from "react";
import "./style.scss";
import anhsp1 from "assets/user/image/product/thuoc4.jpg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [username, setUsername] = useState(null);

  const [newQuantities, setNewQuantities] = useState({});

  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.medicine.discount_price
      ? item.medicine.discount_price
      : item.medicine.medicine_price;
    return total + price * item.quantity;
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

  const removeFromCart = async (itemId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/remove_from_cart/${itemId}/`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Xóa sản phẩm không thành công !!!");
      }
      setCartItems(cartItems.filter((item) => item.id_cart !== itemId));
      toast.success("Xóa sản phẩm thành công");
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItemQuantity = async (itemId, newQuantity) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/update_quantity/${itemId}/`,
        { new_quantity: newQuantity }
      );
      if (response.status === 200) {
        const updatedCartItems = cartItems.map((item) => {
          if (item.id_cart === itemId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        setCartItems(updatedCartItems);
        toast.success("Cập nhật số lượng thành công");
      } else {
        throw new Error("Cập nhật số lượng không thành công !!!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật số lượng không thành công");
    }
  };

  const increaseQuantity = (itemId) => {
    const currentItem = cartItems.find((item) => item.id_cart === itemId);
    const currentQuantity = currentItem?.quantity || 0;
    const stockQuantity = currentItem?.medicine.stock_quantity || 0;

    // Kiểm tra nếu số lượng mới vượt quá tồn kho
    if (currentQuantity < stockQuantity) {
      const updatedQuantity = currentQuantity + 1;
      setNewQuantities({ ...newQuantities, [itemId]: updatedQuantity });
      updateCartItemQuantity(itemId, updatedQuantity);
    } else {
      toast.error("Số lượng sản phẩm vượt quá tồn kho");
    }
  };

  // Hàm giảm số lượng sản phẩm
  const decreaseQuantity = (itemId) => {
    const currentQuantity =
      newQuantities[itemId] ||
      cartItems.find((item) => item.id_cart === itemId)?.quantity ||
      1;
    const updatedQuantity = Math.max(currentQuantity - 1, 1);
    setNewQuantities({ ...newQuantities, [itemId]: updatedQuantity });
    updateCartItemQuantity(itemId, updatedQuantity);
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <p
          style={{
            height: "calc(100vh - 150px - 305px)",
            textAlign: "center",
            lineHeight: "calc(100vh - 150px - 305px)",
            color: "red",
            fontSize: "16px",
          }}
        >
          Không có sản phẩm trong giỏ hàng
        </p>
      ) : (
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
                      {item.medicine.discount_price
                        ? item.medicine.discount_price
                        : item.medicine.medicine_price}{" "}
                      VND
                    </p>
                    <button
                      className="quantity-btn"
                      onClick={() => decreaseQuantity(item.id_cart)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="quantity-input"
                      value={newQuantities[item.id_cart] || item.quantity}
                      readOnly
                    />
                    <button
                      className="quantity-btn"
                      onClick={() => increaseQuantity(item.id_cart)}
                    >
                      +
                    </button>
                    <p className="item-total">
                      {(item.medicine.discount_price
                        ? item.medicine.discount_price
                        : item.medicine.medicine_price) * item.quantity}{" "}
                      VNĐ
                    </p>
                    {/* <button
                      className="update-btn"
                      onClick={() =>
                        updateCartItemQuantity(
                          item.id_cart,
                          newQuantities[item.id_cart] || item.quantity
                        )
                      }
                    >
                      Cập nhật
                    </button> */}
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id_cart)}
                    >
                      Xóa
                    </button>
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
              <Link to="/thanh-toan">
                <button className="cart_right_button">Hoàn tất</button>
              </Link>
              <p>
                Bằng việc tiến hành đặt mua hàng, bạn đồng ý với điều khoản dịch
                vụ, Chính sách thu nhập và xử lý dữ liệu cá nhân của Nhà Thuốc
                An Tâm
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
