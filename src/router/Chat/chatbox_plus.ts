import { ROUTE_ChatBOT_o1_CONVERSATION, ROUTE_ChatBOT_o1_CONVERSATION_NEW } from '../constants';

export default {
  path: '/chat',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'conversations5',
      name: ROUTE_ChatBOT_o1_CONVERSATION_NEW,
      component: () => import('@/pages/chat/Conversation5.vue')
    },
    {
      path: 'conversations5/:id',
      name: ROUTE_ChatBOT_o1_CONVERSATION,
      component: () => import('@/pages/chat/Conversation5.vue')
    }
  ]
};
