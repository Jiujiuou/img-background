import React, { useState } from "react";
import ImageUpload from "@/component/ImageUpload/ImageUpload";
import RatioControl from "@/component/RatioControl/RatioControl";
import ImageRatioControl from "@/component/ImageRatioControl/ImageRatioControl";
import BackgroundTypeControl from "@/component/BackgroundTypeControl/BackgroundTypeControl";
import FilterControl from "@/component/FilterControl/FilterControl";
import ImageControl from "@/component/ImageControl/ImageControl";
import ShadowControl from "@/component/ShadowControl/ShadowControl";
import CollapsiblePanel from "@/component/CollapsiblePanel/CollapsiblePanel";
import Title from "@/component/Title/Title";
import styles from "./index.module.less";

function ControlPanel() {
  // 受控组件状态管理
  const [ratioAdjustExpanded, setRatioAdjustExpanded] = useState(false);
  const [imageAdjustExpanded, setImageAdjustExpanded] = useState(false);
  const [shadowExpanded, setShadowExpanded] = useState(false);
  const [backgroundExpanded, setBackgroundExpanded] = useState(false);

  return (
    <div className={styles.control}>
      <ImageUpload />

      {/* shadcn 风格的折叠面板组 */}
      <div className={styles.panelGroup}>
        {/* 比例调整面板 */}
        <CollapsiblePanel
          title="比例调整"
          expanded={ratioAdjustExpanded}
          onToggle={setRatioAdjustExpanded}
        >
          <ImageRatioControl />
          <div style={{ marginBottom: "20px" }}></div>
          <RatioControl />
        </CollapsiblePanel>

        {/* 图片调整面板 */}
        <CollapsiblePanel
          title="图片调整"
          expanded={imageAdjustExpanded}
          onToggle={setImageAdjustExpanded}
        >
          <ImageControl />
        </CollapsiblePanel>

        {/* 阴影控制面板 */}
        <CollapsiblePanel
          title="阴影控制"
          expanded={shadowExpanded}
          onToggle={setShadowExpanded}
        >
          <ShadowControl />
        </CollapsiblePanel>

        {/* 背景设置面板 */}
        <CollapsiblePanel
          title="背景设置"
          expanded={backgroundExpanded}
          onToggle={setBackgroundExpanded}
        >
          <BackgroundTypeControl />
          <div style={{ marginBottom: "20px" }}></div>
          <FilterControl />
        </CollapsiblePanel>
      </div>
    </div>
  );
}

export default ControlPanel;
