import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/AuthForm.css';

export default function Login() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
      setError('Tên đăng nhập chỉ được dùng chữ cái không dấu và số, không ký hiệu!');
      return;
    }
    try {
      const res = await fetch('/api/login-register/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.user.role === 'admin') {
          history.push('/admin');
        } else {
          history.push('/');
        }
        window.location.reload();
      } else {
        setError(data.message || 'Tên đăng nhập hoặc mật khẩu không đúng!');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi đăng nhập!');
    }
  };

  return (
    <>
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>ĐĂNG NHẬP</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <p>Tên đăng nhập</p>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <p>Mật khẩu</p>
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <div className="form-buttons">
            <button type="submit">Đăng nhập</button>
            <button type="button" onClick={() => history.push('/Register')}>Đăng ký</button>
          </div>
        </form>
      </div>
    </>
  );
}