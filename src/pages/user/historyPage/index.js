// HistoryPage.js
import React from "react";
import "./style.scss";

const HistoryPage = () => {
  const orders = [
    {
      id: 1,
      name_medicine: "Tên sản phẩm",
      image_medicine: "anh",
      total: 50,
      date: "2024-04-10",
      status: "đang đặt hàng",
    },
  ];

  return (
    <div className="container">
      <div className="history-page">
        <h1>Order History</h1>
        <div className="order-list">
          {orders.map((order) => (
            <div key={order.id} className="order">
              <div className="order-info">
                <p>Order ID: {order.id}</p>
                <p>Date: {order.date}</p>
                <p>Name: {order.name_medicine}</p>
                <p>Status: {order.status}</p>
              </div>
              <div className="order-image">
                <img src={order.image_medicine} alt={order.name_medicine} />
              </div>
              <div className="order-total">
                <p>Total: ${order.total}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
