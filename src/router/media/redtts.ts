import { ROUTE_redtts_CONVERSATION, ROUTE_redtts_CONVERSATION_NEW } from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'redtts',
      name: ROUTE_redtts_CONVERSATION_NEW,
      component: () => import('@/pages/media/redtts.vue')
    },
    {
      path: 'redtts/:id',
      name: ROUTE_redtts_CONVERSATION,
      component: () => import('@/pages/media/redtts.vue')
    }
  ]
};
