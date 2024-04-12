import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { formater } from "utils/fomater";

const Search = () => {
  // Khai báo state để lưu trữ danh sách sản phẩm từ kết quả tìm kiếm
  const [searchResults, setSearchResults] = useState([]);

  let location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");
    fetch(`http://127.0.0.1:8000/search/?q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data); // Lưu trữ dữ liệu sản phẩm vào state
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  }, [location.search]);

  return (
    <>
      {searchResults.length > 0 ? (
        <div className="container">
          <div className="featured">
            <div className="section-title">
              <h2>Sản phẩm tìm kiếm</h2>
            </div>
            <div className="row">
              {searchResults.map((product) => (
                <div key={product.id} className="col-lg-3">
                  <div className="featured_item">
                    <div
                      className="featured_item_pic"
                      style={{
                        background: `url(http://localhost:8000/static/${product.image})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                      }}
                    >
                      <ul className="featured_item_pic_hover featured_item_pic_hover_custom">
                        <li>
                          <Link to={`/chi-tiet-san-pham/${product.id}`}>
                            <AiOutlineEye />
                          </Link>
                        </li>
                        <li>
                          <AiOutlineShoppingCart />
                        </li>
                      </ul>
                    </div>
                    <div className="featured_item_text">
                      <h6>
                        <Link to="">{product.name_medicine}</Link>
                      </h6>
                      <h5>{formater(product.price)}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p
          style={{
            height: "calc(100vh - 150px - 305px)",
            textAlign: "center",
            lineHeight: "calc(100vh - 150px - 305px)",
            color: "red",
            fontSize: "16px",
          }}
        >
          Không có kết quả tìm kiếm.
        </p>
      )}
    </>
  );
};

export default Search;
