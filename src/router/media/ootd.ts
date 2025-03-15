import { ROUTE_ootd_CONVERSATION, ROUTE_ootd_CONVERSATION_NEW } from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'ootd',
      name: ROUTE_ootd_CONVERSATION_NEW,
      component: () => import('@/pages/media/ootd.vue')
    },
    {
      path: 'ootd/:id',
      name: ROUTE_ootd_CONVERSATION,
      component: () => import('@/pages/media/ootd.vue')
    }
  ]
};
