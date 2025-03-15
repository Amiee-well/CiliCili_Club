import { ROUTE_Midjourney_CONVERSATION, ROUTE_Midjourney_CONVERSATION_NEW } from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'midjourney',
      name: ROUTE_Midjourney_CONVERSATION_NEW,
      component: () => import('@/pages/media/midjourney.vue')
    },
    {
      path: 'midjourney/:id',
      name: ROUTE_Midjourney_CONVERSATION,
      component: () => import('@/pages/media/midjourney.vue')
    }
  ]
};
