<template>
  <section id="contact" class="py-24 relative z-10 border-t border-gray-100 dark:border-white/5 bg-slate-50/50 dark:bg-[#0f172a]/50">
    <div class="container mx-auto px-6 md:px-12 max-w-5xl">
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 text-primary font-semibold tracking-wide uppercase text-sm mb-4 justify-center">
          <span class="w-8 h-[2px] bg-primary rounded-full"></span>
          What's Next?
        </div>
        <h2 class="text-3xl md:text-5xl font-bold text-ink-light dark:text-white mb-6">Get In Touch</h2>
        <p class="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
          I am currently open to new opportunities matching my skillset in HCIS, People Analytics, and System Analysis. Feel free to reach out!
        </p>
      </div>

      <div class="flex flex-col md:flex-row gap-12">
        <!-- Contact Info -->
        <div class="w-full md:w-1/3">
          <div class="glass-card p-8 rounded-[24px] space-y-8 h-full">
            <div>
              <h3 class="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Email</h3>
              <a href="mailto:nugrohoprase3@gmail.com" class="text-lg font-medium text-ink-light dark:text-white hover:text-primary transition-colors flex items-center gap-3">
                nugrohoprase3@gmail.com
              </a>
            </div>
            
            <div>
              <h3 class="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Phone</h3>
              <a href="tel:+6285156241412" class="text-lg font-medium text-ink-light dark:text-white hover:text-primary transition-colors flex items-center gap-3">
                +62 851-5624-1412
              </a>
            </div>
            
            <div>
              <h3 class="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Social Profiles</h3>
              <div class="flex gap-4">
                <a href="https://github.com/Prase11" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white hover:-translate-y-1 transition-all shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="w-full md:w-2/3">
          <form @submit.prevent="submitForm" class="glass-card p-8 md:p-10 rounded-[24px]">
            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label for="name" class="block text-sm font-medium text-slate-600 dark:text-slate-300">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    v-model="form.name" 
                    required
                    class="w-full bg-white dark:bg-[#0f172a]/50 border border-gray-200 dark:border-white/10 rounded-[12px] px-4 py-3.5 text-ink-light dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Your Name"
                  >
                </div>
                <div class="space-y-2">
                  <label for="email" class="block text-sm font-medium text-slate-600 dark:text-slate-300">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="form.email" 
                    required
                    class="w-full bg-white dark:bg-[#0f172a]/50 border border-gray-200 dark:border-white/10 rounded-[12px] px-4 py-3.5 text-ink-light dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="you@email.com"
                  >
                </div>
              </div>
              
              <div class="space-y-2">
                <label for="message" class="block text-sm font-medium text-slate-600 dark:text-slate-300">Message</label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  rows="5" 
                  required
                  class="w-full bg-white dark:bg-[#0f172a]/50 border border-gray-200 dark:border-white/10 rounded-[12px] px-4 py-3 text-ink-light dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="How can I help you?"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                class="px-8 py-4 bg-primary text-white rounded-[16px] font-medium hover:bg-blue-600 transition-all w-full flex justify-center items-center gap-2 shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5"
                :disabled="isSubmitting"
              >
                <span v-if="!isSubmitting">Send Message</span>
                <span v-else class="flex items-center gap-2">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              </button>
              
              <Transition name="fade">
                <p v-if="successMessage" class="text-green-500 dark:text-green-400 text-center text-sm font-medium pt-2">
                  {{ successMessage }}
                </p>
              </Transition>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const successMessage = ref('')

const submitForm = () => {
  isSubmitting.value = true
  
  setTimeout(() => {
    isSubmitting.value = false
    successMessage.value = 'Thanks for your message! I will get back to you soon.'
    
    form.name = ''
    form.email = ''
    form.message = ''
    
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  }, 1500)
}
</script>
