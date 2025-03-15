import { ROUTE_codeformer_CONVERSATION, ROUTE_codeformer_CONVERSATION_NEW } from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'codeformer',
      name: ROUTE_codeformer_CONVERSATION_NEW,
      component: () => import('@/pages/media/codeformer.vue')
    },
    {
      path: 'codeformer/:id',
      name: ROUTE_codeformer_CONVERSATION,
      component: () => import('@/pages/media/codeformer.vue')
    }
  ]
};
