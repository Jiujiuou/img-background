import React, { useState } from "react";
import useStore from "@/store/index";
import Switch from "@/component/Switch/Switch";
import InlineControl from "@/component/InlineControl/InlineControl";
import LightPositionControl from "@/component/LightPositionControl/LightPositionControl.jsx";

import styles from "./index.module.less";

function ShadowControl() {
  // 从store获取阴影控制状态
  const showShadow = useStore((state) => state._ImageControlValues.showShadow);
  const updateImageControlValues = useStore(
    (state) => state.updateImageControlValues
  );

  // 临时的光源位置状态（用于测试组件）
  const [lightPosition, setLightPosition] = useState({
    lightX: 30,
    lightY: 70,
  });

  // 切换阴影显示状态
  const changeShadowVisibleStatus = (isOn) => {
    updateImageControlValues({ showShadow: isOn });
  };

  // 处理光源位置变化，接收完整的中心相对数据
  const handleLightPositionChange = (lightData) => {
    // 更新本地状态用于UI显示
    setLightPosition({
      lightX: lightData.lightX,
      lightY: lightData.lightY,
    });

    // TODO: 后续将这些数据写入 store 用于实际的阴影效果
    // updateImageControlValues({
    //   lightX: lightData.lightX,
    //   lightY: lightData.lightY,
    //   shadowOffsetX: lightData.shadowOffsetX,
    //   shadowOffsetY: lightData.shadowOffsetY,
    //   shadowIntensity: lightData.shadowIntensity,
    // });
  };

  return (
    <div className={styles.wrapper}>
      <InlineControl label={"阴影控制"}>
        <Switch checked={showShadow} onChange={changeShadowVisibleStatus} />
      </InlineControl>

      {showShadow && (
        <InlineControl label={"光源位置"}>
          <LightPositionControl
            lightX={lightPosition.lightX}
            lightY={lightPosition.lightY}
            onChange={handleLightPositionChange}
            size={120}
            showGrid={true}
            showValues={true}
            gridDensity={3}
          />
        </InlineControl>
      )}
    </div>
  );
}

export default ShadowControl;
