import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PacienteView from '../views/pacientePaginas/PacienteView.vue'
import listarPacinte from '../views/pacientePaginas/ListarPacienteView.vue'
import editar_paciente from '../views/pacientePaginas/EditarPacienteView.vue'
import historico_pacinte  from '../views/pacientePaginas/PacienteInfoView.vue'

import medico from '../views/medicoPaginas/CadastrarMedicoView.vue'
import listar_medico from '../views/medicoPaginas/ListarMedicoView.vue'
import medico_editar from '../views/medicoPaginas/EditarMedicoView.vue'
import info_medico  from '../views/medicoPaginas/InfoMedicoView.vue'

import consulta from '../views/consutlaPaginas/CdastrarConsultaView.vue'

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
    path: '/historico_pacinte:bi',
    name: 'historico_pacinte',
    component: historico_pacinte

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

  }
  ,
  {
    path: '/medico',
    name: 'medico',
    component: medico

  },
  {
    path: '/listar_medico',
    name: 'listar_medico',
    component: listar_medico

  },
  {
    path: '/medico_editar:numero_ordem',
    name: 'medico_editar',
    component: medico_editar

  },
  {
    path: '/info_medico:numero_ordem',
    name: 'info_medico',
    component: info_medico

  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
  ,
  /// paginas de consulta 
  {
    path: '/consulta:bi',
    name: 'consulta',
    component: consulta

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
