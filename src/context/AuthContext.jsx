import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const ADMIN_USER = {
  username: "admin",
  password: "1234",
  role: "admin"
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(username, password) {
    // Si coincide con el admin hardcodeado
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
      setUser(ADMIN_USER);
      return { success: true };
    }

    // Si no es admin, entonces será cliente
    // Guardamos solo username y rol cliente
    setUser({ username, role: "cliente" });
    return { success: true };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
