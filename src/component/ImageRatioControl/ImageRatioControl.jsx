import React, { useState, useEffect } from "react";
import clsx from "clsx";
import useStore from "@/store";
import { IMAGE_RATIO_MAP } from "@/constant";
import Title from "@/component/Title/Title";
import styles from "./index.module.less";

const ImageRatioControl = () => {
  const _ImageRatio = useStore((state) => state._ImageRatio);
  const updateImageRatio = useStore((state) => state.updateImageRatio);
  const updateImageControlValues = useStore(
    (state) => state.updateImageControlValues
  );
  const [activeIndex, setActiveIndex] = useState(0);

  // 根据当前_ImageRatio设置正确的activeIndex
  useEffect(() => {
    const currentRatioString = `${_ImageRatio.width}:${_ImageRatio.height}`;
    const index = IMAGE_RATIO_MAP.findIndex(
      (ratio) => ratio === currentRatioString
    );
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [_ImageRatio]);

  const handleRatioChange = (ratio, index) => {
    setActiveIndex(index);
    const [width, height] = ratio.split(":").map(Number);
    updateImageRatio({ width, height });

    // 🚀 图片比例变化时重置所有控制值到居中状态
    updateImageControlValues({
      top: 50, // 垂直居中
      left: 50, // 水平居中
      size: 50, // 图片大小居中
    });
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
