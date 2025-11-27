
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/home/Home.vue'
import About from '../components/about/About.vue'
import Project from '../components/project/Project.vue'
import Contact from '../components/contact/Contact.vue'
import NotFound from '../components/not-found/NotFound.vue'

const routes = [
  {path: '/', component: Home},
  {path: '/theaponleuchannel.github.io', name: 'Home', component: Home},
  { path: '/home', component: Home },
  { path: '/about', component: About },
  { path: '/project', component: Project },
  { path: '/contact', component: Contact },
  { path: '/:pathMatch(.*)*', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router