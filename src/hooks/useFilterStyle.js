import { useMemo } from "react";
import useStore from "@/store";

/**
 * 计算背景滤镜CSS样式的自定义Hook
 * 从_FilterControlValues派生出背景滤镜的实际CSS样式
 */
export const useFilterStyle = () => {
  const { blur, brightness, saturate } = useStore(
    (state) => state._FilterControlValues
  );

  return useMemo(() => {
    return {
      filter: `blur(${blur}px) brightness(${brightness}%) saturate(${saturate}%)`,
    };
  }, [blur, brightness, saturate]);
};

export default useFilterStyle;
