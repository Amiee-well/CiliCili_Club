import { ROUTE_IC_Light_CONVERSATION, ROUTE_IC_Light_CONVERSATION_NEW } from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'IC_Light',
      name: ROUTE_IC_Light_CONVERSATION_NEW,
      component: () => import('@/pages/media/IC_Light.vue')
    },
    {
      path: 'IC_Light/:id',
      name: ROUTE_IC_Light_CONVERSATION,
      component: () => import('@/pages/media/IC_Light.vue')
    }
  ]
};
