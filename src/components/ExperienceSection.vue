<template>
  <section id="experience" class="py-24 relative z-10">
    <div class="container mx-auto px-6 md:px-12 max-w-4xl">
      <div class="inline-flex items-center gap-2 text-primary font-semibold tracking-wide uppercase text-sm mb-4">
        <span class="w-8 h-[2px] bg-primary rounded-full"></span>
        Professional Journey
      </div>
      <h2 class="text-3xl md:text-5xl font-bold text-ink-light dark:text-white mb-16">Experience</h2>
      
      <div class="relative border-l-2 border-gray-200 dark:border-white/10 ml-3 md:ml-0">
        <div 
          v-for="(job, index) in experiences" 
          :key="job.id" 
          class="mb-14 ml-10 relative group"
        >
          <!-- Timeline dot -->
          <div class="absolute -left-[49px] top-1.5 h-4 w-4 bg-white dark:bg-background border-4 border-primary rounded-full z-10 group-hover:scale-125 transition-transform shadow-sm"></div>
          
          <div class="glass-card p-8 rounded-[24px] hover:-translate-y-1 transition-all duration-300">
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4">
              <h3 class="text-xl font-bold text-ink-light dark:text-white">
                {{ job.role }}
              </h3>
              <span class="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 sm:mt-0 px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-full inline-block">{{ job.duration }}</span>
            </div>
            <h4 class="text-primary font-semibold text-lg mb-4">{{ job.company }}</h4>
            
            <ul class="space-y-3">
              <li v-for="(desc, i) in job.description" :key="i" class="flex text-slate-600 dark:text-slate-400 gap-3">
                <span class="text-primary/70 mt-1.5 text-[10px] shrink-0">●</span>
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
const experiences = [
  {
    id: 1,
    role: 'Human Capital Officer (People Analytics & HCIS)',
    company: 'GMF AeroAsia Tbk',
    duration: 'Aug 2025 - Present',
    description: [
      'Manage and develop HCIS (MYHC)',
      'Handle mutation, hiring, promotion, and termination processes via SAP',
      'Perform employee data extraction and reporting',
      'Ensure integration between MYHC and SAP',
      'Design system solutions based on user requirements'
    ]
  },
  {
    id: 2,
    role: 'Human Capital Officer (Employee Data Quality & Services)',
    company: 'GMF AeroAsia Tbk',
    duration: 'Aug 2023 - Jul 2025',
    description: [
      'Manage employment certificate requests',
      'Handle employee ID card and documentation processes',
      'Perform data entry and validation (SOE)',
      'Maintain employee data quality and accuracy'
    ]
  },
  {
    id: 3,
    role: 'Assistant Human Capital (Internship)',
    company: 'GMF AeroAsia Tbk',
    duration: '2022 - 2023',
    description: [
      'Support Human Capital operational activities',
      'Assist employee administrative needs'
    ]
  }
]
</script>
