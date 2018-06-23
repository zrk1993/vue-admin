import Layout from '../views/layout/Layout';

const _import = require('./_import_' + process.env.NODE_ENV); /* eslint-disable-line */

const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
];

const asyncRouterMap = [
  {
    path: '',
    redirect: '/dashboard',
  },
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
        path: 'user-mangement',
        component: _import('system-mangement/user-mangement/index'),
        meta: {
          title: '用户管理',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'role-mangement',
        component: _import('dashboard/index'),
        meta: {
          title: '角色管理',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'perm-mangement',
        component: _import('dashboard/index'),
        meta: {
          title: '权限管理',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'resc-mangement',
        component: _import('dashboard/index'),
        meta: {
          title: '资源管理',
          icon: 'el-icon-date',
        },
      },
    ],
  },
];

function setName(arr, prefix = '') {
  arr.forEach((item) => {
    const name = [prefix, item.path].join('').replace(/\//g, ''); // 组件名只能小写字母开头
    if (!item.children) {
      if (item.component) {
        Object.defineProperty(item.component, 'name', {
          value: item.component.name || name,
          writable: false,
          enumerable: true,
          configurable: true,
        });
      }
    } else {
      setName(item.children, name);
    }
  });
}
setName(asyncRouterMap);

export { constantRouterMap, asyncRouterMap };
