import React from "react";
import { Menu, Container, Image, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/");
  };

  return (
    <Menu inverted>
      <Container
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}>
        <div style={{ display: "flex" }}>
          <Menu.Item>
            <Image
              size="mini"
              src={Logo}
              style={{ marginRight: "1.5em", size: "relative " }}
            />
            <h2 className="ui header" style={{ color: "white", margin: "0px" }}>
              CRUD
            </h2>
          </Menu.Item>
          <Menu.Item
            onClick={(e) => {
              e.preventDefault();
              navigate("/dashboard");
            }}>
            Dashboard
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              navigate("/users");
            }}>
            UserList
          </Menu.Item>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            color="teal"
            onClick={() => {
              clickHandler();
              localStorage.clear();
            }}>
            Log Out{" "}
          </Button>
        </div>
      </Container>
    </Menu>
  );
};

export default Header;
