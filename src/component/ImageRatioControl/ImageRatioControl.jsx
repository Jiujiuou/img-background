import React, { useState } from "react";
import clsx from "clsx";
import useStore from "@/store";
import { IMAGE_RATIO_MAP } from "@/constant";
import Title from "@/component/Title/Title";
import styles from "./index.module.less";

const ImageRatioControl = () => {
  const _ImageRatio = useStore((state) => state._ImageRatio);
  const updateImageRatio = useStore((state) => state.updateImageRatio);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleRatioChange = (ratio, index) => {
    setActiveIndex(index);
    const [width, height] = ratio.split(":").map(Number);
    updateImageRatio({ width, height });
  };

  return (
    <>
      <Title title="图片比例" />
      <div className={styles.groupWrapper}>
        {IMAGE_RATIO_MAP.map((ratio, index) => (
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
};

export default ImageRatioControl;
