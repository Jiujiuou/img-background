import { create } from "zustand";

const useStore = create((set) => ({
  // 下载区域长宽比例
  _RatioStyle: {
    width: "70vh",
    height: "70vh",
  },
  updateRatioStyle: (newratioStyle) =>
    set(() => ({ _RatioStyle: newratioStyle })),

  // 下载区域背景图
  _BackgroundImageStyle: {},
  updateBackgroundImageStyle: (newBackgroundStyle) =>
    set(() => ({ _BackgroundImageStyle: newBackgroundStyle })),

  _FilterStyle: {},
  updateFilterStyle: (newFilterStyle) =>
    set(() => ({ _FilterStyle: newFilterStyle })),
}));

export default useStore;
