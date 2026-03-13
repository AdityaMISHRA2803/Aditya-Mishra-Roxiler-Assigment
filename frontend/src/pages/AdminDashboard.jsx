import React, { useEffect, useState } from "react";
import api from "../api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [stores, setStores] = useState([]);
  const [users, setUsers] = useState([]);
  const [storeFilters, setStoreFilters] = useState({
    name: "",
    email: "",
    address: "",
    sortBy: "name",
    order: "ASC",
  });
  const [userFilters, setUserFilters] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
    sortBy: "name",
    order: "ASC",
  });
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showCreateStore, setShowCreateStore] = useState(false);
  const [createUserForm, setCreateUserForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "USER",
  });
  const [storeOwners, setStoreOwners] = useState([]);
  const [createStoreForm, setCreateStoreForm] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: "",
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setStats(await api.admin.dashboard());
    await loadStores();
    await loadUsers();
    setStoreOwners(await api.admin.listStoreOwners());
  }

  async function loadStores() {
    const params = new URLSearchParams();
    Object.entries(storeFilters).forEach(([k, v]) => {
      if (v) params.append(k, v);
    });
    setStores(await api.admin.listStores(params.toString()));
  }

  async function loadUsers() {
    const params = new URLSearchParams();
    Object.entries(userFilters).forEach(([k, v]) => {
      if (v) params.append(k, v);
    });
    setUsers(await api.admin.listUsers(params.toString()));
  }

  async function createUser() {
    try {
      await api.admin.createUser(createUserForm);
      alert("User created");
      setCreateUserForm({
        name: "",
        email: "",
        address: "",
        password: "",
        role: "USER",
      });
      setShowCreateUser(false);
      load();
    } catch (e) {
      alert(e.message);
    }
  }

  async function createStore() {
    if (!createStoreForm.owner_id) {
      alert("Please select a store owner");
      return;
    }
    try {
      await api.admin.createStore(createStoreForm);
      alert("Store created");
      setCreateStoreForm({ name: "", email: "", address: "", owner_id: "" });
      setShowCreateStore(false);
      load();
    } catch (e) {
      alert(e.message);
    }
  }

  const StatCard = ({ label, value, icon }) => (
    <div className="card p-5 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-600">
        {icon}
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </div>
        <div className="mt-1 text-3xl font-semibold text-slate-900">
          {value ?? "-"}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">
            Admin Dashboard
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Manage users, stores and ratings from a single dashboard.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowCreateUser(true)}
            className="btn btn-primary"
          >
            Create User
          </button>
          <button
            onClick={() => setShowCreateStore(true)}
            className="btn btn-secondary"
          >
            Create Store
          </button>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            label="Total Users"
            value={stats.totalUsers}
            icon={
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 20c0-4 4-6 8-6s8 2 8 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
          <StatCard
            label="Total Stores"
            value={stats.totalStores}
            icon={
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3h18v4H3V3z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 7v13h14V7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 13h6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
          <StatCard
            label="Total Ratings"
            value={stats.totalRatings}
            icon={
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>
      )}

      {showCreateUser && (
        <div className="card p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Create User</h4>
            <button
              onClick={() => setShowCreateUser(false)}
              className="text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Name (20-60 characters)"
              value={createUserForm.name}
              onChange={(e) =>
                setCreateUserForm({ ...createUserForm, name: e.target.value })
              }
              minLength="20"
              maxLength="60"
              className="input"
            />
            <input
              type="email"
              placeholder="Email (example@gmail.com)"
              value={createUserForm.email}
              onChange={(e) =>
                setCreateUserForm({ ...createUserForm, email: e.target.value })
              }
              className="input"
            />
            <input
              placeholder="Address (max 400 characters)"
              value={createUserForm.address}
              onChange={(e) =>
                setCreateUserForm({
                  ...createUserForm,
                  address: e.target.value,
                })
              }
              maxLength="400"
              className="input"
            />
            <input
              type="password"
              placeholder="Password (8-16 chars, 1 uppercase, 1 special)"
              value={createUserForm.password}
              onChange={(e) =>
                setCreateUserForm({
                  ...createUserForm,
                  password: e.target.value,
                })
              }
              pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$"
              className="input"
            />
            <select
              value={createUserForm.role}
              onChange={(e) =>
                setCreateUserForm({ ...createUserForm, role: e.target.value })
              }
              className="input"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="STORE_OWNER">Store Owner</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={createUser} className="btn btn-primary">
              Create
            </button>
            <button
              onClick={() => setShowCreateUser(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showCreateStore && (
        <div className="card p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Create Store</h4>
            <button
              onClick={() => setShowCreateStore(false)}
              className="text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Name (20-60 characters)"
              value={createStoreForm.name}
              onChange={(e) =>
                setCreateStoreForm({ ...createStoreForm, name: e.target.value })
              }
              minLength="20"
              maxLength="60"
              required
              className="input"
            />
            <input
              type="email"
              placeholder="Email (example@gmail.com)"
              value={createStoreForm.email}
              onChange={(e) =>
                setCreateStoreForm({
                  ...createStoreForm,
                  email: e.target.value,
                })
              }
              className="input"
            />
            <input
              placeholder="Address (max 400 characters)"
              value={createStoreForm.address}
              onChange={(e) =>
                setCreateStoreForm({
                  ...createStoreForm,
                  address: e.target.value,
                })
              }
              maxLength="400"
              className="input"
            />
            <select
              value={createStoreForm.owner_id}
              onChange={(e) =>
                setCreateStoreForm({
                  ...createStoreForm,
                  owner_id: e.target.value,
                })
              }
              required
              className="input"
            >
              <option value="">-- Select Store Owner --</option>
              {storeOwners.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.name} ({owner.email})
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={createStore} className="btn btn-primary">
              Create
            </button>
            <button
              onClick={() => setShowCreateStore(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Stores</h4>
          <div className="text-xs text-slate-500">
            Showing {stores.length} stores
          </div>
        </div>
        <div className="card p-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              placeholder="Filter by name"
              value={storeFilters.name}
              onChange={(e) =>
                setStoreFilters({ ...storeFilters, name: e.target.value })
              }
              className="input input-sm"
            />
            <input
              placeholder="Filter by email"
              value={storeFilters.email}
              onChange={(e) =>
                setStoreFilters({ ...storeFilters, email: e.target.value })
              }
              className="input input-sm"
            />
            <input
              placeholder="Filter by address"
              value={storeFilters.address}
              onChange={(e) =>
                setStoreFilters({ ...storeFilters, address: e.target.value })
              }
              className="input input-sm"
            />
            <div className="flex flex-wrap gap-2">
              <select
                value={storeFilters.sortBy}
                onChange={(e) =>
                  setStoreFilters({ ...storeFilters, sortBy: e.target.value })
                }
                className="input input-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="email">Sort by Email</option>
                <option value="address">Sort by Address</option>
              </select>
              <select
                value={storeFilters.order}
                onChange={(e) =>
                  setStoreFilters({ ...storeFilters, order: e.target.value })
                }
                className="input input-sm"
              >
                <option value="ASC">Ascending</option>
                <option value="DESC">Descending</option>
              </select>
              <button onClick={loadStores} className="btn btn-primary">
                Filter
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto card">
          <table className="table">
            <thead className="bg-indigo-50">
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Email</th>
                <th className="text-left">Address</th>
                <th className="text-left">Avg Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {stores.map((s) => (
                <tr key={s.id} className="tablerow">
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.address}</td>
                  <td>{s.overallRating ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Users</h4>
          <div className="text-xs text-slate-500">
            Showing {users.length} users
          </div>
        </div>
        <div className="card p-5">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <input
              placeholder="Filter by name"
              value={userFilters.name}
              onChange={(e) =>
                setUserFilters({ ...userFilters, name: e.target.value })
              }
              className="input input-sm"
            />
            <input
              placeholder="Filter by email"
              value={userFilters.email}
              onChange={(e) =>
                setUserFilters({ ...userFilters, email: e.target.value })
              }
              className="input input-sm"
            />
            <input
              placeholder="Filter by address"
              value={userFilters.address}
              onChange={(e) =>
                setUserFilters({ ...userFilters, address: e.target.value })
              }
              className="input input-sm"
            />
            <select
              value={userFilters.role}
              onChange={(e) =>
                setUserFilters({ ...userFilters, role: e.target.value })
              }
              className="input input-sm"
            >
              <option value="">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
              <option value="STORE_OWNER">Store Owner</option>
            </select>
            <div className="flex flex-wrap gap-2">
              <select
                value={userFilters.sortBy}
                onChange={(e) =>
                  setUserFilters({ ...userFilters, sortBy: e.target.value })
                }
                className="input input-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="email">Sort by Email</option>
                <option value="address">Sort by Address</option>
                <option value="role">Sort by Role</option>
              </select>
              <select
                value={userFilters.order}
                onChange={(e) =>
                  setUserFilters({ ...userFilters, order: e.target.value })
                }
                className="input input-sm"
              >
                <option value="ASC">Ascending</option>
                <option value="DESC">Descending</option>
              </select>
              <button onClick={loadUsers} className="btn btn-primary">
                Filter
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto card">
          <table className="table">
            <thead className="bg-indigo-50">
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Email</th>
                <th className="text-left">Address</th>
                <th className="text-left">Role</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((u) => (
                <tr key={u.id} className="tablerow">
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.address}</td>
                  <td>{u.role}</td>
                  <td>
                    <button
                      onClick={async () => {
                        const details = await api.admin.userDetails(u.id);
                        alert(JSON.stringify(details, null, 2));
                      }}
                      className="btn btn-secondary text-xs"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
