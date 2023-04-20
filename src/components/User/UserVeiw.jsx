import React from "react";
import { Breadcrumb, Table, Icon } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDataFromLocalStorage,
  isUserAuthenticate,
} from "../../common/commonfun";
import avtar from "../../assets/avtarDp.png";
import "../common.css";

const UserVeiw = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  let userData = getDataFromLocalStorage("Users");
  const Obj = userData.filter((item) => item.id === Number(id));
  return (
    <div>
      {" "}
      <div style={{ margin: "30px 0px" }}>
        <Breadcrumb size="big">
          <Breadcrumb.Section
            link
            onClick={() => {
              if (isUserAuthenticate()) {
                navigate("/dashboard");
              }
            }}>
            Dashboard
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section
            link
            onClick={() => {
              if (isUserAuthenticate()) {
                navigate("/users");
              }
            }}>
            Users
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right arrow" />
          <Breadcrumb.Section active>Users Details</Breadcrumb.Section>
        </Breadcrumb>
      </div>
      <h2>User</h2>
      <div className="user-container">
        <div>
          <h2 className="ui header">
            <img src={avtar} className="ui circular image" alt="ph" />{" "}
            {Obj[0].first_name}
            {"  "}
            <span style={{ color: "#467b7c" }}>{Obj[0].last_name}</span>
          </h2>
        </div>

        <div className="user-details">
          <Table definition>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Icon name="user"></Icon>Id{" "}
                </Table.Cell>
                <Table.Cell>{Obj[0].id}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Icon name="mail"></Icon>Email
                </Table.Cell>
                <Table.Cell>{Obj[0].email}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  {" "}
                  <Icon name="calendar"></Icon>Joined at
                </Table.Cell>
                <Table.Cell>{Obj[0].date}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Icon name="bolt"></Icon>Status{" "}
                </Table.Cell>
                <Table.Cell>{Obj[0].status}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UserVeiw;
