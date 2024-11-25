import React, { useState, useRef } from "react";
import styles from "./index.module.css";
const Slider = ({ min = 0, max = 100, step = 1, value, onChange }) => {
  const [currentValue, setCurrentValue] = useState(value || min);
  const sliderRef = useRef(null);

  const handleSliderClick = (e) => {
    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const sliderWidth = rect.width;

    // 计算值
    const newValue =
      Math.round(((offsetX / sliderWidth) * (max - min)) / step) * step + min;
    setCurrentValue(newValue);
    onChange?.(newValue);
  };

  const handleThumbDrag = (e) => {
    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const offsetX = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const sliderWidth = rect.width;

    // 计算值
    const newValue =
      Math.round(((offsetX / sliderWidth) * (max - min)) / step) * step + min;
    setCurrentValue(newValue);
    onChange?.(newValue);
  };

  const handleMouseDown = () => {
    document.addEventListener("mousemove", handleThumbDrag);
    document.addEventListener(
      "mouseup",
      () => {
        document.removeEventListener("mousemove", handleThumbDrag);
      },
      { once: true }
    );
  };

  const thumbPosition = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className={styles.slider} ref={sliderRef} onClick={handleSliderClick}>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${thumbPosition}%` }}
        ></div>
      </div>
      <div
        className={styles.thumb}
        style={{ left: `${thumbPosition}%` }}
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
};

export default Slider;
