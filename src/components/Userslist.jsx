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
        <div style={{ margin: "30px" }}>
          <Breadcrumb size="big">
            <Breadcrumb.Section
              link
              onClick={() => {
                navigate("../dashboard");
              }}>
              Dashboard
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section
              link
              onClick={() => {
                navigate("./");
              }}>
              Users
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right arrow" />
            <Breadcrumb.Section active>Users List</Breadcrumb.Section>
          </Breadcrumb>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "30px",
          }}></div>{" "}
        <List1 />
      </div>
      <Footer />
    </>
  );
};

export default Userslist;
