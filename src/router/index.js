import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/AuthStore'
import { getProjectsOfUser } from '../lib/backendApi.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('../views/TasksView.vue'),
      meta: { requiresAuth: true },
    },

    {
      path: '/login_callback',
      name: 'login_callback',
      component: () => import('../views/LoginCallback.vue'),
    },
    {
      path: '/create_project',
      name: 'create_project',
      component: () => import('../views/CreateProjectView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
      meta: { requiresAuth: true },
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  console.log({ to, from, next })
  const authStore = useAuthStore()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if ($cookies.get('idToken') == null) {
      next({
        name: 'login',
        query: { redirect: to.fullPath },
      })
    } else {
      const { projects, error } = await getProjectsOfUser()
      if (projects?.length < 1) {
        next({
          name: 'create_project',
        })
      } else {
        const currentProjectIdInLocalStorage = localStorage.getItem('currentProjectId')
        if (
          currentProjectIdInLocalStorage &&
          ![null, undefined, 'null', 'undefined'].includes(currentProjectIdInLocalStorage)
        ) {
          next()
        } else {
          localStorage.setItem('currentProjectId', projects[0].id)
          next()
        }
      }
      return
    }
  } else {
    next()
  }
})
export default router
