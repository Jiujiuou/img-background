import React, { useEffect, useState } from "react";
import useStore from "@/store/index";
import Slider from "@/component/Slider/Slider";
import InlineControl from "../InlineControl/InlineControl";
import { ColorPicker } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import styles from "./index.module.less";

function FilterControl() {
  const _BackgroundType = useStore((state) => state._BackgroundType);
  const _BackgroundColor = useStore((state) => state._BackgroundColor);
  const { updateBackgroundColor } = useStore();
  const { updateFilterStyle } = useStore();

  const [blur, setBlur] = useState(10);
  const [brightness, setBrightness] = useState(100);
  const [saturate, setSaturate] = useState(100);

  const [background, setBackground] = useState(_BackgroundColor);
  useEffect(() => {
    updateFilterStyle({
      filter: `blur(${blur}px) brightness(${brightness}%) saturate(${saturate}%)`,
    });
  }, [blur, brightness, saturate, updateFilterStyle]);

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
              showText
            />
          </InlineControl>
        </div>
      )}
    </div>
  );
}

export default FilterControl;
