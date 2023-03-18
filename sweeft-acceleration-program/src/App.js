import React from "react";
import { Routes, Route } from "react-router-dom";
import UserComponent from "./UsersComponent";
import UserInfo from "./components/UI/UserInfo";
function App() {
  return (
    <Routes>
      <Route path="/" element={<UserComponent />} />
      <Route path={`/user/:id`} element={<UserInfo />} />
    </Routes>
  );
}

export default App;
