import React, { useState, useEffect } from 'react';
import '../../styles/giohang.css';

function GioHang() {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (item) => {
    const newCart = cart.filter(i => i._id !== item._id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // Thay đổi số lượng trong giỏ hàng
  const changeCartQuantity = (item, qty) => {
    const newCart = cart.map(i => i._id === item._id ? { ...i, quantity: qty } : i);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // Tổng tiền giỏ hàng
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Xử lý đặt hàng (gửi API)
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Giỏ hàng trống!');
      return;
    }
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user._id) {
      alert('Bạn cần đăng nhập để đặt hàng!');
      return;
    }
    const orderData = {
      userId: user?._id || null,
      products: cart.map(i => ({
        productId: i._id,
        quantity: i.quantity,
        note: i.note || ''
      })),
      totalAmount: total
    };
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Đặt hàng thành công!');
        setCart([]);
        localStorage.removeItem('cart');
      } else {
        alert(data.message || 'Đặt hàng thất bại!');
      }
    } catch (err) {
      alert('Lỗi kết nối máy chủ!');
    }
  };

  const handleShowOrders = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user._id) {
      alert('Bạn cần đăng nhập!');
      return;
    }
    try {
      const res = await fetch(`/api/orders/user/${user._id}`);
      if (!res.ok) throw new Error('Lỗi lấy đơn hàng');
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
      setShowOrders(true);
    } catch (err) {
      alert('Không lấy được trạng thái đơn hàng!');
    }
  };

  const handleCloseOrders = () => setShowOrders(false);

  return (
    <div className="cart-overlay">
      <div className="cart-modal">
        <h2>Giỏ hàng của bạn</h2>
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>STT</th>
              <th>Sản phẩm</th>
              <th>Hình ảnh</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {cart.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center' }}>Giỏ hàng trống</td>
              </tr>
            )}
            {cart.map((item, idx) => (
              <tr key={item._id || idx}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>
                  <img
                    src={
                      item.image?.startsWith('http')
                        ? item.image
                        : `http://localhost:5000/${item.image}`
                    }
                    alt={item.name}
                    style={{ width: 60 }}
                  />
                </td>
                <td>{item.price.toLocaleString('vi-VN')}₫</td>
                <td>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={e => changeCartQuantity(item, Number(e.target.value))}
                    style={{ width: 70 }}
                  />
                </td>
                <td>{(item.price * item.quantity).toLocaleString('vi-VN')}₫</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cart-actions">
          <div className="d-flex justify-content-end">
            <h4>
              Tổng cộng: <span className="text-danger">{total.toLocaleString('vi-VN')}₫</span>
            </h4>
          </div>
          <div className="btn-tt-tt" style={{ gap: 12 }}>
            <button className="btn btn-success" onClick={handleShowOrders}>Trạng thái đơn hàng</button>
            <button className="btn btn-success" onClick={handleCheckout}>Thanh toán</button>
          </div>
        </div>

        {/* Overlay trạng thái đơn hàng */}
        {showOrders && (
          <div className="order-status-overlay" onClick={handleCloseOrders}>
            <div className="order-status-modal" onClick={e => e.stopPropagation()}>
              <button
                onClick={handleCloseOrders}
                aria-label="Đóng"
              >
                ×
              </button>
              <h4>Trạng thái đơn hàng của bạn</h4>
              {orders.length === 0 ? (
                <div>Bạn chưa có đơn hàng nào.</div>
              ) : (
                <table className="table table-bordered align-middle mt-3">
                  <thead>
                    <tr>
                      <th>Mã đơn</th>
                      <th>Sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                  {[...orders]
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Đơn mới nhất lên đầu
                    .map(order => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>
                          {order.products.map((item, idx) => (
                            <div key={idx}>
                              {item.productId?.name || item.productName || ''}
                            </div>
                          ))}
                        </td>
                        <td>
                          {order.products.map((item, idx) => (
                            <div key={idx}>{item.quantity}</div>
                          ))}
                        </td>
                        <td>{order.totalAmount?.toLocaleString('vi-VN')}₫</td>
                        <td><b>{order.status}</b></td>
                      </tr>
                    ))}
                </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GioHang;