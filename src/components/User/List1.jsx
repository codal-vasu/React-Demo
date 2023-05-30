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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router-dom";
import "../common.css";
import {
  dateformate,
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from "../../common/commonfun";

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
  const [open2, setOpen2] = useState(false);
  const [userInputFeilds, setUserInputFeilds] = useState({
    first_name: "",
    last_name: "",
    id: userData.length + 1,
    email: "",
    date: dateformate(new Date()),
    status: "active",
  });
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
  console.log(userInputFeilds);
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

  const UserDataHandle = (e) => {
    setUserInputFeilds({ ...userInputFeilds, [e.target.name]: e.target.value });
  };

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
    const existingArray = getDataFromLocalStorage("Users");
    const updated = [...existingArray, ...userDataArray];
    setDataToLocalStorage(updated, "Users");
    setUserData(updated);
    setUserInputFeilds({ ...userInputFeilds, id: updated.length + 1 });
  };
  useEffect(() => {
    const NewData = getDataFromLocalStorage("Users");
    setUserData(NewData);
  }, [updateUserData]);

  const AddNewUserData = () => {
    const updatedArray = [...userData, userInputFeilds];
    setDataToLocalStorage(updatedArray, "Users");
    setUserData(updatedArray);
    setOpen1(false);
    setUserInputFeilds({ ...userInputFeilds, id: updatedArray.length + 1 });
  };

  const RemoveUser = (id) => {
    const updatedData = userData.filter((item) => item.id !== id);
    setUserData(updatedData);
    setDataToLocalStorage(updatedData, "Users");
  };

  const EditUserData = () => {
    const objIndex = userData.findIndex((obj) => obj.id === userInputFeilds.id);
    userData[objIndex].first_name = userInputFeilds.first_name;
    userData[objIndex].last_name = userInputFeilds.last_name;
    userData[objIndex].email = userInputFeilds.email;
    userData[objIndex].date = userInputFeilds.date;

    setDataToLocalStorage(userData, "Users");
  };

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
                  setUserData([]);
                  localStorage.removeItem("Users");
                  setUpdateUserData(!updateUserData);
                  setPage(1);
                  setUserInputFeilds({
                    ...userInputFeilds,
                    id: 1,
                  });
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
                  placeholder="Search..."
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
                      <div className="two field">
                        <div className="field">
                          <label>Id</label>
                          <input
                            type="text"
                            name="id"
                            placeholder={`Enter id greater then ${userData.length}`}
                            value={userInputFeilds.id}
                            onChange={(e) => UserDataHandle(e)}
                          />
                        </div>
                      </div>
                      <div className="two fields">
                        <div className="field">
                          <label>First Name</label>
                          <input
                            placeholder="Please enter first name"
                            name="first_name"
                            type="text"
                            onChange={(e) => UserDataHandle(e)}
                            value={userInputFeilds.first_name}
                          />
                        </div>
                        <div className="field">
                          <label>Last Name</label>
                          <input
                            placeholder="Please enter last name"
                            name="last_name"
                            type="text"
                            onChange={(e) => UserDataHandle(e)}
                            value={userInputFeilds.last_name}
                          />
                        </div>
                      </div>
                      <div className="two fields">
                        <div className="field">
                          <label>Email Address</label>
                          <input
                            placeholder="Please enter email address"
                            name="email"
                            type="text"
                            onChange={(e) => UserDataHandle(e)}
                            value={userInputFeilds.email}
                          />
                        </div>
                        <div className="field">
                          <label>Date</label>
                          <DatePicker
                            placeholder="Please enter date"
                            selected={new Date(userInputFeilds.date)}
                            onChange={(date) => {
                              setUserInputFeilds({
                                ...userInputFeilds,
                                date: dateformate(date),
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className="ui primary submit button"
                        onClick={() => {
                          AddNewUserData();
                        }}>
                        Submit
                      </div>
                      <div
                        className="ui clear button"
                        onClick={() =>
                          setUserInputFeilds({
                            first_name: "",
                            last_name: "",
                            id: "",
                            email: "",
                            date: dateformate(new Date()),
                          })
                        }>
                        Clear
                      </div>
                    </form>
                  </Modal.Content>
                </Modal>
              </Table.Cell>
            </Table.Row>
            <Modal
              closeIcon
              open={open2}
              onClose={() => setOpen2(false)}
              onOpen={() => setOpen2(true)}>
              <Header1 icon="user " content="Edit User Information " />
              <Modal.Content>
                <form className="ui form segment">
                  <div className="two field">
                    <div className="field">
                      <label>Id</label>
                      <input
                        type="text"
                        name="id"
                        defaultValue={userInputFeilds.id}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="two fields">
                    <div className="field">
                      <label>First Name</label>
                      <input
                        placeholder="Please enter first name"
                        name="first_name"
                        type="text"
                        onChange={(e) => UserDataHandle(e)}
                        value={userInputFeilds.first_name}
                      />
                    </div>
                    <div className="field">
                      <label>Last Name</label>
                      <input
                        placeholder="Please enter last name"
                        name="last_name"
                        type="text"
                        onChange={(e) => UserDataHandle(e)}
                        value={userInputFeilds.last_name}
                      />
                    </div>
                  </div>
                  <div className="two fields">
                    <div className="field">
                      <label>Email Address</label>
                      <input
                        placeholder="Please enter email address"
                        name="email"
                        type="text"
                        onChange={(e) => UserDataHandle(e)}
                        value={userInputFeilds.email}
                      />
                    </div>
                    <div className="field">
                      <label>Date</label>
                      <DatePicker
                        placeholder="Please enter date"
                        selected={new Date(userInputFeilds.date)}
                        onChange={(date) => {
                          setUserInputFeilds({
                            ...userInputFeilds,
                            date: dateformate(date),
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className="ui primary submit button"
                    onClick={() => {
                      EditUserData();
                      setOpen2(false);
                    }}>
                    Save
                  </div>
                </form>
              </Modal.Content>
            </Modal>
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
                          onClick={() => {
                            setOpen2(true);
                            setUserInputFeilds({
                              first_name: item.first_name,
                              last_name: item.last_name,
                              id: item.id,
                              email: item.email,
                              date: dateformate(item.date),
                            });
                          }}
                        />
                        <Icon
                          aria-hidden="true"
                          className=" delete bordered icon"
                          id="icon"
                          link
                          onClick={() => RemoveUser(item.id)}
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
