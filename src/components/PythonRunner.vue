<template>
  <div class="floating-panel" :class="{ collapsed: isCollapsed }" :style="panelStyle">
    <!-- 标题栏 -->
    <div class="panel-header" @mousedown="startDrag">
      <div class="panel-title">
        <span class="python-icon">🐍</span>
        <span>Python 运行环境</span>
        <span v-if="!isReady" class="loading-indicator">{{ loadingStatus }}</span>
        <span v-else class="ready-indicator">✓ 就绪</span>
      </div>
      <div class="panel-controls">
        <button class="control-btn" @click="toggleCollapse" :title="isCollapsed ? '展开' : '折叠'">
          {{ isCollapsed ? '▲' : '▼' }}
        </button>
        <button class="control-btn minimize-btn" @click="minimize" title="最小化">
          −
        </button>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="panel-body" v-show="!isCollapsed">
      <!-- 代码编辑器 -->
      <div class="editor-section">
        <div class="editor-header">
          <span>代码编辑器</span>
          <div class="editor-actions">
            <button class="action-btn" @click="clearCode" title="清空">🗑️</button>
            <button class="action-btn" @click="copyCode" title="复制">📋</button>
          </div>
        </div>
        <textarea
          v-model="code"
          class="code-editor"
          placeholder="在此输入 Python 代码..."
          spellcheck="false"
        ></textarea>
      </div>

      <!-- 运行按钮 -->
      <div class="run-section">
        <button class="run-btn" @click="runCode" :disabled="!isReady || isRunning">
          <span v-if="isRunning" class="spinner"></span>
          <span v-else>▶</span>
          {{ isRunning ? '运行中...' : '运行代码' }}
        </button>
      </div>

      <!-- 输出区域 -->
      <div class="output-section">
        <div class="output-header">
          <span>输出结果</span>
          <button class="action-btn" @click="clearOutput" title="清空输出">🗑️</button>
        </div>
        <div class="output-container" ref="outputRef">
          <pre v-if="output" :class="{ error: isError }">{{ output }}</pre>
          <div v-else class="output-placeholder">运行代码后，输出将显示在这里...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  initialCode: {
    type: String,
    default: '# 在这里输入你的 Python 代码\nprint("Hello, Python!")'
  }
})

const emit = defineEmits(['run', 'output', 'minimize'])

// Pyodide 实例
let pyodide = null

// 状态
const code = ref(props.initialCode)
const output = ref('')
const isError = ref(false)
const isRunning = ref(false)
const isCollapsed = ref(false)
const isReady = ref(false)
const loadingStatus = ref('初始化中...')

// 拖拽相关
const position = ref({ x: 20, y: 20 })
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })

const panelStyle = computed(() => ({
  right: `${position.value.x}px`,
  bottom: `${position.value.y}px`
}))

// 加载 Pyodide
const loadPyodide = async () => {
  loadingStatus.value = '加载 Pyodide...'
  
  try {
    // 动态加载 Pyodide 脚本
    if (!window.loadPyodide) {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js'
      document.head.appendChild(script)
      
      await new Promise((resolve, reject) => {
        script.onload = resolve
        script.onerror = reject
      })
    }
    
    loadingStatus.value = '初始化 Python 环境...'
    pyodide = await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
    })
    
    loadingStatus.value = '就绪'
    isReady.value = true
  } catch (err) {
    loadingStatus.value = '加载失败'
    console.error('Pyodide 加载失败:', err)
  }
}

// 运行代码
const runCode = async () => {
  if (!code.value.trim() || isRunning.value || !isReady.value) return
  
  isRunning.value = true
  output.value = ''
  isError.value = false
  
  try {
    // 捕获 stdout
    await pyodide.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
    `)
    
    // 运行用户代码
    await pyodide.runPythonAsync(code.value)
    
    // 获取输出
    const stdout = await pyodide.runPythonAsync('sys.stdout.getvalue()')
    output.value = stdout || '(无输出)'
    
    emit('output', { code: code.value, output: output.value, isError: false })
  } catch (err) {
    output.value = `❌ 错误:\n${err.message}`
    isError.value = true
    emit('output', { code: code.value, output: output.value, isError: true })
  } finally {
    isRunning.value = false
  }
}

// 清空代码
const clearCode = () => {
  code.value = ''
}

// 复制代码
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(code.value)
    alert('代码已复制到剪贴板！')
  } catch (err) {
    console.error('复制失败:', err)
  }
}

// 清空输出
const clearOutput = () => {
  output.value = ''
}

// 折叠/展开
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

// 最小化
const minimize = () => {
  emit('minimize')
}

// 拖拽功能
const startDrag = (e) => {
  if (e.target.closest('.panel-controls') || e.target.closest('.control-btn')) return
  
  isDragging.value = true
  const rect = e.currentTarget.parentElement.getBoundingClientRect()
  dragOffset.value = {
    x: window.innerWidth - rect.right - position.value.x,
    y: window.innerHeight - rect.bottom - position.value.y
  }
  
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

const onDrag = (e) => {
  if (!isDragging.value) return
  
  const newX = window.innerWidth - e.clientX - dragOffset.value.x
  const newY = window.innerHeight - e.clientY - dragOffset.value.y
  
  position.value = {
    x: Math.max(0, Math.min(newX, window.innerWidth - 400)),
    y: Math.max(0, Math.min(newY, window.innerHeight - 100))
  }
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

// 暴露方法给父组件
defineExpose({
  setCode: (newCode) => { code.value = newCode },
  getCode: () => code.value,
  runCode
})

onMounted(() => {
  loadPyodide()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
})
</script>

<style scoped>
.floating-panel {
  position: fixed;
  width: 420px;
  background: linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
  z-index: 9999;
  font-family: 'Segoe UI', system-ui, sans-serif;
  overflow: hidden;
  transition: all 0.3s ease;
}

.floating-panel.collapsed {
  width: 320px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  cursor: move;
  user-select: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
}

.python-icon {
  font-size: 18px;
}

.loading-indicator {
  font-size: 11px;
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.1);
  padding: 2px 8px;
  border-radius: 10px;
}

.ready-indicator {
  font-size: 11px;
  color: #34d399;
  background: rgba(52, 211, 153, 0.1);
  padding: 2px 8px;
  border-radius: 10px;
}

.panel-controls {
  display: flex;
  gap: 8px;
}

.control-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.panel-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 500px;
  overflow: hidden;
}

.editor-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.editor-header, .output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px 8px 0 0;
  color: #a0a0b0;
  font-size: 12px;
  font-weight: 500;
}

.editor-actions {
  display: flex;
  gap: 4px;
}

.action-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.action-btn:hover {
  opacity: 1;
}

.code-editor {
  width: 100%;
  min-height: 120px;
  padding: 12px;
  background: #0d0d14;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: none;
  border-radius: 0 0 8px 8px;
  color: #e0e0e0;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.6;
  resize: vertical;
  outline: none;
}

.code-editor:focus {
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
}

.run-section {
  display: flex;
  justify-content: center;
}

.run-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 24px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.run-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.run-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.output-section {
  display: flex;
  flex-direction: column;
}

.output-container {
  min-height: 80px;
  max-height: 150px;
  overflow-y: auto;
  padding: 12px;
  background: #0d0d14;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: none;
  border-radius: 0 0 8px 8px;
}

.output-container pre {
  margin: 0;
  color: #34d399;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}

.output-container pre.error {
  color: #f87171;
}

.output-placeholder {
  color: #6b7280;
  font-size: 13px;
  text-align: center;
  padding: 20px;
}

/* 滚动条样式 */
.output-container::-webkit-scrollbar,
.code-editor::-webkit-scrollbar {
  width: 6px;
}

.output-container::-webkit-scrollbar-track,
.code-editor::-webkit-scrollbar-track {
  background: transparent;
}

.output-container::-webkit-scrollbar-thumb,
.code-editor::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.output-container::-webkit-scrollbar-thumb:hover,
.code-editor::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
