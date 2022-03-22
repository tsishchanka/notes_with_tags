import React from "react";
import { Routes, Route } from "react-router-dom";

import { ROUTES } from "./routeNames";
import HomePage from "../pages/HomePage";
import NotesListContainer from "../pages/NotesListPage/containers/NotesListContainer";

const RoutesComponent = () => {
  return (
    <div>
      <Routes>
        <Route exact path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.NOTES_LIST} element={<NotesListContainer />} />
      </Routes>
    </div>
  );
};

export default RoutesComponent;
