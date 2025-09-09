/**
 * 可拖拽图片组件
 */

import React, { useRef } from "react";
import useStore from "@/store";
import { useDrag } from "@/hooks/useDrag";
import { useImageStyle } from "@/hooks/useImageStyle";
import styles from "./index.module.less";

function DraggableImage() {
  const imageRef = useRef(null);
  const _ImageStyle = useImageStyle(); // 🚀 使用计算的CSS样式
  const _ImageRatio = useStore((state) => state._ImageRatio);
  const _ImageBase64Url = useStore((state) => state._ImageBase64Url);

  const { isDragging, handleMouseDown } = useDrag(imageRef);

  const getImageRatioStyle = () => {
    const { width, height } = _ImageRatio;
    return {
      aspectRatio: `${width} / ${height}`,
    };
  };

  if (!_ImageBase64Url) return null;

  return (
    <img
      ref={imageRef}
      alt=""
      draggable="false"
      className={`${styles.image} ${isDragging ? styles.dragging : ""}`}
      src={_ImageBase64Url}
      style={{
        ..._ImageStyle,
        ...getImageRatioStyle(),
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
    />
  );
}

export default DraggableImage;
