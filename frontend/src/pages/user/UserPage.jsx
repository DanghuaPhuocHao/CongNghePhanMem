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

  // Thêm sản phẩm vào giỏ hàng và lưu vào localStorage
  const addToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const idx = storedCart.findIndex(item => item._id === selectedProduct._id);
    if (idx >= 0) {
      storedCart[idx].quantity += quantity;
    } else {
      storedCart.push({ ...selectedProduct, quantity, note });
    }
    localStorage.setItem('cart', JSON.stringify(storedCart));
    closeOverlay();
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

      {/* Overlay đặt hàng */}
      {showOverlay && selectedProduct && (
        <div className="overlay" id="orderOverlay" onClick={closeOverlay}>
          <div className="order-modal" onClick={e => e.stopPropagation()}>
            {selectedProduct.image && (
              <img
                id="modalImage"
                src={
                  selectedProduct.image.startsWith('http')
                    ? selectedProduct.image
                    : `http://localhost:5000/${selectedProduct.image}`
                }
                alt="Sản phẩm"
              />
            )}
            <div className="modal-content">
              <h3 id="modalName">{selectedProduct.name}</h3>
              <div className="quantity-control">
                <button onClick={() => changeQuantity(-1)}>-</button>
                <input
                  type="number"
                  id="quantityInput"
                  value={quantity}
                  min={1}
                  onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                />
                <button onClick={() => changeQuantity(1)}>+</button>
              </div>
              <p id="giatien">
                {(selectedProduct.price * quantity).toLocaleString('vi-VN')}đ
              </p>
              <textarea
                id="noteInput"
                placeholder="Ghi chú cho sản phẩm..."
                value={note}
                onChange={e => setNote(e.target.value)}
              />
              <button className="confirm-button" onClick={addToCart}>Thêm vào giỏ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPage;