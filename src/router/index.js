import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Ppt from '@/components/ppt'
import Cart from '@/components/Cart'
import Purchased from '@/components/Purchased'
import Profile from '@/components/profile'
import Register from '@/components/register'
import Type from '@/components/type'
import Way from '@/components/way'
import AddProduct from '@/components/addProduct'
import Query from '@/components/query'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/ppt/:id',
      name: 'ppt',
      component: Ppt
    },
    {
      path: '/type/:id',
      name: 'type',
      component: Type
    },
    {
      path: '/way/:id',
      name: 'way',
      component: Way
    },
    {
      path: '/cart',
      name:'cart',
      component: Cart
    },
    {
      path: '/purchased',
      name:'purchased',
      component: Purchased
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/AddProduct',
      name: 'AddProduct',
      component: AddProduct
    },
    {
      path: '/query/:id',
      name: 'query',
      component: Query
    }
  ]
})
