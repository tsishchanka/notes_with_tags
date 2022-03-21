import { createStore } from "redux";
import rootReducer from "./rootReducer";
import {composeWithDevTools} from "redux-devtools-extension";


export function configureStore() {
  return createStore(rootReducer, composeWithDevTools());
}