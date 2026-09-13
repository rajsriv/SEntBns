import { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Filter, X } from 'lucide-react';
import './Products.css';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  
  const topFilterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only show sticky filter if the anchor is out of view AND above the viewport
        setIsStickyVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    if (topFilterRef.current) {
      observer.observe(topFilterRef.current);
    }

    return () => {
      if (topFilterRef.current) observer.unobserve(topFilterRef.current);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://sentbns.onrender.com/api/products');
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get dynamic categories and brands from fetched data
  const CATEGORIES = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['All', ...Array.from(cats)];
  }, [products]);

  const BRANDS = useMemo(() => {
    const brands = new Set(products.map(p => p.brand).filter(Boolean)); // Brand might not be in the new schema, filter out undefined
    return ['All', ...Array.from(brands)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const brandMatch = selectedBrand === 'All' || product.brand === selectedBrand;
      return categoryMatch && brandMatch;
    });
  }, [products, selectedCategory, selectedBrand]);

  const toggleMobileFilter = () => setIsMobileFilterOpen(!isMobileFilterOpen);

  return (
    <div className="products-page">
      <section className="hero">
        <div className="container hero-content">
          <h1 className="hero-title">Empowering Your Business with Quality Products</h1>
          <p className="hero-subtitle">
            Shivay Enterprises is your trusted partner for high-grade supplies, directly accessible via the GEM Portal.
          </p>
          <div className="hero-actions">
            <a href="#catalog" className="btn btn-primary">Browse Catalog</a>
            <Link to="/about" className="btn btn-outline">Learn More</Link>
          </div>
        </div>
      </section>

      <div id="catalog" className="container products-layout">
        {/* Mobile Filter Toggle (Top) */}
        <div ref={topFilterRef} className="mobile-filter-anchor">
          <button className="btn btn-outline mobile-filter-toggle" onClick={toggleMobileFilter}>
            <Filter size={20} /> Filters
          </button>
        </div>

        {/* Mobile Filter Toggle (Sticky Bottom) */}
        {isStickyVisible && (
          <button 
            className="btn btn-primary mobile-filter-sticky" 
            onClick={toggleMobileFilter}
          >
            <Filter size={20} /> Filters
          </button>
        )}

        {/* Sidebar */}
        <aside className={`products-sidebar ${isMobileFilterOpen ? 'open' : ''}`}>
          <div className="sidebar-header mobile-only">
            <h3>Filters</h3>
            <button onClick={toggleMobileFilter} className="close-btn"><X size={24} /></button>
          </div>
          
          <div className="filter-group">
            <h3 className="filter-title">Categories</h3>
            <ul className="filter-list">
              {CATEGORIES.map(category => (
                <li key={category}>
                  <button 
                    className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">Brands</h3>
            <ul className="filter-list">
              {BRANDS.map(brand => (
                <li key={brand}>
                  <button 
                    className={`filter-btn ${selectedBrand === brand ? 'active' : ''}`}
                    onClick={() => setSelectedBrand(brand)}
                  >
                    {brand}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="products-main">
          <div className="products-toolbar">
            <span className="results-count">Showing {filteredProducts.length} result(s)</span>
          </div>
          
          {isLoading ? (
            <div className="loading-state">
              <p>Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No products found matching your filters.</p>
              <button 
                className="btn btn-outline" 
                onClick={() => { setSelectedCategory('All'); setSelectedBrand('All'); }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
