import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { getDataFromLocalStorage } from "../../common/commonfun";

const UserCard = () => {
  const navigate = useNavigate();
  const NumberOfUser = getDataFromLocalStorage();

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
          <Icon name="user" />
          {NumberOfUser.length} Users
        </Card.Content>
      </Card>
    </div>
  );
};

export default UserCard;
