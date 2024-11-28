import {
  DEFAULT_HEIGHT,
  DEFAULT_BOTTOM_LAYER_HEIGHT,
  ID_DOWNLOAD_AREA,
  FILA_NAME,
} from "@/constant/index";

import { toPng, toCanvas } from "html-to-image";
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

export const downloadImage = () => {
  const element = document.getElementById(ID_DOWNLOAD_AREA);

  if (!element) return;

  const originalWidth = element.offsetWidth;
  const originalHeight = element.offsetHeight;

  // 放大比例
  const scaleFactor = 3;
  const targetWidth = originalWidth * scaleFactor;
  const targetHeight = originalHeight * scaleFactor;

  // 设置缩放样式
  const originalStyle = {
    transform: element.style.transform,
    transformOrigin: element.style.transformOrigin,
  };
  element.style.transform = `scale(${scaleFactor})`;
  element.style.transformOrigin = "top left";

  // 等待渲染完成后导出图片
  setTimeout(() => {
    toPng(element, {
      width: targetWidth,
      height: targetHeight,
      cacheBust: true,
    }).then((dataUrl) => {
      download(dataUrl, "image.png");

      // 恢复原始样式
      element.style.transform = originalStyle.transform;
      element.style.transformOrigin = originalStyle.transformOrigin;
    });
  }, 500); // 确保样式生效
};

export const downloadImagePlus = async () => {
  const element = document.getElementById(ID_DOWNLOAD_AREA); // 替换为你的预览区域的 ID

  const rect = element.getBoundingClientRect();
  const scaleFactor = 3; // 放大倍数，用于导出高清图
  const width = rect.width * scaleFactor;
  const height = rect.height * scaleFactor;

  toCanvas(element, {
    width: width, // 宽度
    height: height, // 高度
    pixelRatio: scaleFactor, // 确保高清导出
    style: {
      margin: "0", // 清除可能影响画布的外边距
      padding: "0", // 清除内边距
      border: "none", // 清除边框
      transform: `scale(${scaleFactor})`, // 避免继承页面上的缩放
      transformOrigin: "top left", // 确保绘制起点正确
    },
  }).then((canvas) => {
    const dataUrl = canvas.toDataURL("image/png");
    download(dataUrl, FILA_NAME);
  });
};
