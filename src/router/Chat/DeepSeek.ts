import { ROUTE_DeepSeek_CONVERSATION, ROUTE_DeepSeek_CONVERSATION_NEW } from '../constants';

export default {
  path: '/chat',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'conversations4',
      name: ROUTE_DeepSeek_CONVERSATION_NEW,
      component: () => import('@/pages/chat/Conversation4.vue')
    },
    {
      path: 'conversations4/:id',
      name: ROUTE_DeepSeek_CONVERSATION,
      component: () => import('@/pages/chat/Conversation4.vue')
    }
  ]
};
