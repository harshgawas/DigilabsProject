import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "./Pages/AdminPage";
import Homepage from "./Pages/Homepage";

const RoutesFile = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : undefined
  );

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              user === undefined ? (
                <Homepage />
              ) : (
                <Navigate to="/panel/notices" />
              )
            }
          ></Route>
          <Route
            path="/panel/:paneltype"
            exact
            element={user !== undefined ? <AdminPage /> : <Navigate to="/" />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RoutesFile;
