import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import { Outlet } from "react-router-dom";

const Userslist = () => {
  return (
    <>
      <Header />
      <div
        style={{
          minHeight: "75vh",
        }}
        className="ui container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Userslist;
