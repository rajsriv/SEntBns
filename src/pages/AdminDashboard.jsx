import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, PlusCircle, LayoutDashboard, Package, Settings, Image as ImageIcon } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('addProduct');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    redirectUrl: '',
    category: '',
    buttonText: 'Buy Now'
  });

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem('adminToken');
    if (!token) {
      alert('You must be logged in to upload images.');
      navigate('/admin/login');
      return;
    }

    setIsUploadingImage(true);
    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      const response = await fetch('https://sentbns.onrender.com/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataUpload
      });

      const data = await response.json();
      if (response.ok) {
        setFormData(prev => ({ ...prev, imageUrl: data.imageUrl }));
      } else {
        alert(`Upload failed: ${data.error}`);
      }
    } catch (err) {
      alert('Failed to connect to the server for image upload.');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('adminToken');
    if (!token) {
      alert('You must be logged in to perform this action.');
      navigate('/admin/login');
      return;
    }

    try {
      const response = await fetch('https://sentbns.onrender.com/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Product added successfully!');
        setFormData({
          title: '',
          description: '',
          price: '',
          imageUrl: '',
          redirectUrl: '',
          category: '',
          buttonText: 'Buy Now'
        });
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      alert('Failed to connect to the server.');
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </button>
          <button 
            className={`nav-btn ${activeTab === 'addProduct' ? 'active' : ''}`}
            onClick={() => setActiveTab('addProduct')}
          >
            <PlusCircle size={20} />
            <span>Add Product</span>
          </button>
          <button 
            className={`nav-btn ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            <Package size={20} />
            <span>Manage Products</span>
          </button>
          <button 
            className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="main-header">
          <h1>{activeTab === 'addProduct' ? 'Add New Product' : 'Dashboard'}</h1>
          <div className="admin-profile">
            <span>Admin</span>
            <div className="profile-avatar">A</div>
          </div>
        </header>

        <div className="main-content-area">
          {activeTab === 'addProduct' && (
            <div className="form-container fade-in">
              <form onSubmit={handleSubmit} className="product-form">
                <div className="form-grid">
                  {/* Left Column */}
                  <div className="form-col">
                    <div className="form-group">
                      <label>Product Title</label>
                      <input 
                        type="text" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleInputChange} 
                        placeholder="e.g. Premium UI Kit" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleInputChange} 
                        placeholder="Detailed product description..." 
                        rows="4" 
                        required 
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Price ($)</label>
                        <input 
                          type="number" 
                          name="price" 
                          value={formData.price} 
                          onChange={handleInputChange} 
                          placeholder="49.99" 
                          step="0.01" 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <select name="category" value={formData.category} onChange={handleInputChange} required>
                          <option value="">Select Category</option>
                          <option value="software">Software</option>
                          <option value="design">Design Assets</option>
                          <option value="course">Courses</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="form-col">
                    <div className="form-group">
                      <label>Product Image (Upload or Paste URL)</label>
                      <div className="image-input-group" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <input 
                          type="file" 
                          accept="image/*" 
                          id="device-upload" 
                          style={{ display: 'none' }}
                          onChange={handleImageUpload}
                          disabled={isUploadingImage}
                        />
                        <label 
                          htmlFor="device-upload" 
                          className="btn-secondary" 
                          style={{ cursor: 'pointer', padding: '0.6rem 1rem', fontSize: '0.85rem', margin: 0, whiteSpace: 'nowrap' }}
                        >
                          {isUploadingImage ? 'Uploading...' : 'Upload Image'}
                        </label>
                        <input 
                          type="url" 
                          name="imageUrl" 
                          value={formData.imageUrl} 
                          onChange={handleInputChange} 
                          placeholder="Or paste URL here..." 
                          required 
                          style={{ flex: 1, margin: 0 }}
                        />
                      </div>
                      {/* Image Preview */}
                      {formData.imageUrl && (
                        <div className="image-preview">
                          <img src={formData.imageUrl} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Redirect Website URL</label>
                      <input 
                        type="url" 
                        name="redirectUrl" 
                        value={formData.redirectUrl} 
                        onChange={handleInputChange} 
                        placeholder="https://..." 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Button Text</label>
                      <input 
                        type="text" 
                        name="buttonText" 
                        value={formData.buttonText} 
                        onChange={handleInputChange} 
                        placeholder="e.g. Download Now" 
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setFormData({title:'', description:'', price:'', imageUrl:'', redirectUrl:'', category:'', buttonText:'Buy Now'})}>
                    Clear Form
                  </button>
                  <button type="submit" className="btn-primary">
                    Publish Product
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab !== 'addProduct' && (
            <div className="placeholder-content">
              <h3>Section Under Construction</h3>
              <p>This area will be populated with data from the backend soon.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
