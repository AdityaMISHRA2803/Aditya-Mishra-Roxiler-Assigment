import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function UpdatePassword() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      await api.auth.updatePassword(form);
      setMsg("Password updated successfully. Redirecting to login...");
      setForm({ oldPassword: "", newPassword: "" });
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        navigate("/login");
      }, 2000);
    } catch (e) {
      setMsg(e.message);
    }
  };
  return (
    <div className="max-w-md mx-auto card p-6">
      <h3 className="text-2xl font-semibold mb-3">Update Password</h3>
      <p className="text-sm text-slate-600 mb-5">
        Choose a strong password to keep your account secure.
      </p>
      {msg && (
        <div
          className={`mb-3 ${msg.startsWith("Password updated") ? "text-green-600" : "text-red-600"}`}
        >
          {msg}
        </div>
      )}
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Old Password</label>
          <input
            type="password"
            value={form.oldPassword}
            onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
            placeholder="Enter your current password"
            required
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">New Password</label>
          <input
            type="password"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            placeholder="8-16 chars: 1 uppercase, 1 special (@!#$%^&*)"
            required
            className="input"
          />
          <p className="text-xs text-slate-500 mt-1">
            8-16 characters, at least 1 uppercase letter & 1 special character{" "}
            {form.newPassword.length > 0 && `(${form.newPassword.length}/16)`}
          </p>
        </div>
        <div className="flex justify-end">
          <button className="btn btn-primary">Update Password</button>
        </div>
      </form>
    </div>
  );
}
