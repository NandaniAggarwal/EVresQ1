import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpRole from "./signup/SignUpRole";
import DriverForm from "./signup/DriverForm";
import EVOwnerForm from "./signup/EVOwnerForm";
import HostForm from "./signup/HostForm";
import "./auth.css";

export default function Signup() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        {/* Role selection */}
        {!role && <SignUpRole setRole={setRole} />}

        {/* Forms */}
        {role === "driver" && <DriverForm setRole={setRole} />}
        {role === "evOwner" && <EVOwnerForm setRole={setRole} />}
        {role === "host" && <HostForm setRole={setRole} />}

        {/* Login link */}
        <p className="auth-toggle" style={{ textAlign: "center", marginTop: "15px" }}>
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer", color: "#007bff", marginLeft: "5px" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
