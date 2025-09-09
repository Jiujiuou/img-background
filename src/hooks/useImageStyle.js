/**
 * 图片样式计算Hook
 * 基于用户友好值计算CSS样式，实现单一状态源
 */

import { useMemo } from "react";
import useStore from "@/store";
import { BOUNDARY_CONFIG } from "@/constant/boundary";

/**
 * 将用户友好值转换为CSS实际位置
 */
const convertToActualPosition = (userValue, imageSize) => {
  const bounds = BOUNDARY_CONFIG.calculateBounds(imageSize);
  const actualPosition =
    bounds.min + (userValue / 100) * (bounds.max - bounds.min);
  return Math.max(bounds.min, Math.min(bounds.max, actualPosition));
};

/**
 * 计算图片的CSS样式
 * @returns {Object} CSS样式对象
 */
export const useImageStyle = () => {
  const { top, left, size, radius, showShadow } = useStore(
    (state) => state._ImageControlValues
  );

  return useMemo(() => {
    // 计算实际CSS位置
    const actualTop = convertToActualPosition(top, size);
    const actualLeft = convertToActualPosition(left, size);

    const style = {
      top: `${actualTop}%`,
      left: `${actualLeft}%`,
      width: `${size}%`,
      borderRadius: `${radius}px`,
    };

    // 根据showShadow控制阴影显示
    if (showShadow) {
      style.boxShadow = "5px 6px 16px 0px rgba(0, 0, 0, 0.85)";
    }

    return style;
  }, [top, left, size, radius, showShadow]);
};

export default useImageStyle;
