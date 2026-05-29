import React, { useEffect, useState } from 'react';
import './Profile.css';

function Profile({ user, setUser, isLoggedIn, handleLogin, handleSignup, handleLogout, handleUpdateProfile, message }) {
  const [editMode, setEditMode] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    password: '',
  });

  useEffect(() => {
    setFormData({ name: user.name, email: user.email, phone: user.phone });
  }, [user]);

  // If not logged in, show login/signup form
  if (!isLoggedIn) {
    return (
      <div className="profile-page container">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-icon">🍛</div>
            <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
            <p>{isSignUp ? 'Join khana for faster ordering' : 'Login to continue'}</p>

            <div className="auth-form">
              {isSignUp && (
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="auth-input"
                />
              )}
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="auth-input"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="auth-input"
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="auth-input"
              />
              <button
                className="auth-submit-btn"
                onClick={() => {
                  if (isSignUp) {
                    handleSignup({ username: formData.name || 'User', email: formData.email, password: formData.password, phone: formData.phone });
                    setIsSignUp(false);
                    setFormData(prev => ({ ...prev, password: '' }));
                  } else {
                    handleLogin(formData.email, formData.password);
                  }
                }}
              >
                {isSignUp ? 'Create Account' : 'Login'}
              </button>
            </div>

            <p className="auth-toggle">
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <button
                className="auth-toggle-btn"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setFormData({ name: '', email: '', phone: '' });
                }}
              >
                {isSignUp ? 'Login' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If logged in, show profile

  const initials = (user.name || user.username || '')
    .split(' ')
    .filter(Boolean)
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleSave = () => {
    const updated = {
      name: formData.name.trim() || user.name,
      email: formData.email.trim() || user.email,
      phone: formData.phone.trim() || user.phone,
    };
    if (handleUpdateProfile) handleUpdateProfile(updated);
    else setUser(updated);
    setEditMode(false);
  };

  return (
    <div className="profile-page container">
      <h1 className="page-title">My Profile</h1>
      <div className="profile-layout">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-avatar">{initials}</div>
          {editMode ? (
            <input
              className="profile-input"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Your name"
            />
          ) : (
            <h2 className="profile-name">{user.name}</h2>
          )}
          {editMode ? (
            <input
              className="profile-input"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Email address"
            />
          ) : (
            <p className="profile-email">{user.email}</p>
          )}
          {editMode ? (
            <input
              className="profile-input"
              value={formData.phone}
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Phone number"
            />
          ) : (
            <p className="profile-phone">{user.phone}</p>
          )}
          <div className="profile-stats">
            <div className="stat"><span className="stat-num">24</span><span className="stat-label">Orders</span></div>
            <div className="stat"><span className="stat-num">6</span><span className="stat-label">Favourites</span></div>
            <div className="stat"><span className="stat-num">₹4.2k</span><span className="stat-label">Spent</span></div>
          </div>
          <div className="profile-actions-row">
            {editMode ? (
              <>
                <button className="save-profile-btn" onClick={handleSave}>Save Changes</button>
                <button className="cancel-profile-btn" onClick={() => setEditMode(false)}>Cancel</button>
              </>
            ) : (
              <button className="edit-profile-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="profile-right">
          {/* Saved Addresses */}
          <div className="profile-section">
            <h3 className="section-subtitle">📍 Saved Addresses</h3>
            <div className="address-card">
              <span className="addr-tag home">Home</span>
              <p>Flat 204, Sunrise Apartments, Banjara Hills, Hyderabad - 500034</p>
            </div>
            <div className="address-card">
              <span className="addr-tag work">Work</span>
              <p>HITEC City, Madhapur, Hyderabad - 500081</p>
            </div>
            <button className="add-address-btn">+ Add New Address</button>
          </div>

          {/* Payment Methods */}
          <div className="profile-section">
            <h3 className="section-subtitle">💳 Payment Methods</h3>
            <div className="payment-row">
              <span>🏦</span>
              <span>UPI - lucky@upi</span>
              <span className="default-tag">Default</span>
            </div>
            <div className="payment-row">
              <span>💳</span>
              <span>**** **** **** 4231</span>
            </div>
          </div>

          {/* App Info */}
          <div className="profile-section">
            <h3 className="section-subtitle">📱 About Khana</h3>
            <div className="about-info-grid">
              <div className="info-item">
                <span className="info-icon">🍛</span>
                <div>
                  <strong>Khana</strong>
                  <p>Fast food delivery for India</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">📞</span>
                <div>
                  <strong>Support</strong>
                  <p>+91 99999 88888</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">✉️</span>
                <div>
                  <strong>Email</strong>
                  <p>hello@khana.app</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">📍</span>
                <div>
                  <strong>Address</strong>
                  <p>HITEC City, Hyderabad</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">🌐</span>
                <div>
                  <strong>Website</strong>
                  <p>www.khana.app</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">📦</span>
                <div>
                  <strong>Version</strong>
                  <p>v1.0.0</p>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button className="action-btn">🔔 Notification Settings</button>
            <button className="action-btn">🔒 Privacy Policy</button>
            <button className="action-btn">📄 Terms of Service</button>
            <button className="action-btn logout" onClick={() => handleLogout()}>🚪 Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;