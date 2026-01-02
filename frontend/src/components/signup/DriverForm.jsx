import { useState } from "react";

export default function DriverForm({ setRole }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    license: "",
    vehicle: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Driver Signup Data:", form);
  };

  return (
    <
    >
      {/* SINGLE WHITE BOX */}
      <form
        onSubmit={handleSubmit}
        style={{
          width: "350px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "30px 25px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {/* BACK BUTTON */}
        <button
          type="button"
          onClick={() => setRole("")}
          style={{
            marginBottom: "10px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#f0f0f0",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          ← Back to Role Selection
        </button>

        <h2 style={{ textAlign: "center", marginBottom: "5px" }}>Driver Signup</h2>
        <p style={{ textAlign: "center", color: "#555", marginBottom: "15px", fontSize: "14px" }}>
          Help EV owners and earn on your schedule
        </p>

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          name="phone"
          type="text"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          name="license"
          type="text"
          placeholder="License Number"
          value={form.license}
          onChange={handleChange}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          name="vehicle"
          type="text"
          placeholder="Vehicle Number"
          value={form.vehicle}
          onChange={handleChange}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "5px",
          }}
        >
          Create Account
        </button>
      </form>
    </>
  );
}
