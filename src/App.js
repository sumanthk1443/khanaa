import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Favourites from './pages/Favourites';
import Profile from './pages/Profile';
import RestaurantMenu from './pages/RestaurantMenu';
import Cart from './pages/Cart';
import { restaurants } from './data/restaurants';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('orders')) || []);
  const [favourites, setFavourites] = useState(() => JSON.parse(localStorage.getItem('favourites')) || []);
  const [selectedCity, setSelectedCity] = useState('Hyderabad');
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [credentials, setCredentials] = useState(() => JSON.parse(localStorage.getItem('credentials')) || null);
  const [userProfile, setUserProfile] = useState(() => JSON.parse(localStorage.getItem('userProfile')) || {
    name: 'K.SUMANTH',
    email: 'lucky@email.com',
    phone: '+91 98765 43210',
  });

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save orders to localStorage
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Save favourites to localStorage
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  // Save user profile to localStorage
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Save login status to localStorage
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Save credentials to localStorage
  useEffect(() => {
    if (credentials) localStorage.setItem('credentials', JSON.stringify(credentials));
  }, [credentials]);

  // Auto-hide message toasts
  useEffect(() => {
    if (!message.text) return;
    const t = setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    return () => clearTimeout(t);
  }, [message]);

  const handleSignup = ({ username, email, password, phone }) => {
    setCredentials({ username, email, password, phone });
    setUserProfile({ name: username, email, phone });
    setMessage({ text: 'Account created successfully!', type: 'success' });
  };

  const handleLogin = (email, password) => {
    if (credentials && credentials.email === email && credentials.password === password) {
      setIsLoggedIn(true);
      setUserProfile({ name: credentials.username, email: credentials.email, phone: credentials.phone });
      setMessage({ text: 'Login successfully', type: 'success' });
      navigate('home');
    } else {
      setMessage({ text: 'Invalid email or password. Please try again.', type: 'error' });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCart([]);
    setOrders([]);
    setFavourites([]);
    localStorage.removeItem('cart');
    localStorage.removeItem('orders');
    localStorage.removeItem('favourites');
    setMessage({ text: 'Logout successfully', type: 'success' });
    navigate('home');
  };

  const handleUpdateProfile = (newProfile) => {
    setUserProfile(prev => ({ ...prev, ...newProfile }));
    // keep credentials in sync if present
    setCredentials(prev => prev ? { ...prev, username: newProfile.name || prev.username, email: newProfile.email || prev.email, phone: newProfile.phone || prev.phone } : prev);
    setMessage({ text: 'Profile updated successfully', type: 'success' });
  };

  const navigate = (page, data = null) => {
    setCurrentPage(page);
    if (data) setSelectedRestaurant(data);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addToCart = (item, restaurant) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) {
        return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + item.quantity } : c);
      }
      return [...prev, { ...item, restaurantName: restaurant.name }];
    });
  };

  const updateCartItem = (id, quantity) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(c => c.id !== id));
    } else {
      setCart(prev => prev.map(c => c.id === id ? { ...c, quantity } : c));
    }
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(c => c.id !== id));
  };

  const placeOrder = () => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder = {
      id: Date.now(),
      items: [...cart],
      total,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      status: 'Preparing',
      restaurantName: cart[0]?.restaurantName || 'Restaurant',
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    navigate('orders');
  };

  const toggleFavourite = (restaurant) => {
    setFavourites(prev => {
      const exists = prev.find(f => f.id === restaurant.id);
      if (exists) {
        return prev.filter(f => f.id !== restaurant.id);
      }
      return [...prev, restaurant];
    });
  };

  const isFavourite = (id) => favourites.some(f => f.id === id);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigate={navigate} toggleFavourite={toggleFavourite} isFavourite={isFavourite} />;
      case 'menu':
        return <RestaurantMenu restaurant={selectedRestaurant} navigate={navigate} addToCart={addToCart} cart={cart} />;
      case 'cart':
        return <Cart cart={cart} updateCartItem={updateCartItem} removeFromCart={removeFromCart} placeOrder={placeOrder} navigate={navigate} />;
      case 'orders':
        return <Orders orders={orders} navigate={navigate} removeOrder={(id) => setOrders(prev => prev.filter(o => o.id !== id))} />;
      case 'favourites':
        return <Favourites favourites={favourites} navigate={navigate} toggleFavourite={toggleFavourite} removeFavourite={() => {}} />;
      case 'profile':
        return <Profile user={userProfile} setUser={setUserProfile} isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleSignup={handleSignup} handleLogout={handleLogout} handleUpdateProfile={handleUpdateProfile} message={message} />;
      default:
        return <Home navigate={navigate} toggleFavourite={toggleFavourite} isFavourite={isFavourite} />;
    }
  };

  return (
    <div className="app">
      <Navbar
        currentPage={currentPage}
        navigate={navigate}
        cartCount={cartCount}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        restaurants={restaurants}
        isLoggedIn={isLoggedIn}
        userProfile={userProfile}
        handleLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div className="page-content">
        {renderPage()}
      </div>
      {message.text && (
        <div className={`message-toast ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}


export default App;