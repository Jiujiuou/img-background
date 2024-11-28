import { create } from "zustand";

const useStore = create((set) => ({
  _Ratio: {
    width: 1,
    height: 1,
  },
  updateRatio: (newRatio) => set(() => ({ _Ratio: newRatio })),

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
    // height: `${size}%`,
  },
  updateImageStyle: (newImageStyle) =>
    set(() => ({ _ImageStyle: newImageStyle })),
}));

export default useStore;
