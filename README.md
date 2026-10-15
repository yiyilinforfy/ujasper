# University of Jasper

University of Jasper 官网的 Vue 3 + TypeScript + Vite + Vue Router 版本。文字、样式和页面结构均原样迁移自原静态站点（`jasper-site/dist`）。

## 运行

需要 Node.js 20.19+ 或 22.12+（Vite 8 的要求）。

```sh
nvm use        # 读取 .nvmrc
npm install
npm run dev    # http://localhost:5173
npm run build  # 输出到 dist/
```

线上部署需要把未知路径回退到 `index.html`（SPA history 模式）。旧地址如 `/vision.html` 作为路由别名保留，仍可访问。

## 导出单文件 HTML（供 AI 审核 UI/UX）

```sh
npm run review:export -- discover        # 首页，输出 ~/Desktop/review/discover.html
npm run review:export -- vision program  # 多个页面
npm run review:export -- all             # 全部 12 页
```

脚本用本机 Chrome 渲染页面，只保留该页实际用到的 CSS（按原样式表分段、不含打印样式），并附带菜单和示例切换的交互。图片替换为保持原比例的灰色占位，链接和下载按钮保留样式但不跳转（原目标记录在 `data-placeholder` 属性里）。可用 `REVIEW_DIR` 指定输出目录、`CHROME_PATH` 指定浏览器路径。

## 目录对应

| 原文件 | 路由 | 组件 |
| --- | --- | --- |
| `index.html` | `/` | `src/pages/HomePage.vue` |
| `vision.html` | `/vision` | `src/pages/VisionPage.vue` |
| `program.html` | `/program` | `src/pages/ProgramPage.vue` |
| `teachers.html` | `/teachers` | `src/pages/TeachersPage.vue` |
| `students.html` | `/students` | `src/pages/StudentsPage.vue` |
| `publications.html` | `/publications` | `src/pages/PublicationsPage.vue` |
| `support.html` | `/support` | `src/pages/SupportPage.vue` |
| `letter.html` | `/letter` | `src/pages/LetterPage.vue` |
| `fieldbook.html` | `/fieldbook` | `src/pages/FieldbookPage.vue` |
| `join.html` | `/join` | `src/pages/JoinPage.vue` |
| `care.html` | `/care` | `src/pages/CarePage.vue` |
| `sources.html` | `/sources` | `src/pages/SourcesPage.vue` |

- `src/App.vue`：所有页面共用的跳转链接、状态栏、页头、`<main id="main">`、页脚和导出弹窗。
- `src/components/`：`AppHeader`、`AppFooter`、`AppLink`（不带 `aria-current` 的路由链接，因为样式会给所有 `nav a[aria-current]` 加高亮）、`ExportDialog`。
- `src/composables/`：`useApplicationForm`（教师/学生申请草稿表单）、`useExportDialog`（文本导出，即原来的 `window.jasperDownload`）。
- `src/router/index.ts`：路由，以及每页的标题、描述、`<body>` class 和当前导航项。
- `src/styles/`：原站 5 个样式表，按原顺序全局引入。
- `public/`：图片、PDF、Word 章程、ZIP、申请表模板和 `weeks.json`，访问路径与原站一致。

学习手册（Fieldbook）的本地存储键仍为 `jasper-fieldbook-v1`，同一域名下已保存的笔记可以继续读取。
