import {
  DEFAULT_HEIGHT,
  DEFAULT_BOTTOM_LAYER_HEIGHT,
  ID_DOWNLOAD_AREA,
} from "@/constant/index";

import { toPng, toCanvas } from "html-to-image";
import download from "downloadjs";

/**
 * 根据背景类型生成相应的背景样式对象
 *
 * @param {string} _BackgroundType - 背景类型，可选值："图片背景"或"颜色背景"
 * @param {string} _ImageBase64Url - 图片的Base64 URL，当背景类型为"图片背景"时使用
 * @param {string} _BackgroundColor - 背景颜色值，当背景类型为"颜色背景"时使用
 * @returns {object} 返回CSS样式对象，根据背景类型包含backgroundImage或backgroundColor属性
 */
export const getBackgroundStyle = (
  _BackgroundType,
  _ImageBase64Url,
  _BackgroundColor
) => {
  if (_BackgroundType === "图片背景") {
    return { backgroundImage: `url(${_ImageBase64Url})` };
  } else {
    return { backgroundColor: _BackgroundColor };
  }
};

/**
 * 根据给定比例计算尺寸样式
 *
 * @param {object} _Ratio - 比例对象，包含width和height属性表示宽高比
 * @param {string} dom - 指定计算样式的目标区域，可选值："up"(上层)或其他值(下层)，默认为"up"
 * @returns {object} 返回包含width和height的CSS样式对象
 *
 * 当dom为"up"时：
 * - 如果_Ratio中有fixedHeight属性，则基于固定高度计算宽度
 * - 否则基于DEFAULT_HEIGHT计算宽度，单位为vh
 *
 * 当dom不为"up"时：
 * - 基于DEFAULT_BOTTOM_LAYER_HEIGHT计算宽度，单位为px
 */
export const getRatioStyle = (_Ratio, dom = "up") => {
  if (dom === "up") {
    if (_Ratio.fixedHeight) {
      const height = _Ratio.fixedHeight;
      const numericHeight = parseInt(height);
      const unit = height.replace(numericHeight, "");
      return {
        width: `${(numericHeight * _Ratio.width) / _Ratio.height}${unit}`,
        height: height,
      };
    }
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

/**
 * 下载预览区域的图片（基本版）
 *
 * 功能：
 * 1. 找到ID为ID_DOWNLOAD_AREA的DOM元素
 * 2. 临时放大该元素（使用CSS transform）以提高导出图片质量
 * 3. 导出为PNG图片并触发下载
 * 4. 还原元素的原始样式
 *
 * @returns {void} 无返回值，直接触发图片下载
 */
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

/**
 * 下载预览区域的图片（增强版），支持根据比例命名图片
 *
 * 功能：
 * 1. 找到ID为ID_DOWNLOAD_AREA的DOM元素
 * 2. 使用toCanvas将元素转换为高分辨率画布
 * 3. 根据用户选择的比例自动命名图片并下载
 *
 * 相比基本版的优势：
 * - 使用toCanvas方法可以更好地处理复杂DOM元素
 * - 文件名包含比例信息，便于用户管理
 * - 更精确的像素控制
 *
 * @param {object} _Ratio - 比例对象，包含width和height属性，用于生成文件名
 * @returns {Promise<void>} 异步操作，完成后触发图片下载
 */
export const downloadImagePlus = async (_Ratio) => {
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
    const fileName = `JiujiuTool-${_Ratio.width}-${_Ratio.height}.png`;
    download(dataUrl, fileName);
  });
};
