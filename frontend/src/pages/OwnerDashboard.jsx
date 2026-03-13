import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function OwnerDashboard() {
  const [data, setData] = useState([]);
  useEffect(() => {
    api.owner
      .dashboard()
      .then(setData)
      .catch((e) => alert(JSON.stringify(e)));
  }, []);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold">Owner Dashboard</h3>
        <p className="text-sm text-slate-600 mt-1">
          See your stores and the ratings provided by users.
        </p>
      </div>
      <div className="grid gap-5">
        {data.map((s) => (
          <div key={s.storeId} className="card p-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">{s.name}</h4>
              <span className="text-sm font-medium text-indigo-600">
                Avg Rating: {s.averageRating ?? "-"}
              </span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {s.ratingsByUsers.map((u) => (
                <li
                  key={u.userId}
                  className="flex flex-wrap items-center gap-2"
                >
                  <span className="font-medium">{u.name}</span>
                  <span className="text-slate-500">({u.email})</span>
                  <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927C9.324 2.2 10.676 2.2 10.951 2.927l1.286 3.943a1 1 0 00.95.69h4.148c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.286 3.943c.275.727-.592 1.333-1.175.857l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.583.476-1.45-.13-1.175-.857l1.286-3.943a1 1 0 00-.364-1.118L2.077 9.37c-.783-.57-.38-1.81.588-1.81h4.148a1 1 0 00.95-.69L9.049 2.927z" />
                    </svg>
                    {u.rating}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
