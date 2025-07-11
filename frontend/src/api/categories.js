const API_URL = '/api/categories';

export async function getCategories() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Lỗi lấy danh mục');
  }
  return res.json();
}

export async function addCategory(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Lỗi thêm danh mục');
  }
  return res.json();
}

export async function updateCategory(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Lỗi cập nhật danh mục');
  }
  return res.json();
}

export async function deleteCategory(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Lỗi xóa danh mục');
  }
  return res.json();
}