import axios from "axios";
import parse from "html-react-parser";
import SlideCategories from "pages/component/SlideCategories";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.scss";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [product, setProduct] = useState(null);
  const [latestProducts, setLatestProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const formatPrice = (price) => {
    const roundedPrice = parseFloat(price).toFixed(2).toString();
    const formattedPrice = roundedPrice.endsWith(".00")
      ? roundedPrice.replace(".00", "")
      : roundedPrice;
    return formattedPrice;
  };

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
  }, [id]);

  //useEffect gọi api sản phẩm liên quan
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/thuoc/");
        const filterProducts = response.data.filter(
          (productItem) =>
            productItem.category.id === product?.category.id &&
            productItem.id_medicine !== product?.id_medicine
        );
        setLatestProducts(filterProducts.slice(0, 8));
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm liên quan:", error);
      }
    };
    fetchLatestProducts();
  }, [product]);

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
                <div
                  className="product-sale"
                  style={product.discount_price ? {} : { display: "none" }}
                >
                  -{" "}
                  {((product.price - product.discount_price) / product.price) *
                    100}{" "}
                  %
                </div>
                <img
                  src={`http://127.0.0.1:8000/static/${selectedImage}`}
                  alt="Product"
                />
              </div>
              <div className="product-image-bottom">
                <img
                  className="product-image-bottom-size"
                  src={`http://127.0.0.1:8000/static/${product.image}`}
                  alt="1"
                  onClick={() => setSelectedImage(product.image)}
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
              <div className="product-price-before">
                {product.discount_price && formatPrice(product.price) + " VND "}
              </div>
              <div className="product-price">
                {product.discount_price
                  ? formatPrice(product.discount_price)
                  : formatPrice(product.price)}
                {" VND "}/ {product.unit.name}
              </div>
              <div className="product-quantity">
                <label htmlFor="quantity">Chọn số lượng : </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={
                    quantity > product.stock_quantity
                      ? product.stock_quantity
                      : quantity
                  }
                  onChange={handleQuantityChange}
                />
              </div>
              <p style={{ paddingTop: "10px" }}>
                Mã : {parse(product.id_medicine)}
              </p>
              <p style={{ paddingTop: "10px" }}>
                Tình trạng :{" "}
                {product.active ? product.stock_quantity : "Hết hàng"}
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

          <div className="product-detail-container">
            {latestProducts.length > 0 && (
              <SlideCategories
                title="Sản phẩm liên quan"
                responsive={responsive}
                latestProducts={latestProducts}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
