// HistoryPage.js
import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const HistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchData = (username) => {
      fetch(`http://127.0.0.1:8000/api/history/${username}/`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setOrders(data.orders);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    };

    const newUsername = window.localStorage.getItem("username");
    if (newUsername) {
      setUsername(newUsername);
      fetchData(newUsername); // Gọi fetch khi có username
    }
  }, []);

  return (
    <div className="container container_custom_size">
      <div className="container_details ">
        <div className="container-information-more">
          <h2>LỊCH SỬ MUA HÀNG</h2>
          <div className="container_details_history">
            <div className="container_details_history_name">Mã đặt hàng</div>
            <div className="container_details_history_quantity">
              Tên người đặt
            </div>
            <div className="container_details_history_image">
              Tên người nhận
            </div>
            <div className="container_details_history_image">Số điện thoại</div>
            <div className="container_details_history_price">Ngày đặt hàng</div>
            <div className="container_details_history_status">Tình trạng</div>
            <div className="container_details_history_more">More</div>
          </div>
          {/* Kiểm tra nếu orders không được định nghĩa trước khi render */}
          {orders && orders.length > 0 ? (
            // Render danh sách đơn hàng
            orders.map((order) => (
              <div key={order.id_order} className="container_details_history">
                <div className="container_details_history_name custom">
                  {order.id_order}
                </div>
                <div className="container_details_history_quantity">
                  {order.user.first_name} {order.user.last_name}
                </div>
                <div className="container_details_history_image">
                  {order.receiver}
                </div>
                <div className="container_details_history_image">
                  {order.phone_number}
                </div>
                <div className="container_details_history_price">
                  {order.created}
                </div>
                <div className="container_details_history_status">
                  {order.status_id}
                </div>
                <div className="container_details_history_more">
                  <button className="container_details_history_more_button">
                    <Link to={`/chi-tiet-don-hang/${order.id_order}`}>
                      Xem chi tiết
                    </Link>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>Không có đơn hàng nào.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
