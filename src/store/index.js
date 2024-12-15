import { create } from "zustand";
import { BACKGROUND_TYPE_MAP } from "@/constant/index";

const useStore = create((set) => ({
  _Ratio: {
    width: 1,
    height: 1,
  },
  updateRatio: (newRatio) => set(() => ({ _Ratio: newRatio })),

  _ImageRatio: {
    width: 1,
    height: 1,
  },
  updateImageRatio: (newRatio) => set(() => ({ _ImageRatio: newRatio })),

  _FilterStyle: {
    // filter: `blur(${blur}px) brightness(${brightness}%) saturate(${saturate}%)`,
  },
  updateFilterStyle: (newFilterStyle) =>
    set(() => ({ _FilterStyle: newFilterStyle })),

  _ImageBase64Url: "",
  updateImageBase64Url: (newImageBase64Url) =>
    set(() => ({
      _ImageBase64Url: newImageBase64Url,
    })),

  _ImageStyle: {
    // top: `${top}%`,
    // left: `${left}%`,
    // width: `${size}%`,
  },
  updateImageStyle: (newImageStyle) =>
    set(() => ({ _ImageStyle: newImageStyle })),

  _BackgroundType: BACKGROUND_TYPE_MAP[0],
  updateBackgroundType: (newBackgroundType) =>
    set(() => ({ _BackgroundType: newBackgroundType })),

  _BackgroundColor: "#000",
  updateBackgroundColor: (newBackgroundColor) =>
    set(() => ({ _BackgroundColor: newBackgroundColor })),
}));

export default useStore;
