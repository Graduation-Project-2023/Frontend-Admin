import { createContext, useState } from "react";
import cookies from "js-cookie";

const AuthContext = createContext({
  id: "",
  token: "",
  isLoggedIn: false,
  role: "",
  college: {},
  program: {},
  login: (id, token, role, college) => {},
  logout: () => {},
  changeCollege: (college) => {},
  changeProgram: (program) => {},
});

export const AuthContextProvider = (props) => {
  const storageToken = cookies.get("token");
  const storageRole = cookies.get("role");
  const storageId = cookies.get("id");
  let storageCollege = {};
  if (cookies.get("college") !== undefined) {
    storageCollege = JSON.parse(cookies.get("college"));
  }
  let storageProgram = {};
  if (cookies.get("program") !== undefined) {
    storageProgram = JSON.parse(cookies.get("program"));
  }
  const [token, setToken] = useState(storageToken);
  const [role, setRole] = useState(storageRole);
  const [id, setId] = useState(storageId);
  const [college, setCollege] = useState(storageCollege);
  const [program, setProgram] = useState(storageProgram);

  const userIsLoggedIn = !!token;

  const loginHandler = (id, token, role, college) => {
    cookies.set("id", id);
    cookies.set("token", token);
    cookies.set("role", role);
    if (college) {
      cookies.set("college", JSON.stringify(college));
    }
    setId(id);
    setRole(role);
    setToken(token);
    setCollege(college);
  };

  const logoutHandler = () => {
    cookies.remove("id");
    cookies.remove("token");
    cookies.remove("role");
    cookies.remove("college");
    cookies.remove("program");
    setId(null);
    setRole(null);
    setToken(null);
    setCollege([]);
    setProgram([]);
  };

  const collegeHandler = (college) => {
    cookies.set("college", JSON.stringify(college));
    setCollege(college);
  };

  const programHandler = (program) => {
    cookies.set("program", JSON.stringify(program));
    setProgram(program);
  };

  const contextValue = {
    id: id,
    token: token,
    isLoggedIn: userIsLoggedIn,
    role: role,
    college: college,
    program: program,
    login: loginHandler,
    logout: logoutHandler,
    changeCollege: collegeHandler,
    changeProgram: programHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
