import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Projects from './pages/Projects.vue'
import App from './App.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/projets', component: Projects },
  ]


const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
  })


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
