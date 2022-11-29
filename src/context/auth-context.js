import { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  role: "",
  college: [],
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const storageToken = localStorage.getItem("token");
  const storageRole = localStorage.getItem("role");
  const [token, setToken] = useState(storageToken);
  const [role, setRole] = useState(storageRole);
  const [college, setCollege] = useState([]);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setRole(role);
    setToken(token);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role", role);
    setRole(null);
    setToken(null);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    role: role,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
