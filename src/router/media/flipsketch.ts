import { ROUTE_flipsketch_CONVERSATION, ROUTE_flipsketch_CONVERSATION_NEW } from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'flipsketch',
      name: ROUTE_flipsketch_CONVERSATION_NEW,
      component: () => import('@/pages/media/flipsketch.vue')
    },
    {
      path: 'flipsketch/:id',
      name: ROUTE_flipsketch_CONVERSATION,
      component: () => import('@/pages/media/flipsketch.vue')
    }
  ]
};
