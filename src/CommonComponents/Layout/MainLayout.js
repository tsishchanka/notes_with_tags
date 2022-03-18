import React from "react";
import styles from "./styles.module.scss";
import Header from "../Header";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;