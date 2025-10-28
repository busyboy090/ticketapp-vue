import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import router from './router';
import Toast from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';
import { VueQueryPlugin } from '@tanstack/vue-query'

createApp(App)
    .use(router)
    .use(VueQueryPlugin)
    .use(Toast, { autoClose: 3000 })
    .mount('#app')
