import React, { useRef } from 'react';
import { restaurants } from '../data/restaurants';
import mobbVideo from '../mobb.mp4';
import './Home.css';

const categories = [
  { name: 'Biryani', icon: '🍛' },
  { name: 'Burgers', icon: '🍔' },
  { name: 'Pizza', icon: '🍕' },
  { name: 'Chicken', icon: '🍗' },
  { name: 'Drinks', icon: '🥤' },
  { name: 'Desserts', icon: '🍰' },
  { name: 'Street Food', icon: '🌯' },
  { name: 'Grill', icon: '🔥' },
];

function Home({ navigate, toggleFavourite, isFavourite }) {
  const categoriesRef = useRef(null);

  const scrollCategories = (direction) => {
    if (categoriesRef.current) {
      const scrollAmount = 300;
      categoriesRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <video className="hero-bg-video" autoPlay muted loop playsInline src={mobbVideo} />
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-badge"> 50% OFF on first order</div>
            <h1 className="hero-title">
              Delicious Food<br />
              <span>Delivered Fast</span>
            </h1>
            <p className="hero-subtitle">
              Order from your favourite restaurants and get fresh food delivered to your door in minutes.
            </p>
            <div className="hero-tags">
              <span> Lightning Fast</span>
              <span> Fresh Ingredients</span>
             
            </div>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => document.getElementById('restaurants').scrollIntoView({ behavior: 'smooth' })}>
                Order Now
              </button>
              <button className="btn-outline" onClick={() => document.getElementById('restaurants').scrollIntoView({ behavior: 'smooth' })}>
                Explore Menu
              </button>
            </div>
          </div>
          {/* <div className="hero-right">
            <img
             // src="https://thumbs.dreamstime.com/b/people-eating-healthy-meals-wooden-table-top-view-food-delivery-people-eating-healthy-meals-wooden-table-food-delivery-160387494.jpg"
             // alt="Delicious food"
              className="hero-img"
            />
          </div> */}
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section container">
        <h2 className="section-title">Popular Categories</h2>
        <div className="categories-wrapper">
          <button className="scroll-btn left" onClick={() => scrollCategories('left')}>‹</button>
          <div className="categories-grid" ref={categoriesRef}>
            {[...categories, ...categories].map((cat, idx) => (
              <div key={`${cat.name}-${idx}`} className="category-card">
                <div className="cat-icon">{cat.icon}</div>
                <span>{cat.name}</span>
              </div>
            ))}
          </div>
          <button className="scroll-btn right" onClick={() => scrollCategories('right')}>›</button>
        </div>
      </section>

      {/* Offers */}
      <section className="offers-section container">
        <h2 className="section-title">Special Offers</h2>
        <div className="offers-grid">
          <div className="offer-card orange">
            <span className="offer-icon">%</span>
            <div className="offer-title">20% OFF</div>
            <div className="offer-sub">First Order</div>
          </div>
          <div className="offer-card blue">
            <span className="offer-icon"></span>
            <div className="offer-title">Free Delivery</div>
            <div className="offer-sub">Over ₹500</div>
          </div>
          <div className="offer-card green">
            <span className="offer-icon">⏱</span>
            <div className="offer-title">Quick Service</div>
            <div className="offer-sub">Under 30 mins</div>
          </div>
          <div className="offer-card purple">
            <span className="offer-icon"></span>
            <div className="offer-title">Loyalty Points</div>
            <div className="offer-sub">Earn on every order</div>
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section id="restaurants" className="restaurants-section container">
        <div className="section-header">
          <h2 className="section-title">Top Restaurants</h2>
          <button className="see-all">See All →</button>
        </div>
        <div className="restaurants-grid">
          {restaurants.map(r => (
            <div key={r.id} className="restaurant-card">
              <div className="restaurant-img-wrap">
                <img src={r.image} alt={r.name} className="restaurant-img" />
                <button
                  className={`fav-btn ${isFavourite(r.id) ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); toggleFavourite(r); }}
                >
                  {isFavourite(r.id) ? '❤️' : '🤍'}
                </button>
                <span className="rating-badge"> {r.rating}</span>
              </div>
              <div className="restaurant-info">
                <h3 className="restaurant-name">{r.name}</h3>
                <p className="restaurant-cuisine">{r.cuisine}</p>
                <div className="restaurant-meta">
                  <span> {r.time} mins</span>
                  <span>₹{r.priceForTwo} for two</span>
                </div>
                <button className="btn-primary order-btn" onClick={() => navigate('menu', r)}>
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner container">
          <div className="footer-brand">
            <div className="footer-logo">🍛 khana</div>
            <p>Fast, fresh, and delicious food delivered right to your door.</p>
            {/* <div className="footer-socials">
              <span>📘</span><span>🐦</span><span>📸</span>
            </div> */}
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>About Us</li>
              <li>Contact</li>
              <li>Careers</li>
              <li>Privacy</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li>Order Tracking</li>
              <li>Help Center</li>
              <li>Payment Options</li>
              <li>Delivery Areas</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact Info</h4>
            <ul>
              <li>📞 +91 99999 88888</li>
              <li>✉️ hello@khana.app</li>
              <li>📍 Hyderabad, India</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Khana. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;