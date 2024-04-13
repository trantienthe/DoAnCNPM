import React from "react";
import "./style.scss";
import { CiUser, CiLock } from "react-icons/ci";
import anhbacsi from "assets/user/image/hero/bacsi.png";

const PostPage = () => {
  return (
    <>
      <div className="container">
        <div className="container_contact">
          <div className="image-container-image">
            <img src={anhbacsi} alt="Bác sĩ" className="image_size" />
          </div>
          <div className="container_contact_text">
            Thông báo
            <br /> Hiện tại chưa có bài viết!!!
          </div>
        </div>
      </div>
    </>
  );
};
export default PostPage;
