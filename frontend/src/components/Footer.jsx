import React from 'react';
import '../styles/header_footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPortrait, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src="/images/logo_main.png" alt="A.D.A Logo" className="logo-footer" />
      </div>

      <div className="about-section">
        <h3>A.D.A - FastFood</h3>
        <p>
          Chuyên cung cấp thức ăn nhanh nóng hổi, giao tận nơi chỉ trong 30 phút. Luôn tươi mới và ngon miệng!
        </p>
      </div>

      <div className="designers-section">
        <h3>Người thiết kế</h3>
        <table>
          <tbody>
            <tr>
              <td><FontAwesomeIcon icon={faPortrait} /> <span> Nguyễn Phúc An</span></td>
              <td><FontAwesomeIcon icon={faPhoneAlt} /> <a href="tel:0363547545"> 0363547545</a></td>
            </tr>
            <tr>
              <td><FontAwesomeIcon icon={faPortrait} /> <span> Nguyễn Thiên Ân</span></td>
              <td><FontAwesomeIcon icon={faPhoneAlt} /> <a href="tel:0395800581"> 0395800581</a></td>
            </tr>
            <tr>
              <td><FontAwesomeIcon icon={faPortrait} /> <span> Hứa Khánh Đăng</span></td>
              <td><FontAwesomeIcon icon={faPhoneAlt} /> <a href="tel:0978579225"> 0978579225</a></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="contact-section">
        <h3>Thông tin liên hệ</h3>
        <ul>
          <li>Địa chỉ: 330/13 Quốc lộ 53, x.Hưng Mỹ, t.Trà Vinh</li>
          <li>Hotline: 0363547545</li>
          <li>Email: Anphuc1203@gmail.com</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
