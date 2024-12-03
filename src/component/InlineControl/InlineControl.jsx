import React from "react";
import styles from "./index.module.less";

const InlineControl = ({ label, children }) => {
  return (
    <div className={styles.inline}>
      <div className={styles.desc}>{label}</div>
      <div className={styles.flex1}>{children}</div>
    </div>
  );
};

export default InlineControl;
