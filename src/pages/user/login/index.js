import React, { useState } from "react";
import { CiUser, CiLock } from "react-icons/ci";
import { Bounce, ToastContainer, toast } from "react-toastify";
import ToastNotify from "pages/component/ToastNotify";
import { Link, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { MdArrowBackIos } from "react-icons/md";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);

        navigate("/", {
          state: {
            notify: {
              type: "success",
              message: "Xin chào bạn",
            },
          },
        });
      } else {
        const errorData = await response.json();
        toast.error("Vui lòng kiểm tra lại !");
      }
    } catch (error) {
      console.error("Đã có lỗi xảy ra:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="containers">
      <ToastNotify />
      <div className="wrapper">
        <Link to={"/"}>
          <MdArrowBackIos style={{ color: "white" }} />
        </Link>
        <form action="">
          <h1>
            Đăng nhập{" "}
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
            <input id="username" type="text" placeholder="Tài khoản" required />
            <CiUser className="icon" />
          </div>
          <div className="input-box">
            <input
              id="password"
              type="password"
              placeholder="Mật khẩu"
              required
            />
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
