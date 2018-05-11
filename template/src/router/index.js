import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const requireComponent = require.context('@/pages/login', true, /\.vue$/)
requireComponent.keys().forEach(key => {
  const componentName = /^\S+\/(\w+).vue$/.exec(key)[1]
  const comConfig = requireComponent(key)
  console.log(componentName)
  Vue.component(componentName, comConfig.default || comConfig)
})

// const Login        = () => import('@/pages/login/index')
// const form         = () => import('@/pages/login/form')
// const formLogin    = () => import('@/pages/login/form_login.vue')
// const formRegister = () => import('@/pages/login/form_register.vue')
// const formForget   = () => import('@/pages/login/form_forget.vue')
// const termsPage    = () => import('@/pages/login/terms.vue')

// const Home         = () => import('@/pages/Home.vue')

// const HomeIndex    = () => import('@/pages/home/1_index.vue')
// const User         = () => import('@/pages/home/2_user.vue')
// const UserActive   = () => import('@/pages/home/3_user.active.vue')
// const Device       = () => import('@/pages/home/4_device.vue')
// const DeviceAuthor = () => import('@/pages/home/5_device.author.vue')
// const Alarm        = () => import('@/pages/home/6_alarm')
// const Apk          = () => import('@/pages/home/7_apk')
// const Firmware     = () => import('@/pages/home/8_firmware')
// const Message      = () => import('@/pages/home/9_message')
// const Feedback     = () => import('@/pages/home/10_feedback')
// const Email        = () => import('@/pages/home/11_email')
// const Question     = () => import('@/pages/home/12_question')

const router = new Router({
//   routes: [
//     { path: '/', redirect: '/login'},
//     { path: '/login', component: Login,
//       children: [
//         { path: '', component: form, 
//           children: [
//             { path: '',             name: 'login',           component: formLogin },
//             { path: '/register',    name: 'register',        component: formRegister },
//             { path: '/forget',      name: 'forget',          component: formForget }
//           ]
//         },
//         { path: '/terms',     name: 'terms',        component: termsPage }
//       ]
//     },
//     { path: '/home', component: Home,
//       children: [
//         { path: '',              name: 'operation',    component: HomeIndex,      },
//         { path: '/user',         name: 'User',         component: User,           },
//         { path: '/userActive',   name: 'UserActive',   component: UserActive,     },
//         { path: '/device',       name: 'Device',       component: Device,         },
//         { path: '/deviceAuthor', name: 'DeviceAuthor', component: DeviceAuthor,   },
//         { path: '/alarm',        name: 'Alarm',        component: Alarm,          },
//         { path: '/apk',          name: 'Apk',          component: Apk,            },
//         { path: '/firmware',     name: 'Firmware',     component: Firmware,       },
//         { path: '/message',      name: 'Message',      component: Message,        },
//         { path: '/feedback',     name: 'Feedback',     component: Feedback,       },
//         { path: '/email',        name: 'Email',        component: Email,          },
//         { path: '/question',     name: 'Question',     component: Question,       },
//       ]
//     }
//   ]
})

export default router
