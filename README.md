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

- Node.js 18.x 或更高版本 (推荐使用 nvm use 18)
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

- **React 18.3.1** - 前端框架，使用函数式组件和 Hooks
- **Zustand 5.0.1** - 轻量级状态管理库，替代 Redux
- **Arco Design & Semi UI** - 高质量 UI 组件库，提供 ColorPicker 等组件
- **Vite 5.4.1** - 现代构建工具，快速开发和构建
- **Less 4.2.0** - CSS 预处理器，支持模块化样式
- **html-to-image 1.11.11** - 将 DOM 元素转换为图片的核心库
- **downloadjs 1.4.7** - 处理文件下载功能
- **clsx 2.1.1** - 条件样式类名工具库

## 浏览器兼容性

- Chrome（推荐）
- Firefox
- Edge
- Safari

## 开发指南

### 1. 组件开发规范

- **组件结构**: 组件应放置在 `src/component` 目录下
- **文件组织**: 每个组件使用独立文件夹，包含 JSX 和 `index.module.less` 样式文件
- **命名规范**: 采用 PascalCase 命名组件文件夹和文件名
- **样式规范**: 使用 CSS Modules 避免样式冲突，配合 clsx 进行条件样式

### 2. 状态管理架构

- **Zustand Store**: 全局状态定义在 `src/store/index.js`
- **状态结构**:
  - `_Ratio`: 输出图片比例 (宽高比)
  - `_ImageRatio`: 上传图片原始比例
  - `_ImageBase64Url`: 图片 Base64 数据
  - `_ImageStyle`: 图片位置和样式 (位置、大小、圆角、阴影)
  - `_FilterStyle`: 背景滤镜样式 (模糊、亮度、饱和度)
  - `_BackgroundType`: 背景类型 ("图片背景" | "颜色背景")
  - `_BackgroundColor`: 背景颜色值

### 3. 核心功能实现

- **图片处理**: 使用 `html-to-image` 将 DOM 转换为高清图片
- **配置保存**: 通过 `localStorage` 实现配置的保存和加载
- **响应式布局**: 基于 vh 单位实现自适应预览区域
- **高清导出**: 3 倍放大因子确保导出图片质量

### 4. 工具函数

- `getRatioStyle()`: 根据比例计算样式尺寸
- `getBackgroundStyle()`: 根据背景类型生成背景样式
- `downloadImagePlus()`: 增强版图片下载功能

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

1. **状态管理**：

   - 使用 Zustand 管理全局状态，避免 Redux 的复杂性
   - 采用不可变状态更新模式，确保数据一致性
   - 支持批量配置更新和本地存储持久化

2. **组件化设计**：

   - 高度组件化架构，每个功能模块独立封装
   - 采用组合模式，通过组件组合实现复杂功能
   - 使用 React Hooks 管理组件内部状态和副作用

3. **图片处理核心**：

   - 使用 `html-to-image` 库的 `toCanvas` 方法进行高质量转换
   - 实现 3 倍放大因子确保导出图片清晰度
   - 支持透明背景和复杂 DOM 结构的准确渲染

4. **样式系统**：

   - CSS Modules (Less) 实现作用域隔离，避免样式冲突
   - 基于 CSS 变量的主题系统，便于定制
   - 响应式设计，支持不同屏幕尺寸

5. **UI 组件集成**：

   - Arco Design：提供 ColorPicker、Message 等高质量组件
   - Semi UI：补充特定功能组件
   - 自定义组件：Slider、Switch 等满足特定交互需求

6. **构建和部署**：
   - Vite 构建工具提供快速开发体验
   - 单文件构建模式，便于部署和分发
   - ESLint 代码规范检查，保证代码质量

### 项目特点

1. **轻量级架构**：

   - 专注于核心图片处理功能，避免功能臃肿
   - 依赖包精简，打包体积控制在合理范围
   - 单页面应用，加载速度快

2. **用户体验优先**：

   - 界面简洁直观，学习成本低
   - 实时预览反馈，所见即所得
   - 支持配置保存和加载，提升工作效率

3. **高性能设计**：

   - React 18 函数式组件和 Hooks，优化渲染性能
   - Zustand 轻量级状态管理，减少不必要的重渲染
   - 图片处理采用 Canvas 技术，确保高质量输出

4. **良好的可维护性**：

   - 清晰的代码组织和模块化设计
   - 完善的注释和类型提示
   - 遵循 SOLID 原则，便于扩展和维护

5. **隐私保护**：

   - 所有图片处理在浏览器本地完成
   - 无需服务器端处理，用户数据不会上传
   - 配置信息仅存储在本地 localStorage

6. **现代化开发体验**：
   - Vite 快速构建和热更新
   - ESLint 代码规范和质量检查
   - Git Hooks 自动化流程

## 许可证

MIT
