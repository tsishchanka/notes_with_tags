import React from "react";
import NoteItem from "../NoteItem";
import { Box, Button, TextareaAutosize, TextField } from "@mui/material";
import EditableNote from "../EditableNote";

const NotesListLayout = ({
  visible,
  setVisible,
  createNoteForm,
  handleChange,
  handleNoteCreate,
  handleNoteRemove,
  handleEditModeOn,
  handleEditSave,
  notesList,
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
        {notesList.map((note, index) => {
          return note.isEditMode ? (
            <EditableNote
              key={note.id}
              id={note.id}
              initialTitle={note.title}
              initialText={note.text}
              handleSave={handleEditSave}
            />
          ) : (
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
          );
        })}
      </div>
    </div>
  );
};

export default NotesListLayout;
