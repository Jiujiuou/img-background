import {
  DEFAULT_HEIGHT,
  DEFAULT_BOTTOM_LAYER_HEIGHT,
  ID_DOWNLOAD_AREA,
  FILA_NAME,
} from "@/constant/index";

import { toPng } from "html-to-image";
import download from "downloadjs";

export const getRatioStyle = (_Ratio, dom = "up") => {
  if (dom === "up") {
    return {
      width: `${(DEFAULT_HEIGHT * _Ratio.width) / _Ratio.height}vh`,
      height: `${DEFAULT_HEIGHT}vh`,
    };
  } else {
    return {
      width: `${
        (DEFAULT_BOTTOM_LAYER_HEIGHT * _Ratio.width) / _Ratio.height
      }px`,
      height: `${DEFAULT_BOTTOM_LAYER_HEIGHT}px`,
    };
  }
};

export const handleDownloadImage = () => {
  const element = document.getElementById(ID_DOWNLOAD_AREA);
  toPng(element).then(function (dataUrl) {
    download(dataUrl, FILA_NAME);
  });
};
