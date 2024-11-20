import { create } from "zustand";

const useStore = create((set) => ({
  downloadAreaStyle: {
    width: "70vh",
    height: "70vh",
  },
  updateDownloadAreaStyle: (newDownloadAreaStyle) =>
    set(() => ({ downloadAreaStyle: newDownloadAreaStyle })),
}));

export default useStore;
