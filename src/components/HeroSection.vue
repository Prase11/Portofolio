<template>
  <section id="hero" class="min-h-screen relative flex items-center pt-20 pb-12 sm:pt-0 overflow-hidden">
    <!-- Clean Background Effects (Not overly colorful) -->
    <div class="absolute inset-0 z-0 opacity-40 dark:opacity-100">
      <div class="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-400/5 rounded-full blur-[100px]"></div>
    </div>
    
    <div class="container mx-auto px-6 md:px-12 relative z-10 transition-transform">
      <div class="max-w-4xl flex flex-col items-start fade-in-up">
        
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-ink-light dark:text-white">
          Hi, I'm <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">Prasetyo Nugroho</span><br />
        </h1>
        
        <h2 class="text-2xl md:text-3xl font-medium text-slate-600 dark:text-slate-300 mb-6">
          Human Capital Officer | <span class="text-primary font-semibold">People Analytics & HCIS</span>
        </h2>
        
        <p class="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed">
          Managing data, systems, and Human Capital processes to support data-driven business decisions.
        </p>
        
        <div class="flex flex-wrap gap-4">
          <a href="#about" class="px-8 py-4 bg-primary text-white rounded-[16px] font-medium hover:bg-blue-600 transition-all shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 flex items-center gap-2">
            More About Me
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </a>
          <a href="#contact" class="px-8 py-4 bg-white/50 dark:bg-transparent text-slate-700 dark:text-white border border-gray-200 dark:border-white/20 rounded-[16px] font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-all shadow-sm">
            Contact Me
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
