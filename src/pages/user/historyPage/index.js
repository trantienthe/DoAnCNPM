import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const HistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [username, setUsername] = useState(null);

  // Định nghĩa một hàm để chuyển đổi status_id sang chuỗi tương ứng
  const getStatusText = (statusId) => {
    switch (statusId) {
      case "Pending":
        return "Đang chờ xử lý";
      case "Processing":
        return "Đã nhận đơn";
      case "Shipped":
        return "Đang giao hàng";
      case "Delivered":
        return "Đã giao hàng";
      default:
        return "Không xác định";
    }
  };

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

  const handleExportInvoice = (order_id) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xuất hóa đơn không?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Không",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `http://127.0.0.1:8000/api/invoice/${order_id}/`;

        Swal.fire({
          title: "Đã xuất hóa đơn!",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    });
  };

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
            <div className="container_details_history_more">Hành động</div>
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
                  {new Date(order.created).toLocaleString("vi-VN")}
                </div>
                <div className="container_details_history_status">
                  {getStatusText(order.status_id)}
                </div>
                <div className="container_details_history_more">
                  <button className="container_details_history_more_button">
                    <Link to={`/chi-tiet-don-hang/${order.id_order}`}>
                      Chi tiết
                    </Link>
                  </button>
                  <button
                    className="container_details_history_more_button_inhoadon"
                    onClick={() => handleExportInvoice(order.id_order)}
                  >
                    Xuất hóa đơn
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                height: "100px",
                textAlign: "center",
                marginTop: "30px",
                color: "red",
                fontSize: "18px",
              }}
            >
              Không có đơn hàng nào.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
