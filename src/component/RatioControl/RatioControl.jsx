import React, { useEffect, useState } from "react";
import Title from "@/component/Title/Title";
import useStore from "@/store/index";
import { RATIO_MAP } from "@/constant/index";
import clsx from "clsx";
import styles from "./index.module.less";

function RatioControl() {
  const { updateRatio, updateImageControlValues } = useStore();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleRatioChange = (newRatio, index) => {
    setActiveIndex(index);

    if (newRatio === "2.35:1") {
      updateRatio({
        width: 2.35,
        height: 1,
        fixedHeight: "50vh",
      });
    } else {
      const [widthRatio, heightRatio] = newRatio.split(":").map(Number);
      updateRatio({
        width: widthRatio,
        height: heightRatio,
        fixedHeight: null,
      });
    }

    // 🚀 下载比例变化时重置所有控制值到居中状态
    updateImageControlValues({
      top: 50, // 垂直居中
      left: 50, // 水平居中
      size: 50, // 图片大小居中
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
