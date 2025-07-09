const API_URL = '/api/overview';

export async function getOverview(type) {
  const res = await fetch(`${API_URL}?type=${type}`);
  return res.json();
}