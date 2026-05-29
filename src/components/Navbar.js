import React, { useState } from 'react';
import './Navbar.css';
import { restaurants } from '../data/restaurants';

const cities = ['Hyderabad', 'Bangalore', 'Chennai', 'Mumbai', 'Delhi'];

function Navbar({ currentPage, navigate, cartCount, selectedCity, setSelectedCity, isLoggedIn, userProfile, handleLogout }) {
  const [showCities, setShowCities] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const filteredRestaurants = searchVal
    ? restaurants
        .filter(r => (r.name + ' ' + r.cuisine).toLowerCase().includes(searchVal.toLowerCase()))
        .slice(0, 6)
    : [];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <div className="nav-logo" onClick={() => navigate('home')}>
          <span className="logo-icon">🍛</span>
          <span className="logo-text">khana</span>
        </div>

        {/* City Selector */}
        <div className="city-selector" onClick={() => setShowCities(!showCities)}>
          <span className="city-pin">📍</span>
          <span className="city-name">{selectedCity}</span>
          <span className="city-arrow">{showCities ? '▲' : '▼'}</span>
          {showCities && (
            <div className="city-dropdown">
              {cities.map(c => (
                <div
                  key={c}
                  className={`city-option ${c === selectedCity ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setSelectedCity(c); setShowCities(false); }}
                >
                  {c}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <div className="nav-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search restaurants, cuisines..."
            value={searchVal}
            onFocus={() => setShowSuggestions(true)}
            onChange={e => {
              setSearchVal(e.target.value);
              setShowSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
          />
          {showSuggestions && filteredRestaurants.length > 0 && (
            <div className="search-suggestions">
              {filteredRestaurants.map(restaurant => (
                <button
                  key={restaurant.id}
                  type="button"
                  className="suggestion-item"
                  onMouseDown={() => {
                    navigate('menu', restaurant);
                    setSearchVal('');
                  }}
                >
                  <strong>{restaurant.name}</strong>
                  <span>{restaurant.cuisine}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Nav Links */}
        <div className="nav-links">
          <button
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => navigate('home')}
          >Home</button>
          <button
            className={`nav-link ${currentPage === 'orders' ? 'active' : ''}`}
            onClick={() => navigate('orders')}
          >Orders</button>
          <button
            className={`nav-link ${currentPage === 'favourites' ? 'active' : ''}`}
            onClick={() => navigate('favourites')}
          >Favourites</button>
        </div>

        {/* Cart + Profile */}
        <div className="nav-actions">
          <button className="cart-btn" onClick={() => navigate('cart')}>
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          {isLoggedIn ? (
            <div className="profile-dropdown-wrapper">
              <button
                className="profile-btn"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                {userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </button>
              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <button className="dropdown-item" onClick={() => { navigate('profile'); setShowProfileDropdown(false); }}>
                    👤 Profile
                  </button>
                  <button className="dropdown-item logout-btn" onClick={() => { handleLogout(); setShowProfileDropdown(false); }}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="login-btn" onClick={() => navigate('profile')}>
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;