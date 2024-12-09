import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import API from "./api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get("token"));
  const [user, setUser] = useState(() => {
    const userCookie = Cookies.get("user");
    return userCookie ? JSON.parse(userCookie) : null;
  });

  const login = async (email, password) => {
    try {
      const { data } = await API.post("/users/login", { email, password });
      Cookies.set("token", data.token, { secure: true, sameSite: "strict" });
      Cookies.set("user", JSON.stringify(data), { secure: true, sameSite: "strict" });
      setIsAuthenticated(true);
      setUser(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await API.post("/users/register", { name, email, password });
      Cookies.set("token", data.token, { secure: true, sameSite: "strict" });
      Cookies.set("user", JSON.stringify(data), { secure: true, sameSite: "strict" });
      setIsAuthenticated(true);
      setUser(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
