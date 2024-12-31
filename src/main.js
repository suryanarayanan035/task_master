import './assets/main.css'

import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { createPinia } from 'pinia'
import VueCookies from 'vue-cookies'
import ConfirmationService from 'primevue/confirmationservice'
const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      CssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities',
      },
    },
  },
})

app.use(Toast, {})
app.use(createPinia())
app.use(ConfirmationService)
app.use(VueCookies, {})
app.use(router)

app.mount('#app')
