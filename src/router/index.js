import Vue from 'vue'
import VueRouter from 'vue-router'
import ScreenPage from '@/views/ScreenPage'
import QmjPage from '@/views/QmjPage'
import llPage from '@/views/llPage'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/screen'
  },
  {
    path: '/screen',
    component: ScreenPage
  },

  {
    path: '/qmj',
    name:'QmjPage',
    component: QmjPage
  },
  {
    path: '/ll',
    name:'llPage',
    component: llPage
  }
]

const router = new VueRouter({
  routes
})

export default router
