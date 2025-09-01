import type { AuthContextType } from "@/types/auth";
import AuthContext from "@Contexts/auth/authContext";
import { useContext } from "react";

export default function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
