import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import TEST from './test'
console.log('app:',App)
console.log(TEST())
createApp(App).mount('#app')
