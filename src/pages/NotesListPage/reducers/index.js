import { handleActions } from "redux-actions";
import * as actions from "../actions";
import { v4 as uuidV4 } from "uuid";

const defaultState = {
  notesList: [],
  tagsList: [],
};

const notesListReducer = handleActions(
  {
    [actions.CREATE_NOTE]: (state, { payload }) => {
      const { text, title } = payload;
      const newTags = text.split(" ").filter((v) => v.startsWith("#"));
      const uniqueNewTags = [...new Set(newTags)];
      const newNote = {
        id: uuidV4(),
        title: title,
        text: text,
        tags: [...uniqueNewTags],
        isEditMode: false,
      };
      return {
        notesList: [newNote, ...state.notesList],
        tagsList: [...new Set(newTags.concat(state.tagsList))],
      };
    },

    [actions.SET_EDIT_MODE]: (state, { payload: noteId }) => {
      const updatedState = state.notesList.map((note) => ({
        ...note,
        isEditMode: noteId === note.id,
      }));
      return {
        notesList: updatedState,
        tagsList: [...state.tagsList],
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
      const { id, newTitle, newText, newTags } = payload;

      const updatedState = state.notesList.map((note) => {
        const isNoteToUpdate = note.id === id;

        return {
          ...note,
          title: isNoteToUpdate ? newTitle : note.title,
          text: isNoteToUpdate ? newText : note.text,
          tags: [...newTags],
          isEditMode: isNoteToUpdate ? false : note.isEditMode,
        };
      });

      return {
        notesList: updatedState,
        tagsList: [...new Set(newTags.concat(state.tagsList))],
      };
    },
  },
  defaultState
);

export default notesListReducer;
