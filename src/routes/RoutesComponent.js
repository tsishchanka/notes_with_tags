import React from "react";
import { Routes, Route, Redirect } from "react-router-dom";

import { ROUTES } from "./routeNames";
import HomePage from "../pages/HomePage";
import NotesListContainer from "../pages/NotesListPage/containers/NotesListContainer";
import SingleNotePageContainer from "../pages/SingleNotePage/containers/SingleNotePageContainer";

const RoutesComponent = () => {
  return (
    <div>
      <Routes>
        <Route exact path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.NOTES_LIST} element={<NotesListContainer />} />
        {/*   <Route path={ROUTES.NOTE_CREATE} element={<CreateNoteLayout />} />*/}
        <Route path={ROUTES.NOTE} element={<SingleNotePageContainer />} />
        {/* <Redirect path="*" to={ROUTES.NOTES_LIST} />**/}
      </Routes>
    </div>
  );
};

export default RoutesComponent;
