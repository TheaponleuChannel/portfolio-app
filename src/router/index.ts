
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '../components/home/Home.vue'
import About from '../components/about/About.vue'
import Project from '../components/project/Project.vue'
import Contact from '../components/contact/Contact.vue'
import NotFound from '../components/not-found/NotFound.vue'

const routes : RouteRecordRaw[] = [
  {path: '/', name: 'Home', component: Home},
  {path: '/home', name: 'Home', component: Home},
  { path: '/about', name: 'About', component: About },
  { path: '/project', name: 'Project', component: Project },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router