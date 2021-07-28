import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/signup',
    component: () => import('@/views/signup/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/cars',
    component: Layout,
    meta: { title: 'Cars', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'Vehicles',
        component: () => import('@/views/cars/index'),
        meta: { title: 'Vehicles', icon: 'example' }
      },
      {
        path: 'add-new',
        name: 'Add vehicle',
        component: () => import('@/views/cars/add-new'),
        meta: { title: 'Add vehicle', icon: 'example' },
        hidden: true
      },
      {
        path: 'edit/:id',
        name: 'Edit vehicle',
        component: () => import('@/views/cars/edit'),
        meta: { title: 'Edit vehicle', icon: 'example' },
        props: true,
        hidden: true
      }
    ]
  },
  {
    path: '/orders',
    component: Layout,
    meta: { title: 'Orders', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'Orders',
        component: () => import('@/views/orders/index'),
        meta: { title: 'Orders', icon: 'example' }
      },
      {
        path: 'edit/:id',
        name: 'Edit order',
        component: () => import('@/views/orders/edit-order'),
        meta: { title: 'Edit order', icon: 'example' },
        props: true,
        hidden: true
      }
    ]
  },
  {
    path: '/accounts', 
    component: Layout,
    meta: { title: 'Accounts', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'Accounts',
        component: () => import('@/views/accounts/index'),
        meta: { title: 'Accounts', icon: 'example' }
      },
      {
        path: 'add-account',
        name: 'Add account',
        component: () => import('@/views/accounts/add-account'),
        meta: { title: 'Add account', icon: 'example' },
        hidden: true
      },
      {
        path: 'edit-account/:id',
        name: 'Edit account',
        component: () => import('@/views/accounts/edit-account'),
        meta: { title: 'Edit account', icon: 'example' },
        props: true,
        hidden: true
      }
    ]
  },
  {
    path: '/',
    component: Layout, 
    redirect: '/profile',
    children: [{
      path: 'profile',
      name: 'Profile',
      component: () => import('@/views/profile/index'),
      meta: { title: 'Options', icon: 'dashboard' },
      hidden: false
    }]
  },
  
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
