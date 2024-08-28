import React, { useState } from "react";
import { Slider } from "@douyinfe/semi-ui";

import { IconBolt } from "@douyinfe/semi-icons";
import "./index.less";

function App() {
  const [imageData, setImageData] = useState("");
  const [topValue, setTopValue] = useState(50);
  const [leftValue, setLeftValue] = useState(50);
  const [shadowValue, setShadowValue] = useState(30);
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [blurRadius, setBlurRadius] = useState(0);
  const [spreadRadius, setSpreadRadius] = useState(0);
  const [shadowColor, setShadowColor] = useState("#000");

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const imgData = e.target.result;
      setImageData(imgData);
    };
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (
    <div className="wrapper">
      <div className="img-wrapper">
        <div
          className="background"
          style={
            imageData
              ? {
                  backgroundImage: `url(${imageData})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(30px)",
                }
              : null
          }
        ></div>
        {imageData && (
          <img
            src={imageData}
            alt=""
            className="img"
            style={{
              top: `${topValue}%`,
              left: `${leftValue}%`,
              boxShadow: `${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${shadowColor}`,
            }}
          />
        )}
      </div>
      <div className="control">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`upload-area ${isDragging ? "dragging" : ""}`}
          onClick={() => document.getElementById("upload-input").click()}
        >
          <div className="text">
            <IconBolt />
            点击或将文件拖拽到这里上传
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e.target.files[0])}
            style={{ display: "none" }}
            id="upload-input"
          />
        </div>
        <div className="title">图片位置</div>
        <div className="row">
          水平位置
          <Slider
            defaultValue={leftValue}
            onChange={setLeftValue}
            style={{ width: "180px" }}
            handleDot={{ size: "4px", color: "blue" }}
            showBoundary={false}
          ></Slider>
        </div>
        <div className="row">
          垂直位置
          <Slider
            defaultValue={topValue}
            onChange={setTopValue}
            style={{ width: "180px" }}
            handleDot={{ size: "4px", color: "blue" }}
          ></Slider>
        </div>
        <div className="title">阴影</div>
        <div className="row">
          水平位置
          <Slider
            min={-50}
            max={50}
            defaultValue={offsetX}
            onChange={setOffsetX}
            style={{ width: "180px" }}
            handleDot={{ size: "4px", color: "blue" }}
            showBoundary={false}
          ></Slider>
        </div>
        <div className="row">
          垂直位置
          <Slider
            min={-50}
            max={50}
            defaultValue={offsetY}
            onChange={setOffsetY}
            style={{ width: "180px" }}
            handleDot={{ size: "4px", color: "blue" }}
            showBoundary={false}
          ></Slider>
        </div>
        <div className="row">
          模糊半径
          <Slider
            min={-50}
            max={50}
            defaultValue={blurRadius}
            onChange={setBlurRadius}
            style={{ width: "180px" }}
            handleDot={{ size: "4px", color: "blue" }}
            showBoundary={false}
          ></Slider>
        </div>
        <div className="row">
          扩散半径
          <Slider
            min={-50}
            max={50}
            defaultValue={spreadRadius}
            onChange={setSpreadRadius}
            style={{ width: "180px" }}
            handleDot={{ size: "4px", color: "blue" }}
            showBoundary={false}
          ></Slider>
        </div>
      </div>
    </div>
  );
}

export default App;
