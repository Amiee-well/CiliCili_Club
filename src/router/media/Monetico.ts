import { ROUTE_Monetico_CONVERSATION, ROUTE_Monetico_CONVERSATION_NEW } from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'monetico',
      name: ROUTE_Monetico_CONVERSATION_NEW,
      component: () => import('@/pages/media/monetico.vue')
    },
    {
      path: 'monetico/:id',
      name: ROUTE_Monetico_CONVERSATION,
      component: () => import('@/pages/media/monetico.vue')
    }
  ]
};
