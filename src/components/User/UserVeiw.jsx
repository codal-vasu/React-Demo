import React from "react";
import { Breadcrumb } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import { getDataFromLocalStorage } from "../../common/commonfun";
import avtar from "../../assets/avtarDp.png";
const UserVeiw = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  let userData = getDataFromLocalStorage();
  const Obj = userData.filter((item) => item.id === Number(id));
  return (
    <div>
      {" "}
      <div style={{ margin: "30px 0px" }}>
        <Breadcrumb size="big">
          <Breadcrumb.Section
            link
            onClick={() => {
              navigate("/dashboard");
            }}>
            Dashboard
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section
            link
            onClick={() => {
              navigate("/users");
            }}>
            Users
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right arrow" />
          <Breadcrumb.Section active>Users Details</Breadcrumb.Section>
        </Breadcrumb>
      </div>
      <div>
        <h2>Users {id}</h2>

        <h2 className="ui header">
          <img src={avtar} className="ui circular image" alt="ph" />
          {Obj[0].first_name + " " + Obj[0].last_name}
        </h2>
      </div>
    </div>
  );
};

export default UserVeiw;
