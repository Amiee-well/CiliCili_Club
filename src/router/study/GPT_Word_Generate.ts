import { ROUTE_GPT_Word_Generate_CONVERSATION, ROUTE_GPT_Word_Generate_CONVERSATION_NEW } from '../constants';

export default {
  path: '/study',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'gpt_word_generate',
      name: ROUTE_GPT_Word_Generate_CONVERSATION_NEW,
      component: () => import('@/pages/study/gpt_word_generate.vue')
    },
    {
      path: 'gpt_word_generate/:id',
      name: ROUTE_GPT_Word_Generate_CONVERSATION,
      component: () => import('@/pages/study/gpt_word_generate.vue')
    }
  ]
};
