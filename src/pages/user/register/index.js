import React from "react";
import "./style.scss";
import { CiUser, CiLock } from "react-icons/ci";
import ToastNotify from "pages/component/ToastNotify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate("/", {
      state: {
        notify: {
          type: "success",
          message: "Xin chào, Thế",
        },
      },
    });
  };
  return (
    <div className="containers">
      <ToastNotify />

      <div className="wrapper">
        <form action="">
          <h1>Register</h1>
          <div className="input-box">
            <input type="text" placeholder="Họ và Tên" required />
            <CiUser className="icon" />
          </div>
          <div className="input-box">
            <input type="text" placeholder="Email" required />
            <CiUser className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <CiLock className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Confirm Password" required />
            <CiLock className="icon" />
          </div>
          <button type="submit" onClick={handleRegister}>
            Register
          </button>

          <div className="register-link">
            <p>
              You already have a login account ?<a href="/dang-nhap">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
