import React, { useEffect, useState } from "react";
import Header from "./component/Header/Header";
import Title from "./component/Title/Title";
import { RadioGroup, Radio } from "@douyinfe/semi-ui";

import styles from "./index.module.less";

function App() {
  const [ratio, setRatio] = useState("1:1");
  const handleRatioChange = (e) => {
    const ratio = e.target.value;
    setRatio(ratio);
  };

  const getRatioStyle = () => {
    const [widthRatio, heightRatio] = ratio.split(":").map(Number);
    const height = 80;
    const width = (height * widthRatio) / heightRatio;
    return {
      width: `${width}vh`,
      height: `${height}vh`,
    };
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <div className={styles.preview}>
          <div className={styles.download} style={getRatioStyle()}></div>
        </div>
        <div className={styles.control}>
          <Title title="切换下载比例" />
          <RadioGroup
            aria-label="单选组合示例"
            name="demo-radio-group"
            defaultValue={"1:1"}
            onChange={handleRatioChange}
            className={styles.radioGroup}
          >
            <Radio value={"1:1"}>1:1</Radio>
            <Radio value={"2:3"}>2:3</Radio>
            <Radio value={"3:2"}>3:2</Radio>
            <Radio value={"3:4"}>3:4</Radio>
            <Radio value={"4:3"}>4:3</Radio>
            <Radio value={"9:16"}>9:16</Radio>
            <Radio value={"16:9"}>16:9</Radio>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}

export default App;
