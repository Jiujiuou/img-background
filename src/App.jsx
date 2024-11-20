import React, { useEffect, useState } from "react";
import Header from "@/component/Header/Header";
import useStore from "@/store";
import RatioControl from "@/component/RatioControl/RatioControl";
import styles from "./index.module.less";
import ImageUpload from "./component/ImageUpload/ImageUpload";

function App() {
  const downloadAreaStyle = useStore((state) => state.downloadAreaStyle);

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <div className={styles.preview}>
          <div className={styles.download} style={downloadAreaStyle}></div>
        </div>
        <div className={styles.control}>
          <ImageUpload />
          <RatioControl />
        </div>
      </div>
    </div>
  );
}

export default App;
