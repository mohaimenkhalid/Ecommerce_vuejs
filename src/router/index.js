import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/pages/Login'
import Admin from '@/components/pages/admin/Admin'
import Category from '@/components/pages/admin/Category'
import Supplier from '@/components/pages/admin/Supplier'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      redirect: {path: "login"}
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      redirect: {path: "admin/category"},

      children: [
        {
          path : 'category',
          name: 'admin.category',
          component: Category
        },

        {
          path : 'supplier',
          name: 'admin.supplier',
          component: Supplier
        },

      ]
    },

  ],

  mode: "history"
})
