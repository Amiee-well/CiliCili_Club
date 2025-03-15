import { ROUTE_TripoSR_CONVERSATION, ROUTE_TripoSR_CONVERSATION_NEW } from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'tripo_sr',
      name: ROUTE_TripoSR_CONVERSATION_NEW,
      component: () => import('@/pages/media/tripo_sr.vue')
    },
    {
      path: 'tripo_sr/:id',
      name: ROUTE_TripoSR_CONVERSATION,
      component: () => import('@/pages/media/tripo_sr.vue')
    }
  ]
};
