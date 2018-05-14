import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Login               = () => import('@/pages/login/index.vue')
const login_form          = () => import('@/pages/login/1_login/login.vue')
const signup_form          = () => import('@/pages/login/2_signup/signup.vue')
const forget_form          = () => import('@/pages/login/3_forget/forget.vue')

const Home                = () => import('@/pages/home/index.vue')
{{$imports}}

const router = new Router({
  routes: [
    { path: '/', redirect: '/login'},
    { path: '/login', component: Login,
      children: [
        { path: '',                  name: 'login',             component: login_form           },
        { path: '/signup',            name: 'signup',            component: signup_form          },
        { path: '/forget',            name: 'forget',            component: forget_form          },
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
