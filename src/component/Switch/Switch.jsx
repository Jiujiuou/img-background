import React from "react";
import clsx from "clsx";

import styles from "./index.module.less";

const Switch = ({ checked = false, onChange }) => {
  const toggleSwitch = () => {
    if (onChange) {
      onChange(!checked); // 调用父组件的回调函数，传递新的状态值
    }
  };

  return (
    <div
      className={clsx(
        styles.switch,
        checked ? styles.switchOn : styles.switchOff
      )}
      onClick={toggleSwitch}
    >
      <div className={styles.switchHandle}></div>
    </div>
  );
};

export default Switch;
