import { createContext, useState } from "react";
import cookies from "js-cookie";

const AuthContext = createContext({
  id: "",
  userId: "",
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
  const storageUserId = cookies.get("userId");
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
  const [userId, setUserId] = useState(storageUserId);
  const [id, setId] = useState(storageId);
  const [college, setCollege] = useState(storageCollege);
  const [program, setProgram] = useState(storageProgram);

  const userIsLoggedIn = !!token;

  const loginHandler = (id, token, role, college, userId) => {
    cookies.set("id", id);
    cookies.set("token", token);
    cookies.set("role", role);
    cookies.set("userId", userId);
    if (college) {
      cookies.set("college", JSON.stringify(college));
    }
    setId(id);
    setRole(role);
    setToken(token);
    setCollege(college);
    setUserId(userId);
  };

  const logoutHandler = () => {
    cookies.remove("id");
    cookies.remove("token");
    cookies.remove("role");
    cookies.remove("college");
    cookies.remove("program");
    cookies.remove("userId");
    setUserId(null);
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
    userId: userId,
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
