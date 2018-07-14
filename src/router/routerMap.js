/**
* @author kun
* 2018-7-11
*/

import Layout from '../views/layout/Layout';

const _import = require('./_import_' + process.env.NODE_ENV); /* eslint-disable-line */

const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
];

const asyncRouterMap = [
  { path: '/404', component: _import('dashboard/index'), hidden: true },
  { path: '/error', component: _import('dashboard/index'), hidden: true },
  { path: '*', redirect: '/404' },
  { path: '', redirect: '/dashboard/index' },
  {
    path: '/dashboard',
    component: Layout,
    meta: {
      title: '首页',
      code: 'dashboard',
      icon: 'el-icon-date',
    },
    children: [
      {
        path: 'index',
        component: _import('dashboard/index'),
        meta: {
          title: '首页',
          code: 'dashboard_index',
          icon: 'el-icon-date',
        },
      },
    ],
  },
  {
    path: '/system-management',
    component: Layout,
    meta: {
      title: '系统管理',
      code: 'system-management',
      icon: 'el-icon-date',
    },
    children: [
      {
        path: 'user-management',
        component: _import('system-management/user-management/index'),
        meta: {
          title: '用户管理',
          code: 'system-management_user-management',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'role-management',
        component: _import('system-management/role-management/index'),
        meta: {
          title: '角色管理',
          code: 'system-management_role-management',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'role-management/allocation-perm',
        component: _import('system-management/role-management/allocation-perm'),
        hidden: true,
        meta: {
          title: '分配权限',
          code: 'system-management_role-management_allocation-perm',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'perm-management',
        component: _import('system-management/perm-management/index'),
        meta: {
          title: '权限管理',
          code: 'system-management_perm-management',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'perm-management/allocation-resc',
        component: _import('system-management/perm-management/allocation-resc'),
        hidden: true,
        meta: {
          title: '分配资源',
          code: 'perm-management_allocation-resc',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'resc-management',
        component: _import('system-management/resc-management/index'),
        meta: {
          title: '资源管理',
          code: 'system-management_resc-management',
          icon: 'el-icon-date',
        },
      },
    ],
  },
  {
    path: '/vcharts-demo',
    component: Layout,
    meta: {
      title: 'v-charts',
      code: 'vcharts-demo',
      icon: 'el-icon-date',
    },
    children: [
      {
        path: 'line',
        component: _import('vcharts-demo/line'),
        meta: {
          title: '折线图',
          code: 'vcharts-demo_line',
          icon: 'el-icon-date',
        },
      },
    ],
  },
  {
    path: '/d3',
    component: Layout,
    meta: {
      title: 'd3',
      code: 'd3',
      icon: 'el-icon-date',
    },
    children: [
      {
        path: 'd3-tree',
        component: _import('d3/tree/index'),
        meta: {
          title: 'tree',
          code: 'd3_tree',
          icon: 'el-icon-date',
        },
      },
    ],
  },
];

export { constantRouterMap, asyncRouterMap };
