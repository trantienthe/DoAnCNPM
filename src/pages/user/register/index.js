import React, { useState } from "react";
import "./style.scss";
import { CiUser, CiLock } from "react-icons/ci";
import ToastNotify from "pages/component/ToastNotify";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    last_name: "",
    first_name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      toast.error("Email không hợp lệ !!!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu nhập không khớp !!!");
      return;
    }
    delete formData.confirmPassword;

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setTimeout(() => {
          setLoading(false);
          navigate("/", {
            state: {
              notify: {
                type: "success",
                message: "Đăng ký thành công!",
              },
            },
          });
        }, 2000);
        console.log(data);
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Đã có lỗi xảy ra:", error);
    }
  };

  return (
    <div className="containers">
      <ToastNotify />

      <div className="wrapper">
        <form onSubmit={handleRegister}>
          <h1>
            Đăng ký{" "}
            {loading && (
              <div style={{ display: "inline-block", marginLeft: "20px" }}>
                <ReactLoading
                  type="spin"
                  color="#00BFFF"
                  height={20}
                  width={20}
                />
              </div>
            )}
          </h1>

          <div className="input-box">
            <input
              type="text"
              name="first_name"
              placeholder="Họ"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <CiUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="text"
              name="last_name"
              placeholder="Tên"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
            <CiUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Tên đăng nhập"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <CiUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <CiUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <CiLock className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <CiLock className="icon" />
          </div>
          <button type="submit">Register</button>

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
