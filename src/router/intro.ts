/*
 * @Author: morijiu
 * @Date: 2024-07-14 18:13:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-24 15:56:40
 * @Description:
 * @FilePath: \Nexior-main\src\router\intro.ts
 */
import { ROUTE_SERVICE_INDEX } from './constants';

export default {
  path: '/intro',
  component: () => import('@/layouts/Main.vue'),
  meta: {
    auth: false
  },
  children: [
    {
      path: '',
      redirect: {
        name: ROUTE_SERVICE_INDEX
      }
    },
    {
      path: 'index',
      name: ROUTE_SERVICE_INDEX,
      component: () => import('@/pages/introduction/Index.vue')
    }
  ]
};
