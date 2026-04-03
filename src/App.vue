<template>
  <!-- Loading Screen -->
  <Transition name="fade">
    <div v-if="isLoading" class="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div class="flex flex-col items-center gap-4">
        <div class="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p class="text-white font-medium tracking-widest text-sm animate-pulse">LOADING</p>
      </div>
    </div>
  </Transition>

  <div class="min-h-screen transition-colors duration-300" :class="{ 'dark': isDark }">
    <div class="bg-surface-light dark:bg-background text-ink-light dark:text-ink-dark min-h-screen selection:bg-primary/30">
      <router-view @toggle-theme="toggleTheme" :isDark="isDark" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(true)
// Default to dark mode as requested
const isDark = ref(true)

const toggleTheme = () => {
  isDark.value = !isDark.value
  updateDocumentClass()
}

const updateDocumentClass = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

onMounted(() => {
  updateDocumentClass()
  // Simulate loading screen
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
