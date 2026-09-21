import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  // 从 VITE_DIFY_API_BASE 提取目标地址（去掉 /v1 后缀）
  const apiBase = env.VITE_DIFY_API_BASE || 'https://api.dify.ai/v1'
  const target = apiBase.replace(/\/v1\/?$/, '')

  return {
    plugins: [vue()],
    server: {
      proxy: {
        '/api': {
          target,
          changeOrigin: true,
          secure: true,
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, req) => {
              console.log('代理请求:', req.method, req.url, '->', proxyReq.path)
            })
            proxy.on('proxyRes', (proxyRes, req) => {
              console.log('代理响应:', proxyRes.statusCode, req.url)
            })
            proxy.on('error', (err, req, res) => {
              console.log('代理错误:', err.message)
            })
          },
          rewrite: (path) => path.replace(/^\/api/, '/v1')
        }
      }
    }
  }
})
