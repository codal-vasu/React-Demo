import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import List1 from "./List1";
import { Breadcrumb } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const Userslist = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div
        style={{
          minHeight: "75vh",
        }}
        className="ui container">
        <List1 />
      </div>
      <Footer />
    </>
  );
};

export default Userslist;
