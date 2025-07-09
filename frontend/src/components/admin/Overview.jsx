import React, { useState, useEffect } from 'react';
import '../../styles/admin.css'; 

function Overview() {
  const [filter, setFilter] = useState('day');
  const [stats, setStats] = useState({
    orders: 0,
    revenue: '0đ',
    customers: 0,
    bestSeller: '',
  });

  useEffect(() => {
    fetchStats(filter);
  }, [filter]);

  async function fetchStats(type) {
    try {
      const res = await fetch(`http://localhost:3000/api/overview?type=${type}`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      setStats({
        orders: 0,
        revenue: '0đ',
        customers: 0,
        bestSeller: 'Không có dữ liệu',
      });
    }
  }

  return (
    <div className="tongquan">
      <div className="tongquan-btn">
        <button onClick={() => setFilter('day')}>Ngày</button>
        <button onClick={() => setFilter('week')}>Tuần</button>
        <button onClick={() => setFilter('month')}>Tháng</button>
      </div>
      <ul>
        <li><span className="label">Tổng số đơn:</span><span className="value">{stats.orders}</span></li>
        <li><span className="label">Tổng số tiền:</span><span className="value">{stats.revenue}</span></li>
        <li><span className="label">Tổng khách hàng:</span><span className="value">{stats.customers}</span></li>
        <li><span className="label">Món bán chạy:</span><span className="value">{stats.bestSeller}</span></li>
      </ul>
    </div>
  );
}

export default Overview;