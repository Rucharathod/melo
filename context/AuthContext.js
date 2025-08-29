"use client";

import { createContext, useContext } from "react";

const AuthContext = createContext({ user: { name: "Demo User" } });

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={{ user: { name: "Demo User" } }}>
      {children}
    </AuthContext.Provider>
  );
}