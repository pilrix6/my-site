<template>
  <div class="lesson-card">
    <div class="lesson-header" @click="toggleExpand">
      <div class="lesson-number">第 {{ index + 1 }} 课</div>
      <h3 class="lesson-title">{{ lesson.title }}</h3>
      <div class="expand-icon">{{ isExpanded ? '−' : '+' }}</div>
    </div>
    
    <div class="lesson-content" v-show="isExpanded">
      <div class="lesson-description" v-html="lesson.description"></div>
      
      <div class="code-example">
        <div class="code-header">
          <span>示例代码</span>
          <button class="try-btn" @click="tryCode">
            🚀 试一试
          </button>
        </div>
        <pre><code>{{ lesson.code }}</code></pre>
      </div>
      
      <div class="lesson-tips" v-if="lesson.tips">
        <div class="tips-title">💡 提示</div>
        <ul>
          <li v-for="(tip, i) in lesson.tips" :key="i">{{ tip }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  lesson: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['try-code'])

const isExpanded = ref(props.index === 0)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const tryCode = () => {
  console.log('tryCode clicked, code:', props.lesson.code)
  emit('try-code', props.lesson.code)
}
</script>

<style scoped>
.lesson-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
  overflow: hidden;
  transition: box-shadow 0.3s;
}

.lesson-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

.lesson-header {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid #e2e8f0;
}

.lesson-header:hover {
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
}

.lesson-number {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: #fff;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-right: 12px;
}

.lesson-title {
  flex: 1;
  margin: 0;
  font-size: 16px;
  color: #1e293b;
  font-weight: 600;
}

.expand-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e2e8f0;
  border-radius: 50%;
  font-size: 18px;
  color: #64748b;
}

.lesson-content {
  padding: 20px;
}

.lesson-description {
  color: #475569;
  line-height: 1.8;
  margin-bottom: 16px;
}

.code-example {
  background: #1e293b;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.05);
  color: #94a3b8;
  font-size: 13px;
}

.try-btn {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border: none;
  color: #fff;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.try-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.code-example pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
}

.code-example code {
  color: #e2e8f0;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.6;
}

.lesson-tips {
  background: #fef3c7;
  border-radius: 8px;
  padding: 16px;
}

.tips-title {
  font-weight: 600;
  color: #92400e;
  margin-bottom: 8px;
}

.lesson-tips ul {
  margin: 0;
  padding-left: 20px;
}

.lesson-tips li {
  color: #78350f;
  line-height: 1.8;
}
</style>
