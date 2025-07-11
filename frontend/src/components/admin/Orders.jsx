import React, { useEffect, useState } from 'react';
import '../../styles/admin.css';

async function updateOrder(id, data) {
  const res = await fetch(`http://localhost:3000/api/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

const statusList = ['Chờ xác nhận', 'Đang chuẩn bị', 'Đang giao', 'Đã giao'];

const nextStatus = (current) => {
  const idx = statusList.indexOf(current);
  return statusList[Math.min(idx + 1, statusList.length - 1)];
};

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const res = await fetch('http://localhost:3000/api/orders');
    const data = await res.json();
    setOrders(data);
  }

  const handleChangeStatus = async (id, newStatus) => {
    await updateOrder(id, { status: newStatus });
    setOrders(orders.map(order =>
      order._id === id ? { ...order, status: newStatus } : order
    ));
    if (selectedOrder && selectedOrder._id === id)
      setSelectedOrder({ ...selectedOrder, status: newStatus });
  };
  const statusOrder = status => statusList.indexOf(status);
  async function deleteOrder(id) {
    const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Lỗi xóa đơn hàng');
    return res.json();
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Tên khách hàng</th>
            <th>Món ăn</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {[...orders]
            .sort((a, b) => statusOrder(a.status) - statusOrder(b.status))
            .map(order => (
              <tr
                key={order._id}
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  selectedOrder && selectedOrder._id === order._id
                    ? setSelectedOrder(null)
                    : setSelectedOrder(order)
                }
              >
                <td>{order._id}</td>
                <td>{order.customerName || order.userId?.username || ''}</td>
                <td>
                  {order.products && order.products.map((item, idx) => (
                    <span key={idx}>
                      {item.productId?.name || item.productName || ''} ({item.quantity})
                      {idx < order.products.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </td>
                <td>{order.totalAmount?.toLocaleString('vi-VN') || ''}đ</td>
                <td>
                  <button
                    style={{
                      background: order.status === 'Đã giao' ? 'limegreen' : '#ccc',
                      color: order.status === 'Đã giao' ? 'white' : 'black',
                      border: 'none',
                      borderRadius: 4,
                      padding: '4px 10px',
                      cursor: 'pointer'
                    }}
                    onClick={e => {
                      e.stopPropagation();
                      handleChangeStatus(order._id, nextStatus(order.status));
                    }}
                    title="Nhấn để chuyển trạng thái"
                    disabled={order.status === 'Đã giao'}
                  >
                    {order.status}
                  </button>
                </td>
                <td>
                  <button
                    style={{
                      background: 'red',
                      color: 'white',
                      border: 'none',
                      borderRadius: 4,
                      padding: '4px 10px',
                      cursor: 'pointer'
                    }}
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (window.confirm('Bạn có chắc muốn xóa đơn hàng này?')) {
                        await deleteOrder(order._id);
                        fetchOrders();
                      }
                    }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {selectedOrder && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setSelectedOrder(null)}
        >
          <div
            style={{
              background: '#fff',
              border: '1px solid #ccc',
              borderRadius: 8,
              padding: 24,
              minWidth: 320,
              maxWidth: 400,
              boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
              position: 'relative'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              style={{
                position: 'absolute',
                top: 8,
                right: 12,
                background: 'transparent',
                border: 'none',
                fontSize: 20,
                cursor: 'pointer',
                color: '#888'
              }}
              onClick={() => setSelectedOrder(null)}
              aria-label="Đóng"
            >
              ×
            </button>
            <strong>Ghi chú đơn hàng:</strong>
            <ul style={{ marginTop: 10 }}>
              {selectedOrder.products.map((item, idx) => (
                <li key={idx}>
                  {item.productId?.name || item.productName || ''}: {item.note || 'Không có ghi chú'}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;