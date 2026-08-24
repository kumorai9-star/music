import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { showToast } = useToast();

  const handleLogout = () => {
    logout();
    showToast("You've been logged out", "info");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-logo" onClick={() => navigate("/")}>
        <div className="logo-icon">♫</div>
        <span>Melody</span>
      </div>

      <SearchBar />

      <div className="header-actions">
        {isAuthenticated ? (
          <>
            <button
              className="profile-button"
              onClick={() => navigate("/dashboard")}
            >
              👤 {user?.name?.split(" ")[0] || "Dashboard"}
            </button>

            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="login-button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="register-button"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;