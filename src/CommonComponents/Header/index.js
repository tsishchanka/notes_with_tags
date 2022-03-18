import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { Button } from "@mui/material";
import { ROUTES } from "../../routes/routeNames";

const Header = () => {
  return (
    <div className={styles.navButtons}>
      <Link to={ROUTES.HOME}>
        <Button variant="contained">Home</Button>
      </Link>
      <Link to={ROUTES.NOTES_LIST}>
        <Button variant="contained">Notes</Button>
      </Link>
    </div>
  );
};

export default Header;