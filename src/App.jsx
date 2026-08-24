import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Favorites from "./pages/Favorites/Favorites";
import Downloads from "./pages/Downloads/Downloads";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MusicPlayer from "./components/MusicPlayer";
import ToastContainer from "./components/ToastContainer";

const MusicLayout = () => {
  return (
    <div className="app">

      {/* HEADER */}
      <Header />

      {/* NAVBAR */}
      <Navbar />

      <div className="main-layout">

        {/* SIDEBAR */}
        <Sidebar />

        {/* PAGE CONTENT */}
        <main className="content">

          <Routes>

            <Route
              path="/home"
              element={<Home />}
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/favorites"
              element={<Favorites />}
            />

            <Route
              path="/downloads"
              element={<Downloads />}
            />

          </Routes>

        </main>

      </div>

      {/* MUSIC PLAYER */}
      <MusicPlayer />

    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>

      <ToastContainer />

      <Routes>

        {/* =================================
            DEFAULT PAGE
        ================================= */}

        <Route
          path="/"
          element={
            <Navigate
              to="/register"
              replace
            />
          }
        />

        {/* =================================
            REGISTER
        ================================= */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* =================================
            LOGIN
        ================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* =================================
            PROTECTED MUSIC APPLICATION
        ================================= */}

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MusicLayout />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
};

export default App;