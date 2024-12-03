import React, { useEffect, useState } from "react";
import useStore from "@/store/index";
import Slider from "@/component/Slider/Slider";
import InlineControl from "../InlineControl/InlineControl";

import styles from "./index.module.less";

function FilterControl() {
  const [blur, setBlur] = useState(10);
  const [brightness, setBrightness] = useState(100);
  const [saturate, setSaturate] = useState(100);

  const { updateFilterStyle } = useStore();

  useEffect(() => {
    updateFilterStyle({
      filter: `blur(${blur}px) brightness(${brightness}%) saturate(${saturate}%)`,
    });
  }, [blur, brightness, saturate, updateFilterStyle]);

  return (
    <div className={styles.wrapper}>
      <InlineControl label={"背景模糊"}>
        <Slider min={0} max={20} step={0.1} value={blur} onChange={setBlur} />
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
  );
}

export default FilterControl;
