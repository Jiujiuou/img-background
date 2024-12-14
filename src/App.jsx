import React, { useEffect, useState } from "react";
import useStore from "@/store";

import Header from "@/component/Header/Header";
import RatioControl from "@/component/RatioControl/RatioControl";
import ImageUpload from "@/component/ImageUpload/ImageUpload";
import FilterControl from "@/component/FilterControl/FilterControl";
import ImageControl from "./component/ImageControl/ImageControl";
import ImageRatioControl from "@/component/ImageRatioControl/ImageRatioControl";

import { ID_DOWNLOAD_AREA } from "@/constant/index";

import { getRatioStyle, downloadImagePlus } from "@/utils/index";

import styles from "./index.module.less";

function App() {
  const _Ratio = useStore((state) => state._Ratio);
  const _ImageStyle = useStore((state) => state._ImageStyle);
  const _ImageRatio = useStore((state) => state._ImageRatio);
  const _FilterStyle = useStore((state) => state._FilterStyle);
  const _ImageBase64Url = useStore((state) => state._ImageBase64Url);

  const getImageRatioStyle = () => {
    const { width, height } = _ImageRatio;
    return {
      aspectRatio: `${width} / ${height}`,
    };
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {/* 左侧预览 */}
        <div className={styles.preview}>
          <Header download={downloadImagePlus} />

          <div className={styles.downloadWrapper}>
            <div
              className={styles.hidden}
              style={getRatioStyle(_Ratio)}
              id={ID_DOWNLOAD_AREA}
            >
              {_ImageBase64Url && (
                <img
                  alt=""
                  draggable="false"
                  className={styles.image}
                  src={_ImageBase64Url}
                  style={{ ..._ImageStyle, ...getImageRatioStyle() }}
                />
              )}
              <div
                className={styles.download}
                style={{
                  ...getRatioStyle(_Ratio),
                  ..._FilterStyle,
                  backgroundImage: `url(${_ImageBase64Url})`,
                }}
              />
            </div>
          </div>
        </div>

        {/* 右侧控制 */}
        <div className={styles.control}>
          <ImageUpload />
          <RatioControl />
          <ImageRatioControl />
          <FilterControl />
          <ImageControl />
        </div>
      </div>
    </div>
  );
}

export default App;
