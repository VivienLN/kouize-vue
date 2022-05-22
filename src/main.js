import { createApp } from 'vue'
import App from './App.vue'
import './index.css'


import Button from './components/ui/Button.vue'

const app = createApp(App)
    .component('Button', Button)
    .mount('#app')
