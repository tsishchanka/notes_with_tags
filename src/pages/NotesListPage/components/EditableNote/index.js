import React, { useCallback, useState } from "react";
import { Box, Button, TextField, Tooltip } from "@mui/material";
import styles from "./styles.module.scss";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as Cancel,
} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

const EditableNote = ({
  id,
  initialTitle,
  initialText,
  initialTags,
  handleSave,
  tagsList,
}) => {
  const [editableText, setEditableText] = useState(initialText);
  const [editableTitle, setEditableTitle] = useState(initialTitle);
  const [editableTag, setEditableTag] = useState(initialTags);
  const handleEditTitle = useCallback((event) => {
    const { value } = event.target;
    setEditableTitle(value);
  }, []);
  const handleEditText = useCallback((event) => {
    const { value } = event.target;
    setEditableText(value);
    setEditableTag(
      value
        .split(" ")
        .filter((v) => v.startsWith("#"))
        .reduce((un, i) => {
          return un.includes(i) ? un : [...un, i];
        }, [])
    );
  }, []);

  const handleUndo = useCallback(() => {
    setEditableText(initialText);
    setEditableTitle(initialTitle);
  }, [initialText, initialTitle]);
  return (
    <>
      <div className={styles.wrapperEditable}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "50vw" },
          }}
          noValidate
          autoComplete="off"
          style={{ maxWidth: "64%" }}
        >
          <TextField
            id="outlined-multiline-flexible"
            label="Title"
            multiline
            maxRows={1}
            name="noteTitle"
            value={editableTitle}
            onChange={handleEditTitle}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Note"
            multiline
            maxRows={10}
            name="noteText"
            value={editableText}
            onChange={handleEditText}
          />
        </Box>
        <div className={styles.buttons}>
          <Tooltip title="Save">
            <Button
              endIcon={<CheckCircleIcon />}
              onClick={() =>
                handleSave({
                  id,
                  newTitle: editableTitle,
                  newText: editableText,
                  newTags: editableTag,
                })
              }
            />
          </Tooltip>
          <Tooltip title="Cancel">
            <Button endIcon={<Cancel />} onClick={() => handleUndo()} />
          </Tooltip>
        </div>
      </div>
      <div className={styles.tagsBox}>
        {editableTag.map((tag, index) => {
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
    </>
  );
};

export default EditableNote;
