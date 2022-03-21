import React from "react";
import NoteItem from "../NoteItem";
import { Box, Button, Chip, Stack, TextField } from "@mui/material";
import styles from "./styles.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import EditableNote from "../EditableNote";

const NotesListLayout = ({
  visible,
  setVisible,
  createNoteForm,
  handleClick,
  handleDelete,
  handleChange,
  handleNoteCreate,
  handleNoteRemove,
  handleEditModeOn,
  handleEditSave,
  notesList,
  tagsList,
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

      <div>
        <h1>Notes</h1>
        <div className={styles.tagsBox}>
          {tagsList.map((tag, index) => {
            return (
              <div key={index}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DeleteIcon />}
                >
                  {tag}
                </Button>
              </div>
            );
          })}
        </div>
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
    </div>
  );
};

export default NotesListLayout;
