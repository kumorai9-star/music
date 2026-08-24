import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" end>
        🏠 Home
      </NavLink>

      <NavLink to="/dashboard">
        📊 Dashboard
      </NavLink>

      <NavLink to="/favorites">
        ❤️ Favorites
      </NavLink>

      <NavLink to="/downloads">
        📥 Downloads
      </NavLink>
    </nav>
  );
};

export default Navbar;