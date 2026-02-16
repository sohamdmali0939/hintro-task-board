import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(email, password, remember);

    if (success) {
      navigate("/board");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Remember Me */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "14px" }}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                style={{ marginRight: "6px" }}
              />
              Remember Me
            </label>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        {error && (
          <p style={{ color: "red", marginTop: "15px", textAlign: "center" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
