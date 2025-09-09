import React, { useEffect, useState, useMemo, useCallback } from "react";
import useStore from "@/store/index";
import Slider from "@/component/Slider/Slider";
import Switch from "@/component/Switch/Switch";
import InlineControl from "../InlineControl/InlineControl";
import { BOUNDARY_CONFIG, clampPosition } from "@/constant/boundary";

import styles from "./index.module.less";

function ImageControl() {
  // 正确的Zustand选择器用法，确保状态变化时重新渲染
  const updateImageControlValues = useStore(
    (state) => state.updateImageControlValues
  );

  // 独立订阅每个控制值，优化性能
  const top = useStore((state) => state._ImageControlValues.top);
  const left = useStore((state) => state._ImageControlValues.left);
  const size = useStore((state) => state._ImageControlValues.size);
  const radius = useStore((state) => state._ImageControlValues.radius);
  const showShadow = useStore((state) => state._ImageControlValues.showShadow);

  // 更新控制值的函数
  const setTop = (value) => updateImageControlValues({ top: value });
  const setLeft = (value) => updateImageControlValues({ left: value });
  const setSize = (value) => updateImageControlValues({ size: value });
  const setRadius = (value) => updateImageControlValues({ radius: value });

  // 基于图片大小计算动态边界
  const bounds = useMemo(() => {
    return BOUNDARY_CONFIG.calculateBounds(size);
  }, [size]);

  const changeShadowVisibleStatus = (isOn) => {
    updateImageControlValues({ showShadow: isOn });
  };

  // 🚀 CSS样式现在由useImageStyle hook自动计算，无需手动更新

  return (
    <div className={styles.wrapper}>
      <InlineControl label={"垂直位置"}>
        <Slider min={0} max={100} step={0.5} value={top} onChange={setTop} />
      </InlineControl>

      <InlineControl label={"水平位置"}>
        <Slider min={0} max={100} step={0.5} value={left} onChange={setLeft} />
      </InlineControl>

      <InlineControl label={"图片大小"}>
        <Slider min={0} max={100} step={1} value={size} onChange={setSize} />
      </InlineControl>

      <InlineControl label={"圆角大小"}>
        <Slider min={0} max={30} step={1} value={radius} onChange={setRadius} />
      </InlineControl>

      <InlineControl label={"阴影控制"}>
        <Switch checked={showShadow} onChange={changeShadowVisibleStatus} />
      </InlineControl>
    </div>
  );
}

export default ImageControl;
