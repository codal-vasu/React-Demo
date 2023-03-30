import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import Userslist from "./components/Userslist";
import NewAccountForm from "./components/NewAccountForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Userslist />} />
          <Route path="/new-account" element={<NewAccountForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
