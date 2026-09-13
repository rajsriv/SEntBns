import { ExternalLink } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <span className="product-category-badge">{product.category}</span>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-brand text-muted">{product.brand}</p>
        <div className="product-footer">
          <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
          <a 
            href={product.gemLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm gem-link-btn"
          >
            GEM Portal <ExternalLink size={14} className="icon-right" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
