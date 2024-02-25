// Code for the main component of the application
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import { GestionPage } from "./pages/GestionPage";
import { Login } from "./pages/Login";
import { Logout } from "./components/Logout";
import { EstudiantesPage } from "./pages/EstudiantesPage";
import { GpaPage } from "./pages/GpaPage";
import { AuthProvider } from "./context/AuthProvider";
import { UseAuth } from "./context/UseAuth";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Toaster />
    </AuthProvider>
  );
}

function AppRoutes() {
  const { isLoggedIn } = UseAuth();

  return (
    <Routes>
      <Route path="/" element={<EstudiantesPage />} />
      <Route path="/:carnet" element={<GpaPage />} />
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/gestion" /> : <Login />}
      />
      <Route
        path="/logout"
        element={isLoggedIn ? <Logout /> : <Navigate to="/" />}
      />
      <Route
        path="/gestion"
        element={isLoggedIn ? <GestionPage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
