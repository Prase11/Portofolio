<template>
  <section id="projects" class="py-24 relative z-10 bg-slate-50/50 dark:bg-[#0f172a]/50 border-y border-gray-100 dark:border-white/5">
    <div class="container mx-auto px-6 md:px-12">
      <div class="flex flex-col md:flex-row justify-between items-end mb-16">
        <div>
          <div class="inline-flex items-center gap-2 text-primary font-semibold tracking-wide uppercase text-sm mb-4">
            <span class="w-8 h-[2px] bg-primary rounded-full"></span>
            Showcase
          </div>
          <h2 class="text-3xl md:text-5xl font-bold text-ink-light dark:text-white">Selected Projects</h2>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <div 
          v-for="project in projects" 
          :key="project.id" 
          class="glass-card rounded-[24px] overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
        >
          <!-- Project Info -->
          <div class="p-8 flex-1 flex flex-col">
            <div class="flex justify-between items-start mb-6">
              <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            
            <h3 class="text-2xl font-bold text-ink-light dark:text-white mb-4 group-hover:text-primary transition-colors">
              {{ project.title }}
            </h3>
            
            <ul class="space-y-3 mb-8 flex-1">
              <li v-for="(desc, i) in project.description" :key="i" class="flex text-slate-600 dark:text-slate-400 gap-3">
                <svg class="h-5 w-5 text-primary shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>{{ desc }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = [
  {
    id: 1,
    title: 'HCIS (MYHC) Management & Integration',
    description: [
      'HR system integrated with SAP to ensure seamless data flow and accuracy.'
    ]
  },
  {
    id: 2,
    title: 'Employee Data Quality Improvement',
    description: [
      'Data validation and monitoring system to maintain high integrity of employee records.'
    ]
  },
  {
    id: 3,
    title: 'HR Digital Form (PowerApps)',
    description: [
      'HR request application utilizing Microsoft PowerApps, integrated perfectly with internal systems.'
    ]
  },
  {
    id: 4,
    title: 'System Requirement & Design',
    description: [
      'Analyze user needs and design information systems to support business operational goals.'
    ]
  }
]
</script>
