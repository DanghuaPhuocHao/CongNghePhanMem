import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../api/products';
import { getCategories } from '../../api/categories';
import '../../styles/admin.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    imageFile: undefined,
    category: '',
  });

  const fetchData = async () => {
    try {
      const [productList, categoryList] = await Promise.all([getProducts(), getCategories()]);
      setProducts(productList);
      setGroups(categoryList.map(c => c.name));
    } catch (err) {
      alert('Lỗi khi tải dữ liệu sản phẩm hoặc nhóm!');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Khi groups thay đổi, nếu đang mở form thêm mới và category rỗng thì set mặc định
  useEffect(() => {
    if (showForm && !editingProduct && groups.length > 0 && !formData.category) {
      setFormData((prev) => ({ ...prev, category: groups[0] }));
    }
  }, [groups, showForm, editingProduct, formData.category]);

  const handleOpenForm = (product = null) => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        image: product.image,
        imageFile: undefined,
        category: product.category,
      });
      setEditingProduct(product);
    } else {
      setFormData({
        name: '',
        price: '',
        image: '',
        imageFile: undefined,
        category: groups[0] || '',
      });
      setEditingProduct(null);
    }
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({
      name: '',
      price: '',
      image: '',
      imageFile: undefined,
      category: groups[0] || '',
    });
    setEditingProduct(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(files[0]),
        imageFile: files[0]
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e && e.preventDefault && e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', Number(formData.price));
      data.append('category', formData.category);
      // Chỉ append file nếu có file mới
      if (formData.imageFile) {
        data.append('image', formData.imageFile);
      }
      if (editingProduct) {
        await updateProduct(editingProduct._id, data);
      } else {
        await addProduct(data);
      }
      await fetchData();
      handleCloseForm();
    } catch (err) {
      alert('Lỗi khi thêm/cập nhật sản phẩm!');
    }
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchData();
  };

  return (
    <div className="products-wrapper">
      <button onClick={() => handleOpenForm()}>+ Thêm sản phẩm</button>

      <div className="products-section">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            {product.image && (
              <img
                src={
                  product.image.startsWith('http')
                    ? product.image
                    : `http://localhost:5000/${product.image}`
                }
                alt={product.name}
              />
            )}
            <h4>{product.name}</h4>
            <p>Giá: {product.price}</p>
            <p>Nhóm: {product.category}</p>
            <div className="product-card-buttons">
              <button onClick={() => handleOpenForm(product)}>Sửa</button>
              <button onClick={() => handleDelete(product._id)}>Xóa</button>
            </div>
          </div>
        ))}
      </div>

      {/* FORM THÊM/SỬA */}
      {showForm && (
        <div className="popup-form">
          <div className="popup-content">
            <h3>{editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h3>

            <label>Chọn ảnh:</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
            {formData.image && <img src={formData.image} alt="preview" width="100" />}

            <label>Tên sản phẩm:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />

            <label>Giá tiền:</label>
            <input type="text" name="price" value={formData.price} onChange={handleChange} />

            <label>Nhóm sản phẩm:</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              {groups.map((g, idx) => (
                <option key={idx} value={g}>
                  {g}
                </option>
              ))}
            </select>

            <div className="popup-buttons">
              <button onClick={handleSubmit}>OK</button>
              <button onClick={handleCloseForm}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;