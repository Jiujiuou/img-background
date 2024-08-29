import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function injectAssetsToTemplate() {
	return {
		name: "inject-assets-to-template",
		writeBundle(options, bundle) {
			// 找到生成的 JS 和 CSS 文件路径
			const jsFilePath = Object.keys(bundle).find((key) =>
				key.match(/\.js$/)
			)
			const cssFilePath = Object.keys(bundle).find((key) =>
				key.match(/\.css$/)
			)

			if (!jsFilePath || !cssFilePath) {
				throw new Error("JS or CSS file not found in dist/assets")
			}

			const jsFileContent = fs.readFileSync(
				path.resolve(__dirname, "dist", jsFilePath),
				"utf-8"
			)
			const cssFileContent = fs.readFileSync(
				path.resolve(__dirname, "dist", cssFilePath),
				"utf-8"
			)

			console.log("__dirname", __dirname)
			// return

			const templatePath = path.resolve(__dirname, "dist/index.html")
			let template = fs.readFileSync(templatePath, "utf-8")

			template = template.replace(
				`<script type="module" src="/src/main.jsx"></script>`,
				""
			)

			template = template.replace(
				`<script type="module" crossorigin src="/assets/index.js"></script>`,
				""
			)

			template = template.replace(
				`<link rel="stylesheet" crossorigin href="/assets/index.css">`,
				""
			)

			template = template.replace(
				"<script></script>",
				`<script>
          ${jsFileContent}
        </script>`
			)

			template = template.replace(
				"<style></style>",
				`<style>
          ${cssFileContent}
        </style>`
			)

			fs.writeFileSync(templatePath, template)
		},
	}
}

export default defineConfig({
	plugins: [react(), injectAssetsToTemplate()],
	build: {
		rollupOptions: {
			output: {
				assetFileNames: "assets/[name].[ext]", // 确保生成的文件名称包含 hash
				entryFileNames: "assets/[name].js", // 确保 JS 文件的名称和路径
			},
		},
	},
})
