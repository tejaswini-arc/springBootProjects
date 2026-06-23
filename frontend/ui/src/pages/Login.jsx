import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import "../css/login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        navigate("/home");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Something went wrong");
    }
};


  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Login to continue</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <InputField name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} autoComplete="email" />
          </div>
          <div className="input-group">
            <InputField name="password" placeholder="Enter your password" value={form.password} onChange={handleChange} type="password" autoComplete="current-password" />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        {error && <p className="error-text">{error}</p>}
        <div className="login-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
