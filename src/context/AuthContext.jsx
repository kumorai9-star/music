/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  /* =====================================
     REGISTERED USER
  ===================================== */

  const [registeredUser, setRegisteredUser] =
    useState(() => {
      const savedUser =
        localStorage.getItem("registeredUser");

      if (!savedUser) {
        return null;
      }

      try {
        return JSON.parse(savedUser);
      } catch {
        localStorage.removeItem(
          "registeredUser"
        );

        return null;
      }
    });

  /* =====================================
     CURRENT LOGIN
  ===================================== */

  const [user, setUser] = useState(() => {
    const savedLogin =
      localStorage.getItem("loggedInUser");

    if (!savedLogin) {
      return null;
    }

    try {
      return JSON.parse(savedLogin);
    } catch {
      localStorage.removeItem(
        "loggedInUser"
      );

      return null;
    }
  });

  /* =====================================
     REGISTER
  ===================================== */

  const register = ({
    name,
    email,
    password,
  }) => {
    const newUser = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    };

    /*
      Save the account permanently
      in localStorage.
    */

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(newUser)
    );

    setRegisteredUser(newUser);

    /*
      Automatically log the user in
      after registration.
    */

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(newUser)
    );

    setUser(newUser);

    return {
      success: true,
    };
  };

  /* =====================================
     LOGIN
  ===================================== */

  const login = (
    email,
    password
  ) => {
    const savedUser =
      localStorage.getItem(
        "registeredUser"
      );

    /*
      No account exists
    */

    if (!savedUser) {
      return {
        success: false,
        message:
          "No account found. Please register first.",
      };
    }

    let storedUser;

    try {
      storedUser =
        JSON.parse(savedUser);
    } catch {
      return {
        success: false,
        message:
          "Account data is invalid. Please register again.",
      };
    }

    /*
      Check email
    */

    if (
      storedUser.email !==
      email.trim().toLowerCase()
    ) {
      return {
        success: false,
        message:
          "Incorrect email address.",
      };
    }

    /*
      Check password
    */

    if (
      storedUser.password !== password
    ) {
      return {
        success: false,
        message:
          "Incorrect password.",
      };
    }

    /*
      Save login session
    */

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(storedUser)
    );

    setUser(storedUser);

    return {
      success: true,
    };
  };

  /* =====================================
     LOGOUT
  ===================================== */

  const logout = () => {
    /*
      Only remove the login session.

      The registered account remains saved.
    */

    localStorage.removeItem(
      "loggedInUser"
    );

    setUser(null);
  };

  /* =====================================
     AUTHENTICATION STATUS
  ===================================== */

  const isAuthenticated =
    Boolean(user);

  const isRegistered =
    Boolean(registeredUser);

  /* =====================================
     CONTEXT
  ===================================== */

  const value = {
    user,
    registeredUser,

    isAuthenticated,
    isRegistered,

    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* =====================================
   useAuth
===================================== */

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};