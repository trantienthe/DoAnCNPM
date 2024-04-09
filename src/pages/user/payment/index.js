import React from "react";
import "./style.scss";
import { FaUserCheck } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";

const Payment = () => {
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
                placeholder="Số điện thoại"
              />
            </div>
            <div className="container__form__div">
              <input
                className="container__form__input"
                type="text"
                placeholder="Email"
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
              />
            </div>
          </div>
          <div className="container__form">
            <h2 className="container__form_h2">
              <MdOutlinePayments className="form_icon" />
              Chọn hình thức thanh toán
            </h2>
            <label className="container__form__label">
              <input type="checkbox" />
              Thanh toán khi nhận hàng
            </label>
          </div>
          <div className="container__form__button">
            <button className="container__form__button_yes">Hoàn tất</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
