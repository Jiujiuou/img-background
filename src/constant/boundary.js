/**
 * 图片位置边界配置系统
 *
 * 功能：提供基于图片大小的动态边界计算
 * 目标：防止图片溢出容器，同时最大化用户操作灵活性
 */

/**
 * 边界配置常量
 */
export const BOUNDARY_CONFIG = {
  // 基础安全边距（百分比）- 设为0让图片可以贴边
  safetyMargin: 0,

  // 图片大小分类配置
  sizeCategories: {
    small: { max: 30, marginBonus: 0 }, // 小图片：30%以下，额外0%自由度
    medium: { max: 70, marginBonus: 0 }, // 中图片：30%-70%，标准边距
    large: { max: 90, marginBonus: 0 }, // 大图片：70%-90%，标准边距
    extraLarge: { max: 100, marginBonus: 0 }, // 超大图片：90%以上，标准边距
  },

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
      imageSize: size,
      effectiveMargin: safetyMargin,
      // 调试信息
      explanation: {
        minExplanation: `图片左上角最小位置：${finalMin}%（${
          safetyMargin === 0 ? "可贴边" : "安全边距"
        }）`,
        maxExplanation: `图片左上角最大位置：${finalMax}%（确保图片右下角不超出 ${
          100 - safetyMargin
        }%）`,
        imageRightEdge: finalMax + size,
        imageBottomEdge: finalMax + size,
      },
    };
  },
};

/**
 * 边界检查工具函数
 */

/**
 * 将数值限制在指定范围内
 *
 * @param {number} value - 要限制的值
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} 限制后的值
 */
export const clampToBounds = (value, min, max) => {
  return Math.max(min, Math.min(max, value));
};

/**
 * 根据图片大小限制位置
 *
 * @param {number} left - 水平位置百分比
 * @param {number} top - 垂直位置百分比
 * @param {number} imageSize - 图片大小百分比
 * @returns {object} 限制后的位置 { left, top }
 */
export const clampPosition = (left, top, imageSize) => {
  const bounds = BOUNDARY_CONFIG.calculateBounds(imageSize);

  if (!bounds.isValid) {
    // 如果边界无效，返回中心位置
    const center = Math.max(bounds.min, (bounds.min + bounds.max) / 2);
    return { left: center, top: center };
  }

  return {
    left: clampToBounds(left, bounds.min, bounds.max),
    top: clampToBounds(top, bounds.min, bounds.max),
  };
};

/**
 * 检查位置是否在有效边界内
 *
 * @param {number} position - 位置百分比
 * @param {number} imageSize - 图片大小百分比
 * @param {number} safetyMargin - 安全边距（可选，默认使用配置值）
 * @returns {boolean} 是否在边界内
 */
export const isWithinBounds = (position, imageSize, safetyMargin = null) => {
  const margin =
    safetyMargin !== null ? safetyMargin : BOUNDARY_CONFIG.safetyMargin;
  const bounds = BOUNDARY_CONFIG.calculateBounds(imageSize);

  return position >= bounds.min && position <= bounds.max;
};

/**
 * 边界数学验证工具
 */
export const BOUNDARY_MATH = {
  /**
   * 计算理论边界（用于验证）
   *
   * @param {number} imageSize - 图片大小百分比
   * @param {number} safetyMargin - 安全边距百分比
   * @returns {object} 理论边界 { min, max, isValid }
   */
  calculateTheoreticalBounds: (imageSize, safetyMargin = 5) => {
    const size = parseFloat(imageSize) || 0;
    const margin = safetyMargin;

    return {
      min: margin,
      max: Math.max(margin, 100 - size - margin),
      isValid: 100 - size - margin >= margin,
    };
  },

  /**
   * 验证边界计算是否正确
   *
   * @param {number} imageSize - 图片大小百分比
   * @returns {boolean} 计算是否正确
   */
  validateBounds: (imageSize) => {
    const calculated = BOUNDARY_CONFIG.calculateBounds(imageSize);
    const theoretical = BOUNDARY_MATH.calculateTheoreticalBounds(imageSize);

    return (
      Math.abs(calculated.min - theoretical.min) < 0.01 &&
      Math.abs(calculated.max - theoretical.max) < 0.01
    );
  },
};

/**
 * 调试和日志工具
 */
export const BOUNDARY_DEBUG = {
  /**
   * 打印边界信息（开发调试用）
   *
   * @param {number} imageSize - 图片大小百分比
   */
  logBounds: (imageSize) => {
    const bounds = BOUNDARY_CONFIG.calculateBounds(imageSize);
    console.log(`=== 图片大小: ${imageSize}% ===`);
    console.log(
      `左上角位置范围: ${bounds.min.toFixed(1)}% - ${bounds.max.toFixed(1)}%`
    );
    console.log(`可移动范围: ${(bounds.max - bounds.min).toFixed(1)}%`);
    console.log(`边界有效: ${bounds.isValid}`);
    if (bounds.explanation) {
      console.log(`最小位置解释: ${bounds.explanation.minExplanation}`);
      console.log(`最大位置解释: ${bounds.explanation.maxExplanation}`);
      console.log(
        `最大位置时图片右边缘: ${bounds.explanation.imageRightEdge.toFixed(1)}%`
      );
      console.log(
        `最大位置时图片下边缘: ${bounds.explanation.imageBottomEdge.toFixed(
          1
        )}%`
      );
    }
    console.log("---");
  },

  /**
   * 批量测试不同图片大小的边界
   */
  testAllSizes: () => {
    const testSizes = [10, 20, 30, 40, 50, 60, 70, 80, 90, 95];
    console.log("=== 边界系统测试 ===");
    testSizes.forEach((size) => {
      BOUNDARY_DEBUG.logBounds(size);
    });
  },
};
