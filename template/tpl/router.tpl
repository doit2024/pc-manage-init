import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Login               = () => import('@/pages/login/index.vue')
const login_form          = () => import('@/pages/1_login/login.vue')

const Home                = () => import('@/pages/home/index.vue')
{{$imports}}

const router = new Router({
  routes: [
    { path: '/', redirect: '/login'},
    { path: '/login', component: Login,
      children: [
        { path: '',                  name: 'login',             component: login_form           },
      ]
    },
    { path: '/home', component: Home,
      children: [
{{$routes}}
      ]
    }
  ]
})

export default router
