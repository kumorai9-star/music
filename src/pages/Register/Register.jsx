import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    /* ================================
       CHECK EMPTY FIELDS
    ================================= */

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError(
        "Please fill in all fields."
      );

      return;
    }

    /* ================================
       CHECK PASSWORD LENGTH
    ================================= */

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );

      return;
    }

    /* ================================
       CHECK PASSWORD MATCH
    ================================= */

    if (
      password !== confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );

      return;
    }

    /* ================================
       REGISTER
    ================================= */

    const result = register({
      name: name.trim(),
      email: email.trim(),
      password,
    });

    /* ================================
       CHECK RESULT
    ================================= */

    if (!result.success) {
      const message =
        result.message || "Registration failed.";

      setError(message);
      showToast(message, "error");

      return;
    }

    /* ================================
       REGISTRATION SUCCESS
    ================================= */

    showToast(`Welcome, ${name.trim()}! 🎉`, "success");

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
          Create Account
        </h1>

        <p className="auth-subtitle">
          Create your account and
          start listening to music.
        </p>

        {/* ERROR */}

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {/* REGISTER FORM */}

        <form
          onSubmit={handleSubmit}
        >

          {/* NAME */}

          <div className="form-group">

            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value
                )
              }
            />

          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
            />

          </div>

          {/* CONFIRM PASSWORD */}

          <div className="form-group">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
            />

          </div>

          {/* REGISTER BUTTON */}

          <button
            type="submit"
            className="auth-button"
          >
            Create Account
          </button>

        </form>

        {/* LOGIN LINK */}

        <p className="auth-switch">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;