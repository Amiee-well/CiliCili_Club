import {
  ROUTE_CONSOLE_APPLICATION_BUY,
  ROUTE_CONSOLE_APPLICATION_LIST,
  ROUTE_CONSOLE_ORDER_DETAIL,
  ROUTE_CONSOLE_ORDER_LIST,
  ROUTE_CONSOLE_ROOT,
  ROUTE_CONSOLE_VIP_LIST,
  ROUTE_CONSOLE_BUY_LIST,
  ROUTE_CONSOLE_QUERY_LIST
} from './constants';

export default {
  path: '/console',
  meta: {
    auth: true
  },
  component: () => import('@/layouts/Console.vue'),
  children: [
    {
      path: '',
      name: ROUTE_CONSOLE_ROOT,
      redirect: {
        name: ROUTE_CONSOLE_APPLICATION_LIST
      }
    },
    {
      path: 'orders',
      name: ROUTE_CONSOLE_ORDER_LIST,
      component: () => import('@/pages/console/order/List.vue')
    },
    {
      path: 'orders/:id',
      name: ROUTE_CONSOLE_ORDER_DETAIL,
      component: () => import('@/pages/console/order/Detail.vue')
    },
    {
      path: 'applications',
      name: ROUTE_CONSOLE_APPLICATION_LIST,
      component: () => import('@/pages/console/application/List.vue')
    },
    {
      path: 'applications/:id/buy',
      name: ROUTE_CONSOLE_APPLICATION_BUY,
      component: () => import('@/pages/console/application/Buy.vue')
    },
    {
      path: 'buy',
      name: ROUTE_CONSOLE_BUY_LIST,
      component: () => import('@/pages/console/application/Buy.vue')
    },
    {
      path: 'vip',
      name: ROUTE_CONSOLE_VIP_LIST,
      component: () => import('@/pages/console/application/VIP.vue')
    },
    {
      path: 'query',
      name: ROUTE_CONSOLE_QUERY_LIST,
      component: () => import('@/pages/console/application/query.vue')
    }
  ]
};
