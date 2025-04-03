/**
 * 预设的图片比例选项
 * 用于RatioControl组件中的比例选择器
 * 用户可从这些预设值中选择最终导出图片的比例
 */
export const RATIO_MAP = [
  "1:1",
  "2:3",
  "3:2",
  "3:4",
  "4:3",
  "9:16",
  "16:9",
  "2.35:1",
];

/**
 * 下载区域DOM元素的ID
 * 用于在下载图片时定位要导出的DOM元素
 */
export const ID_DOWNLOAD_AREA = "download-area";

/**
 * 默认导出图片的文件名
 */
export const FILA_NAME = "jiujiu-tool.png";

/**
 * 默认的预览区域高度（vh单位）
 * 控制预览区域在视口中的高度比例
 */
export const DEFAULT_HEIGHT = 76;

/**
 * 默认的预览区域比例样式
 * 基于DEFAULT_HEIGHT创建的默认样式对象
 */
export const DEFAULT_RATIO_STYLE = {
  width: `${DEFAULT_HEIGHT}vh`,
  height: `${DEFAULT_HEIGHT}vh`,
};

/**
 * 图片比例选项列表
 * 用于ImageRatioControl组件，控制上传图片的显示比例
 * 与RATIO_MAP相同，保留为单独常量以支持将来可能的差异化配置
 */
export const IMAGE_RATIO_MAP = [
  "1:1",
  "2:3",
  "3:2",
  "3:4",
  "4:3",
  "9:16",
  "16:9",
  "2.35:1",
];

/**
 * 背景类型选项列表
 * 用于BackgroundTypeControl组件的背景类型选择器
 * - "图片背景": 使用上传的图片作为背景
 * - "颜色背景": 使用纯色作为背景
 */
export const BACKGROUND_TYPE_MAP = ["图片背景", "颜色背景"];

/**
 * 导出图层的默认高度（像素）
 * 用于计算底层图层尺寸，影响导出图片的分辨率
 */
export const DEFAULT_BOTTOM_LAYER_HEIGHT = 1000;

/**
 * 导出图层的默认比例样式
 * 基于DEFAULT_BOTTOM_LAYER_HEIGHT创建的样式对象
 * 确保导出图片有足够的分辨率
 */
export const DEFAULT_BOTTOM_LAYER_RATIO_STYLE = {
  width: `${DEFAULT_BOTTOM_LAYER_HEIGHT}px`,
  height: `${DEFAULT_BOTTOM_LAYER_HEIGHT}px`,
};
