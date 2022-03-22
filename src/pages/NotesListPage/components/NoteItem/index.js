import React, { useState } from "react";
import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import {
  Visibility as VisibilityIcon,
  DeleteForever as DeleteForeverIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import styles from "./styles.module.scss";

const NoteItem = ({ orderNumber, text, title, handleEdit, handleDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className={styles.wrapper}>
      <Tooltip title="Remove">
        <Button
          endIcon={<VisibilityIcon />}
          onClick={() => setIsHovered(!isHovered)}
        />
      </Tooltip>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50vw" },
        }}
        noValidate
        autoComplete="off"
      >
        {!isHovered ? (
          <TextField
            id="filled-multiline-static"
            label={`${orderNumber} ${title}`}
            multiline
            maxRows={4}
            defaultValue={`${text.substring(0, 80)}...`}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
          />
        ) : (
          <TextField
            id="outlined-multiline-flexible"
            label={`${orderNumber} ${title}`}
            multiline
            maxRows={10}
            value={text}
            InputProps={{
              readOnly: true,
            }}
          />
        )}
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
