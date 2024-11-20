import React, { useEffect, useState } from "react";
import { RadioGroup, Radio } from "@douyinfe/semi-ui";
import Title from "@/component/Title/Title";
import useStore from "@/store/index";
import { RATIO_MAP } from "@/constant/index";

function RatioControl() {
  const { updateDownloadAreaStyle } = useStore();

  const handleRatioChange = (e) => {
    const newRatio = e.target.value;
    const [widthRatio, heightRatio] = newRatio.split(":").map(Number);
    const height = 80;
    const width = (height * widthRatio) / heightRatio;

    updateDownloadAreaStyle({
      width: `${width}vh`,
      height: `${height}vh`,
    });
  };
  return (
    <>
      <Title title="下载比例" />
      <RadioGroup defaultValue={RATIO_MAP[0]} onChange={handleRatioChange}>
        {RATIO_MAP.map((ratio) => (
          <Radio key={ratio} value={ratio}>
            {ratio}
          </Radio>
        ))}
      </RadioGroup>
    </>
  );
}

export default RatioControl;
