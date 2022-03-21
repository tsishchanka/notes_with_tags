import { combineReducers } from "redux";
import notesListReducer from "../pages/NotesListPage/reducers";

const rootReducer = combineReducers({
  notesPage: notesListReducer,
});

export default rootReducer;