import Layout from '../views/layout/Layout';

const _import = require('./_import_' + process.env.NODE_ENV); /* eslint-disable-line */

const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
];

const asyncRouterMap = [
  {
    path: '/dashboard',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'el-icon-date',
    },
    children: [
      {
        path: '',
        component: _import('dashboard/index'),
        meta: {
          title: '首页',
          icon: 'el-icon-date',
        },
      },
    ],
  },
  {
    path: '/system-mangement',
    component: Layout,
    meta: {
      title: '系统管理',
      icon: 'el-icon-date',
    },
    children: [
      {
        path: 'user',
        component: _import('dashboard/index'),
        meta: {
          title: '用户管理',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'role',
        component: _import('dashboard/index'),
        meta: {
          title: '角色管理',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'perm',
        component: _import('dashboard/index'),
        meta: {
          title: '权限管理',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'resc',
        component: _import('dashboard/index'),
        meta: {
          title: '资源管理',
          icon: 'el-icon-date',
        },
      },
    ],
  },
];

export { constantRouterMap, asyncRouterMap };
