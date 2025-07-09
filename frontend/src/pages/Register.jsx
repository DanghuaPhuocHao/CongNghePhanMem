import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/AuthForm.css';

export default function Register() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
      setError('Tên đăng nhập chỉ được dùng chữ cái không dấu và số, không ký hiệu!');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email không hợp lệ!');
      return;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setError('Số điện thoại phải là số và đủ 10 chữ số!');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp!');
      return;
    }
    try {
      const res = await fetch('/api/login-register/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, phone, address, password }),
      });
      if (res.ok) {
        history.push('/Login');
      } else {
        const data = await res.json();
        setError(data.message || 'Đăng ký thất bại!');
      }
    } catch (err) {
      setError('Lỗi kết nối server!');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>ĐĂNG KÝ</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p>Tên đăng nhập</p>
        <input type="text" placeholder="Tên đăng nhập" value={username} onChange={e => setUsername(e.target.value)} required />
        <p>Email</p>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <p>Số điện thoại</p>
        <input type="text" placeholder="Số điện thoại" value={phone} onChange={e => setPhone(e.target.value)} required />
        <p>Địa chỉ</p>
        <input type="text" placeholder="Địa chỉ" value={address} onChange={e => setAddress(e.target.value)} required />
        <p>Mật khẩu</p>
        <input type="password" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} required />
        <p>Nhập lại mật khẩu</p>
        <input type="password" placeholder="Nhập lại mật khẩu" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
        <div className="form-buttons">
          <button type="submit">Đăng ký</button>
        </div>
      </form>
    </div>
  );
}