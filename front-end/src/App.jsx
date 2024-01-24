import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import { GestionPage } from "./pages/GestionPage";
import { Login } from "./pages/Login";
import { Logout } from "./components/Logout";
import { EstudiantesPage } from "./pages/EstudiantesPage";
import { GpaPage } from "./pages/GpaPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, , removeCookie] = useCookies(["csrftoken"]);

  useEffect(() => {
    const token = cookies.csrftoken; // Obtén el token de la cookie
    if (token) {
      setIsLoggedIn(true);
    }
  }, [cookies]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    removeCookie("csrftoken");
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EstudiantesPage />} />
        <Route path="/:carnet" element={<GpaPage />} />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/gestion" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/logout"
          element={
            isLoggedIn ? (
              <Logout onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/gestion"
          element={
            isLoggedIn ? (
              <GestionPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
export default App;
