import React from "react";
import ImageUpload from "@/component/ImageUpload/ImageUpload";
import RatioControl from "@/component/RatioControl/RatioControl";
import ImageRatioControl from "@/component/ImageRatioControl/ImageRatioControl";
import BackgroundTypeControl from "@/component/BackgroundTypeControl/BackgroundTypeControl";
import FilterControl from "@/component/FilterControl/FilterControl";
import ImageControl from "@/component/ImageControl/ImageControl";
import styles from "./index.module.less";

function ControlPanel() {
  return (
    <div className={styles.control}>
      <ImageUpload />
      <RatioControl />
      <ImageRatioControl />
      <BackgroundTypeControl />
      <FilterControl />
      <ImageControl />
    </div>
  );
}

export default ControlPanel;
