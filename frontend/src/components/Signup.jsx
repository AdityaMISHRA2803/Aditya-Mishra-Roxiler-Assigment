import React, { useState } from "react";
import api from "../api";

export default function Signup({ onSignup }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.length < 20) {
      newErrors.name = "Name must be at least 20 characters";
    } else if (form.name.length > 60) {
      newErrors.name = "Name must be at most 60 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    // Address validation
    if (form.address && form.address.length > 400) {
      newErrors.address = "Address must be at most 400 characters";
    }

    // Password validation
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (form.password.length > 16) {
      newErrors.password = "Password must be at most 16 characters";
    } else if (!/[A-Z]/.test(form.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/[^A-Za-z0-9]/.test(form.password)) {
      newErrors.password =
        "Password must contain at least one special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setErrors({});

    if (!validateForm()) {
      return;
    }

    try {
      const res = await api.auth.signup(form);
      if (onSignup) {
        onSignup(res);
      } else {
        setMsg("Signup success. Please login.");
        setForm({ name: "", email: "", address: "", password: "" });
      }
    } catch (e) {
      setMsg(e.message);
    }
  };
  return (
    <div className="max-w-md mx-auto card p-6">
      <h3 className="text-2xl font-semibold mb-3">Create your account</h3>
      <p className="text-sm text-slate-600 mb-5">
        Make sure to use a secure password and valid email address.
      </p>
      {msg && (
        <div
          className={`mb-3 ${msg.startsWith("Signup success") ? "text-green-600" : "text-red-600"}`}
        >
          {msg}
        </div>
      )}
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: "" });
            }}
            placeholder="Min 20, Max 60 characters (e.g., John Michael Anderson Smith)"
            required
            className="input"
          />
          <p className="text-xs text-slate-500 mt-1">
            Must be 20-60 characters{" "}
            {form.name.length > 0 && `(${form.name.length}/60)`}
          </p>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: "" });
            }}
            placeholder="example@domain.com"
            required
            className="input"
          />
          <p className="text-xs text-slate-500 mt-1">
            Must follow standard email format
          </p>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <input
            value={form.address}
            onChange={(e) => {
              setForm({ ...form, address: e.target.value });
              if (errors.address) setErrors({ ...errors, address: "" });
            }}
            placeholder="Max 400 characters (optional)"
            className="input"
          />
          <p className="text-xs text-slate-500 mt-1">
            Max 400 characters{" "}
            {form.address.length > 0 && `(${form.address.length}/400)`}
          </p>
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
              if (errors.password) setErrors({ ...errors, password: "" });
            }}
            placeholder="8-16 chars: 1 uppercase, 1 special (@!#$%^&*)"
            required
            className="input"
          />
          <p className="text-xs text-slate-500 mt-1">
            8-16 characters, at least 1 uppercase letter & 1 special character{" "}
            {form.password.length > 0 && `(${form.password.length}/16)`}
          </p>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <div className="flex justify-end">
          <button className="btn btn-primary">Signup</button>
        </div>
      </form>
    </div>
  );
}
