/*
 * @Author: morijiu
 * @Date: 2024-07-14 18:13:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-07-14 18:23:38
 * @Description:
 * @FilePath: \Nexior-main\src\router\test.ts
 */
// import { ROUTE_MIDJOURNEY_INDEX } from './constants';

export default {
  path: '/test',
  meta: {
    auth: true
  },
  component: () => import('@/layouts/Main.vue'),
  children: [
    {
      path: '',
      name: 'Test',
      component: () => import('@/pages/test/Index.vue')
    }
  ]
};
