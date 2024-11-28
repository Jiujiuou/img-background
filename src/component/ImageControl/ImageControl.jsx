import React, { useEffect, useState } from "react";
import useStore from "@/store/index";
import Slider from "@/component/Slider/Slider";

import styles from "./index.module.less";

function ImageControl() {
  const [top, setTop] = useState(50);
  const [left, setLeft] = useState(50);
  const [size, setSize] = useState(50);

  const { updateImageStyle } = useStore();

  useEffect(() => {
    updateImageStyle({
      top: `${top}%`,
      left: `${left}%`,
      height: `${size}%`,
    });
  }, [size, left, top, updateImageStyle]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inline}>
        <div className={styles.desc}>垂直位置</div>
        <Slider min={25} max={75} step={1} value={top} onChange={setTop} />
      </div>
      <div className={styles.inline}>
        <div className={styles.desc}>水平位置</div>
        <Slider min={25} max={75} step={1} value={left} onChange={setLeft} />
      </div>
      <div className={styles.inline}>
        <div className={styles.desc}>图片大小</div>
        <Slider min={0} max={100} step={1} value={size} onChange={setSize} />
      </div>
    </div>
  );
}

export default ImageControl;
