import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../components/navbar";

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;