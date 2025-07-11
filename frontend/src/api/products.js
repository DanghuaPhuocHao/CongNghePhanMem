const API_URL = '/api/products';

export async function getProducts() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Lỗi lấy sản phẩm');
  }
  return res.json();
}

export async function addProduct(data) {
  const res = await fetch('/api/products', {
    method: 'POST',
    body: data, // Không set Content-Type, browser sẽ tự set multipart/form-data
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Lỗi thêm sản phẩm');
  }
  return res.json();
}

export async function updateProduct(id, data) {
  const isFormData = data instanceof FormData;
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
    body: isFormData ? data : JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Lỗi cập nhật sản phẩm');
  }
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Lỗi xóa sản phẩm');
  }
  return res.json();
}