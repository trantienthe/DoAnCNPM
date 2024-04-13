import React, { useEffect, useState } from "react";
import "./style.scss";
import anhsanpham from "assets/user/image/product/thuoc1.jpg";
import { Link, useParams } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import Slideshow from "../theme/slider";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import axios from "axios";

const ProductDetail = () => {
  const [showMore, setShowMore] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/thuoc/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.image);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async (id, quantity) => {
    const username = window.localStorage.getItem("username");
    if (!username) {
      // toast error login
      toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng !!!");
      return;
    }

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/cart/add/`, {
        medicine_id: id,
        username: username,
        quantity: quantity,
      });

      console.log(response.data);
      toast.success("Đã thêm vào giỏ hàng !!!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  return (
    <>
      {product && (
        <div className="container_details ">
          <div className="product-detail-container">
            <div className="product-detail-left">
              <div className="product-image">
                <img
                  src={`http://127.0.0.1:8000/static/${selectedImage}`}
                  alt="Product"
                />
              </div>
              <div className="product-image-bottom">
                <img
                  className="product-image-bottom-size"
                  src={`http://127.0.0.1:8000/static/${product.image1}`}
                  alt="1"
                  onClick={() => setSelectedImage(product.image1)}
                />
                <img
                  className="product-image-bottom-size"
                  src={`http://127.0.0.1:8000/static/${product.image2}`}
                  alt="2"
                  onClick={() => setSelectedImage(product.image2)}
                />
                <img
                  className="product-image-bottom-size"
                  src={`http://127.0.0.1:8000/static/${product.image3}`}
                  alt="3"
                  onClick={() => setSelectedImage(product.image3)}
                />
                <img
                  className="product-image-bottom-size"
                  src={`http://127.0.0.1:8000/static/${product.image4}`}
                  alt="4"
                  onClick={() => setSelectedImage(product.image4)}
                />
              </div>
            </div>
            <div className="product-detail-right">
              <h2 className="product-title">{product.name_medicine}</h2>
              <div className="product-price">
                {product.price} VND / {product.unit.name}
              </div>
              <div className="product-quantity">
                <label htmlFor="quantity">Chọn số lượng : </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
              <p style={{ paddingTop: "10px" }}>
                Mã : {parse(product.id_medicine)}
              </p>
              <p style={{ paddingTop: "10px" }}>
                Tình trạng : {product.active ? "Còn hàng" : "Hết hàng"}
              </p>
              <p className="product-description">{parse(product.content)}</p>

              {product.active ? (
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(product.id_medicine, quantity)}
                >
                  Thêm vào giỏ hàng
                </button>
              ) : (
                <button className="add-to-cart-button" disabled>
                  Hết hàng
                </button>
              )}
            </div>
          </div>

          <div className="container-information-more">
            <h2>THÔNG TIN LIÊN QUAN</h2>
            <div className="table-container">
              <div className="table-column">
                <div className="table-header">Danh Mục :</div>
                <div className="table-content">{product.category.name}</div>
              </div>
              <div className="table-column">
                <div className="table-header">Thành phần :</div>
                <div className="table-content">{product.ingredient}</div>
              </div>
              <div className="table-column">
                <div className="table-header">Phản ứng phụ :</div>
                <div className="table-content">{product.side_effects}</div>
              </div>
              <div className="table-column">
                <div className="table-header">Hạn sử dụng :</div>
                <div className="table-content">{product.expiry}</div>
              </div>
              <div className="table-column">
                <div className="table-header">Đối tượng sử dụng :</div>
                <div className="table-content">{product.uses}</div>
              </div>
              <div className="table-column">
                <div className="table-header">Cách đóng gói :</div>
                <div className="table-content">{product.pack}</div>
              </div>
              <div className="table-column">
                <div className="table-header">Nơi sản xuất :</div>
                <div className="table-content">{product.source}</div>
              </div>
            </div>
          </div>

          <div className="container-mota">
            <div className="container-text-mota">
              <h1>MÔ TẢ SẢN PHẨM</h1>
              <h2 className={showMore ? "show" : "hidden"}>
                {parse(product.description)}
              </h2>
              <div className="btnXemthem">
                <button
                  className="btnXemthem_link"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "Rút gọn" : "Xem thêm"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
