import { ROUTE_StableAnimator_CONVERSATION, ROUTE_StableAnimator_CONVERSATION_NEW } from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'stable_animator',
      name: ROUTE_StableAnimator_CONVERSATION_NEW,
      component: () => import('@/pages/media/stable_animator.vue')
    },
    {
      path: 'stable_animator/:id',
      name: ROUTE_StableAnimator_CONVERSATION,
      component: () => import('@/pages/media/stable_animator.vue')
    }
  ]
};
