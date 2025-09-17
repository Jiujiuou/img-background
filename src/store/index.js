import { create } from "zustand";
import { BACKGROUND_TYPE_MAP } from "@/constant/index";

/**
 * 使用Zustand创建全局状态管理
 *
 * 本应用的状态管理包含以下主要部分：
 * - 输出图片比例控制 (_Ratio)
 * - 上传图片比例控制 (_ImageRatio)
 * - 滤镜样式控制 (_FilterStyle)
 * - 上传图片Base64数据 (_ImageBase64Url)
 * - 图片位置与大小控制 (_ImageStyle)
 * - 背景类型选择 (_BackgroundType)
 * - 背景颜色控制 (_BackgroundColor)
 *
 * 每个状态都有相应的更新函数，并支持批量更新配置
 */
const useStore = create((set) => ({
  /**
   * 输出图片的宽高比例配置
   * 控制最终导出图片的宽高比
   */
  _Ratio: {
    width: 1,
    height: 1,
  },
  /**
   * 更新输出图片比例
   * @param {object} newRatio - 新的比例对象，包含width和height属性
   */
  updateRatio: (newRatio) => set(() => ({ _Ratio: newRatio })),

  /**
   * 上传图片的原始宽高比例
   * 用于保持上传图片的原始比例
   */
  _ImageRatio: {
    width: 1,
    height: 1,
  },
  /**
   * 更新上传图片比例
   * @param {object} newRatio - 新的比例对象，包含width和height属性
   */
  updateImageRatio: (newRatio) => set(() => ({ _ImageRatio: newRatio })),

  /**
   * 背景滤镜控制参数
   * 用于与右侧滤镜控制面板同步
   */
  _FilterControlValues: {
    blur: 10, // 模糊度 0-20
    brightness: 100, // 亮度 50-150
    saturate: 100, // 饱和度 0-200
  },
  /**
   * 更新背景滤镜控制值
   * @param {object} newFilterValues - 新的滤镜控制值对象
   */
  updateFilterControlValues: (newFilterValues) =>
    set((state) => ({
      _FilterControlValues: {
        ...state._FilterControlValues,
        ...newFilterValues,
      },
    })),

  /**
   * 上传图片的Base64编码URL
   * 用于在前端直接显示上传的图片，无需服务器存储
   */
  _ImageBase64Url: "",
  /**
   * 更新图片Base64 URL
   * @param {string} newImageBase64Url - 新的图片Base64编码URL
   */
  updateImageBase64Url: (newImageBase64Url) =>
    set(() => ({
      _ImageBase64Url: newImageBase64Url,
    })),

  /**
   * 图片控制的用户友好位置值 (0-100)
   * 用于与右侧控制面板的滑动条同步
   */
  _ImageControlValues: {
    top: 50, // 垂直位置 0-100
    left: 50, // 水平位置 0-100
    size: 50, // 图片大小 0-100
    radius: 8, // 圆角大小 0-30
    showShadow: true, // 是否显示阴影

    // 🌟 光源控制属性
    lightX: 0, // 光源水平位置 0-100 (相对于光源控制面板)
    lightY: 0, // 光源垂直位置 0-100 (相对于光源控制面板)

    // 🎯 阴影属性 (由光源位置计算得出)
    shadowOffsetX: -6, // 阴影X轴偏移 (px)
    shadowOffsetY: 6, // 阴影Y轴偏移 (px)
    shadowBlur: 16, // 阴影模糊半径 (px)
    shadowSpread: 0, // 阴影扩散半径 (px)
    shadowColor: "rgba(0, 0, 0, 0.85)", // 阴影颜色
    shadowIntensity: 0.3, // 阴影强度 0-1 (基于光源距离)
    shadowInset: false, // 是否为内阴影

    // 🚀 保留的阴影控制属性
    shadowTint: "#000000", // 阴影着色 (阴影的颜色色调)
  },
  /**
   * 更新图片控制值
   * @param {object} newControlValues - 新的控制值对象
   */
  updateImageControlValues: (newControlValues) =>
    set((state) => ({
      _ImageControlValues: {
        ...state._ImageControlValues,
        ...newControlValues,
      },
    })),

  /**
   * 背景类型
   * 可选值定义在BACKGROUND_TYPE_MAP常量中
   * 默认为第一个选项（通常是"图片背景"）
   */
  _BackgroundType: BACKGROUND_TYPE_MAP[0],
  /**
   * 更新背景类型
   * @param {string} newBackgroundType - 新的背景类型
   */
  updateBackgroundType: (newBackgroundType) =>
    set(() => ({ _BackgroundType: newBackgroundType })),

  /**
   * 背景颜色
   * 当背景类型为"颜色背景"时使用
   * 默认为黑色 (#000)
   */
  _BackgroundColor: "#000",
  /**
   * 更新背景颜色
   * @param {string} newBackgroundColor - 新的背景颜色值
   */
  updateBackgroundColor: (newBackgroundColor) =>
    set(() => ({ _BackgroundColor: newBackgroundColor })),

  /**
   * 批量更新配置
   * 用于从localStorage加载配置或一次性更新多个状态
   * @param {object} config - 包含多个状态值的配置对象
   */
  updateConfig: (config) =>
    set(() => ({
      ...config,
    })),
}));

export default useStore;
