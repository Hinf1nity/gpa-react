import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { PropTypes } from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, , removeCookie] = useCookies(["csrftoken"]);

  useEffect(() => {
    const token = cookies.csrftoken;
    if (token) {
      setIsLoggedIn(true);
    }
  }, [cookies]);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    removeCookie("csrftoken", { path: "/cidimec/gpa-imt/" });
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
