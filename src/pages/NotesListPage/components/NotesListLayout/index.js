import React from "react";
import NoteItem from "../NoteItem";
import { Box, Button, TextField, Tooltip } from "@mui/material";
import styles from "./styles.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import EditableNote from "../EditableNote";
import { Cancel, CheckCircle as CheckCircleIcon } from "@mui/icons-material";

const NotesListLayout = ({
  visible,
  setVisible,
  createNoteForm,
  handleTagCreate,
  createTagVisible,
  setCreateTagVisible,
  handleClick,
  handleTagRemove,
  handleChange,
  handleNoteCreate,
  handleNoteRemove,
  handleEditModeOn,
  handleEditSave,
  notesList,
  tagsList,
  filteredList,
  filter,
  setFilter,
}) => {
  return (
    <div>
      {visible && (
        <div>
          <div>
            <Button
              variant={"contained"}
              type="submit"
              onClick={handleNoteCreate}
            >
              Save Note
            </Button>
            <Button variant={"contained"} onClick={() => setVisible(!visible)}>
              Cancel
            </Button>
          </div>

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "60vw" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-multiline-flexible"
              label="Title"
              multiline
              maxRows={1}
              name="noteTitle"
              value={createNoteForm.noteTitle}
              onChange={handleChange}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Note"
              multiline
              maxRows={10}
              name="noteText"
              onChange={handleChange}
              value={createNoteForm.noteText}
            />
          </Box>
          <p> To create a note, you need to fill in all the fields.</p>
        </div>
      )}

      {!visible && (
        <Button variant={"contained"} onClick={() => setVisible(!visible)}>
          Create Note
        </Button>
      )}

      <div className={styles.tagAndNoteWrapper}>
        {!createTagVisible && (
          <div>
            <Button
              size="medium"
              variant={"contained"}
              type="submit"
              onClick={() => setCreateTagVisible(!createTagVisible)}
            >
              New Tag
            </Button>
          </div>
        )}
        {createTagVisible && (
          <div className={styles.tagCreatorBox}>
            <TextField
              id="outlined-multiline-flexible"
              label="Tag"
              maxRows={1}
              name="tagText"
              value={createNoteForm.tagText}
              onChange={handleChange}
            />
            {createNoteForm.tagText.split(" ").length > 1 ? (
              <p style={{ color: "red" }}>"Please enter only ONE word "</p>
            ) : (
              <>
                {" "}
                <Tooltip title="Save">
                  <Button
                    endIcon={<CheckCircleIcon />}
                    onClick={handleTagCreate}
                  />
                </Tooltip>
                <Tooltip title="Cancel">
                  <Button
                    endIcon={<Cancel />}
                    onClick={() => setCreateTagVisible(!createTagVisible)}
                  />
                </Tooltip>
              </>
            )}
          </div>
        )}
        <div className={styles.tagsBox}>
          {tagsList.map((tag, index) => {
            return (
              <div key={index} className={styles.tagDiv}>
                {!filter ? (
                  <div className={styles.deleteTagBox}>
                    <DeleteIcon
                      onClick={() => {
                        handleTagRemove(index, { tag });
                      }}
                    />
                  </div>
                ) : null}
                <div
                  className={styles.deleteTagText}
                  onClick={() => handleClick(tag)}
                >
                  {tag}
                </div>
              </div>
            );
          })}
          {filter && (
            <Button
              onClick={() => setFilter(false)}
              variant="filled"
              size="small"
            >
              Reset Filter
            </Button>
          )}
        </div>
        <h1>Notes</h1>
        {!filter ? (
          <div>
            {notesList.map((note, index) => {
              return note.isEditMode ? (
                <EditableNote
                  key={note.id}
                  id={note.id}
                  initialTags={note.tags}
                  initialTitle={note.title}
                  initialText={note.text}
                  handleSave={handleEditSave}
                  tagsList={tagsList}
                />
              ) : (
                <>
                  <NoteItem
                    key={note.id}
                    title={note.title}
                    text={note.text}
                    orderNumber={index + 1}
                    handleEdit={() => handleEditModeOn(note.id)}
                    handleDelete={() => {
                      handleNoteRemove(note.id);
                    }}
                  />
                </>
              );
            })}
          </div>
        ) : (
          <div>
            {" "}
            {filteredList.map((note, index) => {
              return note.isEditMode ? (
                <EditableNote
                  key={note.id}
                  id={note.id}
                  initialTags={note.tags}
                  initialTitle={note.title}
                  initialText={note.text}
                  handleSave={handleEditSave}
                  tagsList={tagsList}
                />
              ) : (
                <>
                  <NoteItem
                    key={note.id}
                    filter={filter}
                    title={note.title}
                    text={note.text}
                    orderNumber={index + 1}
                    handleEdit={() => handleEditModeOn(note.id)}
                    handleDelete={() => {
                      handleNoteRemove(note.id);
                    }}
                  />
                </>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesListLayout;
