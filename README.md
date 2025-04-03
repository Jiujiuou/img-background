启动项目
`npm run dev`

打包项目
`npm run build`

## 项目简介

这是一个图片背景处理工具，用于调整图片比例、添加滤镜、修改背景等操作。

## 功能特点

- 图片上传与预览
- 背景类型选择（纯色、渐变、图片等）
- 图片比例调整
- 滤镜效果添加
- 实时预览效果
- 一键导出处理后的图片

## 安装与使用

### 环境要求

- Node.js 16.x 或更高版本
- npm 8.x 或更高版本

### 安装步骤

1. 克隆项目

   ```
   git clone [仓库地址]
   cd img-background
   ```

2. 安装依赖

   ```
   npm install
   ```

3. 本地开发

   ```
   npm run dev
   ```

4. 项目构建
   ```
   npm run build
   ```

## 项目结构

```
img-background/
├── .git/                  # Git 版本控制目录
├── .husky/                # Git hooks 配置
├── node_modules/          # 依赖包
├── src/                   # 源代码目录
│   ├── component/         # 组件目录
│   │   ├── Switch/            # 开关组件
│   │   ├── Title/             # 标题组件
│   │   ├── ImageRatioControl/ # 图片比例控制
│   │   ├── ImageUpload/       # 图片上传组件
│   │   ├── InlineControl/     # 内联控制组件
│   │   ├── RatioControl/      # 比例控制组件
│   │   ├── Slider/            # 滑块组件
│   │   ├── BackgroundTypeControl/ # 背景类型控制
│   │   ├── FilterControl/     # 滤镜控制组件
│   │   ├── Header/            # 头部组件
│   │   └── ImageControl/      # 图片控制组件
│   ├── constant/          # 常量定义目录
│   ├── font/              # 字体资源目录
│   ├── store/             # 状态管理目录
│   ├── utils/             # 工具函数目录
│   ├── App.jsx            # 主应用组件
│   ├── index.css          # 全局样式
│   ├── index.module.less  # 模块化样式
│   ├── main.jsx           # 入口文件
│   └── old.jsx            # 旧版本代码
├── .gitignore             # Git忽略配置
├── .windsurfrules         # Windsurf配置
├── README.md              # 项目说明文档
├── afterbuild.cjs         # 构建后处理脚本
├── eslint.config.js       # ESLint 配置
├── favicon.ico            # 网站图标
├── index.html             # 构建后的HTML文件
├── jsconfig.json          # JS配置
├── package-lock.json      # 依赖锁定文件
├── package.json           # 项目配置和依赖
├── template.html          # HTML模板
└── vite.config.js         # Vite构建配置
```

## 技术栈

- React
- Zustand (状态管理)
- Arco Design & Semi UI (UI 组件库)
- Vite (构建工具)
- Less (CSS 预处理器)

## 浏览器兼容性

- Chrome（推荐）
- Firefox
- Edge
- Safari

## 开发指南

1. 组件开发规范

   - 组件应放置在 src/component 目录下
   - 每个组件使用独立文件夹，包含 JSX 和样式文件

2. 状态管理
   - 使用 Zustand 进行全局状态管理
   - 相关状态定义在 src/store 目录

## 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 项目分析报告

### 项目概述

本项目是一个基于 React 的图片背景生成工具，允许用户上传图片，调整图片比例，添加背景效果，应用滤镜，并导出处理后的图片。主要用于社交媒体内容创作、产品展示等场景，能够快速生成具有特定比例和美观背景的图片。

### 核心功能

1. **图片上传**：支持用户上传本地图片作为主体或背景
2. **比例控制**：提供多种预设比例（1:1, 16:9 等）用于最终导出
3. **图片位置调整**：调整图片在画布中的位置和大小
4. **背景选择**：支持图片背景和纯色背景两种模式
5. **滤镜效果**：针对图片背景模式，提供模糊度、亮度、饱和度调整
6. **颜色选择**：针对纯色背景模式，提供颜色选择器
7. **实时预览**：所有调整可在左侧预览区实时查看效果
8. **高清导出**：支持将处理后的图片以 PNG 格式导出，且支持高分辨率

### 技术实现

1. **状态管理**：使用 Zustand 管理全局状态，包括图片数据、样式选项等
2. **组件化设计**：采用高度组件化设计，每个功能模块独立封装
3. **图片处理**：使用 html-to-image 库将 DOM 元素转换为图片
4. **样式系统**：使用 CSS Modules (Less)实现模块化样式
5. **UI 组件**：集成 Arco Design 和 Semi UI 组件库
6. **构建工具**：使用 Vite 进行项目构建和开发

### 项目特点

1. **轻量级**：专注于核心图片处理功能，无冗余功能
2. **易用性**：界面简洁，操作直观
3. **高性能**：使用 React 的函数式组件和 Hooks，优化渲染性能
4. **模块化**：良好的代码组织和模块化设计，便于扩展和维护
5. **本地处理**：所有图片处理在本地完成，无需服务器端处理，保护用户隐私

## 许可证

MIT
