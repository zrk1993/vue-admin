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
          code: 'dashboard__index',
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
          code: 'system-management__user-management',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'role-management',
        component: _import('system-management/role-management/index'),
        meta: {
          title: '角色管理',
          code: 'system-management_role-management',
          buttons: {
            'system-management__role-management__allocation-perm': '分配权限',
          },
          icon: 'el-icon-date',
        },
      },
      {
        path: 'role-management/allocation-perm',
        component: _import('system-management/role-management/allocation-perm'),
        hidden: true,
        meta: {
          title: '分配权限',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'perm-management',
        component: _import('system-management/perm-management/index'),
        meta: {
          title: '权限管理',
          code: 'system-management__perm-management',
          buttons: {
            'perm-management__allocation-resc': '分配资源',
          },
          icon: 'el-icon-date',
        },
      },
      {
        path: 'perm-management/allocation-resc',
        component: _import('system-management/perm-management/allocation-resc'),
        hidden: true,
        meta: {
          title: '分配资源',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'resc-management',
        component: _import('system-management/resc-management/index'),
        meta: {
          title: '资源管理',
          code: 'system-management__resc-management',
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
          code: 'vcharts-demo__line',
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
          title: '树',
          code: 'd3__tree',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'd3-pan-zoom',
        component: _import('d3/pan-zoom/index'),
        meta: {
          title: '拖拽缩放',
          code: 'd3__pan-zoom',
          icon: 'el-icon-date',
        },
      },
    ],
  },
  {
    path: '/product',
    component: Layout,
    meta: {
      title: '商品管理',
      code: 'product',
      icon: 'el-icon-date',
    },
    children: [
      {
        path: 'spu',
        component: _import('product/spu/index'),
        meta: {
          title: '商品列表',
          code: 'product__spu',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'spu/add-edit-spu',
        component: _import('product/spu/add-edit-spu/index'),
        hidden: true,
        meta: {
          title: '新增商品',
          code: 'product__add-edit-spu',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'brand',
        component: _import('product/brand/index'),
        meta: {
          title: '商品品牌',
          code: 'product__brand',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'catalog',
        component: _import('product/catalog/index'),
        meta: {
          title: '商品目录',
          code: 'product__catalog',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'label',
        component: _import('product/label/index'),
        meta: {
          title: '商品标签',
          code: 'product__label',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'spec',
        component: _import('product/spec/index'),
        meta: {
          title: '商品属性',
          code: 'product__spec',
          icon: 'el-icon-date',
        },
      },
    ],
  },
  {
    path: '/order',
    component: Layout,
    meta: {
      title: '订单管理',
      code: 'order',
      icon: 'el-icon-date',
    },
    children: [
      {
        path: 'order-list',
        component: _import('order/index'),
        meta: {
          title: '订单列表',
          code: 'order__index',
          icon: 'el-icon-date',
        },
      },
    ],
  },
  {
    path: '/activity',
    component: Layout,
    meta: {
      title: '营销活动',
      code: 'activity',
      icon: 'el-icon-date',
    },
    children: [
      {
        path: 'coupon',
        component: _import('activity/coupon/index'),
        meta: {
          title: '优惠券管理',
          code: 'coupon__index',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'activity',
        component: _import('activity/index'),
        meta: {
          title: '活动管理',
          code: 'activity__index',
          icon: 'el-icon-date',
        },
      },
    ],
  },
];

export { constantRouterMap, asyncRouterMap };
