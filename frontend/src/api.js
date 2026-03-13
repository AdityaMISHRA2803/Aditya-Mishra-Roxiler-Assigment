const API_URL =  import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request(path, opts={}){
  const headers = opts.headers || {};
  const token = localStorage.getItem('token');
  if (token) headers['Authorization'] = `Bearer ${token}`;
  headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  const res = await fetch(`${API_URL}${path}`, { ...opts, headers });
  const data = await res.json().catch(()=>null);
  if (!res.ok) {
    if (res.status === 422 && data?.errors) {
      const errorMessages = data.errors.map(err => err.msg || err.message).join(', ');
      throw new Error(errorMessages);
    }
    throw new Error(data?.message || 'Something went wrong');
  }
  return data;
}

export const auth = {
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  signup: (payload) => request('/auth/signup', { method: 'POST', body: JSON.stringify(payload) }),
  updatePassword: (payload) => request('/auth/update-password', { method: 'POST', body: JSON.stringify(payload) })
};

export const admin = {
  dashboard: () => request('/admin/dashboard'),
  createUser: (p) => request('/admin/users', { method: 'POST', body: JSON.stringify(p) }),
  createStore: (p) => request('/admin/stores', { method: 'POST', body: JSON.stringify(p) }),
  listStores: (q='') => request('/admin/stores'+(q?('?'+q):'')),
  listUsers: (q='') => request('/admin/users'+(q?('?'+q):'')),
  listStoreOwners: () => request('/admin/store-owners'),
  userDetails: (id) => request(`/admin/users/${id}`)};

export const stores = {
  list: (q='') => request('/stores'+(q?('?'+q):'')),
  submitRating: (id, payload) => request(`/stores/${id}/rating`, { method: 'POST', body: JSON.stringify(payload) }),
  updateRating: (id, payload) => request(`/stores/${id}/rating`, { method: 'PUT', body: JSON.stringify(payload) })
};

export const owner = {
  dashboard: () => request('/owner/dashboard')
};

export default { auth, admin, stores, owner };
