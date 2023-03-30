import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
const UserCard = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{ minHeight: "100vh", margin: "30px" }}
      className="ui container">
      <Card
        onClick={() => {
          navigate("/users");
        }}>
        <Card.Content header="User Data" />
        <Card.Content description="List" />
        <Card.Content extra>
          <Icon name="user" />4 Users
        </Card.Content>
      </Card>
    </div>
  );
};

export default UserCard;
