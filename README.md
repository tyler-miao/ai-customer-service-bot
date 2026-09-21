<div align="center">

# 💬 AI Customer Service Bot

**智能客服助手**

基于 Vue 3 构建的现代化智能客服前端界面，无缝对接 Dify 工作流 API，开箱即用。

![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white)
![Dify](https://img.shields.io/badge/Dify-API-000000?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

</div>

---

## ✨ 功能亮点

<table>
<tr>
<td width="50%">

### 🎨 现代化 UI
- 精致的消息气泡设计
- 流畅的打字机效果
- 响应式布局，完美适配移动端
- 可折叠侧边栏

</td>
<td width="50%">

### 🤖 智能对话
- 多对话管理（创建 / 切换 / 删除）
- 流式响应，实时输出
- 消息复制、点赞、踩反馈
- 快捷操作按钮

</td>
</tr>
</table>

## 🖼️ 界面预览

```
┌──────────────────────────────────────────────────┐
│  ┌─────────┐  ┌────────────────────────────────┐ │
│  │         │  │   AI 客服助手                    │ │
│  │  对话1   │  │                                │ │
│  │  对话2   │  │   ┌──────────────────────┐     │ │
│  │  对话3   │  │   │ 🤖 你好！有什么可以帮  │     │ │
│  │         │  │   │    你的？              │     │ │
│  │  ─────  │  │   └──────────────────────┘     │ │
│  │  ＋新建  │  │                                │ │
│  │         │  │      ┌──────────────────────┐   │ │
│  │         │  │      │ 👤 我想咨询会员卡     │   │ │
│  └─────────┘  │      └──────────────────────┘   │ │
│               │                                │ │
│               │   ┌──────────────────────┐      │ │
│               │   │ ⌨️ 输入消息...        │      │ │
│               │   └──────────────────────┘      │ │
│               └────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

## 🚀 快速开始

### 环境要求

| 依赖 | 版本 |
|------|------|
| Node.js | 18+ |
| npm | 9+ |

### 安装运行

```bash
# 1. 克隆项目
git clone https://github.com/tyler-miao/ai-customer-service-bot.git
cd ai-customer-service-bot

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

### 配置 Dify API

编辑 `src/App.vue`，填入你的 Dify 配置：

```javascript
const DIFY_API_BASE = 'http://your-dify-api/v1'  // Dify API 地址
const DIFY_API_KEY = 'app-xxxxxxxxxxxx'           // 你的 API Key
```

### 构建生产版本

```bash
npm run build    # 输出到 dist/
npm run preview  # 预览构建结果
```

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| **Vue 3** | 响应式 UI 框架 |
| **Vite 8** | 极速构建工具 |
| **Dify API** | AI 工作流后端 |
| **SSE** | 流式响应支持 |

## 📂 项目结构

```
ai-customer-service-bot/
├── src/
│   ├── App.vue          # 🎯 主应用组件（含 Dify API 集成）
│   ├── main.js          # 🚀 应用入口
│   └── assets/
│       ├── hero.png     # 🖼️ 装饰图片
│       └── vite.svg     # 🎨 Logo
├── public/              # 📁 静态资源
├── index.html           # 📄 HTML 入口
├── vite.config.js       # ⚙️ Vite 配置
├── package.json         # 📦 依赖管理
└── README.md
```

## 📄 License

MIT

---

<div align="center">

**Made with ❤️ by [tyler-miao](https://github.com/tyler-miao)**

</div>
