import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DriverDashboard() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 4000);
    return () => clearInterval(interval);
  }, []);

  const fetchRequests = async () => {
    const res = await axios.get(
      "http://localhost:8000/api/driver/requests",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setRequests(res.data);
  };

  return (
    <div>
      <h1>🚐 Driver Dashboard</h1>

      {requests.length === 0 && <p>No requests</p>}
      {requests
  .filter(r => r.EVowner)
  .map(r => (
    <div key={r._id} style={{ border: "1px solid #ccc", padding: 12 }}>
      <h3>{r.EVowner.name}</h3>
      <p>📞 {r.EVowner.phone}</p>
      <p>📍 {r.pickupLocation?.latitude}</p>
      <p>📍 {r.pickupLocation?.longitude}</p>

      <button
        onClick={() =>
          navigate(`/driver/evowner/${r.EVowner._id}`, {
            state: { bookingId: r._id, status: r.status }
          })
        }
      >
        View Profile
      </button>
    </div>
  ))}

    </div>
  );
}

