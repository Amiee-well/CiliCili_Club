import { ROUTE_MetaGPT_CONVERSATION, ROUTE_MetaGPT_CONVERSATION_NEW } from '../constants';

export default {
  path: '/study',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'MetaGPT',
      name: ROUTE_MetaGPT_CONVERSATION_NEW,
      component: () => import('@/pages/study/MetaGPT.vue')
    },
    {
      path: 'MetaGPT/:id',
      name: ROUTE_MetaGPT_CONVERSATION,
      component: () => import('@/pages/study/MetaGPT.vue')
    }
  ]
};
