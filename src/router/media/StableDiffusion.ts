import { ROUTE_Stable_Diffusion_CONVERSATION, ROUTE_Stable_Diffusion_CONVERSATION_NEW } from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'StableDiffusion',
      name: ROUTE_Stable_Diffusion_CONVERSATION_NEW,
      component: () => import('@/pages/media/StableDiffusion.vue')
    },
    {
      path: 'StableDiffusion/:id',
      name: ROUTE_Stable_Diffusion_CONVERSATION,
      component: () => import('@/pages/media/StableDiffusion.vue')
    }
  ]
};
