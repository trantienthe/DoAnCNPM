import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./style.scss";
const DetailHistory = () => {
  const { id } = useParams();
  const [historyItems, setHistoryItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/history/detail_item/${id}/`
        );
        const data = await response.json();
        setHistoryItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="container container_custom_sizes">
        <h2 className="container__h2">Giỏ thuốc đã mua</h2>
        <div className="container_details">
          <div className="container_details_border">
            {historyItems.map((item) => (
              <div className="container_details_custom" key={item.id}>
                <div className="container_details_top">
                  <div className="container_details_top_left">
                    Chi tiết: {item.id}
                  </div>
                  <div className="container_details_top_right">
                    {item.status_id}
                  </div>
                </div>

                <div className="container_details_top_bottom">
                  <div className="container_details_top_bottom_display">
                    <div className="container_details_top_bottom_display_image">
                      <img
                        src={`http://127.0.0.1:8000/static/${item.image}`}
                        alt="medicine"
                        className="image_details"
                      />
                    </div>

                    <div className="container_details_top_bottom_display_text">
                      <div>{item.name}</div>
                      <div style={{ paddingTop: "10px" }}>
                        Số lượng: {item.quantity}
                      </div>
                    </div>

                    <div className="container_details_top_bottom_display_price">
                      <div>
                        <div>{item.price} VND</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailHistory;
