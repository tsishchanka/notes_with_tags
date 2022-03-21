import { createAction } from "redux-actions";

export const CREATE_NOTE = createAction("CREATE_NOTE");
export const DELETE_NOTE = createAction("DELETE_NOTE");
export const SET_EDIT_MODE = createAction("SET_EDIT_MODE");
export const SAVE_EDITED_NOTE = createAction("SAVE_EDITED_NOTE");
export const DISCARD_CHANGES = createAction("DISCARD_CHANGES");
export const CREATE_TAG = createAction("CREATE_TAG");
export const DELETE_TAG = createAction("DELETE_TAG");
