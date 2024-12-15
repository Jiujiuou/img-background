import React, { useEffect, useState } from "react";
import useStore from "@/store/index";
import Slider from "@/component/Slider/Slider";
import Switch from "@/component/Switch/Switch";
import InlineControl from "../InlineControl/InlineControl";

import styles from "./index.module.less";

function ImageControl() {
  const [top, setTop] = useState(50);
  const [left, setLeft] = useState(50);
  const [size, setSize] = useState(50);
  const [radius, setRadius] = useState(8);

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
      borderRadius: `${radius}px`,
    };

    showShadow &&
      (imageStyle.boxShadow = "5px 6px 16px 0px rgba(0, 0, 0, 0.85)");

    updateImageStyle(imageStyle);
  }, [size, left, top, radius, showShadow, updateImageStyle]);

  return (
    <div className={styles.wrapper}>
      <InlineControl label={"垂直位置"}>
        <Slider min={25} max={75} step={1} value={top} onChange={setTop} />
      </InlineControl>

      <InlineControl label={"水平位置"}>
        <Slider min={25} max={75} step={1} value={left} onChange={setLeft} />
      </InlineControl>

      <InlineControl label={"图片大小"}>
        <Slider min={0} max={100} step={1} value={size} onChange={setSize} />
      </InlineControl>

      <InlineControl label={"圆角大小"}>
        <Slider min={0} max={30} step={1} value={radius} onChange={setRadius} />
      </InlineControl>

      <InlineControl label={"阴影控制"}>
        <Switch defaultChecked={true} onChange={changeShadowVisibleStatus} />
      </InlineControl>
    </div>
  );
}

export default ImageControl;
