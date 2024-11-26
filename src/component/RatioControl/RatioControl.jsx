import React, { useEffect, useState } from "react";
import { RadioGroup, Radio } from "@douyinfe/semi-ui";
import Title from "@/component/Title/Title";
import useStore from "@/store/index";
import { RATIO_MAP } from "@/constant/index";
import styles from "./index.module.less";
import clsx from "clsx";

function RatioControl() {
  const { updateRatioStyle } = useStore();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleRatioChange = (newRatio, index) => {
    setActiveIndex(index);
    const [widthRatio, heightRatio] = newRatio.split(":").map(Number);
    const height = 76;
    const width = (height * widthRatio) / heightRatio;

    updateRatioStyle({
      width: `${width}vh`,
      height: `${height}vh`,
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
