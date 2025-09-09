import React, { useEffect, useState, useMemo, useCallback } from "react";
import useStore from "@/store/index";
import Slider from "@/component/Slider/Slider";
import Switch from "@/component/Switch/Switch";
import InlineControl from "../InlineControl/InlineControl";
import { BOUNDARY_CONFIG, clampPosition } from "@/constant/boundary";

import styles from "./index.module.less";

function ImageControl() {
  const [top, setTop] = useState(50);
  const [left, setLeft] = useState(50);
  const [size, setSize] = useState(50);
  const [radius, setRadius] = useState(8);

  const { updateImageStyle } = useStore();
  const [showShadow, setShowShadow] = useState(true);

  // 基于图片大小计算动态边界
  const bounds = useMemo(() => {
    return BOUNDARY_CONFIG.calculateBounds(size);
  }, [size]);

  const changeShadowVisibleStatus = (isOn) => {
    setShowShadow(isOn);
  };

  // 将用户友好的位置值(0-100)转换为实际的CSS位置值
  const convertToActualPosition = useCallback((userValue, imageSize) => {
    const bounds = BOUNDARY_CONFIG.calculateBounds(imageSize);
    // userValue: 0-100 映射到 bounds.min - bounds.max
    const actualPosition =
      bounds.min + (userValue / 100) * (bounds.max - bounds.min);
    return Math.max(bounds.min, Math.min(bounds.max, actualPosition));
  }, []);

  // 将实际的CSS位置值转换为用户友好的位置值(0-100)
  const convertToUserValue = (actualPosition, imageSize) => {
    const bounds = BOUNDARY_CONFIG.calculateBounds(imageSize);
    if (bounds.max === bounds.min) return 50; // 避免除零
    const userValue =
      ((actualPosition - bounds.min) / (bounds.max - bounds.min)) * 100;
    return Math.max(0, Math.min(100, userValue));
  };

  // 响应位置和样式变化，实时更新图片样式（包含初始化）
  useEffect(() => {
    // 将用户友好的位置值转换为实际的CSS位置值
    const actualTop = convertToActualPosition(top, size);
    const actualLeft = convertToActualPosition(left, size);

    const imageStyle = {
      top: `${actualTop}%`,
      left: `${actualLeft}%`,
      width: `${size}%`,
      borderRadius: `${radius}px`,
    };

    showShadow &&
      (imageStyle.boxShadow = "5px 6px 16px 0px rgba(0, 0, 0, 0.85)");

    updateImageStyle(imageStyle);
  }, [
    size,
    left,
    top,
    radius,
    showShadow,
    updateImageStyle,
    convertToActualPosition,
  ]);

  return (
    <div className={styles.wrapper}>
      <InlineControl label={"垂直位置"}>
        <Slider min={0} max={100} step={1} value={top} onChange={setTop} />
      </InlineControl>

      <InlineControl label={"水平位置"}>
        <Slider min={0} max={100} step={1} value={left} onChange={setLeft} />
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
