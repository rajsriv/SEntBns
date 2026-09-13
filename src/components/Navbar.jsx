import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ isDarkMode, toggleTheme }) => {
  return (
    <header className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="brand">
          Shivay <span>Enterprises</span>
        </Link>
        
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
        </nav>

        <button 
          onClick={toggleTheme} 
          className="theme-toggle"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
