import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { formater } from "utils/fomater";
import axios from "axios";
import { toast } from "react-toastify";
import { FcCancel } from "react-icons/fc";

const ProductCategory = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  const handleAddToCart = async (id) => {
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
      });

      console.log(response.data);
      toast.success("Đã thêm vào giỏ hàng !!!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  const handleNotToCart = () => {
    toast.error("Sản phẩm đã hết!");
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/thuoc/`)
      .then((response) => response.json())
      .then((data) => {
        const newProducts = data.filter(
          (product) => product.category.name === categoryName
        );
        setProducts([...newProducts]);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [categoryName]);

  return (
    <>
      <div className="container">
        <div className="featured">
          <div className="section-title">
            <h2>Danh mục: {categoryName}</h2>
          </div>
          <div className="row">
            {products.map((product) => (
              <div className="col-lg-3" key={product.id_medicine}>
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
                    <div className="featured_item_picc">- 20%</div>
                    <ul className="featured_item_pic_hover featured_item_pic_hover_custom">
                      <li>
                        <Link to={`/chi-tiet-san-pham/${product.id_medicine}`}>
                          <AiOutlineEye />
                        </Link>
                      </li>
                      <li>
                        {product.active ? (
                          <AiOutlineShoppingCart
                            onClick={() => handleAddToCart(product.id_medicine)}
                          />
                        ) : (
                          <FcCancel
                            onClick={() => handleNotToCart(product.id_medicine)}
                          />
                        )}
                      </li>
                    </ul>
                  </div>
                  <div className="featured_item_text">
                    <h6>
                      <Link to={`/chi-tiet-san-pham/${product.id_medicine}`}>
                        {product.name_medicine}
                      </Link>
                    </h6>
                    <h5 className="featured_item_text_price">
                      {formater(product.price)}
                    </h5>
                    <h5>
                      {" "}
                      {product.discount_price
                        ? formater(product.discount_price)
                        : formater(product.price)}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCategory;
