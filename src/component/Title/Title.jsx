import React, { useEffect, useState } from "react";

import style from "./index.module.less";

function Title({ title }) {
  return (
    <div className="wrapper">
      <div className={style.title}>{title}</div>
    </div>
  );
}
export default Title;
