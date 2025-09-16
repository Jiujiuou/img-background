import React from "react";
import useStore from "@/store/index";
import Switch from "@/component/Switch/Switch";
import InlineControl from "@/component/InlineControl/InlineControl";

import styles from "./index.module.less";

function ShadowControl() {
  // 从store获取阴影控制状态
  const showShadow = useStore((state) => state._ImageControlValues.showShadow);
  const updateImageControlValues = useStore(
    (state) => state.updateImageControlValues
  );

  // 切换阴影显示状态
  const changeShadowVisibleStatus = (isOn) => {
    updateImageControlValues({ showShadow: isOn });
  };

  return (
    <div className={styles.wrapper}>
      <InlineControl label={"阴影控制"}>
        <Switch checked={showShadow} onChange={changeShadowVisibleStatus} />
      </InlineControl>
    </div>
  );
}

export default ShadowControl;
