import React, { useState } from "react";
import {
  Slider,
  Switch,
  RadioGroup,
  Radio,
  ColorPicker,
} from "@douyinfe/semi-ui";
import { IconBolt } from "@douyinfe/semi-icons";
import "./index.less";

const BackgroundType = {
  IMAGE_BACKGROUND: "imageBackground",
  COLOR_BACKGROUND: "colorBackground",
};

const defaultBackgroundColor = "#3d6ef5";
const defaultShadowColor = "#000";

function App() {
  const [imageData, setImageData] = useState("");
  const [topValue, setTopValue] = useState(50);
  const [leftValue, setLeftValue] = useState(50);
  const [shadowValue, setShadowValue] = useState(30);
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(14);
  const [offsetY, setOffsetY] = useState(14);
  const [blurRadius, setBlurRadius] = useState(22);
  const [spreadRadius, setSpreadRadius] = useState(-12);
  const [shadowColor, setShadowColor] = useState(defaultShadowColor);
  const [openBackgroundBlur, setOpenBackgroundBlur] = useState(true);
  const [imgHeight, setImgHeight] = useState(70);
  const [backgroundType, setBackgroundType] = useState(
    BackgroundType.IMAGE_BACKGROUND
  );

  const [backgroundColor, setBackgroundColor] = useState(
    defaultBackgroundColor
  );
  const [backgroundBrightness, setBackgroundBrightness] = useState(100);
  const [imgBlur, setImgBlur] = useState(20);

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

  const handleChangeBackgroundType = () => {
    setBackgroundType(
      backgroundType === BackgroundType.IMAGE_BACKGROUND
        ? BackgroundType.COLOR_BACKGROUND
        : BackgroundType.IMAGE_BACKGROUND
    );
  };

  return (
    <div className="wrapper">
      <div className="img-wrapper">
        <div
          className="background"
          style={
            backgroundType === BackgroundType.IMAGE_BACKGROUND
              ? {
                  backgroundImage: `url(${imageData})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: `${
                    openBackgroundBlur
                      ? `blur(${imgBlur}px) brightness(${backgroundBrightness}%)`
                      : `brightness(${backgroundBrightness}%)`
                  }`,
                }
              : {
                  backgroundColor: `${backgroundColor}`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
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
              height: `${imgHeight}%`,
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
            点击或将文件拖拽到此处上传
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
        <div className="row">
          图片大小
          <Slider
            defaultValue={imgHeight}
            onChange={setImgHeight}
            style={{ width: "180px" }}
            handleDot={{ size: "4px", color: "blue" }}
          ></Slider>
        </div>

        <div className="title">阴影</div>
        <div className="row">
          阴影颜色
          <ColorPicker
            defaultValue={ColorPicker.colorStringToValue(defaultShadowColor)}
            onChange={(value) => {
              setShadowColor(value.hex);
            }}
            alpha={true}
            usePopover={true}
            width={200}
            height={200}
          />
        </div>
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
        <div className="title">背景</div>

        <RadioGroup
          onChange={handleChangeBackgroundType}
          value={backgroundType}
          name="demo-radio-group"
        >
          <Radio value={BackgroundType.IMAGE_BACKGROUND}>图片背景</Radio>
          <Radio value={BackgroundType.COLOR_BACKGROUND}>纯色背景</Radio>
        </RadioGroup>

        {backgroundType === BackgroundType.IMAGE_BACKGROUND && (
          <div>
            <div className="row">
              背景模糊
              <Switch
                checkedText="开"
                uncheckedText="关"
                defaultChecked={true}
                onChange={() => setOpenBackgroundBlur(!openBackgroundBlur)}
              />
            </div>
            <div className="row">
              模糊程度
              <Slider
                min={0}
                max={50}
                defaultValue={imgBlur}
                onChange={setImgBlur}
                style={{ width: "180px" }}
                handleDot={{ size: "4px", color: "blue" }}
                showBoundary={false}
              ></Slider>
            </div>
            <div className="row">
              背景亮度
              <Slider
                min={0}
                max={300}
                defaultValue={backgroundBrightness}
                onChange={setBackgroundBrightness}
                style={{ width: "180px" }}
                handleDot={{ size: "4px", color: "blue" }}
                showBoundary={false}
              ></Slider>
            </div>
          </div>
        )}
        {backgroundType === BackgroundType.COLOR_BACKGROUND && (
          <div className="row">
            背景颜色
            <ColorPicker
              defaultValue={ColorPicker.colorStringToValue(
                defaultBackgroundColor
              )}
              onChange={(value) => {
                setBackgroundColor(value.hex);
              }}
              alpha={true}
              usePopover={true}
              width={200}
              height={200}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
