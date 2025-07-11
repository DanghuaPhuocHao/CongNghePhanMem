import React, { useState, useEffect } from 'react';
import '../../styles/trangchu.css';

function UserPage() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([{ key: 'all', label: 'Tất cả' }]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  useEffect(() => {
    fetch('/api/products') // Sử dụng proxy hoặc sửa lại đúng port backend nếu không dùng proxy
      .then(res => res.json())
      .then(setProducts)
      .catch(err => console.error('Lỗi khi lấy products:', err));
  }, []);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories([{ key: 'all', label: 'Tất cả' }, ...data.map(c => ({ key: c.name, label: c.name }))]))
      .catch(err => console.error('Lỗi khi lấy categories:', err));
  }, []);

  const filteredProducts = products.filter(product => {
    const matchCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const openOrderOverlay = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setNote('');
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setSelectedProduct(null);
  };

  const changeQuantity = (delta) => {
    setQuantity(q => Math.max(1, q + delta));
  };

  return (
    <div className="layout">
      <div className="noidung">
        <div className="menu-bar">
          <div className="menu-buttons">
            {categories.map(cat => (
              <button
                key={cat.key}
                className={activeCategory === cat.key ? 'active' : ''}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="search-box">
            <div className="search-wrapper">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="slogan">
          <h2>NGON - NHANH - TẬN TÂM</h2>
        </div>

        <div className="product-list" id="productList">
          {filteredProducts.map(product => (
            <div className="product" key={product._id} data-category={product.category}>
              {product.image && (
                <img
                  src={
                    product.image.startsWith('http')
                      ? product.image
                      : `http://localhost:5000/${product.image}`
                  }
                  alt={product.name}
                />
              )}
              <h4>{product.name}</h4>
              <p>{product.price.toLocaleString('vi-VN')}đ</p>
              <button onClick={() => openOrderOverlay(product)}>Đặt hàng</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserPage;