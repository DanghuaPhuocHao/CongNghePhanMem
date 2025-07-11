import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import PrivateRoute from './PrivateRoute';

import Header from './Header';
import SubHeader from './SubHeader';
import Footer from './Footer';

import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminPage from '../pages/admin/AdminPage';
import UserPage from '../pages/user/UserPage';

import GioiThieu from '../pages/GioiThieu';
import LienHe from '../pages/LienHe';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <SubHeader />
        <main className="main-content">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/admin" component={AdminPage} />
            <Route path="/gioithieu" component={GioiThieu} />
            <Route path="/lienhe" component={LienHe} />
            <Route exact path="/" component={UserPage} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;