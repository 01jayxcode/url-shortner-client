import { createContext, useContext, useEffect, useState } from "react";

interface User {
  user_id: string;
  email: string;
  role: string;
  name: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("sniply_token");
    if (savedToken) {
      try {
        const payload = JSON.parse(atob(savedToken.split(".")[1]));
        if (payload.exp * 1000 > Date.now()) {
          setToken(savedToken);
          setUser(payload);
        } else {
          localStorage.removeItem("sniply_token");
        }
      } catch {
        localStorage.removeItem("sniply_token");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("sniply_token", newToken);
    const payload = JSON.parse(atob(newToken.split(".")[1]));
    setToken(newToken);
    setUser(payload);
  };

  const logout = () => {
    localStorage.removeItem("sniply_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAdmin: user?.role === "admin",
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
