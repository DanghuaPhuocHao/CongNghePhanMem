import React, { useEffect, useState } from 'react';

function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(setContacts);
  }, []);

  return (
    <div>
      <h2>Danh sách liên hệ</h2>
      <table border="1" cellPadding={8} style={{ width: '100%', marginTop: 16 }}>
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Nội dung</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c, idx) => (
            <tr key={idx}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.message}</td>
              <td>{new Date(c.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Contacts;