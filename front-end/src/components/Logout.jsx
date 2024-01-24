import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Logout = ({ onLogout }) => {
  const [, , removeCookie] = useCookies(["csrftoken"]);
  const navigateTo = useNavigate();

  const handleLogout = () => {
    removeCookie("csrftoken");
    onLogout(); // Llama a la función de callback para indicar que el usuario ha cerrado sesión
    navigateTo("/login");
  };

  return (
    <div>
      <h2>Cerrar Sesión</h2>
      <button type="button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};
