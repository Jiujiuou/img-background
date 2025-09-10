/**
 * 图片大小计算工具函数
 */

/**
 * 计算图片的实际宽度百分比
 * 根据图片比例和容器比例，将size值转换为实际的CSS宽度百分比
 *
 * @param {number} size - 用户设置的图片大小 (0-100)
 * @param {object} imageRatio - 图片宽高比 {width, height}
 * @param {object} containerRatio - 容器宽高比 {width, height}
 * @returns {number} 实际的CSS宽度百分比
 */
export const calculateActualWidth = (size, imageRatio, containerRatio) => {
  const isHeightDominant = imageRatio.height > imageRatio.width;
  const isSquare = imageRatio.height === imageRatio.width;

  if (isSquare) {
    // 正方形：直接使用size作为宽度
    return size;
  } else if (isHeightDominant) {
    // 高度主导：size表示高度，计算对应的宽度
    return (
      size *
      (imageRatio.width / imageRatio.height) *
      (containerRatio.height / containerRatio.width)
    );
  } else {
    // 宽度主导：size直接作为宽度
    return size;
  }
};

// 🚀 移除了未使用的 isHeightDominant 和 isSquareImage 函数
// 这些判断逻辑已经内联到 calculateActualWidth 函数中

/**
 * 🚀 创建统一的width样式（配合aspect-ratio实现平滑过渡）
 * 所有图片都使用width属性，避免width/height切换时的闪动
 * @param {number} size - 用户设置的图片大小 (0-100)
 * @param {object} imageRatio - 图片宽高比 {width, height}
 * @param {object} containerRatio - 容器宽高比 {width, height}
 * @returns {object} CSS样式对象，始终包含width
 */
export const createUnifiedWidthStyle = (size, imageRatio, containerRatio) => {
  // 🚀 计算等效的width值，确保视觉效果与用户期望一致
  const actualWidth = calculateActualWidth(size, imageRatio, containerRatio);

  return {
    width: `${actualWidth}%`,
    // 注意：aspect-ratio将在DraggableImage中单独设置
  };
};
