import React, { useState } from "react";
import api from "../api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const res = await api.auth.login({ email, password });
      onLogin(res);
    } catch (e) {
      setErr(e.body?.message || JSON.stringify(e.body) || "Login failed");
    }
  };
  return (
    <div className="max-w-md mx-auto card p-6">
      <h3 className="text-2xl font-semibold mb-3">Welcome back</h3>
      <p className="text-sm text-slate-600 mb-6">
        Sign in to continue managing stores and ratings.
      </p>
      {err && <div className="text-red-600 mb-3">{err}</div>}
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@domain.com"
            required
            className="input"
          />
          <p className="text-xs text-slate-500 mt-1">
            Must follow standard email format
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8-16 chars: 1 uppercase, 1 special char (@!#$%^&*)"
            required
            className="input"
          />
          <p className="text-xs text-slate-500 mt-1">
            8-16 characters, at least 1 uppercase letter & 1 special character
          </p>
        </div>
        <div className="flex justify-end">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
}
