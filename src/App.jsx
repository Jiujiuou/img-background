import React, { useEffect, useState } from "react"
import {
	Slider,
	Switch,
	RadioGroup,
	Radio,
	ColorPicker,
	Button,
} from "@douyinfe/semi-ui"
import { toJpeg } from "html-to-image"
import download from "downloadjs"
import { IconBolt } from "@douyinfe/semi-icons"
import "./index.less"

const BackgroundType = {
	IMAGE_BACKGROUND: "imageBackground",
	COLOR_BACKGROUND: "colorBackground",
	GRADIENT_COLOR_BACKGROUND: "gradientColorBackground",
}

const options = [
	{ label: "图片背景", value: BackgroundType.IMAGE_BACKGROUND },
	{ label: "纯色背景", value: BackgroundType.COLOR_BACKGROUND },
	{ label: "渐变背景", value: BackgroundType.GRADIENT_COLOR_BACKGROUND },
]

const defaultBackgroundColor = "#3d6ef5"
const defaultShadowColor = "#000"

function App() {
	const [imageData, setImageData] = useState("")
	const [topValue, setTopValue] = useState(50)
	const [leftValue, setLeftValue] = useState(50)

	const [isDragging, setIsDragging] = useState(false)
	const [offsetX, setOffsetX] = useState(14)
	const [offsetY, setOffsetY] = useState(14)
	const [blurRadius, setBlurRadius] = useState(22)
	const [spreadRadius, setSpreadRadius] = useState(-12)
	const [shadowColor, setShadowColor] = useState(defaultShadowColor)
	const [openBackgroundBlur, setOpenBackgroundBlur] = useState(true)
	const [imgHeight, setImgHeight] = useState(70)
	const [backgroundType, setBackgroundType] = useState(
		BackgroundType.IMAGE_BACKGROUND
	)

	const [backgroundColor, setBackgroundColor] = useState(
		defaultBackgroundColor
	)
	const [backgroundBrightness, setBackgroundBrightness] = useState(100)
	const [imgBlur, setImgBlur] = useState(20)
	const [imageBorderRadius, setImageBorderRadius] = useState(20)
	const [gradientBackgroud, setGradientBackgroud] = React.useState(
		"linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)"
	)

	const [backgroundStyle, setBackgroundStyle] = useState({})

	const handleFileChange = (file) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = (e) => {
			const imgData = e.target.result
			setImageData(imgData)
		}
	}

	const handleDrop = (e) => {
		e.preventDefault()
		const files = e.dataTransfer.files
		if (files.length > 0) {
			handleFileChange(files[0])
		}
		setIsDragging(false)
	}

	const handleDragOver = (e) => {
		e.preventDefault()
		setIsDragging(true)
	}

	const handleDownloadImage = () => {
		const element = document.getElementById("img-wrapper")
		toJpeg(element).then(function (dataUrl) {
			download(dataUrl, "my-node.png")
		})
	}

	useEffect(() => {
		const newBackgroundStyle = getBaskgroundStyle()
		setBackgroundStyle(newBackgroundStyle)
	}, [backgroundType, imageData])

	const getBaskgroundStyle = () => {
		if (backgroundType === BackgroundType.IMAGE_BACKGROUND) {
			return {
				backgroundImage: `url(${imageData})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				filter: `${
					openBackgroundBlur
						? `blur(${imgBlur}px) brightness(${backgroundBrightness}%)`
						: `brightness(${backgroundBrightness}%)`
				}`,
			}
		}

		if (backgroundType === BackgroundType.COLOR_BACKGROUND) {
			return {
				backgroundColor: `${backgroundColor}`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}
		}

		return {
			backgroundImage: gradientBackgroud,
		}
	}

	return (
		<div className="wrapper">
			<div className="img-wrapper" id="img-wrapper">
				<div className="background" style={backgroundStyle}></div>
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
							borderRadius: `${imageBorderRadius}px`,
						}}
					/>
				)}
			</div>
			<div className="control">
				<div
					onDrop={handleDrop}
					onDragOver={handleDragOver}
					className={`upload-area ${isDragging ? "dragging" : ""}`}
					onClick={() =>
						document.getElementById("upload-input").click()
					}
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

				<div className="title">图片设置</div>
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
				<div className="row">
					圆角大小
					<Slider
						defaultValue={imageBorderRadius}
						onChange={setImageBorderRadius}
						min={0}
						max={500}
						style={{ width: "180px" }}
						handleDot={{ size: "4px", color: "blue" }}
					></Slider>
				</div>

				<div className="title">阴影</div>
				<div className="row">
					阴影颜色
					<ColorPicker
						defaultValue={ColorPicker.colorStringToValue(
							defaultShadowColor
						)}
						onChange={(value) => {
							setShadowColor(value.hex)
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
					options={options}
					onChange={(e) => setBackgroundType(e.target.value)}
					value={backgroundType}
				/>

				{backgroundType === BackgroundType.IMAGE_BACKGROUND && (
					<div>
						<div className="row">
							背景模糊
							<Switch
								checkedText="开"
								uncheckedText="关"
								defaultChecked={true}
								onChange={() =>
									setOpenBackgroundBlur(!openBackgroundBlur)
								}
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
								setBackgroundColor(value.hex)
							}}
							alpha={true}
							usePopover={true}
							width={200}
							height={200}
						/>
					</div>
				)}

				<Button type="primary" onClick={handleDownloadImage}>
					下载图片
				</Button>
			</div>
		</div>
	)
}

export default App
