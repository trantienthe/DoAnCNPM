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
import axios from "axios";

const CategoryLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState({});
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const navigate = useNavigate();
  const [isShowCategories, setShowCategories] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/thuoc/");
        const products = response.data;
        response = await axios.get("http://127.0.0.1:8000/api/category/");
        const categoryAll = response.data;

        const newCategories = {};
        // tạo category cha
        products.forEach((product) => {
          if (
            product.category.parent === null &&
            !newCategories[product.category.id]
          ) {
            newCategories[product.category.id] = {
              name: product.category.name,
              children: [],
            };
          }

          if (
            product.category.parent !== null &&
            !newCategories[product.category.parent]
          ) {
            const categoryParent = categoryAll.find(
              (category) => category.id === product.category.parent
            );
            if (categoryParent)
              newCategories[categoryParent.id] = {
                name: categoryParent.name,
                children: [],
              };
          }
        });

        // tạo category con
        products.forEach((product) => {
          if (product.category.parent !== null) {
            const childCategoryIndex = newCategories[
              product.category.parent
            ].children.findIndex(
              (childCategory) => childCategory.id === product.category.id
            );

            if (childCategoryIndex === -1)
              newCategories[product.category.parent].children.push({
                id: product.category.id,
                name: product.category.name,
              });
          }
        });

        console.log("cate::::::", newCategories);
        setCategories({ ...newCategories });
      } catch (error) {
        console.error("Lỗi khi tải danh sách danh mục:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/tim-kiem?q=${searchQuery}`);
  };

  const handleMouseEnter = (categoryId) => {
    if (
      categories[categoryId].children.length > 0 &&
      hoveredCategoryId !== categoryId
    ) {
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
