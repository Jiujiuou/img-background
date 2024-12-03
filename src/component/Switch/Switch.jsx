import React, { useState } from "react";
import clsx from "clsx";

import styles from "./index.module.less";

const Switch = ({ defaultChecked = false, onChange }) => {
  const [isOn, setIsOn] = useState(defaultChecked); // 根据 defaultChecked 初始化状态

  const toggleSwitch = () => {
    setIsOn(!isOn);
    if (onChange) {
      onChange(!isOn); // 调用父组件的回调函数
    }
  };

  return (
    <div
      className={clsx(styles.switch, isOn ? styles.switchOn : styles.switchOff)}
      onClick={toggleSwitch}
    >
      <div className={styles.switchHandle}></div>
    </div>
  );
};

export default Switch;
