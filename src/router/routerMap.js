import Layout from '../views/layout/Layout';

const _import = require('./_import_' + process.env.NODE_ENV); /* eslint-disable-line */

const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
];

const asyncRouterMap = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    meta: {
      title: '首页',
      icon: 'el-icon-date',
    },
    children: [
      {
        path: 'index',
        component: _import('dashboard/index'),
        meta: {
          title: '首页',
        },
      },
      {
        path: 'test',
        component: _import('dashboard/test/index'),
        meta: {
          title: '测试页',
        },
      },
    ],
  },
  {
    path: '/hello',
    component: Layout,
    redirect: '/hello/index',
    children: [
      {
        path: 'index',
        component: _import('dashboard/index'),
        meta: {
          title: '你好',
          icon: 'el-icon-date',
        },
      },
    ],
  },
];

export { constantRouterMap, asyncRouterMap };
