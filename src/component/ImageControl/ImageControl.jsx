import React, { useEffect, useState } from "react";
import useStore from "@/store/index";
import Slider from "@/component/Slider/Slider";
import Switch from "@/component/Switch/Switch";

import styles from "./index.module.less";

function ImageControl() {
  const [top, setTop] = useState(50);
  const [left, setLeft] = useState(50);
  const [size, setSize] = useState(50);

  const { updateImageStyle } = useStore();
  const [showShadow, setShowShadow] = useState(true);

  const changeShadowVisibleStatus = (isOn) => {
    setShowShadow(isOn);
  };

  useEffect(() => {
    const imageStyle = {
      top: `${top}%`,
      left: `${left}%`,
      width: `${size}%`,
    };

    showShadow &&
      (imageStyle.boxShadow = "5px 6px 16px 0px rgba(0, 0, 0, 0.85)");

    updateImageStyle(imageStyle);
  }, [size, left, top, showShadow, updateImageStyle]);

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
      <div className={styles.inline}>
        <div className={styles.desc}>阴影控制</div>
        <Switch defaultChecked={true} onChange={changeShadowVisibleStatus} />
      </div>
    </div>
  );
}

export default ImageControl;
