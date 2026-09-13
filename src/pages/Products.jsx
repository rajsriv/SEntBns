import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Filter, X } from 'lucide-react';
import './Products.css';

// Placeholder data
const PLACEHOLDER_PRODUCTS = [
  { id: 1, name: 'Ergonomic Office Chair', category: 'Furniture', brand: 'ComfortPlus', price: 8500, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=400&q=80', gemLink: 'https://gem.gov.in/' },
  { id: 2, name: 'Executive Desk', category: 'Furniture', brand: 'WoodCraft', price: 15000, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=80', gemLink: 'https://gem.gov.in/' },
  { id: 3, name: 'A4 Printer Paper (Box)', category: 'Stationery', brand: 'PrintMax', price: 1200, image: 'https://images.unsplash.com/photo-1588626573867-a2f64fcb9538?auto=format&fit=crop&w=400&q=80', gemLink: 'https://gem.gov.in/' },
  { id: 4, name: 'Laser Printer Pro', category: 'Electronics', brand: 'TechPrint', price: 22000, image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=400&q=80', gemLink: 'https://gem.gov.in/' },
  { id: 5, name: 'Conference Table', category: 'Furniture', brand: 'WoodCraft', price: 35000, image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=400&q=80', gemLink: 'https://gem.gov.in/' },
  { id: 6, name: 'Whiteboard 6x4', category: 'Office Supplies', brand: 'EduBoard', price: 4500, image: 'https://images.unsplash.com/photo-1577563908411-50cb98976fea?auto=format&fit=crop&w=400&q=80', gemLink: 'https://gem.gov.in/' },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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
    // If backend is empty, fall back to PLACEHOLDER_PRODUCTS for demo purposes
    const dataToFilter = products.length > 0 ? products : PLACEHOLDER_PRODUCTS;
    
    return dataToFilter.filter((product) => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const brandMatch = selectedBrand === 'All' || product.brand === selectedBrand;
      return categoryMatch && brandMatch;
    });
  }, [selectedCategory, selectedBrand]);

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
        {/* Mobile Filter Toggle */}
        <button className="btn btn-outline mobile-filter-toggle" onClick={toggleMobileFilter}>
          <Filter size={20} /> Filters
        </button>

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
