import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3>Shivay Enterprises</h3>
          <p className="text-muted">Delivering quality products with excellence and reliability.</p>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p className="text-muted">Varanasi, Uttar Pradesh, India</p>
          <p className="text-muted">Email: contact@shivayenterprises.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="text-muted">&copy; {new Date().getFullYear()} Shivay Enterprises. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
