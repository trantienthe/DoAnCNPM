import { memo, useState } from "react";
import "./style.scss";

import React from "react";
import { AiOutlineMenu, AiOutlinePhone } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const CategoryLayout = () => {
  const [isShowCategories, setShowCategories] = useState(true);

  return (
    <>
      <div className="container">
        <div className="row hero_categories_container">
          <div className="hero_search_container">
            <div className="hero_search">
              <div className="hero_search_form">
                <form className="searchForm">
                  <input type="text" placeholder="Bạn đang tìm gì?"></input>
                  <button type="submit">
                    <CiSearch className="iconSearch" />
                  </button>
                </form>
              </div>

              <div className="hero_search_phone">
                <form>
                  <div className="hero_search_phone_icon">
                    <AiOutlinePhone />
                  </div>
                  <div className="hero_search_phone_text">
                    <p>0123456789</p>
                    <span>Hỗ trợ 24/7</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryLayout;
