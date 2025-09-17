import React from "react";
import styles from "./index.module.less";

/**
 * 🎨 简单颜色选择器组件
 */
function ColorPicker({
  value = "#000000",
  onChange,
  disabled = false,
  showText = false,
}) {
  const handleColorChange = (e) => {
    if (onChange && !disabled) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="color"
        value={value}
        onChange={handleColorChange}
        disabled={disabled}
        className={styles.colorInput}
      />
      {showText && (
        <div className={styles.colorDisplay} style={{ backgroundColor: value }}>
          <div className={styles.colorValue}>{value.toUpperCase()}</div>
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
