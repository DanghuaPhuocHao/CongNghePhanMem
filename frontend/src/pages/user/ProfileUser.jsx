import React, { useState, useEffect } from 'react';
import '../../styles/ProfileUser.css';

function ProfileUser() {
  const localUser = JSON.parse(localStorage.getItem('user')) || {};
  const [user, setUser] = useState(localUser);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    username: localUser.username || '',
    email: localUser.email || '',
    phone: localUser.phone || '',
    address: localUser.address || ''
  });
  const [msg, setMsg] = useState('');
  const [showChangePass, setShowChangePass] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [msgPass, setMsgPass] = useState('');

  // Lấy thông tin user từ backend khi vào trang
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`http://localhost:3000/api/users/${localUser._id}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setForm({
            username: data.username || '',
            email: data.email || '',
            phone: data.phone || '',
            address: data.address || ''
          });
        }
      } catch (err) {
        setMsg('Không thể tải thông tin tài khoản!');
      }
    }
    if (localUser._id) fetchUser();
  }, [localUser._id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Gửi API cập nhật thông tin lên backend
  const handleSave = async e => {
    e.preventDefault();
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(form.username)) {
      setMsg('Tên đăng nhập chỉ được dùng chữ cái không dấu và số, không ký hiệu!');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setMsg('Email không hợp lệ!');
      return;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(form.phone)) {
      setMsg('Số điện thoại phải là số và đủ 10 chữ số!');
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        const updated = await res.json();
        setUser(updated);
        localStorage.setItem('user', JSON.stringify(updated));
        setMsg('Cập nhật thông tin thành công!');
        setEditMode(false);
      } else {
        setMsg('Cập nhật thất bại!');
      }
    } catch (err) {
      setMsg('Có lỗi xảy ra!');
    }
  };

  // Hàm xử lý đổi mật khẩu
  const handleChangePassword = async e => {
    e.preventDefault();
    if (!oldPass || !newPass || !confirmPass) {
      setMsgPass('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (newPass !== confirmPass) {
      setMsgPass('Mật khẩu mới không khớp');
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/users/${user._id}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword: oldPass, newPassword: newPass })
      });
      if (res.ok) {
        setMsgPass('Đổi mật khẩu thành công!');
        setOldPass('');
        setNewPass('');
        setConfirmPass('');
        setShowChangePass(false);
      } else {
        const data = await res.json();
        setMsgPass(data.message || 'Đổi mật khẩu thất bại!');
      }
    } catch (err) {
      setMsgPass('Có lỗi xảy ra!');
    }
  };

  return (
    <div className="layout_profile">
      <div className="profile-container">
        <h2>Hồ sơ tài khoản</h2>
        <div className="profile-info">
          <strong>Quyền:</strong> <span>{user.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}</span>
        </div>
        {editMode ? (
          <form className="profile-form" onSubmit={handleSave}>
            <div className="profile-info">
              <strong>Tên đăng nhập:</strong>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="profile-info">
              <strong>Email:</strong>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="profile-info">
              <strong>Số điện thoại:</strong>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div className="profile-info">
              <strong>Địa chỉ:</strong>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="profile-btn">Lưu</button>
            <button type="button" className="profile-btn cancel-btn" onClick={() => setEditMode(false)}>Hủy</button>
          </form>
        ) : (
          <>
            <div className="profile-info">
              <strong>Tên đăng nhập:</strong> <span>{user.username}</span>
            </div>
            <div className="profile-info">
              <strong>Email:</strong> <span>{user.email || 'Chưa cập nhật'}</span>
            </div>
            <div className="profile-info">
              <strong>Số điện thoại:</strong> <span>{user.phone || 'Chưa cập nhật'}</span>
            </div>
            <div className="profile-info">
              <strong>Địa chỉ:</strong> <span>{user.address || 'Chưa cập nhật'}</span>
            </div>
            <button className="profile-btn" onClick={() => setEditMode(true)}>Sửa thông tin</button>
          </>
        )}
        <button
          className="profile-btn"
          onClick={() => setShowChangePass(!showChangePass)}
        >
          {showChangePass ? 'Đóng đổi mật khẩu' : 'Đổi mật khẩu'}
        </button>
        {showChangePass && (
          <form className="profile-form" onSubmit={handleChangePassword}>
            <input
              type="password"
              placeholder="Mật khẩu cũ"
              value={oldPass}
              onChange={e => setOldPass(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mật khẩu mới"
              value={newPass}
              onChange={e => setNewPass(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              value={confirmPass}
              onChange={e => setConfirmPass(e.target.value)}
              required
            />
            <button type="submit" className="profile-btn">Xác nhận đổi mật khẩu</button>
            {msgPass && (
              <div className={`profile-msg${msgPass.includes('thành công') ? ' success' : ''}`}>
                {msgPass}
              </div>
            )}
          </form>
        )}
        {msg && (
          <div className={`profile-msg${msg.includes('thành công') ? ' success' : ''}`}>
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileUser;