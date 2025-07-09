import React, { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Overview from '../../components/admin/Overview';
import Orders from '../../components/admin/Orders';import Users from '../../components/admin/Users';
import '../../styles/admin.css';

function AdminPage() {
  const [activePage, setActivePage] = useState('overview');

  const renderContent = () => {
    switch (activePage) {
      case 'overview':
        return <Overview />;
      case 'orders':
        return <Orders />;
      case 'users':
        return <Users />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <Sidebar setActivePage={setActivePage} activePage={activePage} />
        <div className="admin-main">{renderContent()}</div>
      </div>
    </div>
  );
}

export default AdminPage;
