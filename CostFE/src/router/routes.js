import Vue from 'vue';
import Router from 'vue-router';

/* Layout */
import Layout from '../views/layout/Layout';

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;

Vue.use(Router);

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/Login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    name: 'Dashboard',
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/dashboard')
      }
    ]
  }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/cost',
    meta: {
      title: '成本管理',
      icon: 'th-large',
      role: [1, 3]
    },
    component: Layout,
    alwaysShow: true,
    children: [
      {
        name: '成本',
        path: 'costs',
        component: () => import('@/views/cost/cost'),
        meta: {
          title: '成本',
          icon: 'documentation',
          role: [3]
        }
      }
    ]
  },
  {
    path: '/admin',
    meta: {
      title: '系统管理',
      icon: 'th-large',
      role: [3]
    },
    component: Layout,
    alwaysShow: true,
    children: [
      {
        name: '用户管理',
        path: 'users',
        component: () => import('@/views/admin/Users'),
        meta: {
          title: '用户管理',
          icon: 'lock',
          role: [3]
        }
      },
      {
        name: '修改信息',
        path: 'info',
        hidden: true,
        component: () => import('@/views/admin/Info'),
        meta: {
          title: '修改信息',
          icon: 'user',
          role: [1, 3]
        }
      },
      {
        name: '类别管理',
        path: 'categorys',
        component: () => import('@/views/category/Category'),
        meta: {
          title: '类别管理',
          icon: 'cog',
          role: [3]
        }
      },
      {
        name: '费用子项管理',
        path: 'costitem',
        component: () => import('@/views/costitem/Costitem'),
        meta: {
          title: '费用子项管理',
          icon: 'cog',
          role: [3]
        }
      },
      {
        name: 'Settings',
        path: 'settings',
        component: () => import('@/views/admin/Settings'),
        meta: {
          title: 'Settings',
          icon: 'cog',
          role: [3]
        }
      }
    ]
  },
  {
    path: '/report',
    meta: {
      title: '报表管理',
      icon: 'th-large',
      role: [3]
    },
    component: Layout,
    alwaysShow: true,
    children: [
      {
        name: '成本分析',
        path: 'itemstatistics',
        component: () => import('@/views/report/itemStatistics'),
        meta: {
          title: '成本分析',
          icon: 'lock',
          role: [3]
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
];
