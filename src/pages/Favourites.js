import React from 'react';
import './Favourites.css';

function Favourites({ favourites, navigate, toggleFavourite }) {
  if (favourites.length === 0) {
    return (
      <div className="favs-page">
        <div className="empty-page">
          <div className="empty-icon">❤️</div>
          <h2>No favourites yet</h2>
          <p>Tap the heart icon on a restaurant to save it here</p>
          <button className="btn-primary" onClick={() => navigate('home')}>Explore Restaurants</button>
        </div>
      </div>
    );
  }

  return (
    <div className="favs-page">
      <h1 className="page-title">Your Favourites</h1>
      <p className="fav-count">{favourites.length} saved restaurant{favourites.length > 1 ? 's' : ''}</p>
      <div className="favs-grid">
        {favourites.map(r => (
          <div key={r.id} className="fav-card">
            <div className="fav-img-wrap">
              <img src={r.image} alt={r.name} className="fav-img" />
              <button className="fav-remove-btn" onClick={() => toggleFavourite(r)}>❤️</button>
              <span className="fav-rating">⭐ {r.rating}</span>
            </div>
            <div className="fav-info">
              <h3>{r.name}</h3>
              <p>{r.cuisine}</p>
              <div className="fav-meta">
                <span>🕐 {r.time} mins</span>
                <span>₹{r.priceForTwo} for two</span>
              </div>
              <button className="btn-primary fav-order-btn" onClick={() => navigate('menu', r)}>
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favourites;