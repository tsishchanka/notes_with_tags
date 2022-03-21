import React from "react";
import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import {
  DeleteForever as DeleteForeverIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import styles from "./styles.module.scss";

const NoteItem = ({ orderNumber, text, title, handleEdit, handleDelete }) => {
  return (
    <div className={styles.wrapper}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50vw" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="filled-multiline-static"
          label={`${orderNumber} ${title}`}
          multiline
          rows={2}
          defaultValue={text.substring(0, 120)}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
      </Box>
      <div className={styles.buttons}>
        <Tooltip title="Edit">
          <Button endIcon={<EditIcon />} onClick={handleEdit} />
        </Tooltip>
        <Tooltip title="Remove">
          <Button endIcon={<DeleteForeverIcon />} onClick={handleDelete} />
        </Tooltip>
      </div>
    </div>
  );
};

export default NoteItem;
