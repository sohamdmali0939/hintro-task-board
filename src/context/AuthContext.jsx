import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const VALID_EMAIL = "intern@demo.com";
const VALID_PASSWORD = "intern123";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password, remember) => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      setIsAuthenticated(true);
      if (remember) {
        localStorage.setItem("auth", "true");
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
