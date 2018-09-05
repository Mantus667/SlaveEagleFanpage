import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/band',
      name: 'band',
      component: () => import(/* webpackChunkName: "band" */ './views/Band.vue')
    },
    {
      path: '/band/*/:id',
      name: 'bandmemmber',
      component: () => import(/* webpackChunkName: "band" */ './views/BandMember.vue')
    },
    {
      path: '/album/*/:id',
      name: 'album',
      component: () => import(/* webpackChunkName: "album" */ './views/Album.vue')
    },
    {
      path: '/products/*/:id',
      name: 'product',
      component: () => import(/* webpackChunkName: "product" */ './views/Product.vue')
    },
    {
      path: '/tours/*/:id',
      name: 'tour',
      component: () => import(/* webpackChunkName: "tour" */ './views/Tour.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
