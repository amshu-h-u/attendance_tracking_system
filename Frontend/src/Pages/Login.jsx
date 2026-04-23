import { useState } from "react";
import API from "../api/axios.js";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");

  // LOGIN
  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      alert("Login successful");

      if (res.data.user.role === "Trainer") {
        window.location.href = "/trainer";
      } else {
        window.location.href = "/student";
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // SIGNUP
  const handleSignup = async () => {
    try {
      const res = await API.post("/auth/signup", {
        name,
        email,
        password,
        role
      });

      alert("Signup successful! Now login.");
      setIsSignup(false);

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{isSignup ? "Signup" : "Login"}</h2>

      {isSignup && (
        <>
          <input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <br /><br />
        </>
      )}

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      {isSignup && (
        <>
          <select onChange={(e) => setRole(e.target.value)}>
            <option value="Student">Student</option>
            <option value="Trainer">Trainer</option>
            <option value="Institution">Institution</option>
          </select>
          <br /><br />
        </>
      )}

      <button onClick={isSignup ? handleSignup : handleLogin}>
        {isSignup ? "Signup" : "Login"}
      </button>

      <p
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup ? "Already have account? Login" : "Create new account"}
      </p>
    </div>
  );
}