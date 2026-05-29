import React from 'react';
import './Orders.css';

const statusSteps = ['Order Placed', 'Preparing', 'On the Way', 'Delivered'];

function Orders({ orders, navigate, removeOrder }) {
  if (orders.length === 0) {
    return (
      <div className="empty-page">
        <div className="empty-icon">📦</div>
        <h2>No orders yet</h2>
        <p>Order something delicious and it will show up here</p>
        <button className="btn-primary" onClick={() => navigate('home')}>Order Now</button>
      </div>
    );
  }

  return (
    <div className="orders-page container">
      <h1 className="page-title">Your Orders</h1>
      <div className="orders-list">
        {orders.map(order => {
          const currentStep = statusSteps.indexOf(order.status);
          return (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <h3 className="order-rest">{order.restaurantName}</h3>
                  <p className="order-date">{order.date} at {order.time}</p>
                </div>
                <div className="order-total-badge">₹{order.total}</div>
              </div>

              <div className="order-items-list">
                {order.items.map(item => (
                  <div key={item.id} className="order-item-row">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Status tracker */}
              <div className="order-tracker">
                {statusSteps.map((step, idx) => (
                  <div key={step} className="tracker-step">
                    <div className={`tracker-dot ${idx <= currentStep ? 'done' : ''}`}>
                      {idx <= currentStep ? '✓' : idx + 1}
                    </div>
                    <span className={`tracker-label ${idx <= currentStep ? 'done' : ''}`}>{step}</span>
                    {idx < statusSteps.length - 1 && (
                      <div className={`tracker-line ${idx < currentStep ? 'done' : ''}`}></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <span className={`status-tag ${order.status.toLowerCase().replace(' ', '-')}`}>
                  {order.status}
                </span>
                <div className="order-footer-btns">
                  <button className="reorder-btn" onClick={() => navigate('home')}>Reorder</button>
                  <button className="remove-btn" onClick={() => removeOrder(order.id)}>🗑</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;