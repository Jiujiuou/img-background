/**
 * 阴影计算工具函数
 * 基于光源位置计算真实的阴影效果参数
 */

/**
 * 光源位置转阴影偏移的映射关系
 *
 * @param {number} lightX - 光源X位置 (0-100)
 * @param {number} lightY - 光源Y位置 (0-100)
 * @param {object} options - 配置选项
 * @param {number} options.scale - 阴影缩放系数，默认0.3
 * @param {number} options.maxOffset - 最大偏移量(px)，默认20
 * @param {number} options.baseBlur - 基础模糊半径(px)，默认16
 * @param {string} options.baseColor - 基础阴影颜色，默认"0, 0, 0"
 * @param {number} options.baseOpacity - 基础透明度，默认0.85
 * @returns {object} 计算得出的阴影参数
 */
export const calculateShadowFromLight = (lightX, lightY, options = {}) => {
  const {
    scale = 0.3, // 阴影缩放系数
    maxOffset = 20, // 最大偏移量
    baseBlur = 16, // 基础模糊半径
    baseColor = "0, 0, 0", // 基础颜色 RGB
    baseOpacity = 0.85, // 基础透明度
  } = options;

  // 1. 计算相对于中心的偏移量
  const centerX = 50;
  const centerY = 50;
  const deltaX = lightX - centerX; // -50 到 +50
  const deltaY = lightY - centerY; // -50 到 +50

  // 2. 计算距离和标准化
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const normalizedDistance = Math.min(distance / 70.7, 1); // 0-1

  // 3. 阴影方向与光源方向相反
  const rawOffsetX = -deltaX * scale;
  const rawOffsetY = -deltaY * scale;

  // 4. 限制最大偏移量
  const shadowOffsetX = Math.max(-maxOffset, Math.min(maxOffset, rawOffsetX));
  const shadowOffsetY = Math.max(-maxOffset, Math.min(maxOffset, rawOffsetY));

  // 5. 基于距离计算阴影强度和模糊度
  const shadowIntensity = normalizedDistance;
  const intensityMultiplier = 0.3 + shadowIntensity * 0.7; // 0.3-1.0

  // 6. 动态模糊半径：距离越远，阴影越模糊
  const dynamicBlur = baseBlur + shadowIntensity * 8; // 16-24px

  // 7. 动态透明度：距离越远，阴影越深
  const dynamicOpacity = Math.min(baseOpacity * intensityMultiplier, 1);

  // 8. 计算角度信息（用于调试和扩展）
  const angle = Math.atan2(deltaY, deltaX);
  const angleDegrees = (angle * 180) / Math.PI;

  return {
    // 基础位置数据
    lightX,
    lightY,
    deltaX,
    deltaY,
    distance,
    angle,
    angleDegrees,

    // 计算的阴影属性
    shadowOffsetX: Math.round(shadowOffsetX),
    shadowOffsetY: Math.round(shadowOffsetY),
    shadowBlur: Math.round(dynamicBlur),
    shadowSpread: 0, // 暂时固定为0
    shadowColor: `rgba(${baseColor}, ${dynamicOpacity.toFixed(2)})`,
    shadowIntensity,
    shadowInset: false,

    // 调试信息
    debug: {
      normalizedDistance,
      intensityMultiplier,
      rawOffsetX,
      rawOffsetY,
    },
  };
};

/**
 * 预设的阴影风格
 */
export const SHADOW_PRESETS = {
  subtle: {
    scale: 0.15,
    maxOffset: 8,
    baseBlur: 8,
    baseOpacity: 0.3,
  },
  normal: {
    scale: 0.3,
    maxOffset: 20,
    baseBlur: 16,
    baseOpacity: 0.6,
  },
  dramatic: {
    scale: 0.6,
    maxOffset: 40,
    baseBlur: 24,
    baseOpacity: 0.8,
  },
  extreme: {
    scale: 1.0,
    maxOffset: 60,
    baseBlur: 32,
    baseOpacity: 0.9,
  },
};

/**
 * 根据预设名称计算阴影
 */
export const calculateShadowWithPreset = (
  lightX,
  lightY,
  presetName = "normal"
) => {
  const preset = SHADOW_PRESETS[presetName];
  if (!preset) {
    console.warn(`Unknown shadow preset: ${presetName}`);
    return calculateShadowFromLight(lightX, lightY);
  }
  return calculateShadowFromLight(lightX, lightY, preset);
};

/**
 * 将阴影参数转换为CSS box-shadow字符串
 */
export const shadowToCSS = (shadowData) => {
  const {
    shadowOffsetX,
    shadowOffsetY,
    shadowBlur,
    shadowSpread,
    shadowColor,
    shadowInset,
  } = shadowData;
  const insetKeyword = shadowInset ? "inset " : "";
  return `${insetKeyword}${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}`;
};

/**
 * 批量更新阴影参数到store
 * 这个函数将被ShadowControl组件调用
 */
export const updateShadowFromLightPosition = (
  lightX,
  lightY,
  updateImageControlValues,
  preset = "normal"
) => {
  const shadowData = calculateShadowWithPreset(lightX, lightY, preset);

  updateImageControlValues({
    lightX: shadowData.lightX,
    lightY: shadowData.lightY,
    shadowOffsetX: shadowData.shadowOffsetX,
    shadowOffsetY: shadowData.shadowOffsetY,
    shadowBlur: shadowData.shadowBlur,
    shadowSpread: shadowData.shadowSpread,
    shadowColor: shadowData.shadowColor,
    shadowIntensity: shadowData.shadowIntensity,
    shadowInset: shadowData.shadowInset,
  });

  return shadowData;
};
