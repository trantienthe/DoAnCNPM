import React from "react";
import "./style.scss";
import { CiUser, CiLock } from "react-icons/ci";
import anhbacsi from "assets/user/image/hero/bacsi.png";

const ContactPage = () => {
  return (
    <div className="container">
      <h2 className="container__h2">Liên hệ với chúng tôi</h2>
      <hr />
      <div className="container_contact">
        <div className="image-container">
          <img src={anhbacsi} alt="Bác sĩ" /> {/* Sử dụng hình ảnh từ biến */}
        </div>
        <div className="wrapper">
          <form action="">
            <h5>
              Chúng tôi luôn lắng nge mọi ý kiến của quý khách.Vui lòng gửi mọi
              yêu cầu, thắc mắc theo thông tin bên dưới.Chúng tôi sẽ liên lạc
              với bạn sớm nhất có thể!
            </h5>
            <div className="input-box">
              Họ và tên:
              <input type="text" placeholder="Nhập họ và tên" required />
            </div>
            <div className="input-box">
              Email:
              <input type="text" placeholder="Nhập Email" required />
            </div>
            <div className="input-box">
              Số điện thoại:
              <input
                type="phoneNumber"
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
            Nội dung phản hồi:
            <label>
              <textarea placeholder="Nhập phản hồi của bạn..." />
            </label>
            <button type="submit">Gửi</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
