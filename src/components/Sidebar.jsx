import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <span>♫</span>
        Melody
      </div>

      <p className="menu-heading">MENU</p>

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

      <p className="menu-heading">DISCOVER</p>

      <a href="#popular">🔥 Popular</a>
      <a href="#new">✨ New Releases</a>
      <a href="#artists">🎤 Artists</a>
      <a href="#genres">🎼 Genres</a>
    </aside>
  );
};

export default Sidebar;