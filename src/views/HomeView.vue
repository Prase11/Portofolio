<template>
  <div class="relative">
    <Navbar :is-dark="isDark" @toggle-theme="$emit('toggle-theme')" />
    
    <main>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    
    <footer class="py-12 pb-6 text-center text-slate-500 text-sm mt-10 border-t border-gray-100 dark:border-white/5 bg-slate-50/50 dark:bg-[#0f172a]/50">
      <div class="container mx-auto px-6">
        <p class="font-medium text-slate-600 dark:text-slate-400">&copy; {{ new Date().getFullYear() }} Prasetyo Nugroho. All rights reserved.</p>
        <p class="mt-2 text-xs">Designed & Built with Vue 3 & Tailwind CSS</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import EducationSection from '@/components/EducationSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import ContactSection from '@/components/ContactSection.vue'

defineProps({
  isDark: Boolean
})
defineEmits(['toggle-theme'])
</script>
