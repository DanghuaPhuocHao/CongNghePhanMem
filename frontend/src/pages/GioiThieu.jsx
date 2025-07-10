import React from 'react';
import '../styles/gioithieu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faStar, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function GioiThieu() {
  return (
    <div className="layout-gioithieu">
      <div className="noidung">
        <table className="table_nd">
          <tbody>
            <tr>
              <td colSpan={3} className="vechungtoi">
                <h1>GIỚI THIỆU VỀ CHÚNG TÔI</h1>
                <h2>----- A.D.A Fast Food -----</h2>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div className="tieude">
                  <FontAwesomeIcon icon={faStore} />
                  <h3>A.D.A Fast Food - “Ngon - Nhanh - Tận Tâm”</h3>
                </div>
                <p>
                  Chào mừng bạn đến với A.D.A Fast Food, nơi thỏa mãn mọi cơn đói của bạn chỉ trong tích tắc! Chúng tôi là một thương hiệu chuyên cung cấp các món thức ăn nhanh nóng hổi, với cam kết giao hàng nhanh chóng, nguyên liệu sạch, và chất lượng hàng đầu.
                </p>
              </td>
              <td rowSpan={2} width="260px">
                <img src="/images/logo_main.png" alt="A.D.A Logo" className="logo_gt" />
              </td>
            </tr>
            <tr>
              <td width="320px">
                <div className="tieude">
                  <FontAwesomeIcon icon={faStar} />
                  <h3>Sứ mệnh</h3>
                </div>
                <p>
                  Mang đến trải nghiệm ăn uống tiện lợi, ngon miệng và an toàn cho tất cả mọi người – dù bạn đang ở nhà, văn phòng hay bất kỳ đâu.
                </p>
              </td>
              <td width="320px">
                <div className="tieude">
                  <FontAwesomeIcon icon={faCircleCheck} />
                  <h3>Chúng tôi có gì?</h3>
                </div>
                <p>
                  Mang đến trải nghiệm ăn uống tiện lợi, ngon miệng và an toàn cho tất cả mọi người – dù bạn đang ở nhà, văn phòng hay bất kỳ đâu.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GioiThieu;