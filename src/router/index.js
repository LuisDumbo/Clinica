import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PacienteView from '../views/PacienteView.vue'
import listarPacinte from '../views/ListarPacienteView.vue'
import editar_paciente from '../views/EditarPacienteView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/listarPacinte',
    name: 'listarPacinte',
    component: listarPacinte

  },
  {
    path: '/editar_paciente:bi',
    name: 'editar_paciente',
    component: editar_paciente,
    beforeEnter: (to, from, next) => {
      to.params.bi ? next() : next({
        name: "listarPacinte" // back to safety route //
      });
      /*
      if (to.params.bi) {
        next()
      } else {
        next({
          name: "listarPacinte" // back to safety route //
        });
      }*/
    }

  },
  {
    path: '/paciente',
    name: 'paciente',
    component: PacienteView

  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
