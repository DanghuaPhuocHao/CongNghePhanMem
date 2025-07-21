import React from 'react';
import '../../styles/admin.css'; 

function Sidebar({ setActivePage, activePage }) {
  const menu = [
    { key: 'overview', label: 'Tổng quan' },
    { key: 'orders', label: 'Đơn đặt hàng' },
    { key: 'products', label: 'Sản phẩm' },
    { key: 'productGroups', label: 'Nhóm sản phẩm' },
    { key: 'users', label: 'Người dùng' },
    { key: 'contacts', label: 'Liên hệ' }
  ];

  return (
    <div className="admin-sidebar">
      <div className="sidebar-name">A . D . A</div>
      {menu.map(item => (
        <button
          key={item.key}
          className={`sidebar-btn ${activePage === item.key ? 'active' : ''}`}
          onClick={() => setActivePage(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
