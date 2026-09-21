<template>
  <div class="app-container">
    <!-- 侧边栏 -->
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="logo" v-show="!sidebarCollapsed">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <span class="logo-text">智能客服</span>
        </div>
        <button class="toggle-btn" @click="toggleSidebar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path v-if="sidebarCollapsed" d="M9 18l6-6-6-6"></path>
            <path v-else d="M15 18l-6-6 6-6"></path>
          </svg>
        </button>
      </div>

      <button class="new-chat-btn" @click="createNewChat" :title="sidebarCollapsed ? '新建对话' : ''">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span v-show="!sidebarCollapsed">新建对话</span>
      </button>

      <div class="chat-history" v-show="!sidebarCollapsed">
        <div class="history-section">
          <div class="section-title">今天</div>
          <div
            v-for="chat in todayChats"
            :key="chat.id"
            class="chat-item"
            :class="{ active: currentChatId === chat.id }"
            @click="switchChat(chat.id)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span class="chat-title">{{ chat.title }}</span>
            <button class="delete-btn" @click.stop="deleteChat(chat.id)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="history-section">
          <div class="section-title">昨天</div>
          <div
            v-for="chat in yesterdayChats"
            :key="chat.id"
            class="chat-item"
            :class="{ active: currentChatId === chat.id }"
            @click="switchChat(chat.id)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span class="chat-title">{{ chat.title }}</span>
            <button class="delete-btn" @click.stop="deleteChat(chat.id)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="sidebar-footer" v-show="!sidebarCollapsed">
        <button class="settings-btn" @click="showSettings = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          <span>设置</span>
        </button>
      </div>
    </aside>

    <!-- 设置弹窗 -->
    <div class="modal-overlay" v-if="showSettings" @click.self="showSettings = false">
      <div class="modal-content settings-modal">
        <div class="modal-header">
          <h3>设置</h3>
          <button class="modal-close" @click="showSettings = false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <div class="settings-section">
            <h4 class="settings-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
              </svg>
              Dify API 配置
            </h4>

            <div class="form-group">
              <label class="form-label">API Base URL</label>
              <input
                type="text"
                class="form-input"
                v-model="settings.apiBase"
                placeholder="http://your-dify-api/v1"
              />
              <span class="form-hint">Dify API的基础地址，以/v1结尾</span>
            </div>

            <div class="form-group">
              <label class="form-label">API Key</label>
              <div class="input-with-action">
                <input
                  :type="showApiKey ? 'text' : 'password'"
                  class="form-input"
                  v-model="settings.apiKey"
                  placeholder="app-xxxxxxxxxx"
                />
                <button class="input-action-btn" @click="showApiKey = !showApiKey">
                  <svg v-if="showApiKey" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                </button>
              </div>
              <span class="form-hint">在Dify应用的API访问页面获取</span>
            </div>

            <div class="form-group">
              <label class="form-label">Response Mode</label>
              <select class="form-input form-select" v-model="settings.responseMode">
                <option value="streaming">流式输出 (Streaming)</option>
                <option value="blocking">阻塞式 (Blocking)</option>
              </select>
              <span class="form-hint">流式输出可实时显示回复，阻塞式等待完整响应</span>
            </div>
          </div>

          <div class="settings-section">
            <h4 class="settings-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4M12 8h.01"></path>
              </svg>
              连接测试
            </h4>

            <button class="test-btn" @click="testConnection" :disabled="isTesting">
              <svg v-if="!isTesting" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <div v-else class="loading-spinner small"></div>
              {{ isTesting ? '测试中...' : '测试连接' }}
            </button>

            <div v-if="connectionStatus" class="connection-status" :class="connectionStatus.type">
              <svg v-if="connectionStatus.type === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              {{ connectionStatus.message }}
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="resetSettings">重置默认</button>
          <button class="btn btn-primary" @click="saveSettings">保存设置</button>
        </div>
      </div>
    </div>

    <!-- 主聊天区域 -->
    <main class="main-content">
      <!-- 顶部导航 -->
      <header class="chat-header">
        <div class="header-left">
          <h2>{{ currentChat?.title || '新对话' }}</h2>
          <span class="status-badge online">在线</span>
        </div>
        <div class="header-right">
          <button class="header-btn" title="清空对话" @click="clearCurrentChat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
            </svg>
          </button>
          <button class="header-btn" title="导出对话">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"></path>
            </svg>
          </button>
        </div>
      </header>

      <!-- 消息区域 -->
      <div class="messages-container" ref="messagesContainer">
        <!-- 欢迎消息 -->
        <div v-if="messages.length === 0" class="welcome-section">
          <div class="welcome-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h1>智能客服助手</h1>
          <p>您好！我是您的AI客服助手，有什么可以帮助您的吗？</p>

          <div class="quick-actions">
            <button
              v-for="action in quickActions"
              :key="action.id"
              class="quick-action-btn"
              @click="sendQuickAction(action.text)"
            >
              <div class="action-icon" v-html="action.icon"></div>
              <div class="action-text">
                <span class="action-title">{{ action.title }}</span>
                <span class="action-desc">{{ action.description }}</span>
              </div>
            </button>
          </div>
        </div>

        <!-- 消息列表 -->
        <div v-else class="messages-list">
          <div
            v-for="message in messages"
            :key="message.id"
            class="message-wrapper"
            :class="{ 'user-message': message.role === 'user', 'assistant-message': message.role === 'assistant' }"
          >
            <div class="message-avatar">
              <div v-if="message.role === 'user'" class="avatar user-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div v-else class="avatar assistant-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.27a2 2 0 0 1-3.46 0H6.73a2 2 0 0 1-3.46 0H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"></path>
                </svg>
              </div>
            </div>

            <div class="message-content">
              <div class="message-header">
                <span class="message-sender">{{ message.role === 'user' ? '您' : 'AI助手' }}</span>
                <span class="message-time">{{ formatTime(message.timestamp) }}</span>
              </div>
              <div class="message-bubble" :class="{ 'typing': message.isTyping }">
                <div v-if="message.isTyping" class="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div v-else class="message-text" v-html="formatMessage(message.content)"></div>
              </div>
              <div v-if="message.role === 'assistant' && !message.isTyping" class="message-actions">
                <button class="action-btn" title="复制" @click="copyMessage(message.content)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
                <button class="action-btn" title="点赞">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                  </svg>
                </button>
                <button class="action-btn" title="踩">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="input-container">
        <div class="input-wrapper">
          <button class="attach-btn" title="添加附件">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
            </svg>
          </button>

          <div class="input-field">
            <textarea
              v-model="inputMessage"
              @keydown.enter.exact="handleEnter"
              @keydown.shift.enter="handleShiftEnter"
              placeholder="输入您的问题... (Enter发送, Shift+Enter换行)"
              rows="1"
              ref="inputRef"
            ></textarea>
          </div>

          <div class="input-actions">
            <button class="send-btn" :class="{ active: inputMessage.trim() }" @click="sendMessage" :disabled="!inputMessage.trim() || isLoading">
              <svg v-if="!isLoading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              <div v-else class="loading-spinner"></div>
            </button>
          </div>
        </div>

        <div class="input-footer">
          <span class="footer-text">AI客服助手可能会产生不准确的信息，请仔细甄别重要内容</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, computed } from 'vue'

// 响应式数据
const sidebarCollapsed = ref(false)
const inputMessage = ref('')
const isLoading = ref(false)
const messagesContainer = ref(null)
const inputRef = ref(null)
const currentChatId = ref('chat-1')

// 设置相关
const showSettings = ref(false)
const showApiKey = ref(false)
const isTesting = ref(false)
const connectionStatus = ref(null)

// 默认设置（优先读取 .env 文件中的配置）
const defaultSettings = {
  apiBase: import.meta.env.VITE_DIFY_API_BASE || 'https://api.dify.ai/v1',
  apiKey: import.meta.env.VITE_DIFY_API_KEY || '',
  responseMode: 'blocking'
}

// 设置数据
const settings = reactive({
  apiBase: import.meta.env.VITE_DIFY_API_BASE || 'https://api.dify.ai/v1',
  apiKey: import.meta.env.VITE_DIFY_API_KEY || '',
  responseMode: 'blocking'
})

// 聊天历史
const chatHistory = reactive([
  {
    id: 'chat-1',
    title: '产品咨询',
    date: new Date(),
    messages: []
  },
  {
    id: 'chat-2',
    title: '订单问题',
    date: new Date(),
    messages: []
  },
  {
    id: 'chat-3',
    title: '售后服务',
    date: new Date(Date.now() - 86400000),
    messages: []
  }
])

// 当前消息
const messages = reactive([])

// 快捷操作
const quickActions = [
  {
    id: 1,
    title: '产品咨询',
    description: '了解我们的产品和服务',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 7h-3a2 2 0 0 1-2-2V2"></path><path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z"></path><path d="M3 7v10a2 2 0 0 0 2 2h4"></path></svg>',
    text: '我想了解你们的产品和服务有哪些？'
  },
  {
    id: 2,
    title: '订单查询',
    description: '查询订单状态和物流',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
    text: '如何查询我的订单状态？'
  },
  {
    id: 3,
    title: '售后服务',
    description: '退换货和维修服务',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
    text: '我想了解售后服务政策'
  },
  {
    id: 4,
    title: '技术支持',
    description: '技术问题和使用帮助',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
    text: '我遇到了技术问题，需要帮助'
  }
]

// 计算属性
const todayChats = computed(() => {
  const today = new Date()
  return chatHistory.filter(chat => {
    const chatDate = new Date(chat.date)
    return chatDate.toDateString() === today.toDateString()
  })
})

const yesterdayChats = computed(() => {
  const yesterday = new Date(Date.now() - 86400000)
  return chatHistory.filter(chat => {
    const chatDate = new Date(chat.date)
    return chatDate.toDateString() === yesterday.toDateString()
  })
})

const currentChat = computed(() => {
  return chatHistory.find(chat => chat.id === currentChatId.value)
})

// 方法
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

// 加载设置
const loadSettings = () => {
  const saved = localStorage.getItem('customer-service-settings')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      Object.assign(settings, parsed)
    } catch (e) {
      console.error('加载设置失败:', e)
    }
  }
}

// 保存设置
const saveSettings = () => {
  localStorage.setItem('customer-service-settings', JSON.stringify(settings))
  showSettings.value = false
  connectionStatus.value = null
}

// 重置设置
const resetSettings = () => {
  Object.assign(settings, defaultSettings)
  localStorage.removeItem('customer-service-settings')
  connectionStatus.value = null
}

// 缓存已匹配的API路由，后续请求直接使用
let detectedApiRoute = null

// 所有Dify API路由定义
const API_ROUTES = [
  {
    path: '/api/workflows/run',
    label: '工作流',
    body: (input) => ({ inputs: { say: input }, response_mode: 'blocking', user: 'user-' + Date.now() }),
    parse: (data) => {
      const outputs = data.data?.outputs
      return outputs?.text || outputs?.answer || outputs?.result || JSON.stringify(outputs)
    }
  },
  {
    path: '/api/chat-messages',
    label: '聊天',
    body: (input) => ({ inputs: {}, query: input, response_mode: 'blocking', user: 'user-' + Date.now() }),
    parse: (data) => data.answer
  },
  {
    path: '/api/completion-messages',
    label: '文本生成',
    body: (input) => ({ inputs: {}, query: input, response_mode: 'blocking', user: 'user-' + Date.now() }),
    parse: (data) => data.answer
  }
]

// 尝试匹配API路由
const tryMatchRoute = async (route, input) => {
  const body = route.body(input)
  const response = await fetch(route.path, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${settings.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  if (response.ok) {
    const data = await response.json()
    return { ok: true, data }
  }
  const errData = await response.json().catch(() => ({}))
  return { ok: false, error: errData, status: response.status }
}

// 测试连接
const testConnection = async () => {
  if (!settings.apiKey) {
    connectionStatus.value = { type: 'error', message: '请先填写API Key' }
    return
  }

  isTesting.value = true
  connectionStatus.value = null

  for (const route of API_ROUTES) {
    try {
      const result = await tryMatchRoute(route, 'hello')
      if (result.ok) {
        detectedApiRoute = route.path
        connectionStatus.value = { type: 'success', message: `连接成功（${route.label}模式）` }
        isTesting.value = false
        return
      }
      if (result.error?.message?.includes('route')) {
        continue
      }
      connectionStatus.value = { type: 'error', message: `连接失败 (${result.status}): ${result.error?.message || '未知错误'}` }
      isTesting.value = false
      return
    } catch (error) {
      console.log(`请求${route.label}出错:`, error.message)
    }
  }

  connectionStatus.value = { type: 'error', message: '连接失败：无法匹配到有效的API路由' }
  isTesting.value = false
}

const createNewChat = () => {
  const newChat = {
    id: `chat-${Date.now()}`,
    title: '新对话',
    date: new Date(),
    messages: []
  }
  chatHistory.unshift(newChat)
  currentChatId.value = newChat.id
  messages.splice(0, messages.length)
}

const switchChat = (chatId) => {
  currentChatId.value = chatId
  const chat = chatHistory.find(c => c.id === chatId)
  if (chat) {
    messages.splice(0, messages.length, ...chat.messages)
  }
}

const deleteChat = (chatId) => {
  const index = chatHistory.findIndex(c => c.id === chatId)
  if (index > -1) {
    chatHistory.splice(index, 1)
    if (currentChatId.value === chatId) {
      if (chatHistory.length > 0) {
        switchChat(chatHistory[0].id)
      } else {
        createNewChat()
      }
    }
  }
}

const clearCurrentChat = () => {
  messages.splice(0, messages.length)
  const chat = chatHistory.find(c => c.id === currentChatId.value)
  if (chat) {
    chat.messages = []
    chat.title = '新对话'
  }
}

const sendMessage = async () => {
  if (!inputMessage.value.trim() || isLoading.value) return

  const userMessage = {
    id: Date.now(),
    role: 'user',
    content: inputMessage.value.trim(),
    timestamp: new Date()
  }

  messages.push(userMessage)
  const chat = chatHistory.find(c => c.id === currentChatId.value)
  if (chat) {
    chat.messages.push(userMessage)
    if (chat.title === '新对话') {
      chat.title = inputMessage.value.trim().substring(0, 20) + (inputMessage.value.trim().length > 20 ? '...' : '')
    }
  }

  const userInput = inputMessage.value.trim()
  inputMessage.value = ''
  isLoading.value = true

  // 添加AI回复占位
  const aiMessage = {
    id: Date.now() + 1,
    role: 'assistant',
    content: '',
    timestamp: new Date(),
    isTyping: true
  }
  messages.push(aiMessage)

  try {
    // 调用Dify API
    await callDifyApi(userInput, aiMessage)
  } catch (error) {
    aiMessage.content = `抱歉，处理您的请求时出现了错误：${error.message}`
    aiMessage.isTyping = false
    console.error('发送消息失败:', error)
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}

// Dify API调用函数
const callDifyApi = async (userInput, aiMessage) => {
  if (!settings.apiKey) {
    console.warn('Dify API密钥未配置，使用模拟响应')
    await simulateResponse(userInput, aiMessage)
    return
  }

  // 如果已缓存匹配路由，直接用；否则遍历尝试
  const routesToTry = detectedApiRoute
    ? API_ROUTES.filter(r => r.path === detectedApiRoute)
    : API_ROUTES

  for (const route of routesToTry) {
    try {
      const result = await tryMatchRoute(route, userInput)
      if (result.ok) {
        detectedApiRoute = route.path
        const content = route.parse(result.data)
        aiMessage.content = content || '获取回复成功，但内容为空'
        aiMessage.isTyping = false
        scrollToBottom()
        return
      }
      if (result.error?.message?.includes('route')) {
        continue
      }
      throw new Error(result.error?.message || `请求失败: ${result.status}`)
    } catch (error) {
      if (route === routesToTry[routesToTry.length - 1]) {
        aiMessage.content = `API调用失败：${error.message}\n\n请检查：\n1. 在设置中测试连接确认路由是否匹配\n2. API Key 是否有效\n3. Dify 服务是否正常运行`
        aiMessage.isTyping = false
        scrollToBottom()
      }
    }
  }
}

// 模拟响应（当Dify API不可用时使用）
const simulateResponse = async (userInput, aiMessage) => {
  await new Promise(resolve => setTimeout(resolve, 1000))

  const responses = {
    '产品咨询': '我们提供多种产品和服务，包括：\n\n1. **智能客服系统** - 基于AI的24/7在线客服\n2. **数据分析平台** - 企业级数据解决方案\n3. **云服务** - 安全可靠的云计算服务\n\n您想了解哪个产品的详细信息？',
    '订单查询': '查询订单状态的方法：\n\n1. 登录您的账户\n2. 进入"我的订单"页面\n3. 输入订单号或选择日期范围\n\n如果您需要帮助查询具体订单，请提供订单号，我来帮您查询。',
    '售后服务': '我们的售后服务政策：\n\n- **7天无理由退换货** - 自收到商品之日起7天内\n- **1年质保** - 所有产品享受1年质保\n- **24小时响应** - 售后问题24小时内响应\n\n您需要哪种售后服务？',
    '技术支持': '技术支持服务：\n\n- **在线文档** - 详细的产品使用说明\n- **视频教程** - 直观的操作演示\n- **技术社区** - 用户交流和问题解答\n- **一对一支持** - 专业技术顾问\n\n您遇到了什么技术问题？'
  }

  let responseText = responses[userInput] || `感谢您的咨询！关于"${userInput}"的问题，我来为您解答：\n\n这是一个模拟回复。在实际应用中，请配置Dify API地址和密钥以获取真实的AI回复。\n\n请告诉我更多细节，我会尽力帮助您。`

  // 模拟流式输出
  const chars = responseText.split('')
  for (let i = 0; i < chars.length; i++) {
    aiMessage.content += chars[i]
    await new Promise(resolve => setTimeout(resolve, 15))
    scrollToBottom()
  }

  aiMessage.isTyping = false
  const chat = chatHistory.find(c => c.id === currentChatId.value)
  if (chat) {
    chat.messages.push({ ...aiMessage })
  }
}

const sendQuickAction = (text) => {
  inputMessage.value = text
  sendMessage()
}

const handleEnter = (e) => {
  if (!e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

const handleShiftEnter = () => {
  // 允许换行
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

const formatMessage = (content) => {
  // 简单的Markdown格式化
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>')
}

const copyMessage = (content) => {
  navigator.clipboard.writeText(content)
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// 生命周期
onMounted(() => {
  inputRef.value?.focus()
  loadSettings()
})
</script>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #6366f1;
  --primary-hover: #4f46e5;
  --primary-light: #e0e7ff;
  --bg-color: #f8fafc;
  --sidebar-bg: #1e1e2e;
  --sidebar-hover: #2d2d3f;
  --sidebar-active: #3d3d4f;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-light: #94a3b8;
  --border-color: #e2e8f0;
  --message-user: #6366f1;
  --message-assistant: #ffffff;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-primary);
  line-height: 1.6;
}

/* 应用容器 */
.app-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* 侧边栏 */
.sidebar {
  width: 280px;
  background: var(--sidebar-bg);
  color: white;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: relative;
  z-index: 10;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--primary-color), #8b5cf6);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-icon svg {
  width: 18px;
  height: 18px;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
}

.toggle-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 4px;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
}

.toggle-btn:hover {
  background: var(--sidebar-hover);
  color: white;
}

.toggle-btn svg {
  width: 20px;
  height: 20px;
}

.new-chat-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 16px;
  padding: 12px 16px;
  background: linear-gradient(135deg, var(--primary-color), #8b5cf6);
  border: none;
  border-radius: var(--radius-md);
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.new-chat-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.new-chat-btn svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.chat-history {
  flex: 1;
  overflow-y: auto;
  padding: 0 8px;
}

.history-section {
  margin-bottom: 16px;
}

.section-title {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 8px 12px;
}

.chat-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 2px;
}

.chat-item:hover {
  background: var(--sidebar-hover);
}

.chat-item.active {
  background: var(--sidebar-active);
}

.chat-item svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  opacity: 0.6;
}

.chat-title {
  flex: 1;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.delete-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  padding: 4px;
  border-radius: var(--radius-sm);
  opacity: 0;
  transition: all 0.2s;
}

.chat-item:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ef4444;
}

.delete-btn svg {
  width: 14px;
  height: 14px;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.settings-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  background: none;
  border: none;
  border-radius: var(--radius-md);
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.settings-btn:hover {
  background: var(--sidebar-hover);
  color: white;
}

.settings-btn svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

/* 主内容区 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg-color);
  min-width: 0;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-left h2 {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.status-badge {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-weight: 500;
}

.status-badge.online {
  background: #dcfce7;
  color: #166534;
}

.header-right {
  display: flex;
  gap: 8px;
}

.header-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 8px;
  border-radius: var(--radius-md);
  transition: all 0.2s;
}

.header-btn:hover {
  background: var(--bg-color);
  color: var(--text-primary);
}

.header-btn svg {
  width: 18px;
  height: 18px;
}

/* 消息容器 */
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  scroll-behavior: smooth;
}

/* 欢迎区域 */
.welcome-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 40px;
}

.welcome-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary-light), #c7d2fe);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.welcome-icon svg {
  width: 40px;
  height: 40px;
  color: var(--primary-color);
}

.welcome-section h1 {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.welcome-section p {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 40px;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  max-width: 600px;
  width: 100%;
}

.quick-action-btn {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.quick-action-btn:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.action-icon {
  width: 44px;
  height: 44px;
  background: var(--primary-light);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-icon svg {
  width: 22px;
  height: 22px;
  color: var(--primary-color);
}

.action-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.action-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}

.action-desc {
  font-size: 13px;
  color: var(--text-secondary);
}

/* 消息列表 */
.messages-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.message-wrapper {
  display: flex;
  gap: 16px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.user-message {
  flex-direction: row-reverse;
}

.message-avatar {
  flex-shrink: 0;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar {
  background: linear-gradient(135deg, var(--primary-color), #8b5cf6);
}

.user-avatar svg {
  color: white;
}

.assistant-avatar {
  background: linear-gradient(135deg, #10b981, #059669);
}

.assistant-avatar svg {
  color: white;
}

.avatar svg {
  width: 20px;
  height: 20px;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.user-message .message-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.message-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.user-message .message-header {
  flex-direction: row-reverse;
}

.message-sender {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.message-time {
  font-size: 12px;
  color: var(--text-light);
}

.message-bubble {
  padding: 16px 20px;
  border-radius: var(--radius-lg);
  max-width: 85%;
  line-height: 1.6;
}

.user-message .message-bubble {
  background: linear-gradient(135deg, var(--primary-color), #8b5cf6);
  color: white;
  border-bottom-right-radius: 4px;
}

.assistant-message .message-bubble {
  background: white;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-bottom-left-radius: 4px;
  box-shadow: var(--shadow-sm);
}

.message-text {
  font-size: 15px;
}

.message-text strong {
  font-weight: 600;
}

.message-text em {
  font-style: italic;
}

/* 打字指示器 */
.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 8px 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: var(--text-light);
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-8px);
    opacity: 1;
  }
}

/* 消息操作 */
.message-actions {
  display: flex;
  gap: 4px;
  margin-top: 8px;
  opacity: 0;
  transition: opacity 0.2s;
}

.message-wrapper:hover .message-actions {
  opacity: 1;
}

.action-btn {
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 6px;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
}

.action-btn:hover {
  background: var(--bg-color);
  color: var(--text-primary);
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

/* 输入容器 */
.input-container {
  padding: 16px 24px 24px;
  background: white;
  border-top: 1px solid var(--border-color);
}

.input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  background: var(--bg-color);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 12px 16px;
  transition: all 0.2s;
}

.input-wrapper:focus-within {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.attach-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 4px;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
}

.attach-btn:hover {
  color: var(--primary-color);
  background: var(--primary-light);
}

.attach-btn svg {
  width: 20px;
  height: 20px;
}

.input-field {
  flex: 1;
}

.input-field textarea {
  width: 100%;
  border: none;
  background: none;
  resize: none;
  font-size: 15px;
  line-height: 1.5;
  color: var(--text-primary);
  outline: none;
  min-height: 24px;
  max-height: 120px;
}

.input-field textarea::placeholder {
  color: var(--text-light);
}

.input-actions {
  display: flex;
  gap: 8px;
}

.send-btn {
  width: 40px;
  height: 40px;
  background: var(--text-light);
  border: none;
  border-radius: var(--radius-md);
  color: white;
  cursor: not-allowed;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.send-btn.active {
  background: linear-gradient(135deg, var(--primary-color), #8b5cf6);
  cursor: pointer;
}

.send-btn.active:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.send-btn svg {
  width: 18px;
  height: 18px;
}

.loading-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.input-footer {
  text-align: center;
  margin-top: 12px;
}

.footer-text {
  font-size: 12px;
  color: var(--text-light);
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--text-light);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}

/* 设置弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

.modal-content {
  background: white;
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 520px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-lg);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.modal-close {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 4px;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
}

.modal-close:hover {
  background: var(--bg-color);
  color: var(--text-primary);
}

.modal-close svg {
  width: 20px;
  height: 20px;
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
}

/* 设置部分 */
.settings-section {
  margin-bottom: 24px;
}

.settings-section:last-child {
  margin-bottom: 0;
}

.settings-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.settings-section-title svg {
  width: 18px;
  height: 18px;
  color: var(--primary-color);
}

/* 表单样式 */
.form-group {
  margin-bottom: 16px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.form-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--text-primary);
  background: var(--bg-color);
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-input::placeholder {
  color: var(--text-light);
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;
}

.input-with-action {
  position: relative;
}

.input-with-action .form-input {
  padding-right: 44px;
}

.input-action-btn {
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 8px;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
}

.input-action-btn:hover {
  color: var(--primary-color);
}

.input-action-btn svg {
  width: 16px;
  height: 16px;
}

.form-hint {
  display: block;
  font-size: 12px;
  color: var(--text-light);
  margin-top: 6px;
}

/* 测试按钮 */
.test-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
}

.test-btn:hover:not(:disabled) {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.test-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.test-btn svg {
  width: 16px;
  height: 16px;
}

.loading-spinner.small {
  width: 16px;
  height: 16px;
  border-width: 2px;
}

/* 连接状态 */
.connection-status {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  font-size: 14px;
}

.connection-status svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.connection-status.success {
  background: #dcfce7;
  color: #166534;
}

.connection-status.error {
  background: #fee2e2;
  color: #991b1b;
}

/* 按钮样式 */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-color), #8b5cf6);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.btn-secondary {
  background: var(--bg-color);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background: var(--border-color);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar:not(.collapsed) {
    transform: translateX(0);
  }

  .quick-actions {
    grid-template-columns: 1fr;
  }

  .messages-container {
    padding: 16px;
  }

  .input-container {
    padding: 12px 16px 16px;
  }

  .modal-content {
    width: 95%;
    max-height: 85vh;
  }

  .modal-header {
    padding: 16px 20px;
  }

  .modal-body {
    padding: 20px;
  }

  .modal-footer {
    padding: 12px 20px;
  }
}
</style>
