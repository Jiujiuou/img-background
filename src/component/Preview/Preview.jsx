import React from "react";
import useStore from "@/store";
import Header from "@/component/Header/Header";
import { ID_DOWNLOAD_AREA } from "@/constant/index";
import {
  getRatioStyle,
  getBackgroundStyle,
  downloadImagePlus,
} from "@/utils/index";
import styles from "./index.module.less";

function Preview() {
  const _Ratio = useStore((state) => state._Ratio);
  const _ImageStyle = useStore((state) => state._ImageStyle);
  const _ImageRatio = useStore((state) => state._ImageRatio);
  const _FilterStyle = useStore((state) => state._FilterStyle);
  const _ImageBase64Url = useStore((state) => state._ImageBase64Url);
  const _BackgroundType = useStore((state) => state._BackgroundType);
  const _BackgroundColor = useStore((state) => state._BackgroundColor);

  const getImageRatioStyle = () => {
    const { width, height } = _ImageRatio;
    return {
      aspectRatio: `${width} / ${height}`,
    };
  };

  return (
    <div className={styles.preview}>
      <Header download={downloadImagePlus} />

      <div className={styles.downloadWrapper}>
        <div
          className={styles.hidden}
          style={{ ...getRatioStyle(_Ratio) }}
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
              ...getBackgroundStyle(
                _BackgroundType,
                _ImageBase64Url,
                _BackgroundColor
              ),
              ..._FilterStyle,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Preview;
