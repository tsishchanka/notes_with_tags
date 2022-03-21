import React, { useCallback, useState } from "react";
import { useForm } from "../../../hooks";
import { useDispatch, useSelector } from "react-redux";

import NotesListLayout from "../components/NotesListLayout";
import {
  CREATE_NOTE,
  SET_EDIT_MODE,
  DELETE_NOTE,
  SAVE_EDITED_NOTE,
} from "../actions";

const NotesListContainer = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { notesList, tagsList } = useSelector((state) => state.notesPage);
  const [formData, handleNoteChange, handleReset] = useForm({
    noteText: "",
    noteTitle: "",
  });
  const handleNoteCreate = useCallback(
    (event) => {
      event.preventDefault();
      if (formData.noteText.length > 0) {
        dispatch(
          CREATE_NOTE({ title: formData.noteTitle, text: formData.noteText })
        );
        handleReset();
        setVisible(false);
      }
    },
    [dispatch, formData]
  );

  const handleNoteRemove = useCallback(
    (noteId) => {
      dispatch(DELETE_NOTE(noteId));
    },
    [dispatch]
  );

  const handleEditModeOn = useCallback(
    (noteId) => {
      setVisible(false);
      dispatch(SET_EDIT_MODE(noteId));
    },
    [dispatch]
  );

  const handleEditSave = useCallback(
    (updatedNote) => {
      dispatch(SAVE_EDITED_NOTE(updatedNote));
    },
    [dispatch]
  );

  return (
    <div>
      <NotesListLayout
        setVisible={setVisible}
        visible={visible}
        notesList={notesList}
        tagsList={tagsList}
        createNoteForm={formData}
        handleNoteCreate={handleNoteCreate}
        handleNoteRemove={handleNoteRemove}
        handleEditModeOn={handleEditModeOn}
        handleEditSave={handleEditSave}
        handleChange={handleNoteChange}
      />
    </div>
  );
};

export default NotesListContainer;
