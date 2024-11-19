import React, { useEffect, useState } from "react";
import Header from "./component/Header";
import "./index.less";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="preview">
			<div className="download-area"></div>
		</div>
        <div className="control"></div>
      </div>
    </div>
  );
}

export default App;
