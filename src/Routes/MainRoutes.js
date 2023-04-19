import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import Dashboard from "../components/Dashboard";
import Userslist from "../components/User/Userslist";
import List from "../components/User/List1";
import UserVeiw from "../components/User/UserVeiw";
import NewAccountForm from "../components/NewAccountForm";

const MainRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Userslist />}>
            <Route path="/users" element={<List />} />
            <Route path="/users/:id" element={<UserVeiw />} />
          </Route>
          <Route path="/new-account" element={<NewAccountForm />} />
        </Routes>
      </Router>
    </>
  );
};

export default MainRoutes;
