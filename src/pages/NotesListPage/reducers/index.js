import { handleActions } from "redux-actions";
import * as actions from "../actions";
import { v4 as uuidV4 } from "uuid";
import { FILTER_BY_TAG } from "../actions";

const defaultState = {
  notesList: [],
  tagsList: [],
  filteredList: [],
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
        filteredList: [...state.filteredList],
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
        filteredList: [...state.filteredList],
      };
    },

    [actions.DELETE_NOTE]: (state, { payload: noteId }) => {
      const notesListCopy = [...state.notesList];
      const itemIndexToRemove = notesListCopy.findIndex(
        (note) => note.id === noteId
      );

      notesListCopy.splice(itemIndexToRemove, 1);

      /* const newTags = notesListCopy.split(" ").filter((v) => v.startsWith("#"));*/
      return {
        notesList: notesListCopy,
        tagsList: [...state.tagsList],
        filteredList: [...state.filteredList],
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
        filteredList: [...state.filteredList],
      };
    },

    [actions.CREATE_TAG]: (state, { payload }) => {
      const { text: tagText } = payload;
      const newTag = tagText;
      const tagWithoutHash = newTag.substring(1);
      const copyNotesList = [...state.notesList];
      const updatedNotesList = copyNotesList.map((note) => ({
        ...note,
        text: note.text.replaceAll(tagWithoutHash, tagText),
        tags: [...note.tags, tagText],
      }));

      return {
        notesList: updatedNotesList,
        tagsList: [...state.tagsList, newTag],
        filteredList: [...state.filteredList],
      };
    },
    [actions.FILTER_BY_TAG]: (state, { payload: tagText }) => {
      const copyNotesList = [...state.notesList];
      const updatedNotesList = copyNotesList.filter((note) => {
        return note.text.split(" ").includes(tagText);
      });

      return {
        notesList: [...state.notesList],
        tagsList: [...state.tagsList],
        filteredList: updatedNotesList,
      };
    },

    [actions.DELETE_TAG]: (state, { payload }) => {
      const { tagIndex, tagText } = payload;
      const tagsListCopy = [...state.tagsList];
      const notesListCopy = [...state.notesList];

      const itemIndexToRemove = tagsListCopy.findIndex(
        (tag, index) => index === tagIndex
      );
      tagsListCopy.splice(itemIndexToRemove, 1);

      return {
        notesList: notesListCopy,
        tagsList: tagsListCopy,
      };
    },
  },
  defaultState
);

export default notesListReducer;
