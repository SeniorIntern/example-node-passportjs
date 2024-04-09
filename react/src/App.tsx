import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";
import Login from "./Login";
import Logout from "./Logout";
import NoMatch from "./NoMatch";
import Profile from "./Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="logout" element={<Logout />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
