
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Project from '../views/Project.vue'
import Contact from '../views/Contact.vue'
import NotFound from '../views/NotFound.vue'
import Resources from '../views/Resources.vue'
import Article from '../views/Article.vue'

const routes : RouteRecordRaw[] = [
  {path: '/', redirect: '/home'},
  {path: '/home', name: 'Home', component: Home},
  { path: '/about', name: 'About', component: About },
  { path: '/project', name: 'Project', component: Project },
  { path: '/resources', name: 'Resources', component: Resources },
  { path: '/articles', name: 'Articles', component: Article },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  }
})

export default router