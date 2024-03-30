import { memo, useState } from "react";
import './style.scss';

import React from 'react'
import { AiOutlineMenu, AiOutlinePhone } from "react-icons/ai";
import { Link } from "react-router-dom";

const CategoryLayout = () => {

    const [isShowCategories, setShowCategories] = useState(true);

    return (
    <>
        <div className="container">
            <div className="row hero_categories_container">
                <div className="col-lg-3 hero_categories">
                    <div className="hero_categories_all" onClick={() => setShowCategories(!isShowCategories)}>
                        <AiOutlineMenu />
                        Danh sách sản phẩm
                    </div>
                    <ul className={isShowCategories ? "" : "hidden"}>
                        <li>
                            <Link to={"#"}>Người lớn</Link>
                        </li>
                        <li>
                            <Link to={"#"}>Trẻ em</Link>
                        </li>
                        <li>
                            <Link to={"#"}>Đàn ông</Link>
                        </li>
                        <li>
                            <Link to={"#"}>Phụ nữ</Link>
                        </li>
                        <li>
                            <Link to={"#"}>Tất cả</Link>
                        </li>
                    </ul>
                </div>

                <div className="col-lg-9 hero_search_container">
                    <div className="hero_search">
                        <div className="hero_search_form">
                            <form>
                                <input type="text" value="" placeholder="Bạn đang tìm gì?"></input>
                                <button type="submit">Search</button>
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
        </div >
    </>
  )
}

export default CategoryLayout;