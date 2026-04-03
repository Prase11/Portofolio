<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="{ 'glass-panel py-4': scrolled, 'bg-transparent py-6': !scrolled }"
  >
    <div class="container mx-auto px-6 md:px-12 flex justify-between items-center">
      <!-- Logo -->
      <a href="#" class="text-2xl font-bold tracking-tighter text-ink-light dark:text-white">
        PN<span class="text-primary">.</span>
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex space-x-8 items-center bg-surface-light/40 dark:bg-background/40 backdrop-blur-md px-6 py-2.5 rounded-full border border-gray-200 dark:border-white/10 shadow-sm">
        <a 
          v-for="item in navItems" 
          :key="item.name" 
          :href="item.href"
          class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
        >
          {{ item.name }}
        </a>
      </nav>

      <div class="hidden md:flex items-center gap-4">
        <!-- Theme Toggle -->
        <button 
          @click="$emit('toggle-theme')" 
          class="p-2.5 rounded-full bg-gray-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors hover:scale-110 active:scale-95 border border-transparent dark:border-white/5"
          aria-label="Toggle Theme"
        >
          <!-- Sun Icon (shows in dark mode) -->
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <!-- Moon Icon (shows in light mode) -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
        
        <a href="#contact" class="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-all shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5">
          Contact Me
        </a>
      </div>

      <!-- Mobile Menu Buttons -->
      <div class="flex items-center gap-4 md:hidden">
        <button @click="$emit('toggle-theme')" class="p-2 text-slate-600 dark:text-slate-300">
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
        
        <button class="text-slate-600 dark:text-slate-300 hover:text-primary focus:outline-none" @click="mobileMenuOpen = !mobileMenuOpen">
          <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <Transition name="slide">
      <div 
        v-if="mobileMenuOpen" 
        class="md:hidden absolute top-full left-0 right-0 glass-panel border-b border-gray-200 dark:border-white/5 shadow-xl"
      >
        <div class="flex flex-col px-6 py-4 space-y-4">
          <a 
            v-for="item in navItems" 
            :key="item.name" 
            :href="item.href"
            @click="mobileMenuOpen = false"
            class="block text-base font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors py-2"
          >
            {{ item.name }}
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  isDark: Boolean
})

defineEmits(['toggle-theme'])

const scrolled = ref(false)
const mobileMenuOpen = ref(false)

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' }
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
  transform-origin: top;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
