<script setup>
import { ref } from 'vue'
import PythonRunner from './components/PythonRunner.vue'
import LessonCard from './components/LessonCard.vue'
import { pythonLessons } from './data/lessons.js'

const runnerRef = ref(null)
const showRunner = ref(true)
const defaultCode = '# 欢迎来到 Python 学习之旅！\nprint("Hello, Python!")'

const handleTryCode = (code) => {
  console.log('handleTryCode called with:', code)
  console.log('runnerRef.value:', runnerRef.value)
  if (runnerRef.value) {
    runnerRef.value.setCode(code)
    console.log('setCode called')
    // 展开运行面板
    showRunner.value = true
  } else {
    console.log('runnerRef is null!')
  }
}

const toggleRunner = () => {
  showRunner.value = !showRunner.value
}
</script>

<template>
  <div class="app">
    <!-- 页面头部 -->
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <span class="logo-icon">🐍</span>
          <h1>Python 基础课程</h1>
        </div>
        <div class="header-actions">
          <button class="toggle-runner-btn" @click="toggleRunner">
            {{ showRunner ? '隐藏' : '显示' }}代码运行器
          </button>
        </div>
      </div>
    </header>

    <!-- 主要内容区 -->
    <main class="main-content">
      <!-- 课程介绍 -->
      <section class="intro-section">
        <div class="intro-card">
          <h2>欢迎学习 Python 编程！</h2>
          <p>
            Python 是一门简洁、优雅且功能强大的编程语言。它适合初学者入门，
            同时也被广泛应用于数据分析、人工智能、Web开发等领域。
          </p>
          <div class="features">
            <div class="feature">
              <span class="feature-icon">📚</span>
              <span>8 个核心章节</span>
            </div>
            <div class="feature">
              <span class="feature-icon">💻</span>
              <span>在线代码运行</span>
            </div>
            <div class="feature">
              <span class="feature-icon">🎯</span>
              <span>实战示例</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 课程列表 -->
      <section class="lessons-section">
        <h2 class="section-title">课程内容</h2>
        <div class="lessons-list">
          <LessonCard
            v-for="(lesson, index) in pythonLessons"
            :key="index"
            :lesson="lesson"
            :index="index"
            @try-code="handleTryCode"
          />
        </div>
      </section>
    </main>

    <!-- 悬浮代码运行面板 -->
    <PythonRunner
      v-show="showRunner"
      ref="runnerRef"
      :initial-code="defaultCode"
    />

    <!-- 页面底部 -->
    <footer class="footer">
      <p>Python 基础课程 © 2025 | 使用 Pyodide 在浏览器中运行 Python</p>
    </footer>
  </div>
</template>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}
</style>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 头部样式 */
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 32px;
}

.logo h1 {
  font-size: 24px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.toggle-runner-btn {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-runner-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

/* 主内容区 */
.main-content {
  flex: 1;
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 24px;
  width: 100%;
}

/* 介绍区域 */
.intro-section {
  margin-bottom: 32px;
}

.intro-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
}

.intro-card h2 {
  font-size: 28px;
  color: #1e293b;
  margin-bottom: 16px;
}

.intro-card p {
  color: #64748b;
  line-height: 1.8;
  font-size: 16px;
  margin-bottom: 24px;
}

.features {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.feature {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 12px 20px;
  border-radius: 10px;
  font-weight: 500;
  color: #475569;
}

.feature-icon {
  font-size: 20px;
}

/* 课程列表 */
.lessons-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 24px;
  color: #fff;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.lessons-list {
  display: flex;
  flex-direction: column;
}

/* 页脚 */
.footer {
  background: rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

/* 响应式 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 12px;
  }
  
  .main-content {
    padding: 20px 16px;
  }
  
  .intro-card {
    padding: 20px;
  }
  
  .features {
    flex-direction: column;
  }
}
</style>
