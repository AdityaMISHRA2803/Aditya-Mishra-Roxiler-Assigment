import React, { useEffect, useState } from "react";
import api from "../api";

export default function UserStores() {
  const [stores, setStores] = useState([]);
  const [storeFilters, setStoreFilters] = useState({ name: "", address: "" });
  const [rating, setRating] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [errors, setErrors] = useState({});

  const load = async () => {
    let queryString = "";
    if (storeFilters.name)
      queryString += `name=${encodeURIComponent(storeFilters.name)}`;
    if (storeFilters.address) {
      if (queryString) queryString += "&";
      queryString += `address=${encodeURIComponent(storeFilters.address)}`;
    }
    const res = await api.stores.list(queryString);
    setStores(res);
    // initialize rating with existing user ratings
    const initialRating = {};
    const initialSubmitted = {};
    res.forEach((s) => {
      if (s.userRating) {
        initialRating[s.id] = s.userRating;
        initialSubmitted[s.id] = true;
      }
    });
    setRating(initialRating);
    setSubmitted(initialSubmitted);
    // Clear the filter fields after search
    setStoreFilters({ name: "", address: "" });
  };
  useEffect(() => {
    load();
  }, []);
  const validateRating = (val) => {
    const num = Number(val);
    if (!val || isNaN(num) || num < 1 || num > 5)
      return "Rating must be a number between 1 and 5";
    return null;
  };
  const handleRatingChange = (id, val) => {
    setRating({ ...rating, [id]: val });
    const err = validateRating(val);
    setErrors({ ...errors, [id]: err });
  };
  const submit = async (id) => {
    const err = validateRating(rating[id]);
    if (err) {
      setErrors({ ...errors, [id]: err });
      return;
    }
    try {
      await api.stores.submitRating(id, { rating: Number(rating[id]) });
      setSubmitted({ ...submitted, [id]: true });
      load(); // reload to update overall rating
    } catch (e) {
      alert(e.message || JSON.stringify(e));
    }
  };
  const update = async (id) => {
    const err = validateRating(rating[id]);
    if (err) {
      setErrors({ ...errors, [id]: err });
      return;
    }
    try {
      await api.stores.updateRating(id, { rating: Number(rating[id]) });
      load(); // reload to update overall rating
    } catch (e) {
      alert(e.message || JSON.stringify(e));
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold">Stores</h3>
          <p className="text-sm text-slate-600 mt-1">
            Browse stores and share your rating (1-5).
          </p>
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <input
            placeholder="Search name"
            value={storeFilters.name}
            onChange={(e) =>
              setStoreFilters({ ...storeFilters, name: e.target.value })
            }
            className="input input-sm"
          />
          <input
            placeholder="Search address"
            value={storeFilters.address}
            onChange={(e) =>
              setStoreFilters({ ...storeFilters, address: e.target.value })
            }
            className="input input-sm"
          />
          <button onClick={() => load()} className="btn btn-primary">
            Search
          </button>
        </div>
      </div>

      <div className="grid gap-5">
        {stores.map((s) => (
          <div key={s.id} className="card p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="text-lg font-semibold">{s.name}</h4>
                <p className="text-sm text-slate-600 mt-1">{s.address}</p>
                <div className="mt-2 inline-flex items-center gap-2 text-sm">
                  <span className="font-semibold">Overall:</span>
                  <span className="text-indigo-700">
                    {s.overallRating ?? "-"}
                  </span>
                  <span className="ml-3 font-semibold">Your Rating:</span>
                  <span className="text-indigo-700">{s.userRating ?? "-"}</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <input
                    value={rating[s.id] || ""}
                    onChange={(e) => handleRatingChange(s.id, e.target.value)}
                    placeholder="1-5"
                    className="input input-sm w-20"
                  />
                  <button
                    onClick={() => submit(s.id)}
                    disabled={
                      submitted[s.id] || !!errors[s.id] || !rating[s.id]
                    }
                    className="btn btn-primary text-sm"
                  >
                    {submitted[s.id] ? "Submitted" : "Submit"}
                  </button>
                  <button
                    onClick={() => update(s.id)}
                    disabled={!!errors[s.id] || !rating[s.id]}
                    className="btn btn-secondary text-sm"
                  >
                    Update
                  </button>
                </div>
                {errors[s.id] && (
                  <div className="text-red-500 text-xs">{errors[s.id]}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
