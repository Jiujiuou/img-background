import React from "react";

/**
 * 向下箭头图标组件
 * @param {Object} props - 图标属性
 * @param {string} props.className - 自定义样式类名
 * @param {number} props.width - 图标宽度，默认 16
 * @param {number} props.height - 图标高度，默认 16
 * @param {Object} props.style - 自定义样式
 */
function ChevronDown({ className, width = 16, height = 16, style, ...props }) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ChevronDown;
