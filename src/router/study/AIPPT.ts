import { ROUTE_AI_PPT_CONVERSATION, ROUTE_AI_PPT_CONVERSATION_NEW } from '../constants';

export default {
  path: '/study',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'ai_ppt',
      name: ROUTE_AI_PPT_CONVERSATION_NEW,
      component: () => import('@/pages/study/ai_ppt.vue')
    },
    {
      path: 'ai_ppt/:id',
      name: ROUTE_AI_PPT_CONVERSATION,
      component: () => import('@/pages/study/ai_ppt.vue')
    }
  ]
};
