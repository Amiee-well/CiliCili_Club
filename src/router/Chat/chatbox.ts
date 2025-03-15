import { ROUTE_CHATBOT_4o_CONVERSATION, ROUTE_CHATBOT_4o_CONVERSATION_NEW } from '../constants';

export default {
  path: '/chat',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'conversations1',
      name: ROUTE_CHATBOT_4o_CONVERSATION_NEW,
      component: () => import('@/pages/chat/Conversation1.vue')
    },
    {
      path: 'conversations1/:id',
      name: ROUTE_CHATBOT_4o_CONVERSATION,
      component: () => import('@/pages/chat/Conversation1.vue')
    }
  ]
};
