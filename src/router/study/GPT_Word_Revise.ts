import { ROUTE_GPT_Word_Revise_CONVERSATION, ROUTE_GPT_Word_Revise_CONVERSATION_NEW } from '../constants';

export default {
  path: '/study',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'gpt_word_revise',
      name: ROUTE_GPT_Word_Revise_CONVERSATION_NEW,
      component: () => import('@/pages/study/gpt_word_revise.vue')
    },
    {
      path: 'gpt_word_revise/:id',
      name: ROUTE_GPT_Word_Revise_CONVERSATION,
      component: () => import('@/pages/study/gpt_word_revise.vue')
    }
  ]
};
