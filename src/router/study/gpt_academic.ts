import { ROUTE_GPT_ACADEMIC_CONVERSATION, ROUTE_GPT_ACADEMIC_CONVERSATION_NEW } from '../constants';

export default {
  path: '/study',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'gpt_academic',
      name: ROUTE_GPT_ACADEMIC_CONVERSATION_NEW,
      component: () => import('@/pages/study/gpt_academic.vue')
    },
    {
      path: 'gpt_academic/:id',
      name: ROUTE_GPT_ACADEMIC_CONVERSATION,
      component: () => import('@/pages/study/gpt_academic.vue')
    }
  ]
};
