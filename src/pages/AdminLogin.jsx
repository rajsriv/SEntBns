import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, LogIn } from 'lucide-react';
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
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-icon-wrapper">
            <Lock size={32} className="admin-icon" />
          </div>
          <h2>Admin Portal</h2>
          <p>Secure access for site administrators</p>
        </div>

        {error && <div className="admin-error-message">{error}</div>}

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="input-group">
            <User className="input-icon" size={20} />
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="admin-login-btn" disabled={isLoading}>
            {isLoading ? (
              <span className="loader"></span>
            ) : (
              <>
                <span>Sign In</span>
                <LogIn size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
