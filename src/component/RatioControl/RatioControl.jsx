import React, { useEffect, useState } from "react";
import Title from "@/component/Title/Title";
import useStore from "@/store/index";
import { RATIO_MAP } from "@/constant/index";
import clsx from "clsx";
import { DEFAULT_HEIGHT, DEFAULT_BOTTOM_LAYER_HEIGHT } from "@/constant/index";
import styles from "./index.module.less";

function RatioControl() {
  const { updateRatioStyle, updateBottomLayerRatioStyle } = useStore();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleRatioChange = (newRatio, index) => {
    setActiveIndex(index);
    const [widthRatio, heightRatio] = newRatio.split(":").map(Number);

    updateRatioStyle({
      width: `${(DEFAULT_HEIGHT * widthRatio) / heightRatio}vh`,
      height: `${DEFAULT_HEIGHT}vh`,
    });

    updateBottomLayerRatioStyle({
      width: `${(DEFAULT_BOTTOM_LAYER_HEIGHT * widthRatio) / heightRatio}px`,
      height: `${DEFAULT_BOTTOM_LAYER_HEIGHT}px`,
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
