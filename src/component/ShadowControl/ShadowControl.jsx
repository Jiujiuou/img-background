import React, { useEffect } from "react";
import useStore from "@/store/index";
import Switch from "@/component/Switch/Switch";
import InlineControl from "@/component/InlineControl/InlineControl";
import LightPositionControl from "@/component/LightPositionControl/LightPositionControl.jsx";
import { updateShadowFromLightPosition } from "@/utils/shadowCalculation";

import styles from "./index.module.less";

function ShadowControl() {
  // 从store获取阴影控制状态
  const showShadow = useStore((state) => state._ImageControlValues.showShadow);
  const lightX = useStore((state) => state._ImageControlValues.lightX);
  const lightY = useStore((state) => state._ImageControlValues.lightY);
  const updateImageControlValues = useStore(
    (state) => state.updateImageControlValues
  );

  // 🚀 初始化时计算一次阴影，确保store中的阴影值与光源位置匹配
  useEffect(() => {
    // 只在组件挂载时计算一次，确保阴影值与光源位置同步
    updateShadowFromLightPosition(
      lightX,
      lightY,
      updateImageControlValues,
      "normal"
    );
  }, [lightX, lightY, updateImageControlValues]); // 当光源位置变化时重新计算

  // 切换阴影显示状态
  const changeShadowVisibleStatus = (isOn) => {
    updateImageControlValues({ showShadow: isOn });
  };

  // 🌟 处理光源位置变化，实时更新阴影效果
  const handleLightPositionChange = (lightData) => {
    updateShadowFromLightPosition(
      lightData.lightX,
      lightData.lightY,
      updateImageControlValues,
      "normal" // 使用默认预设
    );
  };

  return (
    <div className={styles.wrapper}>
      <InlineControl label={"阴影控制"}>
        <Switch checked={showShadow} onChange={changeShadowVisibleStatus} />
      </InlineControl>

      {showShadow && (
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
      )}
    </div>
  );
}

export default ShadowControl;
