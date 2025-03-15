import { ROUTE_CHATGLM_CONVERSATION, ROUTE_CHATGLM_CONVERSATION_NEW } from '../constants';

export default {
  path: '/chat',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'conversations2',
      name: ROUTE_CHATGLM_CONVERSATION_NEW,
      component: () => import('@/pages/chat/Conversation2.vue')
    },
    {
      path: 'conversations2/:id',
      name: ROUTE_CHATGLM_CONVERSATION,
      component: () => import('@/pages/chat/Conversation2.vue')
    }
  ]
};
