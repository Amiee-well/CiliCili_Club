import { ROUTE_Kolors_CONVERSATION, ROUTE_Kolors_CONVERSATION_NEW } from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'kolors',
      name: ROUTE_Kolors_CONVERSATION_NEW,
      component: () => import('@/pages/media/kolors.vue')
    },
    {
      path: 'kolors/:id',
      name: ROUTE_Kolors_CONVERSATION,
      component: () => import('@/pages/media/kolors.vue')
    }
  ]
};
