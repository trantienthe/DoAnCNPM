import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import Swal from "sweetalert2";
import { FaUserCheck } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";

const Payment = () => {
  const [username, setUsername] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  const [isAddressEntered, setIsAddressEntered] = useState(false);
  const [userData, setUserData] = useState({ email: "", fullName: "" });

  const handleDeliveryAddressChange = (e) => {
    setDeliveryAddress(e.target.value);
    setIsAddressEntered(!!e.target.value);
  };

  const handleCashOnDeliveryChange = (e) => {
    setCashOnDelivery(e.target.checked);
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      Swal.fire({
        icon: "error",
        title: "óh nooo...",
        text: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng !!!",
      });
      return;
    }

    if (!isAddressEntered || !deliveryAddress) {
      Swal.fire({
        icon: "error",
        title: "óh nooo...",
        text: "Vui lòng nhập địa chỉ nhận hàng !!!",
      });
      return;
    }

    if (!isChecked) {
      Swal.fire({
        icon: "error",
        title: "óh nooo...",
        text: "Vui lòng chọn hình thức thanh toán !!!",
      });
      return;
    }

    // Hiển thị hộp thoại xác nhận trước khi đặt hàng
    const confirmOrder = await Swal.fire({
      title: "Bạn có chắc chắn muốn đặt hàng không?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Không",
    });

    if (!confirmOrder.isConfirmed) {
      return;
    }

    try {
      // Gửi yêu cầu POST đến API để lưu thông tin đơn hàng
      await axios.post(`http://127.0.0.1:8000/api/order/${username}/`, {
        deliveryAddress,
        cashOnDelivery,
      });
      Swal.fire({
        title: "Thành công!",
        text: "Đơn hàng đã được đặt thành công!",
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
        didClose: () => {
          // Redirect về trang chính sau 3 giây
          window.location.href = "/";
        },
      });
    } catch (error) {
      console.error("Đã xảy ra lỗi khi đặt hàng:", error);
    }
  };

  useEffect(() => {
    const newUsername = window.localStorage.getItem("username");
    if (newUsername) {
      setUsername(newUsername);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user/");
        console.log("UserData:", response.data);

        const username = window.localStorage.getItem("username");

        const currentUser = response.data.find(
          (user) => user.username === username
        );

        if (currentUser) {
          setUserData({
            email: currentUser.email,
            //username: currentUser.username,
            username: `${currentUser.first_name} ${currentUser.last_name}`,
          });
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="container_top">
          <div className="container__form">
            <h2 className="container__form_h2">
              <FaUserCheck className="form_icon" />
              Thông tin người đặt
            </h2>
            <div className="container__form__div">
              <input
                className="container__form__input"
                type="text"
                placeholder="Họ tên người đặt"
                value={userData.username}
                readOnly
              />
            </div>
            <div className="container__form__div">
              <input
                className="container__form__input"
                type="text"
                placeholder="Email"
                value={userData.email}
                readOnly
              />
            </div>
          </div>
          <div className="container__form">
            <h2 className="container__form_h2">
              <FaLocationDot className="form_icon" />
              Địa chỉ nhận hàng
            </h2>
            <div className="container__form__input_custom">
              <input
                className="container__form__input_double"
                type="text"
                placeholder="Họ và tên người nhận"
              />
              <input
                className="container__form__input_double"
                type="text"
                placeholder="Số điện thoại"
              />
            </div>
            <div className="container__form__div">
              <input
                className="container__form__input"
                type="text"
                placeholder="Địa chỉ nhận hàng"
                value={deliveryAddress}
                onChange={handleDeliveryAddressChange}
              />
            </div>
          </div>
          <div className="container__form">
            <h2 className="container__form_h2">
              <MdOutlinePayments className="form_icon" />
              Chọn hình thức thanh toán
            </h2>
            <label className="container__form__label">
              <input
                type="checkbox"
                checked={cashOnDelivery}
                onChange={handleCashOnDeliveryChange}
              />
              Thanh toán khi nhận hàng
            </label>
          </div>
          <div className="container__form__button">
            <button
              className="container__form__button_yes"
              onClick={handleSubmit}
            >
              Hoàn tất
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
