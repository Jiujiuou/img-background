/**
 * 图片拖拽功能 Hook
 */

import { useState, useCallback, useRef, useEffect } from "react";
import useStore from "@/store";
import { BOUNDARY_CONFIG, clampPosition } from "@/constant/boundary";
import { useImageStyle } from "./useImageStyle";
export const useDrag = (imageRef) => {
  const { updateImageControlValues, _ImageControlValues, _ImageRatio, _Ratio } =
    useStore();
  const _ImageStyle = useImageStyle(); // 获取计算的CSS样式
  const [isDragging, setIsDragging] = useState(false);

  // 使用 ref 存储拖拽状态，避免闭包问题
  const dragStateRef = useRef({
    mouseOffset: { x: 0, y: 0 }, // 鼠标相对于图片左上角的偏移量（CSS百分比）
    containerRect: null, // 容器的边界信息
  });

  // 使用 ref 存储当前的事件监听器，便于清理
  const activeListenersRef = useRef({
    mousemove: null,
    mouseup: null,
  });

  // 获取当前图片大小
  const getCurrentSize = useCallback(() => {
    return _ImageControlValues.size;
  }, [_ImageControlValues]);

  // 将实际CSS位置转换为用户友好值(0-100)
  const convertToUserValue = useCallback(
    (actualPosition, imageSize, direction) => {
      const bounds = BOUNDARY_CONFIG.calculateBounds(
        imageSize,
        _ImageRatio,
        direction,
        _Ratio
      );
      if (bounds.max === bounds.min) return 50;
      const userValue =
        ((actualPosition - bounds.min) / (bounds.max - bounds.min)) * 100;
      return Math.max(0, Math.min(100, userValue));
    },
    [_ImageRatio, _Ratio]
  );

  // 将用户友好值(0-100)转换为实际CSS位置
  const convertToActualPosition = useCallback(
    (userValue, imageSize, direction) => {
      const bounds = BOUNDARY_CONFIG.calculateBounds(
        imageSize,
        _ImageRatio,
        direction,
        _Ratio
      );
      const actualPosition =
        bounds.min + (userValue / 100) * (bounds.max - bounds.min);
      return Math.max(bounds.min, Math.min(bounds.max, actualPosition));
    },
    [_ImageRatio, _Ratio]
  );

  // 获取当前图片位置
  const getCurrentPosition = useCallback(() => {
    return {
      x: _ImageControlValues.left,
      y: _ImageControlValues.top,
    };
  }, [_ImageControlValues]);

  // 计算新的图片位置（返回用户友好值0-100）
  const calculateNewPosition = useCallback(
    (clientX, clientY) => {
      const { mouseOffset, containerRect } = dragStateRef.current;

      if (!containerRect) return null;

      // 计算鼠标在容器中的位置（CSS百分比）
      const containerX = clientX - containerRect.left;
      const containerY = clientY - containerRect.top;
      const mouseLeft = (containerX / containerRect.width) * 100;
      const mouseTop = (containerY / containerRect.height) * 100;

      // 图片CSS位置 = 鼠标位置 - 偏移量
      const cssLeft = mouseLeft - mouseOffset.x;
      const cssTop = mouseTop - mouseOffset.y;

      // 将CSS位置转换为用户友好值
      const imageSize = getCurrentSize();
      const userLeft = convertToUserValue(cssLeft, imageSize, "horizontal");
      const userTop = convertToUserValue(cssTop, imageSize, "vertical");

      // 应用0-100边界限制
      const clampedLeft = Math.max(0, Math.min(100, userLeft));
      const clampedTop = Math.max(0, Math.min(100, userTop));

      return { left: clampedLeft, top: clampedTop };
    },
    [getCurrentSize, convertToUserValue]
  );

  // 鼠标移动事件处理
  const handleMouseMove = useCallback(
    (event) => {
      const userPosition = calculateNewPosition(event.clientX, event.clientY);

      if (!userPosition) return;

      // 🚀 单一状态更新：只更新用户友好值，CSS样式由useImageStyle自动计算
      updateImageControlValues({
        top: userPosition.top,
        left: userPosition.left,
      });
    },
    [calculateNewPosition, updateImageControlValues]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);

    // 清理事件监听器
    if (activeListenersRef.current.mousemove) {
      document.removeEventListener(
        "mousemove",
        activeListenersRef.current.mousemove
      );
      activeListenersRef.current.mousemove = null;
    }
    if (activeListenersRef.current.mouseup) {
      document.removeEventListener(
        "mouseup",
        activeListenersRef.current.mouseup
      );
      activeListenersRef.current.mouseup = null;
    }

    document.body.style.userSelect = "";
  }, []);

  // 鼠标按下事件处理
  const handleMouseDown = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      const containerElement = imageRef.current?.closest(
        '[id$="download-area"]'
      );
      if (!containerElement) return;

      const containerRect = containerElement.getBoundingClientRect();

      // 获取当前图片的CSS实际位置
      const currentCSSTop = parseFloat(_ImageStyle.top) || 25;
      const currentCSSLeft = parseFloat(_ImageStyle.left) || 25;

      // 计算鼠标在容器中的位置（CSS百分比）
      const containerX = event.clientX - containerRect.left;
      const containerY = event.clientY - containerRect.top;
      const mouseLeft = (containerX / containerRect.width) * 100;
      const mouseTop = (containerY / containerRect.height) * 100;

      // 计算鼠标相对于图片左上角的偏移量（CSS百分比）
      const mouseOffset = {
        x: mouseLeft - currentCSSLeft,
        y: mouseTop - currentCSSTop,
      };

      dragStateRef.current = {
        mouseOffset,
        containerRect,
      };

      setIsDragging(true);
      activeListenersRef.current.mousemove = handleMouseMove;
      activeListenersRef.current.mouseup = handleMouseUp;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";
    },
    [imageRef, _ImageStyle, handleMouseMove, handleMouseUp]
  );

  // 组件卸载清理
  useEffect(() => {
    const listeners = activeListenersRef.current;
    return () => {
      if (listeners.mousemove) {
        document.removeEventListener("mousemove", listeners.mousemove);
      }
      if (listeners.mouseup) {
        document.removeEventListener("mouseup", listeners.mouseup);
      }
      document.body.style.userSelect = "";
    };
  }, []);

  return {
    isDragging,
    handleMouseDown,
  };
};

export default useDrag;
