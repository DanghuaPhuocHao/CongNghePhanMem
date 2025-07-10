import React, { useState } from 'react';
import '../styles/gioithieu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function LienHe() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch {
      alert('Gửi thất bại!');
    }
  };

  return (
    <div className="layout-gioithieu">
      <div className="noidung">
        <table className="table_nd">
          <tbody>
            <tr>
              <td colSpan={3} className="vechungtoi">
                <h1>LIÊN HỆ VỚI CHÚNG TÔI</h1>
                <h2>----- A.D.A Fast Food -----</h2>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div className="tieude">
                  <FontAwesomeIcon icon={faStore} />
                  <h3>Thông tin liên hệ</h3>
                </div>
                <ul>
                  <li>Địa chỉ: 330/13 Quốc lộ 53, x.Hưng Mỹ, tp.Trà vinh</li>
                  <li>Hotline: 0363547545</li>
                  <li>Email: Anphuc1203@gmail.com</li>
                  <li>
                    Facebook:{' '}
                    <a
                      href="https://www.facebook.com/phucan.nguyen.58910049"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#4267B2' }}
                    >
                      https://www.facebook.com/phucan.nguyen.58910049
                    </a>
                  </li>
                  <li>
                    Youtube:{' '}
                    <a
                      href="https://www.youtube.com/@annpa3669"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#FF0000' }}
                    >
                      https://www.youtube.com/@annpa3669
                    </a>
                  </li>
                </ul>
              </td>
              <td rowSpan={2} width="260px">
                <img src="/images/logo_main.png" alt="A.D.A Logo" className="logo_lh" />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div className="tieude">
                    <FontAwesomeIcon icon={faPaperPlane} />
                    <h3>Gửi tin nhắn cho tôi</h3>
                  </div>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Họ và tên"
                      value={form.name}
                      onChange={handleChange}
                      required
                      style={{ flex: 1, padding: 8, borderRadius: 5, border: '1px solid #ccc' }}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      style={{ flex: 1, padding: 8, borderRadius: 5, border: '1px solid #ccc' }}
                    />
                  </div>
                  <textarea
                    name="message"
                    placeholder="Nội dung"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    style={{ width: '100%', padding: 8, borderRadius: 5, border: '1px solid #ccc', marginBottom: 10 }}
                  />
                  <button type="submit" className="btnlienhe">
                    Gửi
                  </button>
                  {sent && <div style={{ color: 'green', marginTop: 10 }}>Đã gửi thông tin!</div>}
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LienHe;