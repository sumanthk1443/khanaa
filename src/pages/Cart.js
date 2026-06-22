import React from 'react';
import './Cart.css';

function Cart({ cart, updateCartItem, placeOrder, navigate }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal > 500 ? 0 : 49;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + taxes;

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-page">
          <div className="empty-icon">🛒</div>
          <h2>Your bag is empty</h2>
          <p>Add items from a restaurant to get started</p>
          <button className="btn-primary" onClick={() => navigate('home')}>Browse Restaurants</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="page-title">Your Bag</h1>
      <div className="cart-layout">
        {/* Items */}
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <span className="cart-item-from">{item.restaurantName}</span>
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-price">₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}</span>
              </div>
              <div className="cart-qty-controls">
                <button className="cqty-btn" onClick={() => updateCartItem(item.id, item.quantity - 1)}>−</button>
                <span className="cqty-val">{item.quantity}</span>
                <button className="cqty-btn" onClick={() => updateCartItem(item.id, item.quantity + 1)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => updateCartItem(item.id, 0)}>🗑</button>
            </div>
          ))}
        </div>

        {/* Bill */}
        <div className="bill-card">
          <h2 className="bill-title">Bill Summary</h2>
          <div className="bill-rows">
            <div className="bill-row"><span>Item Total</span><span>₹{subtotal}</span></div>
            <div className="bill-row"><span>Delivery Fee</span><span>{delivery === 0 ? <span className="free">FREE</span> : `₹${delivery}`}</span></div>
            <div className="bill-row"><span>GST & Charges (5%)</span><span>₹{taxes}</span></div>
          </div>
          <div className="bill-total"><span>To Pay</span><span>₹{total}</span></div>
          {delivery === 0 && <p className="free-note">🎉 You get free delivery!</p>}
          {delivery > 0 && <p className="free-note">Add ₹{500 - subtotal} more for free delivery</p>}

          <div className="promo-row">
            <input type="text" placeholder="Enter promo code" className="promo-input" />
            <button className="promo-btn">Apply</button>
          </div>

          <button className="place-order-btn" onClick={placeOrder}>
            Place Order • ₹{total}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;