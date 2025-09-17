import React, { useEffect, useState } from "react";
import useStore from "@/store/index";
import Slider from "@/component/Slider/Slider";
import InlineControl from "../InlineControl/InlineControl";
import ColorPicker from "@/component/ColorPicker/ColorPicker";
import styles from "./index.module.less";

function FilterControl() {
  const _BackgroundType = useStore((state) => state._BackgroundType);
  const _BackgroundColor = useStore((state) => state._BackgroundColor);
  const { updateBackgroundColor, updateFilterControlValues } = useStore();

  // 独立订阅每个滤镜控制值，优化性能
  const blur = useStore((state) => state._FilterControlValues.blur);
  const brightness = useStore((state) => state._FilterControlValues.brightness);
  const saturate = useStore((state) => state._FilterControlValues.saturate);

  // 更新滤镜控制值的函数
  const setBlur = (value) => updateFilterControlValues({ blur: value });
  const setBrightness = (value) =>
    updateFilterControlValues({ brightness: value });
  const setSaturate = (value) => updateFilterControlValues({ saturate: value });

  const [background, setBackground] = useState(_BackgroundColor);

  // 🚀 滤镜CSS样式现在由useFilterStyle hook自动计算，无需手动更新

  const handleBackgroundColorChange = (newColor) => {
    setBackground(newColor);
    updateBackgroundColor(newColor);
  };

  return (
    <div className={styles.wrapper}>
      {_BackgroundType === "图片背景" && (
        <div>
          <InlineControl label={"背景模糊"}>
            <Slider
              min={0}
              max={20}
              step={0.1}
              value={blur}
              onChange={setBlur}
            />
          </InlineControl>

          <InlineControl label={"背景亮度"}>
            <Slider
              min={50}
              max={150}
              step={1}
              value={brightness}
              onChange={setBrightness}
            />
          </InlineControl>

          <InlineControl label={"背景饱和度"}>
            <Slider
              min={0}
              max={200}
              step={1}
              value={saturate}
              onChange={setSaturate}
            />
          </InlineControl>
        </div>
      )}
      {_BackgroundType === "颜色背景" && (
        <div>
          <InlineControl label={"背景颜色"}>
            <ColorPicker
              value={background}
              onChange={handleBackgroundColorChange}
            />
          </InlineControl>
        </div>
      )}
    </div>
  );
}

export default FilterControl;
