/**
 * 图片位置边界配置系统
 */

export const BOUNDARY_CONFIG = {
  // 基础安全边距（百分比）- 设为0让图片可以贴边
  safetyMargin: 0,

  /**
   * 计算基于图片大小、图片宽高比和容器宽高比的动态边界
   *
   * @param {number} imageSize - 图片大小百分比 (0-100)
   * @param {object} imageRatio - 图片宽高比 {width, height}
   * @param {string} direction - 方向 'horizontal' | 'vertical'
   * @param {object} containerRatio - 容器宽高比 {width, height}
   * @returns {object} 边界对象 { min, max, isValid, actualSize }
   */
  calculateBounds: (
    imageSize,
    imageRatio = { width: 1, height: 1 },
    direction = "horizontal",
    containerRatio = { width: 1, height: 1 }
  ) => {
    const size = parseFloat(imageSize) || 50;
    const { safetyMargin } = BOUNDARY_CONFIG;

    // 计算实际占用的空间
    let actualSize;
    if (direction === "horizontal") {
      // 水平方向：图片实际宽度就是size
      actualSize = size;
    } else {
      // 垂直方向：考虑容器比例和图片比例
      // 图片宽度(容器宽度%) * 容器宽高比 * 图片高宽比 = 图片高度(容器高度%)
      const containerWidthHeightRatio =
        containerRatio.width / containerRatio.height;
      const imageHeightWidthRatio = imageRatio.height / imageRatio.width;
      actualSize = size * containerWidthHeightRatio * imageHeightWidthRatio;
    }

    // 边界计算逻辑：
    // - 图片left/top是指图片左上角的位置
    // - 当left=0%时，图片左边贴着容器左边（完全可见）
    // - 当left=100%-actualSize%时，图片右边贴着容器右边（完全可见）

    // 最小位置：可以贴边（safetyMargin=0时为0%）
    const min = safetyMargin;

    // 最大位置：确保图片右边/下边不超出容器
    const max = 100 - actualSize - safetyMargin;

    // 边界有效性检查
    const isValid = max >= min;

    // 如果边界无效（图片太大），提供一个合理的中心位置
    const finalMin = min;
    const finalMax = isValid ? max : min;

    return {
      min: finalMin,
      max: finalMax,
      isValid: isValid,
      actualSize: actualSize,
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
 * 根据图片大小和宽高比限制位置
 */
export const clampPosition = (
  left,
  top,
  imageSize,
  imageRatio = { width: 1, height: 1 },
  containerRatio = { width: 1, height: 1 }
) => {
  const horizontalBounds = BOUNDARY_CONFIG.calculateBounds(
    imageSize,
    imageRatio,
    "horizontal",
    containerRatio
  );
  const verticalBounds = BOUNDARY_CONFIG.calculateBounds(
    imageSize,
    imageRatio,
    "vertical",
    containerRatio
  );

  if (!horizontalBounds.isValid || !verticalBounds.isValid) {
    const centerH = Math.max(
      horizontalBounds.min,
      (horizontalBounds.min + horizontalBounds.max) / 2
    );
    const centerV = Math.max(
      verticalBounds.min,
      (verticalBounds.min + verticalBounds.max) / 2
    );
    return { left: centerH, top: centerV };
  }

  return {
    left: clampToBounds(left, horizontalBounds.min, horizontalBounds.max),
    top: clampToBounds(top, verticalBounds.min, verticalBounds.max),
  };
};
