<template>
  <section id="about" class="py-24 relative z-10 border-t border-gray-100 dark:border-white/5 bg-slate-50/50 dark:bg-[#0f172a]/50">
    <div class="container mx-auto px-6 md:px-12">
      <div class="flex flex-col md:flex-row gap-16 items-start">
        
        <!-- Text Content -->
        <div class="w-full md:w-3/5">
          <div class="inline-flex items-center gap-2 text-primary font-semibold tracking-wide uppercase text-sm mb-4">
            <span class="w-8 h-[2px] bg-primary rounded-full"></span>
            About Me
          </div>
          <h2 class="text-3xl md:text-5xl font-bold text-ink-light dark:text-white mb-8">Bridging HR and Technology.</h2>
          
          <div class="text-slate-600 dark:text-slate-400 space-y-4 text-lg leading-relaxed">
            <p>
              I am a Human Capital Officer with over 4 years of experience in Human Capital Management, focusing on People Analytics, HCIS, and employee data management.
            </p>
            <p>
              I hold a degree in Informatics Engineering (Software Engineering) from Universitas Raharja, which allows me to combine HR business understanding with technical capabilities.
            </p>
            <p>
              I have experience managing HR systems (MYHC & SAP), handling employee data processing, and designing system solutions based on user requirements to improve HR process efficiency.
            </p>
          </div>
        </div>
        
        <!-- Skills -->
        <div class="w-full md:w-2/5">
          <div class="glass-card p-8 rounded-[24px]">
            <h3 class="text-xl font-bold text-ink-light dark:text-white mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Core Competencies
            </h3>
            
            <ul class="space-y-3">
              <li v-for="skill in skills" :key="skill" class="flex items-start gap-3">
                <svg class="h-5 w-5 text-primary shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-slate-600 dark:text-slate-300 font-medium">{{ skill }}</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
const skills = [
  'Human Capital Management',
  'People Analytics',
  'HCIS (Human Capital Information System)',
  'SAP (HR Module - Basic)',
  'Data Management & Reporting',
  'System Analysis & Requirement Gathering',
  'Microsoft PowerApps',
  'Basic Web Development (Vue.js)',
  'Process Improvement'
]
</script>
