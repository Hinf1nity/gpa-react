import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { PropTypes } from "prop-types";

export const AuthContext = createContext();

export const AuthProviderDocentes = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, , removeCookie] = useCookies(["token"]);

  useEffect(() => {
    const token = cookies.token;
    if (token) {
      setIsLoggedIn(true);
    }
  }, [cookies]);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    removeCookie("token", { path: "/cidimec/gpa-imt/" });
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProviderDocentes.propTypes = {
  children: PropTypes.node.isRequired,
};
