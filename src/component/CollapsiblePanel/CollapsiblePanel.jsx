import React from "react";
import clsx from "clsx";
import styles from "./index.module.less";
import ChevronDown from "@/assets/icons/ChevronDown";

/**
 * 受控模式的折叠面板组件
 *
 * @param {string} title - 面板标题（必填）
 * @param {boolean} expanded - 展开状态（受控，必填）
 * @param {function} onToggle - 状态切换回调（必填）
 * @param {React.ReactNode} children - 面板内容
 * @param {string} className - 自定义样式类名
 * @param {boolean} disabled - 是否禁用
 */
function CollapsiblePanel({
  title,
  expanded,
  onToggle,
  children,
  className,
  disabled = false,
}) {
  // CSS Grid 方案不需要复杂的状态管理

  /**
   * 处理点击切换
   */
  const handleToggle = () => {
    if (disabled) return;
    onToggle(!expanded);
  };

  /**
   * 处理键盘事件
   */
  const handleKeyDown = (event) => {
    if (disabled) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle(!expanded);
    }
  };

  // CSS Grid 动画方案 - 无需 JavaScript 控制高度

  return (
    <div className={clsx(styles.panel, className)}>
      {/* 面板头部 - 完全按照现有组件的交互风格 */}
      <div
        className={clsx(styles.header, {
          [styles.headerDisabled]: disabled,
        })}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-expanded={expanded}
        aria-controls="panel-content"
        aria-disabled={disabled}
      >
        {/* 标题 */}
        <span className={styles.title}>{title}</span>

        {/* 展开/折叠指示器 - 使用独立的图标组件 */}
        <ChevronDown
          className={clsx(styles.chevron, {
            [styles.chevronExpanded]: expanded,
          })}
          width={16}
          height={16}
        />
      </div>

      {/* 面板内容 - CSS Grid 丝滑动画 */}
      <div
        className={clsx(styles.contentWrapper, {
          [styles.contentWrapperExpanded]: expanded,
        })}
      >
        <div className={styles.content} id="panel-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default CollapsiblePanel;
