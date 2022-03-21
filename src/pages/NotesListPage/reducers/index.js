import { handleActions } from "redux-actions";
import * as actions from "../actions";
import { v4 as uuidV4 } from "uuid";

const defaultState = {
  notesList: [],
};

const notesListReducer = handleActions(
  {
    [actions.CREATE_NOTE]: (state, { payload }) => {
      const { text, title } = payload;
      const newNote = {
        id: uuidV4(),
        title: title,
        text: text,
        isEditMode: false,
      };
      return {
        notesList: [newNote, ...state.notesList],
      };
    },

    [actions.SET_EDIT_MODE]: (state, { payload: noteId }) => {
      const updatedState = state.notesList.map((note) => ({
        ...note,
        isEditMode: noteId === note.id,
      }));
      return {
        notesList: updatedState,
      };
    },
    [actions.DELETE_NOTE]: (state, { payload: noteId }) => {
      const notesListCopy = [...state.notesList];
      const itemIndexToRemove = notesListCopy.findIndex(
        (note) => note.id === noteId
      );
      notesListCopy.splice(itemIndexToRemove, 1);
      return {
        notesList: notesListCopy,
      };
    },

    [actions.SAVE_EDITED_NOTE]: (state, { payload }) => {
      const { id, newTitle, newText } = payload;

      const updatedState = state.notesList.map((note) => {
        const isNoteToUpdate = note.id === id;

        return {
          ...note,
          title: isNoteToUpdate ? newTitle : note.title,
          text: isNoteToUpdate ? newText : note.text,
          isEditMode: isNoteToUpdate ? false : note.isEditMode,
        };
      });
      return {
        notesList: updatedState,
      };
    },
  },
  defaultState
);

export default notesListReducer;
