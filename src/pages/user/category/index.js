import { memo, useState, useEffect } from "react";
import "./style.scss";

import React from "react";
import { AiOutlineMenu, AiOutlinePhone } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoMdArrowDroprightCircle } from "react-icons/io";

const CategoryLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [isShowCategories, setShowCategories] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/thuoc/")
      .then((response) => response.json())
      .then((data) => {
        const categoryNames = data.map((item) => item.category.name);
        setCategories(categoryNames);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/tim-kiem?q=${searchQuery}`);
  };

  return (
    <>
      <div className="container">
        <div className="row hero_categories_container">
          <div className="col-lg-3 hero_categories">
            <div
              className="hero_categories_all"
              onClick={() => setShowCategories(!isShowCategories)}
            >
              <AiOutlineMenu />
              Danh sách sản phẩm
            </div>
            <ul className={isShowCategories ? "" : "hidden"}>
              {categories.map((category, index) => (
                <li key={index}>
                  <Link to={`/san-pham-danh-muc/${category}`}>
                    <IoMdArrowDroprightCircle style={{ width: "60px" }} />
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-9 hero_search_container">
            <div className="hero_search">
              <div className="hero_search_form">
                <form className="searchForm" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    placeholder="Bạn đang tìm gì?"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  ></input>
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
