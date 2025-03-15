import { ROUTE_CHATGLM_PLUS_CONVERSATION, ROUTE_CHATGLM_PLUS_CONVERSATION_NEW } from '../constants';

export default {
  path: '/chat',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'conversations3',
      name: ROUTE_CHATGLM_PLUS_CONVERSATION_NEW,
      component: () => import('@/pages/chat/Conversation3.vue')
    },
    {
      path: 'conversations3/:id',
      name: ROUTE_CHATGLM_PLUS_CONVERSATION,
      component: () => import('@/pages/chat/Conversation3.vue')
    }
  ]
};
