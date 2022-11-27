import React from "react";
// eslint-disable-next-line
import { Link } from "react-router-dom";
import { Navbar } from "../common/Navbar";

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        {/* <h1>go to login plz <Link to='login'>press me haha</Link></h1> */}
      </div>
    </>
  );
};
