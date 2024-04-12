import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { formater } from "utils/fomater";

const ProductCategory = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

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
              <div className="col-lg-3" key={product.id}>
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
                        <Link to={`/product/${product.id}`}>
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
                      <Link to={`/product/${product.id}`}>
                        {product.name_medicine}
                      </Link>
                    </h6>
                    <h5>{formater(product.price)}</h5>
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
