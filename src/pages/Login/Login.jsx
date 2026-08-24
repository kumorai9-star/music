import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    /* ================================
       CHECK EMPTY FIELDS
    ================================= */

    if (
      !email.trim() ||
      !password
    ) {
      setError(
        "Please enter your email and password."
      );

      return;
    }

    /* ================================
       LOGIN
    ================================= */

    const result = login(
      email.trim(),
      password
    );

    /* ================================
       LOGIN FAILED
    ================================= */

    if (!result.success) {
      const message =
        result.message || "Login failed.";

      setError(message);
      showToast(message, "error");

      return;
    }

    /* ================================
       LOGIN SUCCESS
    ================================= */

    showToast("Welcome back! 🎧", "success");

    navigate("/home", {
      replace: true,
    });
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* LOGO */}

        <div className="auth-logo">
          🎵
        </div>

        {/* TITLE */}

        <h1>
          Welcome Back
        </h1>

        <p className="auth-subtitle">
          Login to continue listening
          to your favorite music.
        </p>

        {/* ERROR */}

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {/* LOGIN FORM */}

        <form
          onSubmit={handleSubmit}
        >

          {/* EMAIL */}

          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
            />

          </div>

          {/* PASSWORD */}

          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
            />

          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="auth-button"
          >
            Login
          </button>

        </form>

        {/* REGISTER LINK */}

        <p className="auth-switch">

          Don't have an account?{" "}

          <Link to="/register">
            Create Account
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;