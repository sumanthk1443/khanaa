import React, { useRef, useState } from 'react';
import { restaurants } from '../data/restaurants';
import mobbVideo from '../background.mp4';
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
  const [searchTerm, setSearchTerm] = useState('');
  const categoriesRef = useRef(null);

  const searchQuery = searchTerm.trim().toLowerCase();
  const filteredRestaurants = searchQuery
    ? restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(searchQuery))
    : [];

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
      <section className="hero dark-theme">
        <video className="hero-bg-video" autoPlay muted loop playsInline src={mobbVideo} />
        <div className="hero-content">
          <div className="hero-left">
            <h1 className="hero-title">
              What are you<br />
              <span>CRAVING for?</span>
            </h1>
            <p className="hero-subtitle">
              Order from your favourite restaurants and get fresh food delivered to your door in minutes.
            </p>
            <div className="hero-search">
              <input
                type="text"
                placeholder="Search restaurants, cuisines..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm.trim() !== '' && (
                <div className="search-results">
                  {filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map((restaurant) => (
                      <button
                        key={restaurant.id}
                        type="button"
                        className="search-result-item"
                        onClick={() => navigate('menu', restaurant)}
                      >
                        <div className="search-result-primary">{restaurant.name}</div>
                        <div className="search-result-subtext">{restaurant.cuisine}</div>
                      </button>
                    ))
                  ) : (
                    <div className="search-no-results">No restaurants found</div>
                  )}
                </div>
              )}
            </div>
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
            <br></br>
          </div>
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

      

      {/* //Restaurants */}
      <section id="restaurants" className="restaurants-section container">
        <div className="section-header">
          <h2 className="section-title">Restaurants Near me</h2>
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

      {/* Search by Food Section */}
<section className="food-search-section container">

  <div className="section-header">
    <h2 className="section-title">Search by Food</h2>

    <div className="food-search-actions">
      <button className="circle-nav">‹</button>
      <button className="circle-nav">›</button>
    </div>
  </div>

  <div className="food-search-grid">

    <div className="food-search-card">
      <div className="food-search-thumb">
        <img
          src="https://media.istockphoto.com/id/521403691/photo/hot-homemade-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=PaISuuHcJWTEVoDKNnxaHy7L2BTUkyYZ06hYgzXmTbo="
          alt="Pizza"
          className="food-search-img"
        />
      </div>
      <div className="food-search-name">Pizza</div>
    </div>

    <div className="food-search-card">
      <div className="food-search-thumb">
        <img
          src="https://media.istockphoto.com/id/1309352410/photo/cheeseburger-with-tomato-and-lettuce-on-wooden-board.jpg?s=612x612&w=0&k=20&c=lfsA0dHDMQdam2M1yvva0_RXfjAyp4gyLtx4YUJmXgg="
          alt="Burger"
          className="food-search-img"
        />
      </div>
      <div className="food-search-name">Burger</div>
    </div>

    <div className="food-search-card">
      <div className="food-search-thumb">
        <img
          src="https://www.indianhealthyrecipes.com/wp-content/uploads/2021/07/hakka-noodles-recipe.jpg"
          alt="Noodles"
          className="food-search-img"
        />
      </div>
      <div className="food-search-name">Noodles</div>
    </div>

    <div className="food-search-card">
      <div className="food-search-thumb">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiPp4ixr43lCzt6xPnV-yVFqYVzicRxUlZww&s"
          alt="Sub-sandwich"
          className="food-search-img"
        />
      </div>
      <div className="food-search-name">Sub-sandwich</div>
    </div>

    <div className="food-search-card">
      <div className="food-search-thumb">
        <img
          src="https://tastesbetterfromscratch.com/wp-content/uploads/2023/10/Chow-Mein-1.jpg"
          alt="Chowmein"
          className="food-search-img"
        />
      </div>
      <div className="food-search-name">Chowmein</div>
    </div>

    <div className="food-search-card">
      <div className="food-search-thumb">
        <img
          src="https://cdn.jwplayer.com/v2/media/6Zj7e9p9/poster.jpg?width=1280"
          alt="Steak"
          className="food-search-img"
        />
      </div>
      <div className="food-search-name">Steak</div>
    </div>

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

      {/* Healthy Pickups */}
      <section className="health-section container">
        <div className="section-header">
          <h2 className="section-title">Healthy Pickups</h2>
          <button className="see-all">View All →</button>
        </div>
        <div className="health-grid">
          <div className="health-card">
            <div className="health-img-wrap">
              <img
                src="https://iowagirleats.com/wp-content/uploads/2015/01/Chicken-Power-Bowls-with-Crispy-Baked-Garbanzo-Beans-iowagirleats.com-02_srgb.jpg"
                alt="Protein Bowl"
                className="health-img"
              />
            </div>
            <div className="health-card-content">
              <div className="health-title">Protein Power Bowl</div>
              <p className="health-subtitle">Grilled chicken, quinoa, kale and roasted veg.</p>
              <div className="health-meta">
                <span>High Protein</span>
                <span>₹299</span>
              </div>
            </div>
          </div>
          <div className="health-card">
            <div className="health-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
                alt="Green Salad"
                className="health-img"
              />
            </div>
            <div className="health-card-content">
              <div className="health-title">Super Green Salad</div>
              <p className="health-subtitle">Avocado, spinach, broccoli and seeds.</p>
              <div className="health-meta">
                <span>Fresh Veg</span>
                <span>₹249</span>
              </div>
            </div>
          </div>
          <div className="health-card">
            <div className="health-img-wrap">
              <img
                src="https://www.garnishandglaze.com/wp-content/uploads/2017/01/nuts-about-berries-smoothie-bowl-6.jpg"
                alt="Smoothie Bowl"
                className="health-img"
              />
            </div>
            <div className="health-card-content">
              <div className="health-title">Berry Smoothie Bowl</div>
              <p className="health-subtitle">Greek yogurt, berries and crunchy granola.</p>
              <div className="health-meta">
                <span>Vitamins Rich</span>
                <span>₹199</span>
              </div>
            </div>
          </div>
          <div className="health-card">
            <div className="health-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
                alt="Grilled Chicken Wrap"
                className="health-img"
              />
            </div>
            <div className="health-card-content">
              <div className="health-title">Grilled Chicken Wrap</div>
              <p className="health-subtitle">Whole wheat wrap with greens and hummus.</p>
              <div className="health-meta">
                <span>Clean Eat</span>
                <span>₹269</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="how-it-works-section container">
        <h2 className="section-title">How It Works</h2>
        <div className="how-it-works-content">
          <div className="steps-grid">
            <article className="step-card">
              <div className="step-icon">🔍</div>
              <h3>Discover Restaurants</h3>
              <p>Browse local kitchens, trending dishes, and trusted reviews in one place.</p>
            </article>

            <article className="step-card">
              <div className="step-icon">🍽️</div>
              <h3>Select Your Meal</h3>
              <p>Choose your favorites, customize your order, and add exactly what you want.</p>
            </article>

            <article className="step-card">
              <div className="step-icon">🏍️</div>
              <h3>Fast Delivery</h3>
              <p>Enjoy quick delivery and real-time tracking from kitchen to your door.</p>
            </article>
          </div>

          <div className="app-download-banner">
            <div className="banner-copy">
              <span className="banner-label">Download the app</span>
              <h3>Order faster with our mobile app</h3>
              <p>Get app-only offers, live updates, and one-tap reorders for your favorite meals.</p>

              <ul className="banner-benefits">
                <li>Daily deals and exclusive savings</li>
                <li>Live order tracking and status alerts</li>
                <li>Quick reorder for saved favorites</li>
              </ul>

              <a href="https://play.google.com"target="_blank"rel="noopener noreferrer"className="google-play-btn">
                <span className="gp-icon">▶</span>
                <span>
                  <small>GET IT ON</small>
                  Google Play
                </span>
              </a>
            </div>

            <div className="banner-visual">
              <div className="phone-mockup">
                <div className="phone-screen">
                  <div className="screen-header">
                    <span>khana</span>
                    <span className="signal">• • •</span>
                  </div>
                  <div className="screen-content">
                    <div className="screen-card">
                      <strong>Order status</strong>
                      <p>Spicy Paneer Bowl arriving soon</p>
                    </div>
                    <div className="screen-row">
                      <span>12 min</span>
                      <span>On the way</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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