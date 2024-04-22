import { memo, useState, useEffect } from "react";
import "./style.scss";

import React from "react";
import { AiOutlineMenu, AiOutlinePhone } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import {
  IoIosArrowDropright,
  IoIosArrowForward,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import { MdDoubleArrow } from "react-icons/md";
import { PiArrowBendDownRightDuotone } from "react-icons/pi";

const CategoryLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const navigate = useNavigate();
  const [isShowCategories, setShowCategories] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/thuoc/")
      .then((response) => response.json())
      .then((data) => {
        const categoriesWithChildren = {};

        data.forEach((item) => {
          if (item.category.parent === null) {
            categoriesWithChildren[item.category.id] = {
              name: item.category.name,
              children: [],
            };
          } else {
            categoriesWithChildren[item.category.parent].children.push({
              id: item.category.id,
              name: item.category.name,
            });
          }
        });

        console.log("categoriesWithChildren: ", categoriesWithChildren);

        setCategories(categoriesWithChildren);
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách danh mục:", error);
      });
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/tim-kiem?q=${searchQuery}`);
  };

  const handleMouseEnter = (categoryId) => {
    if (categories[categoryId].children.length > 0) {
      setHoveredCategoryId(categoryId);
    }
  };

  const handleMouseLeave = () => {
    setHoveredCategoryId(null);
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
            <ul className={isShowCategories ? "ul_parent" : "ul_parent hidden"}>
              {Object.keys(categories).map((categoryId) => (
                <li
                  key={categoryId}
                  onMouseEnter={() => handleMouseEnter(categoryId)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link to={`/san-pham-danh-muc/${categoryId}`}>
                    <IoIosArrowDropright
                      className="icon_category"
                      style={{ width: "60px" }}
                    />
                    {categories[categoryId].name}
                  </Link>
                  {hoveredCategoryId === categoryId && (
                    <ul className="ul_category">
                      {categories[categoryId].children.map((childCategory) => (
                        <li key={childCategory.id}>
                          <Link to={`/san-pham-danh-muc/${childCategory.id}`}>
                            <IoIosArrowDropright style={{ width: "60px" }} />
                            {childCategory.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
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
