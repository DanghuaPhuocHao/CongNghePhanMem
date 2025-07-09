import React, { useEffect, useState } from 'react';
import '../styles/header_footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useLocation } from 'react-router-dom';

function Header() {
  const [hasCart, setHasCart] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  // Kiểm tra có phải trang admin không
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    const checkCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setHasCart(cart.length > 0);
    };
    checkCart();
    window.addEventListener('storage', checkCart);
    return () => window.removeEventListener('storage', checkCart);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    history.push('/login');
    window.location.reload();
  };

  return (
    <div className="header">
      <div className="left">
        <div className="vtlogo">
          <img src="/images/logo_main.png" alt="Logo" className="logo" />
        </div>
        <span className="store-name">A . D . A</span>
        {!isAdmin && (
          <nav className="menu">
            <button className="menu-btn" onClick={() => history.push('/')}>Trang chủ</button>
            <button className="menu-btn" onClick={() => history.push('/gioithieu')}>Giới thiệu</button>
            <button className="menu-btn" onClick={() => history.push('/lienhe')}>Liên hệ</button>
          </nav>
        )}
      </div>
      <div className="right">
        {!isAdmin && (
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="cart-icon"
              style={{ cursor: 'pointer' }}
              onClick={() => history.push('/giohang')}
            />
            {hasCart && (
              <span className="cart-dot"></span>
            )}
          </div>
        )}
        {user ? (
          <>
            {user.username && (
              <button
                className="btnuser"
                onClick={() => history.push('/profile')}
              >
                <strong>{user.username.toUpperCase()}</strong>
              </button>
            )}
            <button className="btnlogout" onClick={handleLogout}>Đăng xuất</button>
          </>
        ) : (
          <>
            <button className="btn login" onClick={() => history.push('/login')}>Đăng nhập</button>
            <button className="btn register" onClick={() => history.push('/register')}>Đăng ký</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
