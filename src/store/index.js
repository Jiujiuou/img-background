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
   * 图片背景滤镜样式
   * 可包含模糊、亮度、饱和度等CSS滤镜属性
   * 例如：{filter: 'blur(5px) brightness(120%) saturate(150%)'}
   */
  _FilterStyle: {
    // filter: `blur(${blur}px) brightness(${brightness}%) saturate(${saturate}%)`,
  },
  /**
   * 更新滤镜样式
   * @param {object} newFilterStyle - 新的滤镜样式对象
   */
  updateFilterStyle: (newFilterStyle) =>
    set(() => ({ _FilterStyle: newFilterStyle })),

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
   * 图片位置和大小样式
   * 控制图片在画布中的位置和显示大小
   * 可包含top、left、width等CSS属性
   */
  _ImageStyle: {
    top: "25%",
    left: "25%",
    width: "50%",
    borderRadius: "8px",
    boxShadow: "5px 6px 16px 0px rgba(0, 0, 0, 0.85)",
  },
  /**
   * 更新图片位置和大小样式
   * @param {object} newImageStyle - 新的图片样式对象
   */
  updateImageStyle: (newImageStyle) =>
    set(() => ({ _ImageStyle: newImageStyle })),

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
