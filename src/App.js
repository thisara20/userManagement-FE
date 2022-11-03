import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddUser from "./Components/AddUser";
import Login from "./Components/Login";
import AllUsers from "./Components/Home";
import ProtectedRoutes from "./Components/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/add" element={<AddUser />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/*" element={<ProtectedRoutes />}>
          <Route path="home" element={<AllUsers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
