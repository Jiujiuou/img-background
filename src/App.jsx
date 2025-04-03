import React from "react";
import Preview from "@/component/Preview/Preview";
import ControlPanel from "@/component/ControlPanel/ControlPanel";
import styles from "./index.module.less";

function App() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Preview />
        <ControlPanel />
      </div>
    </div>
  );
}

export default App;
