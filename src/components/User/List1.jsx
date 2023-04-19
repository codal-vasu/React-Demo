import React, { useState, useEffect } from "react";
import {
  Button,
  Icon,
  Table,
  Pagination,
  Dropdown,
  Input,
  Modal,
  Header as Header1,
  Breadcrumb,
} from "semantic-ui-react";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router-dom";
import "../common.css";
import { dateformate } from "../../common/commonfun";

const BoolArry = [true, false];

const List = () => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("Users")) || []
  );

  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [updateUserData, setUpdateUserData] = useState(false);
  const [columninput, setcolumninput] = useState({ status: "All" });
  const [globalsearch, setGlobalsearch] = useState();
  const [sortWith, setSortWith] = useState("id");
  const [sortType, setSortType] = useState({
    first_name: "DESC",
    last_name: "DESC",
    id: "DESC",
    email: "DESC",
    date: "DESC",
    status: "DESC",
  });

  const totalPage = Math.ceil(userData?.length / limit);
  var startIndex = (page - 1) * limit;
  var endIndex = startIndex + limit;

  function Updatecolumninput(data) {
    setcolumninput({
      ...columninput,
      [data.name]: data.value || "",
    });
    setPage(1);
  }

  const searchTerms = (key, inputstring = globalsearch) => {
    return key?.toLowerCase().startsWith(inputstring);
  };

  function filterdata() {
    const {
      date = "",
      email = "",
      first_name = "",
      last_name = "",
      id = "",
      status = "",
    } = columninput || {};

    const datalist = userData;
    return datalist
      .sort((a, b) =>
        sortType[sortWith] === "DESC"
          ? a[sortWith] > b[sortWith]
            ? 1
            : b[sortWith] > a[sortWith]
            ? -1
            : 0
          : a[sortWith] > b[sortWith]
          ? -1
          : b[sortWith] > a[sortWith]
          ? 1
          : 0
      )
      .filter((item) =>
        globalsearch
          ? searchTerms(item?.id.toString()) ||
            searchTerms(item?.first_name) ||
            searchTerms(item?.last_name) ||
            searchTerms(item?.email) ||
            searchTerms(item?.date.toString()) ||
            searchTerms(item?.status)
          : true
      )
      .filter((item) =>
        email ? searchTerms(item?.email, columninput?.email) : true
      )
      .filter((item) =>
        first_name
          ? searchTerms(item?.first_name, columninput?.first_name)
          : true
      )
      .filter((item) =>
        last_name ? searchTerms(item?.last_name, columninput?.last_name) : true
      )
      .filter((item) =>
        date
          ? searchTerms(item?.date.toString(), columninput?.date.toString())
          : true
      )
      .filter((item) =>
        id ? searchTerms(item?.id.toString(), columninput?.id.toString()) : true
      )
      .filter((item) => (status !== "All" ? item?.status === status : true));
  }

  const mapArray = filterdata(columninput)?.slice(startIndex, endIndex);

  var createRandomUser = () => {
    let users = [];

    for (let i = 1; i <= 200; i++) {
      users.push({
        id: i + (userData || []).length,
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        date: dateformate(`${faker.date.past().toISOString()}`),
        status: BoolArry[Math.floor(Math.random() * BoolArry.length)]
          ? "Active"
          : "Inactive",
      });
    }
    return users;
  };

  const addUserData = () => {
    const userDataArray = createRandomUser();
    const existing = localStorage.getItem("Users");
    const existingArray = existing ? JSON.parse(existing) : [];
    const updated = [...existingArray, ...userDataArray];
    localStorage.setItem("Users", JSON.stringify(updated));
    setUserData(updated);
  };
  useEffect(() => {
    const data = localStorage.getItem("Users");
    const NewData = data ? JSON.parse(data) : [];
    setUserData(NewData);
  }, [updateUserData]);

  const options = [
    { key: 1, text: "10", value: 10 },
    { key: 2, text: "20", value: 20 },
    { key: 3, text: "50", value: 50 },
    { key: 4, text: "100", value: 100 },
    { key: 5, text: "500", value: 500 },
    { key: 6, text: "All ", value: userData?.length },
  ];
  const statusOptions = [
    { key: 0, text: "All", value: "All" || "" },
    { key: 1, text: "Active", value: "Active" || "" },
    { key: 2, text: "Inactive", value: "Inactive" || "" },
  ];

  const HandleClikEvents = (key) => {
    if (sortType[key] === "DESC") {
      setSortType({ ...sortType, [key]: "ASC" });
      setSortWith(key);
    } else if (sortType[key] === "ASC") {
      setSortType({ ...sortType, [key]: "DESC" });
      setSortWith(key);
    }
  };

  const HandleActionVeiw = (id) => {
    navigate(`/users/${id}`);
  };

  return (
    <>
      <div>
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
                navigate("./");
              }}>
              Users
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right arrow" />
            <Breadcrumb.Section active>Users List</Breadcrumb.Section>
          </Breadcrumb>
        </div>
        <div>
          <h1>User</h1>
        </div>

        <div style={{ float: "right" }}>
          <Button icon onClick={addUserData}>
            <Icon name="random" />
            Add Random User
          </Button>
          <Button
            icon
            onClick={() => {
              setGlobalsearch("");
              setcolumninput({ status: "All" });
            }}>
            <Icon name="filter" />
            Reset Filter
          </Button>
          <Modal
            closeIcon
            open={open}
            trigger={
              <Button color="red" icon>
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
                  setUpdateUserData(!updateUserData);
                  setPage(1);
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

        <div>
          <div className="ui fluid icon input" style={{ margin: "10px 0px" }}>
            <input
              type="text"
              placeholder="Global Search..."
              name="global"
              value={globalsearch || ""}
              onChange={(e) => {
                setGlobalsearch(e.target.value);
              }}
            />
            <i className="search icon"></i>
          </div>
        </div>
        <Table unstackable={false} singleLine selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Id{" "}
                <Icon
                  link
                  name={sortType.id === "DESC" ? "caret down" : "caret up"}
                  onClick={() => {
                    HandleClikEvents("id");
                  }}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                First Name
                <Icon
                  link
                  name={
                    sortType.first_name === "DESC" ? "caret down" : "caret up"
                  }
                  onClick={() => {
                    HandleClikEvents("first_name");
                  }}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                Last Name
                <Icon
                  link
                  name={
                    sortType.last_name === "DESC" ? "caret down" : "caret up"
                  }
                  onClick={() => {
                    HandleClikEvents("last_name");
                  }}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                E-mail address
                <Icon
                  link
                  name={sortType.email === "DESC" ? "caret down" : "caret up"}
                  onClick={() => {
                    HandleClikEvents("email");
                  }}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                Date{" "}
                <Icon
                  link
                  name={sortType.date === "DESC" ? "caret down" : "caret up"}
                  onClick={() => {
                    HandleClikEvents("date");
                  }}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                Status
                <Icon
                  link
                  name={sortType.status === "DESC" ? "caret down" : "caret up"}
                  onClick={() => {
                    HandleClikEvents("status");
                  }}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Input
                  placeholder="Search..."
                  style={{ maxWidth: "60px" }}
                  name="id"
                  value={columninput?.id || ""}
                  onChange={(e, data) => {
                    Updatecolumninput(data);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  placeholder="Search..."
                  style={{ maxWidth: "100px" }}
                  name="first_name"
                  value={columninput?.first_name || ""}
                  onChange={(e, data) => {
                    Updatecolumninput(data);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  placeholder="Search id"
                  style={{ maxWidth: "100px" }}
                  name="last_name"
                  value={columninput.last_name || ""}
                  onChange={(e, data) => {
                    Updatecolumninput(data);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  placeholder="Search..."
                  style={{ maxWidth: "100px" }}
                  name="email"
                  value={columninput?.email || ""}
                  onChange={(e, data) => Updatecolumninput(data)}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  placeholder="Search..."
                  style={{ maxWidth: "100px" }}
                  name="date"
                  value={columninput.date || ""}
                  onChange={(e, data) => {
                    Updatecolumninput(data);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Dropdown
                  onChange={(e, data) => {
                    setcolumninput({ status: data.value });
                  }}
                  options={statusOptions}
                  placeholder="All"
                  selection
                  name="status"
                  value={columninput.status}
                  cell={""}
                />
              </Table.Cell>
              <Table.Cell>
                <Modal
                  closeIcon
                  open={open1}
                  trigger={
                    <Button icon inverted color="blue">
                      <Icon name="add" />
                      Add User
                    </Button>
                  }
                  onClose={() => setOpen1(false)}
                  onOpen={() => setOpen1(true)}>
                  <Header1 icon="user " content="Add User Information " />
                  <Modal.Content>
                    <form className="ui form segment">
                      <div className="two fields">
                        <div className="field">
                          <label>Name</label>
                          <input
                            placeholder="First Name"
                            name="name"
                            type="text"
                          />
                        </div>
                        <div className="field">
                          <label>Gender</label>
                          <div className="ui selection dropdown">
                            <input name="gender" type="hidden" />
                            <div className="default text">Gender</div>
                            <i className="dropdown icon" />
                            <div className="menu">
                              <div className="item" data-value="male">
                                Male
                              </div>
                              <div className="item" data-value="female">
                                Female
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="field">
                        <label>Username</label>
                        <input
                          placeholder="Username"
                          name="username"
                          type="text"
                        />
                      </div>
                      <div className="field">
                        <label>Password</label>
                        <input name="password" type="password" />
                      </div>
                      <div
                        className="ui primary submit button"
                        onClick={() => {
                          setOpen1(false);
                        }}>
                        Submit
                      </div>
                      <div className="ui reset button">Reset</div>
                      <div className="ui clear button">Clear</div>
                    </form>
                  </Modal.Content>
                </Modal>
              </Table.Cell>
            </Table.Row>
            {userData.length > 0 ? (
              <>
                {mapArray?.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.id}</Table.Cell>
                    <Table.Cell>{item.first_name}</Table.Cell>
                    <Table.Cell>{item.last_name}</Table.Cell>
                    <Table.Cell>{item.email}</Table.Cell>
                    <Table.Cell>{item.date}</Table.Cell>
                    <Table.Cell>{item.status}</Table.Cell>
                    <Table.Cell>
                      <div>
                        <Icon
                          link
                          aria-hidden="true"
                          className="eye bordered icon"
                          id="icon"
                          onClick={() => {
                            HandleActionVeiw(item.id);
                          }}
                        />
                        <Icon
                          aria-hidden="true"
                          className="teal edit bordered icon"
                          id="icon"
                          link
                        />
                        <Icon
                          aria-hidden="true"
                          className=" delete bordered icon"
                          id="icon"
                          link
                        />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </>
            ) : (
              <tr>
                <td></td>
                <td></td>

                <td colSpan={1}>No results found.</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
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
              {page * limit + mapArray?.length - limit} out of{" "}
              {userData?.length}
            </h4>
          </div>
          <Pagination
            activePage={page}
            totalPages={totalPage}
            onPageChange={(e, data) => {
              setPage(data.activePage);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default List;
