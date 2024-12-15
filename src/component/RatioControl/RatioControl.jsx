import React, { useEffect, useState } from "react";
import Title from "@/component/Title/Title";
import useStore from "@/store/index";
import { RATIO_MAP } from "@/constant/index";
import clsx from "clsx";
import styles from "./index.module.less";

function RatioControl() {
  const { updateRatio } = useStore();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleRatioChange = (newRatio, index) => {
    setActiveIndex(index);
    
    if (newRatio === "2.35:1") {
      updateRatio({
        width: 2.35,
        height: 1,
        fixedHeight: "50vh"
      });
      return;
    }

    const [widthRatio, heightRatio] = newRatio.split(":").map(Number);
    updateRatio({
      width: widthRatio,
      height: heightRatio,
      fixedHeight: null
    });
  };

  return (
    <>
      <Title title="下载比例" />

      <div className={styles.groupWrapper}>
        {RATIO_MAP.map((ratio, index) => (
          <div
            className={clsx(
              styles.selectItem,
              index === activeIndex && styles.active
            )}
            onClick={() => handleRatioChange(ratio, index)}
            key={ratio}
          >
            {ratio}
          </div>
        ))}
      </div>
    </>
  );
}

export default RatioControl;
