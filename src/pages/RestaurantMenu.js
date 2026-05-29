import React, { useState } from 'react';
import './RestaurantMenu.css';

function RestaurantMenu({ restaurant, navigate, addToCart, cart }) {
  const [quantities, setQuantities] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [addedItems, setAddedItems] = useState({});

  if (!restaurant) { navigate('home'); return null; }

  const categories = [...new Set(restaurant.menu.map(item => item.category))];
  const activeItems = activeCategory
    ? restaurant.menu.filter(i => i.category === activeCategory)
    : restaurant.menu;

  const getQty = (id) => quantities[id] || 1;

  const increment = (id) => setQuantities(prev => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  const decrement = (id) => setQuantities(prev => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) - 1) }));

  const handleAdd = (item) => {
    addToCart({ ...item, quantity: getQty(item.id) }, restaurant);
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => setAddedItems(prev => ({ ...prev, [item.id]: false })), 1200);
  };

  const cartTotal = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  return (
    <div className="menu-page">
      {/* Banner */}
      <div className="menu-banner">
        <img src={restaurant.image} alt={restaurant.name} className="banner-img" />
        <div className="banner-overlay">
          <button className="back-btn" onClick={() => navigate('home')}>← Back to restaurants</button>
          <div className="banner-info">
            <h1>{restaurant.name}</h1>
            <p>{restaurant.cuisine} • {restaurant.time} mins • ⭐ {restaurant.rating}</p>
            <p className="price-info">Approx ₹{restaurant.priceForTwo} for two</p>
          </div>
        </div>
      </div>

      <div className="menu-layout container">
        {/* Sidebar */}
        <aside className="menu-sidebar">
          <div className="sidebar-title">Menu Categories</div>
          {categories.map(cat => (
            <div
              key={cat}
              className={`sidebar-cat ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            >
              {cat}
              <span className="cat-count">{restaurant.menu.filter(i => i.category === cat).length}</span>
            </div>
          ))}
        </aside>

        {/* Items */}
        <div className="menu-items">
          <div className="menu-header-row">
            <span className="menu-count">Menu • {restaurant.menu.length} items</span>
            {activeCategory && (
              <button className="clear-filter" onClick={() => setActiveCategory(null)}>Show All</button>
            )}
          </div>

          {categories
            .filter(cat => !activeCategory || cat === activeCategory)
            .map(cat => (
              <div key={cat} className="category-section">
                <h2 className="cat-heading">{cat}</h2>
                {restaurant.menu.filter(i => i.category === cat).map(item => (
                  <div key={item.id} className="menu-item-card">
                    <img src={item.image} alt={item.name} className="item-img" />
                    <div className="item-details">
                      <div className="item-name-row">
                        <span className={`veg-dot ${item.veg ? 'veg' : 'nonveg'}`} title={item.veg ? 'Veg' : 'Non-Veg'}></span>
                        <span className="item-name">{item.name}</span>
                      </div>
                      <span className="item-price">₹{item.price}</span>
                    </div>
                    <div className="item-actions">
                      <div className="qty-controls">
                        <button className="qty-btn" onClick={() => decrement(item.id)}>−</button>
                        <span className="qty-val">{getQty(item.id)}</span>
                        <button className="qty-btn" onClick={() => increment(item.id)}>+</button>
                      </div>
                      <button
                        className={`add-btn ${addedItems[item.id] ? 'added' : ''}`}
                        onClick={() => handleAdd(item)}
                      >
                        {addedItems[item.id] ? '✓ Added!' : 'Add'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>

        {/* About sidebar */}
        <aside className="about-sidebar">
          <div className="about-card">
            <h3>About this restaurant</h3>
            <p>⭐ {restaurant.rating} rating</p>
            <p>⏱ {restaurant.time} mins delivery</p>
            <p>💰 Approx ₹{restaurant.priceForTwo} for two</p>
            <p>🍽 {restaurant.cuisine}</p>
          </div>
        </aside>
      </div>

      {/* Sticky Cart Bar */}
      {cartCount > 0 && (
        <div className="cart-bar">
          <div className="cart-bar-info">
            <span className="cart-bar-count">{cartCount} item{cartCount > 1 ? 's' : ''}</span>
            <span className="cart-bar-total">₹{cartTotal}</span>
          </div>
          <button className="cart-bar-btn" onClick={() => navigate('cart')}>
            View Bag →
          </button>
        </div>
      )}
    </div>
  );
}

export default RestaurantMenu;