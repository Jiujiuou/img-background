import React, { useState, useRef, useCallback, useMemo } from "react";
import styles from "./index.module.less";

/**
 * SVG 版本的 2D 光源位置控制组件
 *
 * 性能优化版本：使用 SVG 替代多个 DIV 节点
 *
 * 优势：
 * - 单一 DOM 节点，更好的渲染性能
 * - 硬件加速，更流畅的动画
 * - 矢量图形，高分辨率友好
 * - 更少的内存占用
 */
const LightPositionControl = ({
  lightX = 50,
  lightY = 50,
  onChange,
  size = 200,
  showGrid = true,
  showValues = true,
  disabled = false,
  gridDensity = 5,
  className,
  style,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  /**
   * 坐标转换：将鼠标坐标转换为百分比
   */
  const convertToPercentage = useCallback(
    (clientX, clientY) => {
      if (!containerRef.current) return { x: lightX, y: lightY };

      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const relativeY = clientY - rect.top;

      const percentX = Math.max(
        0,
        Math.min(100, (relativeX / rect.width) * 100)
      );
      const percentY = Math.max(
        0,
        Math.min(100, (relativeY / rect.height) * 100)
      );

      return { x: percentX, y: percentY };
    },
    [lightX, lightY]
  );

  /**
   * 计算相对于中心点的位置数据
   * 这些数据将用于阴影偏移的计算
   */
  const calculateCenterRelativeData = useCallback((lightX, lightY) => {
    // 相对于中心点（50%, 50%）的偏移量
    const deltaX = lightX - 50; // -50 到 +50
    const deltaY = lightY - 50; // -50 到 +50

    // 距离中心的欧几里得距离
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // 光源相对于中心的角度（弧度）
    const angle = Math.atan2(deltaY, deltaX);

    // 角度转换为度数
    const angleDegrees = (angle * 180) / Math.PI;

    // 标准化距离（0-1，最大距离为从中心到角落约70.7%）
    const normalizedDistance = Math.min(distance / 70.7, 1);

    return {
      // 基础位置数据
      lightX,
      lightY,

      // 相对于中心的偏移
      deltaX,
      deltaY,

      // 距离和角度
      distance,
      normalizedDistance,
      angle,
      angleDegrees,

      // 预计算的阴影偏移（光源与阴影方向相反）
      shadowOffsetX: -deltaX * 0.3, // 可调整的缩放系数
      shadowOffsetY: -deltaY * 0.3,

      // 基于距离的阴影强度
      shadowIntensity: normalizedDistance,
    };
  }, []);

  /**
   * 拖拽事件处理
   */
  const handleMouseDown = useCallback(
    (e) => {
      if (disabled) return;

      e.preventDefault();
      setIsDragging(true);

      const { x, y } = convertToPercentage(e.clientX, e.clientY);
      const centerRelativeData = calculateCenterRelativeData(x, y);
      onChange?.(centerRelativeData);

      const handleMouseMove = (moveEvent) => {
        // 使用 requestAnimationFrame 确保流畅的更新
        requestAnimationFrame(() => {
          const { x: newX, y: newY } = convertToPercentage(
            moveEvent.clientX,
            moveEvent.clientY
          );
          const centerRelativeData = calculateCenterRelativeData(newX, newY);
          onChange?.(centerRelativeData);
        });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [disabled, convertToPercentage, onChange, calculateCenterRelativeData]
  );

  /**
   * 生成网格点的 SVG 路径
   */
  const generateGridDots = useMemo(() => {
    if (!showGrid) return [];

    const dots = [];
    const dotsPerQuadrant = gridDensity;

    for (let quadrant = 0; quadrant < 4; quadrant++) {
      const isRightQuad = quadrant % 2 === 1;
      const isBottomQuad = quadrant >= 2;

      for (let row = 0; row < dotsPerQuadrant; row++) {
        for (let col = 0; col < dotsPerQuadrant; col++) {
          const quadrantRange = 40;
          const startOffset = 5;
          const stepSize = quadrantRange / dotsPerQuadrant;

          let x, y;

          if (isRightQuad) {
            x = 50 + startOffset + (col + 0.5) * stepSize;
          } else {
            x = 50 - startOffset - (col + 0.5) * stepSize;
          }

          if (isBottomQuad) {
            y = 50 + startOffset + (row + 0.5) * stepSize;
          } else {
            y = 50 - startOffset - (row + 0.5) * stepSize;
          }

          // 转换为 SVG 坐标（0-size 范围）
          const svgX = (x / 100) * size;
          const svgY = (y / 100) * size;

          dots.push(
            <circle
              key={`dot-${quadrant}-${row}-${col}`}
              cx={svgX}
              cy={svgY}
              r="1"
              fill="rgba(255, 255, 255, 0.15)"
            />
          );
        }
      }
    }

    return dots;
  }, [showGrid, gridDensity, size]);

  /**
   * 容器样式
   */
  const containerStyle = useMemo(
    () => ({
      width: size,
      height: size,
      ...style,
    }),
    [size, style]
  );

  /**
   * 光源点位置（SVG 坐标）
   */
  const lightPointPosition = useMemo(
    () => ({
      cx: (lightX / 100) * size,
      cy: (lightY / 100) * size,
    }),
    [lightX, lightY, size]
  );

  return (
    <div className={styles.wrapper}>
      {/* SVG 控制面板容器 */}
      <div
        ref={containerRef}
        className={`${styles.container} ${disabled ? styles.disabled : ""} ${
          className || ""
        }`}
        style={containerStyle}
        onMouseDown={handleMouseDown}
      >
        {/* 单一 SVG 元素包含所有图形 */}
        <svg
          width={size}
          height={size}
          className={styles.svgGrid}
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {/* 网格点 */}
          {generateGridDots}

          {/* 坐标轴 */}
          <line
            x1={0}
            y1={size / 2}
            x2={size}
            y2={size / 2}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1"
          />
          <line
            x1={size / 2}
            y1={0}
            x2={size / 2}
            y2={size}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1"
          />
        </svg>

        {/* 光源控制点 - HTML元素用于支持CSS conic-gradient */}
        <div
          className={`${styles.lightPoint} ${
            isDragging ? styles.dragging : ""
          }`}
          style={{
            left: `${lightX}%`,
            top: `${lightY}%`,
          }}
        />
      </div>

      {/* 数值显示 */}
      {showValues && (
        <div className={styles.values}>
          <div>
            位置: X: {Math.round(lightX)} Y: {Math.round(lightY)}
          </div>
          <div>
            中心偏移: Δ{Math.round(lightX - 50) >= 0 ? "+" : ""}
            {Math.round(lightX - 50)} Δ{Math.round(lightY - 50) >= 0 ? "+" : ""}
            {Math.round(lightY - 50)}
          </div>
          <div>
            距离:{" "}
            {Math.round(
              Math.sqrt(Math.pow(lightX - 50, 2) + Math.pow(lightY - 50, 2))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LightPositionControl;
