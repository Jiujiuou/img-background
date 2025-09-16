/**
 * 图片样式计算Hook
 * 基于用户友好值计算CSS样式，实现单一状态源
 */

import { useMemo } from "react";
import useStore from "@/store";
import { BOUNDARY_CONFIG } from "@/constant/boundary";
import {
  calculateActualWidth,
  createUnifiedWidthStyle,
} from "@/utils/imageSize";

/**
 * 将用户友好值转换为CSS实际位置
 */
const convertToActualPosition = (
  userValue,
  imageSize,
  imageRatio,
  direction,
  containerRatio
) => {
  const bounds = BOUNDARY_CONFIG.calculateBounds(
    imageSize,
    imageRatio,
    direction,
    containerRatio
  );
  const actualPosition =
    bounds.min + (userValue / 100) * (bounds.max - bounds.min);
  return Math.max(bounds.min, Math.min(bounds.max, actualPosition));
};

/**
 * 计算图片的CSS样式
 * @returns {Object} CSS样式对象
 */
export const useImageStyle = () => {
  const {
    top,
    left,
    size,
    radius,
    showShadow,
    shadowOffsetX,
    shadowOffsetY,
    shadowBlur,
    shadowSpread,
    shadowColor,
    shadowInset,
  } = useStore((state) => state._ImageControlValues);
  const _ImageRatio = useStore((state) => state._ImageRatio); // 🚀 获取图片宽高比
  const _Ratio = useStore((state) => state._Ratio); // 🚀 获取容器宽高比

  return useMemo(() => {
    // 🚀 使用统一width样式，配合aspect-ratio实现平滑过渡
    const sizeStyle = createUnifiedWidthStyle(size, _ImageRatio, _Ratio);
    const actualWidth = calculateActualWidth(size, _ImageRatio, _Ratio);

    // 🚀 使用实际宽度进行位置计算
    const actualTop = convertToActualPosition(
      top,
      actualWidth,
      _ImageRatio,
      "vertical",
      _Ratio
    );
    const actualLeft = convertToActualPosition(
      left,
      actualWidth,
      _ImageRatio,
      "horizontal",
      _Ratio
    );

    const style = {
      top: `${actualTop}%`,
      left: `${actualLeft}%`,
      ...sizeStyle, // 🚀 统一的width样式
      borderRadius: `${radius}px`,
    };

    // 🌟 根据showShadow和光源位置控制阴影显示
    if (showShadow) {
      const insetKeyword = shadowInset ? "inset " : "";
      style.boxShadow = `${insetKeyword}${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}`;

      // 🎯 添加平滑过渡动画
      style.transition =
        "box-shadow 0.2s ease-out, " +
        (style.transition || "all 0.5s ease-out");
    }

    return style;
  }, [
    top,
    left,
    size,
    radius,
    showShadow,
    shadowOffsetX,
    shadowOffsetY,
    shadowBlur,
    shadowSpread,
    shadowColor,
    shadowInset,
    _ImageRatio,
    _Ratio,
  ]); // 🚀 添加所有阴影相关的依赖
};

export default useImageStyle;
