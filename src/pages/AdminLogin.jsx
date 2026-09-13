import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('https://sentbns.onrender.com/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid admin credentials. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-split-container">
      <div className="admin-login-image-side">
        <h1 className="welcome-text">WELCOME</h1>
      </div>
      
      <div className="admin-login-form-side">
        <div className="admin-login-form-wrapper">
          <h2 className="login-heading">Login</h2>

          {error && <div className="admin-error-message">{error}</div>}

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="input-group-minimal">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group-minimal password-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>

            <button type="submit" className="admin-login-btn-solid" disabled={isLoading}>
              {isLoading ? <span className="loader-dark"></span> : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
