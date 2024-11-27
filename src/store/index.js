import { create } from "zustand";
import {
  DEFAULT_RATIO_STYLE,
  DEFAULT_BOTTOM_LAYER_RATIO_STYLE,
} from "@/constant/index";

const useStore = create((set) => ({
  // 展示区域长宽比例
  _RatioStyle: DEFAULT_RATIO_STYLE,
  updateRatioStyle: (newratioStyle) =>
    set(() => ({ _RatioStyle: newratioStyle })),

  // 下载区域长宽比例
  _BottomLayerRatioStyle: DEFAULT_BOTTOM_LAYER_RATIO_STYLE,
  updateBottomLayerRatioStyle: (newBottomLayerRatioStyle) =>
    set(() => ({ _BottomLayerRatioStyle: newBottomLayerRatioStyle })),

  // 下载区域背景图
  _BackgroundImageStyle: {},
  updateBackgroundImageStyle: (newBackgroundStyle) =>
    set(() => ({ _BackgroundImageStyle: newBackgroundStyle })),

  _FilterStyle: {},
  updateFilterStyle: (newFilterStyle) =>
    set(() => ({ _FilterStyle: newFilterStyle })),

  _ImageBase64Url: "",
  updateImageBase64Url: (newImageBase64Url) =>
    set(() => ({
      _ImageBase64Url: newImageBase64Url,
    })),
}));

export default useStore;
