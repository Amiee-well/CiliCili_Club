import { ROUTE_ChatTTS_CONVERSATION, ROUTE_ChatTTS_CONVERSATION_NEW } from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'chat_tts',
      name: ROUTE_ChatTTS_CONVERSATION_NEW,
      component: () => import('@/pages/media/chat_tts.vue')
    },
    {
      path: 'chat_tts/:id',
      name: ROUTE_ChatTTS_CONVERSATION,
      component: () => import('@/pages/media/chat_tts.vue')
    }
  ]
};
