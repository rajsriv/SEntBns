import { ExternalLink } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  // Map new backend schema fields to display fields, falling back to placeholder data fields
  const displayTitle = product.title || product.name;
  const displayImage = product.imageUrl || product.image;
  const displayLink = product.redirectUrl || product.gemLink;
  const displayButtonText = product.buttonText || 'GEM Portal';

  return (
    <div className="product-card card">
      <div className="product-image-container">
        <img src={displayImage} alt={displayTitle} className="product-image" />
        <span className="product-category-badge">{product.category}</span>
      </div>
      <div className="product-info">
        <h3 className="product-name">{displayTitle}</h3>
        {product.brand && <p className="product-brand text-muted">{product.brand}</p>}
        {product.description && <p className="product-description text-muted">{product.description.substring(0, 80)}...</p>}
        <div className="product-footer">
          <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
          <a 
            href={displayLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm gem-link-btn"
          >
            {displayButtonText} <ExternalLink size={14} className="icon-right" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
