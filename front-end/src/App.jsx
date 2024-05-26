// Code for the main component of the application
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import { GestionPage } from "./pages/GestionPage";
import { Login } from "./pages/Login";
import { EstudiantesPage } from "./pages/EstudiantesPage";
import { GpaPage } from "./pages/GpaPage";
import { RegistrarLicencia } from "./pages/RegistrarLicencia";
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
      <Route path="/cidimec/gpa-imt" element={<EstudiantesPage />} />
      <Route path="/cidimec/gpa-imt/:carnet" element={<GpaPage />} />
      <Route
        path="/cidimec/gpa-imt/login"
        element={
          isLoggedIn
            ? (console.log(isLoggedIn),
              (<Navigate to="/cidimec/gpa-imt/gestion/" />))
            : (console.log(isLoggedIn), (<Login />))
        }
      />
      <Route
        path="/cidimec/gpa-imt/gestion"
        element={
          isLoggedIn ? (
            <GestionPage />
          ) : (
            <Navigate to="/cidimec/gpa-imt/login/" />
          )
        }
      />
      <Route
        path="/cidimec/gpa-imt/registrar_licencia/:carnet"
        element={<RegistrarLicencia />}
      />
    </Routes>
  );
}

export default App;
