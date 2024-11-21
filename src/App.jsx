import React, { useEffect, useState } from "react";
import Header from "@/component/Header/Header";
import useStore from "@/store";
import RatioControl from "@/component/RatioControl/RatioControl";
import ImageUpload from "./component/ImageUpload/ImageUpload";

import styles from "./index.module.less";

function App() {
  const _RatioStyle = useStore((state) => state._RatioStyle);
  const _BackgroundImageStyle = useStore(
    (state) => state._BackgroundImageStyle
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.preview}>
          <Header />

          <div className={styles.downloadWrapper}>
            <div
              className={styles.download}
              style={{
                ..._RatioStyle,
                ..._BackgroundImageStyle,
              }}
            ></div>
          </div>
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
