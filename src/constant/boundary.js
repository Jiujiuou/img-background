/**
 * 图片位置边界配置系统
 */

export const BOUNDARY_CONFIG = {
  // 基础安全边距（百分比）- 设为0让图片可以贴边
  safetyMargin: 0,

  /**
   * 计算基于图片大小的动态边界
   *
   * @param {number} imageSize - 图片大小百分比 (0-100)
   * @returns {object} 边界对象 { min, max, isValid }
   */
  calculateBounds: (imageSize) => {
    const size = parseFloat(imageSize) || 50;
    const { safetyMargin } = BOUNDARY_CONFIG;

    // 边界计算逻辑：
    // - 图片left/top是指图片左上角的位置
    // - 当left=0%时，图片左边贴着容器左边（完全可见）
    // - 当left=100%-size%时，图片右边贴着容器右边（完全可见）

    // 最小位置：可以贴边（safetyMargin=0时为0%）
    const min = safetyMargin;

    // 最大位置：确保图片右边/下边不超出容器
    // 如果 left = max，那么图片右边位置 = left + size = max + size
    // 要求：max + size ≤ 100 - safetyMargin
    // 所以：max ≤ 100 - size - safetyMargin
    const max = 100 - size - safetyMargin;

    // 边界有效性检查
    const isValid = max >= min;

    // 如果边界无效（图片太大），提供一个合理的中心位置
    const finalMin = min;
    const finalMax = isValid ? max : min;

    return {
      min: finalMin,
      max: finalMax,
      isValid: isValid,
    };
  },
};

/**
 * 边界检查工具函数
 */

/**
 * 将数值限制在指定范围内
 */
export const clampToBounds = (value, min, max) => {
  return Math.max(min, Math.min(max, value));
};

/**
 * 根据图片大小限制位置
 */
export const clampPosition = (left, top, imageSize) => {
  const bounds = BOUNDARY_CONFIG.calculateBounds(imageSize);

  if (!bounds.isValid) {
    const center = Math.max(bounds.min, (bounds.min + bounds.max) / 2);
    return { left: center, top: center };
  }

  return {
    left: clampToBounds(left, bounds.min, bounds.max),
    top: clampToBounds(top, bounds.min, bounds.max),
  };
};
