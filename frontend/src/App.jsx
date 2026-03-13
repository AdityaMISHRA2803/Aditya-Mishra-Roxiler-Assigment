import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UpdatePassword from "./components/UpdatePassword";
import AdminDashboard from "./pages/AdminDashboard";
import UserStores from "./pages/UserStores";
import OwnerDashboard from "./pages/OwnerDashboard";

function Protected({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  if (!token)
    return (
      <div>
        Please <Link to="/login">login</Link>
      </div>
    );
  if (role && role !== userRole) return <div>Access denied</div>;
  return children;
}

export default function App() {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [showUserProfile, setShowUserProfile] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const r = localStorage.getItem("role");
    setRole(r);
  }, []);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showUserProfile && e.target.closest(".user-profile-menu") === null) {
        setShowUserProfile(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showUserProfile]);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    setRole(null);
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 text-slate-900">
      <header className="backdrop-blur-sm bg-white/40 border-b border-white/60 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-indigo-600/20 text-indigo-700">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M3 3h14a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2zm14 2H3v2h14V5zm0 4H3v6h14V9z" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-semibold tracking-wide">
                Store Ratings
              </div>
              <div className="text-xs text-slate-600">
                Manage users, stores, and reviews with ease
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <nav className="flex flex-wrap items-center gap-3">
              {role !== "ADMIN" && role !== "STORE_OWNER" && (
                <Link to="/" className="btn btn-secondary">
                  Home
                </Link>
              )}
              {role === "ADMIN" && (
                <Link to="/admin" className="btn btn-secondary">
                  Admin Dashboard
                </Link>
              )}
              {role === "STORE_OWNER" && (
                <Link to="/owner" className="btn btn-secondary">
                  Owner Dashboard
                </Link>
              )}
            </nav>
            <div className="flex flex-wrap items-center gap-2">
              {!role && (
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
              )}
              {!role && (
                <Link to="/signup" className="btn btn-secondary">
                  Signup
                </Link>
              )}
              {role && (
                <Link to="/update-password" className="btn btn-secondary">
                  Update Password
                </Link>
              )}
              {role && (
                <div className="relative user-profile-menu">
                  <button
                    onClick={() => setShowUserProfile(!showUserProfile)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-indigo-600 shadow-sm hover:bg-white"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {showUserProfile && (
                    <div className="absolute right-0 mt-2 w-60 bg-white/90 backdrop-blur border border-white/50 rounded-xl shadow-lg text-slate-900 z-50">
                      <div className="p-4 border-b border-slate-100">
                        <div className="text-sm font-semibold">
                          {localStorage.getItem("name") || "Unknown User"}
                        </div>
                        <div className="text-xs text-slate-500">
                          {localStorage.getItem("email") || "-"}
                        </div>
                      </div>
                      <div className="p-4 border-b border-slate-100">
                        <div className="text-xs text-slate-500">Role</div>
                        <div className="text-sm font-medium">
                          {localStorage.getItem("role") || "-"}
                        </div>
                      </div>
                      <div className="p-3">
                        <button
                          onClick={logout}
                          className="w-full btn btn-primary"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-6">
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                onLogin={(r) => {
                  localStorage.setItem("token", r.token);
                  localStorage.setItem("role", r.role);
                  localStorage.setItem("name", r.name);
                  localStorage.setItem("email", r.email);
                  setRole(r.role);
                  navigate(
                    r.role === "ADMIN"
                      ? "/admin"
                      : r.role === "STORE_OWNER"
                        ? "/owner"
                        : "/",
                  );
                }}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                onSignup={(r) => {
                  localStorage.setItem("token", r.token);
                  localStorage.setItem("role", r.role);
                  localStorage.setItem("name", r.name);
                  localStorage.setItem("email", r.email);
                  setRole(r.role);
                  navigate(
                    r.role === "ADMIN"
                      ? "/admin"
                      : r.role === "STORE_OWNER"
                        ? "/owner"
                        : "/",
                  );
                }}
              />
            }
          />
          <Route
            path="/update-password"
            element={
              <Protected>
                <UpdatePassword />
              </Protected>
            }
          />
          <Route
            path="/admin"
            element={
              <Protected role={"ADMIN"}>
                <AdminDashboard />
              </Protected>
            }
          />
          <Route
            path="/owner"
            element={
              <Protected role={"STORE_OWNER"}>
                <OwnerDashboard />
              </Protected>
            }
          />
          <Route
            path="/"
            element={
              <Protected>
                <UserStores />
              </Protected>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
