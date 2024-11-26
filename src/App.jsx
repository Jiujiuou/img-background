import React, { useEffect, useState } from "react";
import Header from "@/component/Header/Header";
import useStore from "@/store";
import RatioControl from "@/component/RatioControl/RatioControl";
import ImageUpload from "@/component/ImageUpload/ImageUpload";
import FilterControl from "@/component/FilterControl/FilterControl";
import styles from "./index.module.less";

function App() {
  const _RatioStyle = useStore((state) => state._RatioStyle);
  const _BackgroundImageStyle = useStore(
    (state) => state._BackgroundImageStyle
  );
  const _FilterStyle = useStore((state) => state._FilterStyle);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.preview}>
          <Header />

          <div className={styles.downloadWrapper}>
            <div
              className={styles.hidden}
              style={{
                ..._RatioStyle,
              }}
            >
              <div
                className={styles.download}
                style={{
                  ..._RatioStyle,
                  ..._BackgroundImageStyle,
                  ..._FilterStyle,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className={styles.control}>
          <ImageUpload />
          <RatioControl />
          <FilterControl />
        </div>
      </div>
    </div>
  );
}

export default App;
