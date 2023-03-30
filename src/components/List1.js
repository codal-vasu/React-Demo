import React, { useState } from "react";
import {
  Button,
  Icon,
  Table,
  Pagination,
  Dropdown,
  Input,
  Modal,
  Header as Header1,
} from "semantic-ui-react";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router-dom";

const BoolArry = [true, false];

const List = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("Users")) || []
  );

  const totalPage = Math.ceil(userData?.length / limit);

  var createRandomUser = () => {
    let users = [];

    for (let i = 1; i <= 200; i++) {
      users.push({
        id: i + (userData || []).length,
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        date: faker.date.past().toISOString(),
        status: BoolArry[Math.floor(Math.random() * BoolArry.length)],
      });
    }

    return users;
  };

  const addUserData = () => {
    const userDataArray = createRandomUser();
    const existing = localStorage.getItem("Users");
    const existingArray = existing ? JSON.parse(existing) : [];
    console.log("existingArray", existingArray);
    console.log("userDataArray", userDataArray);
    const updated = [...existingArray, ...userDataArray];
    localStorage.setItem("Users", JSON.stringify(updated));
    setUserData(updated);
  };

  const DeleteAllUser = () => {};
  const options = [
    { key: 1, text: "10", value: 10 },
    { key: 2, text: "20", value: 20 },
    { key: 3, text: "50", value: 50 },
    { key: 4, text: "100", value: 100 },
    { key: 5, text: "500", value: 500 },
    { key: 6, text: "All ", value: userData?.length },
  ];

  const HandlePage = (activePage) => {
    switch (activePage.target.innerText) {
      case "⟨":
        if (page >= 1) {
          setPage(page - 1);
        }

        break;
      case "«":
        if (page > limit) {
          setPage(page - limit);
        }

        break;
      case "⟩":
        if (page < totalPage) {
          setPage(page + 1);
        }
        break;
      case "»":
        if (page + limit < totalPage) {
          setPage(page + limit);
        }

        break;
      default:
        setPage(activePage.target.innerText);
    }
  };

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const silceArry = userData?.slice(startIndex, endIndex);
  return (
    <>
      <div>
        <div tyle={{ float: "left" }}>
          <h1>User</h1>
        </div>
        <div style={{ float: "right" }}>
          <Button icon inverted color="blue">
            <Icon name="add" />
            Add User
          </Button>
          <Button icon onClick={addUserData}>
            <Icon name="random" />
            Add Random User
          </Button>
          <Button icon>
            <Icon name="filter" />
            Reset Filter
          </Button>
          <Modal
            closeIcon
            open={open}
            trigger={
              <Button color="red" icon onClick={DeleteAllUser}>
                <Icon name="user delete" />
                Delete All User
              </Button>
            }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}>
            <Header1
              icon="user delete"
              content="Are you sure you want to delete?"
            />
            <Modal.Content>
              <p>
                This will delete the selected data and you won't be able to
                revert this change back.
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button
                color="red"
                onClick={() => {
                  setOpen(false);
                }}>
                <Icon name="remove" /> Cancle
              </Button>
              <Button
                color="green"
                onClick={() => {
                  setOpen(false);
                  localStorage.removeItem("Users");
                }}>
                <Icon name="checkmark" /> Confirm
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      </div>
      <div className="ui container">
        <Dropdown
          options={options}
          selection
          placeholder="10"
          onChange={(e, data) => {
            setLimit(data.value);
          }}
        />
        <Table unstackable={false} singleLine selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>E-mail address</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Input
                  placeholder="Search..."
                  style={{ maxWidth: "100px" }}
                  onChange={(e, data) => {
                    console.log(data);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Input placeholder="Search..." style={{ maxWidth: "100px" }} />
              </Table.Cell>
              <Table.Cell>
                <Input placeholder="Search..." style={{ maxWidth: "100px" }} />
              </Table.Cell>
              <Table.Cell>
                <Input placeholder="Search..." style={{ maxWidth: "100px" }} />
              </Table.Cell>
              <Table.Cell>
                <Input placeholder="Search..." style={{ maxWidth: "100px" }} />
              </Table.Cell>
              <Table.Cell>
                <Input placeholder="Search..." style={{ maxWidth: "100px" }} />
              </Table.Cell>
            </Table.Row>
            {userData.length > 0 ? (
              <>
                {silceArry?.map((item, key) => (
                  <Table.Row key={key}>
                    <Table.Cell>{item.id}</Table.Cell>
                    <Table.Cell>{item.first_name}</Table.Cell>
                    <Table.Cell>{item.last_name}</Table.Cell>
                    <Table.Cell>{item.email}</Table.Cell>
                    <Table.Cell>{item?.date?.substring(0, 10)}</Table.Cell>
                    <Table.Cell>
                      {item.status ? "Active" : "Inactive"}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </>
            ) : (
              <Table.Footer>
                <Table.Row>
                  <Table.Cell colSpan={6} style={{ textAlign: "center" }}>
                    No Record Found
                  </Table.Cell>
                </Table.Row>
              </Table.Footer>
            )}
          </Table.Body>
        </Table>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "0px",
          }}>
          <div style={{ margin: "10px 30px 10px 10px" }}>
            <h4>
              {page * limit - limit + 1}-
              {page * limit + silceArry?.length - limit} out of{" "}
              {userData?.length}
            </h4>
          </div>
          <Pagination
            activePage={page}
            totalPages={totalPage}
            onPageChange={HandlePage}
          />
        </div>
      </div>
    </>
  );
};

export default List;
