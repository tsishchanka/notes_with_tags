import React, { useCallback, useState } from "react";
import { useForm } from "../../../hooks";
import { useDispatch, useSelector } from "react-redux";

import NotesListLayout from "../components/NotesListLayout";
import {
  CREATE_NOTE,
  SET_EDIT_MODE,
  DELETE_NOTE,
  SAVE_EDITED_NOTE,
  CREATE_TAG,
  DELETE_TAG,
  FILTER_BY_TAG,
} from "../actions";

const NotesListContainer = () => {
  const [filter, setFilter] = useState(false);
  const [visible, setVisible] = useState(false);
  const [createTagVisible, setCreateTagVisible] = useState(false);
  const dispatch = useDispatch();
  const { notesList, tagsList, filteredList } = useSelector(
    (state) => state.notesPage
  );
  const [formData, handleNoteChange, handleFormReset] = useForm({
    noteText: "",
    noteTitle: "",
    tagText: "",
  });

  const handleNoteCreate = useCallback(
    (event) => {
      event.preventDefault();
      if (formData.noteText.length > 0) {
        dispatch(
          CREATE_NOTE({
            title: formData.noteTitle,
            text: formData.noteText,
          })
        );
        setVisible(false);
        handleFormReset();
      }
    },
    [dispatch, formData, handleFormReset]
  );
  const handleTagCreate = useCallback(
    (event) => {
      event.preventDefault();
      if (formData.tagText.length > 0) {
        dispatch(
          CREATE_TAG({
            text:
              formData.tagText.charAt(0) === "#"
                ? formData.tagText
                : `#${formData.tagText}`,
          })
        );

        setCreateTagVisible(false);
        handleFormReset();
      }
    },
    [dispatch, formData, handleFormReset]
  );

  const handleNoteRemove = useCallback(
    (noteId) => {
      dispatch(DELETE_NOTE(noteId));
    },
    [dispatch]
  );

  const handleTagRemove = useCallback(
    (tagId) => {
      dispatch(DELETE_TAG(tagId));
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

  const handleClick = useCallback(
    (tagText) => {
      setFilter(true);
      dispatch(FILTER_BY_TAG(tagText));
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
        createTagVisible={createTagVisible}
        setCreateTagVisible={setCreateTagVisible}
        handleTagCreate={handleTagCreate}
        handleTagRemove={handleTagRemove}
        handleNoteCreate={handleNoteCreate}
        handleNoteRemove={handleNoteRemove}
        handleEditModeOn={handleEditModeOn}
        handleEditSave={handleEditSave}
        handleChange={handleNoteChange}
        handleClick={handleClick}
        filteredList={filteredList}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
};

export default NotesListContainer;
