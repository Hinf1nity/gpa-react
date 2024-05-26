import React from "react";
import { UseAuth } from "../context/UseAuth";

export function DocentesPage() {
  const { logout } = UseAuth();
  const handleLogoutClick = async () => {
    try {
      logout();
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div>
      <h1>DocentesPage</h1>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}
