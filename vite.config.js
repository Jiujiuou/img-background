import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // '@' 映射到 src 目录
    },
  },
  server: {
    // 修改开发服务器的入口文件路径
    open: "/template.html", // 在浏览器中打开 template.html
    port: 3000, // 设置默认端口为 3000
  },
  build: {
    rollupOptions: {
      input: "template.html", // 更新后的入口文件
      main: "template.html", // 指定新的入口文件
    },
  },
});
