import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export const UseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
