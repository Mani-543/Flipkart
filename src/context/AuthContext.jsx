import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const hasToken = document.cookie
          .split(";")
          .some((cookie) => cookie.trim().startsWith("token="));

        if (!hasToken) {
          setUser(null);
          setLoading(false);
          return;
        }

        const response = await api.get("/auth/me");

        setUser(response.data.user);
      } catch (error) {
        const status = error?.response?.status;

        if (status === 401 || status === 403) {
          setUser(null);
        } else {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    setUser(response.data.user);

    return response.data;
  };

  const register = async (
    name,
    email,
    password
  ) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    setUser(response.data.user);

    return response.data;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}