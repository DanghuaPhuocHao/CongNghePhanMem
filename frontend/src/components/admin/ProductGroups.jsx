import React, { useState, useEffect } from 'react';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../../api/categories';
import '../../styles/admin.css';

function ProductGroups() {
  const [categories, setCategories] = useState([]);

  // Lấy nhóm sản phẩm từ server khi load trang
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleEdit = async (category) => {
    const newName = prompt('Sửa tên nhóm:', category.name);
    if (newName && newName !== category.name) {
      await updateCategory(category._id, { name: newName });
      fetchCategories();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Xóa nhóm này?')) {
      await deleteCategory(id);
      fetchCategories();
    }
  };

  const handleAdd = async () => {
    const newGroup = prompt('Nhập tên nhóm mới:');
    if (newGroup && !categories.some(cat => cat.name === newGroup)) {
      try {
        await addCategory({ name: newGroup });
        await fetchCategories(); // Gọi lại API lấy danh sách mới nhất
      } catch (err) {
        alert('Lỗi khi thêm nhóm sản phẩm!');
      }
    } else if (categories.some(cat => cat.name === newGroup)) {
      alert('Nhóm đã tồn tại!');
    }
  };

  return (
    <div className="category-list">
      <ul>
        {categories.map((cat) => (
          <li key={cat._id}>
            {cat.name}
            <div className="category-button">
              <button onClick={() => handleEdit(cat)}>Sửa</button>
              <button onClick={() => handleDelete(cat._id)}>Xóa</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleAdd}>+ Thêm nhóm sản phẩm</button>
    </div>
  );
}

export default ProductGroups;