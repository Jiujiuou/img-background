import React, { useEffect, useState } from "react";
import Title from "@/component/Title/Title";
import useStore from "@/store/index";
import { BACKGROUND_TYPE_MAP } from "@/constant/index";
import clsx from "clsx";
import styles from "./index.module.less";

function BackgroundTypeControl() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { updateBackgroundType } = useStore();

  const handleBackgroundTypeChange = (type, index) => {
    setActiveIndex(index);
    updateBackgroundType(type);
  };

  return (
    <>
      <Title title="背景类型" />

      <div className={styles.groupWrapper}>
        {BACKGROUND_TYPE_MAP.map((type, index) => (
          <div
            className={clsx(
              styles.selectItem,
              index === activeIndex && styles.active
            )}
            key={type}
            onClick={() => handleBackgroundTypeChange(type, index)}
          >
            {type}
          </div>
        ))}
      </div>
    </>
  );
}

export default BackgroundTypeControl;
