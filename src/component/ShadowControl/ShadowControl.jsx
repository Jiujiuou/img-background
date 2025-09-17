import React, { useEffect } from "react";
import useStore from "@/store/index";
import Switch from "@/component/Switch/Switch";
import InlineControl from "@/component/InlineControl/InlineControl";
import LightPositionControl from "@/component/LightPositionControl/LightPositionControl.jsx";
import ColorPicker from "@/component/ColorPicker/ColorPicker";
import { updateAdvancedShadowFromLightPosition } from "@/utils/shadowCalculation";

import styles from "./index.module.less";

function ShadowControl() {
  // 🌟 从store获取阴影控制状态
  const {
    showShadow,
    lightX,
    lightY,
    shadowTint, // 保留阴影颜色
  } = useStore((state) => state._ImageControlValues);

  const updateImageControlValues = useStore(
    (state) => state.updateImageControlValues
  );

  // 🚀 初始化时计算一次阴影，确保store中的阴影值与光源位置匹配
  useEffect(() => {
    // 使用简化的阴影计算函数
    updateAdvancedShadowFromLightPosition(
      lightX,
      lightY,
      { tint: shadowTint }, // 直接传入控制参数
      updateImageControlValues
    );
  }, [lightX, lightY, shadowTint, updateImageControlValues]);

  // 切换阴影显示状态
  const changeShadowVisibleStatus = (isOn) => {
    updateImageControlValues({ showShadow: isOn });
  };

  // 🌟 处理光源位置变化，实时更新阴影效果
  const handleLightPositionChange = (lightData) => {
    updateAdvancedShadowFromLightPosition(
      lightData.lightX,
      lightData.lightY,
      { tint: shadowTint }, // 直接传入控制参数
      updateImageControlValues
    );
  };

  // 🎯 处理阴影颜色变化
  const handleTintChange = (value) => {
    updateImageControlValues({ shadowTint: value });
  };

  return (
    <div className={styles.wrapper}>
      {/* 阴影开关 */}
      <InlineControl label={"阴影控制"}>
        <Switch checked={showShadow} onChange={changeShadowVisibleStatus} />
      </InlineControl>

      {/* 🌟 当阴影开启时显示控制选项 */}
      {showShadow && (
        <>
          {/* 光源位置控制 */}
          <InlineControl label={"光源位置"}>
            <LightPositionControl
              lightX={lightX}
              lightY={lightY}
              onChange={handleLightPositionChange}
              size={120}
              showGrid={true}
              showValues={false}
              gridDensity={3}
            />
          </InlineControl>

          {/* 阴影颜色控制 */}
          <InlineControl label={"阴影颜色"}>
            <ColorPicker value={shadowTint} onChange={handleTintChange} />
          </InlineControl>
        </>
      )}
    </div>
  );
}

export default ShadowControl;
