import React, { useEffect, useState } from "react";
import useStore from "@/store";

import Header from "@/component/Header/Header";
import RatioControl from "@/component/RatioControl/RatioControl";
import ImageUpload from "@/component/ImageUpload/ImageUpload";
import FilterControl from "@/component/FilterControl/FilterControl";

import { ID_DOWNLOAD_AREA, FILA_NAME } from "@/constant/index";

import { toJpeg, toPng, toSvg } from "html-to-image";
import download from "downloadjs";

import styles from "./index.module.less";

function App() {
  const _RatioStyle = useStore((state) => state._RatioStyle);
  const _BackgroundImageStyle = useStore(
    (state) => state._BackgroundImageStyle
  );
  const _FilterStyle = useStore((state) => state._FilterStyle);
  const _ImageBase64Url = useStore((state) => state._ImageBase64Url);

  const handleDownloadImage = () => {
    const element = document.getElementById(ID_DOWNLOAD_AREA);
    toPng(element).then(function (dataUrl) {
      download(dataUrl, FILA_NAME);
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.preview}>
          <Header download={handleDownloadImage} />

          <div className={styles.downloadWrapper}>
            <div
              className={styles.hidden}
              id={ID_DOWNLOAD_AREA}
              style={{
                ..._RatioStyle,
              }}
            >
              {_ImageBase64Url && (
                <img
                  className={styles.image}
                  src={_ImageBase64Url}
                  alt=""
                  draggable="false"
                />
              )}
              <div
                className={styles.download}
                style={{
                  ..._RatioStyle,
                  ..._BackgroundImageStyle,
                  ..._FilterStyle,
                }}
              />
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
