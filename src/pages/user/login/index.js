import React from "react";
import { CiUser, CiLock } from "react-icons/ci";
import { Bounce, ToastContainer, toast } from "react-toastify";
import ToastNotify from "pages/component/ToastNotify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/", {
      state: {
        notify: {
          type: "success",
          message: "Xin chào bạn",
        },
      },
    });
  };
  return (
    <div className="containers">
      <ToastNotify />
      <div className="wrapper">
        <form action="">
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="Email" required />
            <CiUser className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <CiLock className="icon" />
          </div>
          <button type="button" onClick={handleLogin}>
            Login
          </button>

          <div className="register-link">
            <p>
              Don't have an account ?<a href="/dang-ky">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
