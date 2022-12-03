import { createContext, useState } from "react";
import cookies from "js-cookie";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  role: "",
  college: {},
  login: (token, role, college) => {},
  logout: () => {},
  changeCollege: (college) => {},
});

export const AuthContextProvider = (props) => {
  const storageToken = cookies.get("token");
  const storageRole = cookies.get("role");
  const storageCollege = JSON.parse(cookies.get("college"));
  const [token, setToken] = useState(storageToken);
  const [role, setRole] = useState(storageRole);
  const [college, setCollege] = useState(storageCollege);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, role, college) => {
    cookies.set("token", token);
    cookies.set("role", role);
    cookies.set("college", JSON.stringify(college));
    setRole(role);
    setToken(token);
    setCollege(college);
  };

  const logoutHandler = () => {
    cookies.remove("token");
    cookies.remove("role");
    cookies.remove("college");
    setRole(null);
    setToken(null);
    setCollege([]);
  };

  const collegeHandler = (college) => {
    cookies.set("college", JSON.stringify(college));
    setCollege(college);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    role: role,
    college: college,
    login: loginHandler,
    logout: logoutHandler,
    changeCollege: collegeHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
