import { createRouter, createWebHistory } from 'vue-router';
import auth from './auth';
import console from './console';
import chatbox from './Chat/chatbox';
import chatglm from './Chat/chatglm';
import chatglm_plus from './Chat/chatglm_plus';
import DeepSeek from './Chat/DeepSeek';
import chatbox_plus from './Chat/chatbox_plus';
import AIPPT from './study/AIPPT';
import GPT_Word_Revise from './study/GPT_Word_Revise';
import GPT_Word_Generate from './study/GPT_Word_Generate';
import PDF_Miner from './study/PDF_MinerU';
import PDF_Translate from './study/PDF_Translate';
import GPT_Academic from './study/gpt_academic';
import MetaGPT from './study/mgx';
import PDF from './study/PDF';
import excalidraw from './study/excalidraw';
import hoppscotch from './study/hoppscotch';
import screenshot2code from './study/screenshot2code';
import VideoLingo from './media/videolingo';
import ChatTTS from './media/ChatTTS';
import CodeFormer from './media/codeformer';
import VideoBackgroundRemoval from './media/video_background_removal';
import FlipSketch from './media/flipsketch';
import HivisionIDPhotos from './media/HivisionIDPhotos';
import Kolors from './media/Kolors';
import LTX from './media/LTX';
import MagicQuill from './media/MagicQuill';
import Midjourney from './media/Midjourney';
import MMAudio from './media/MMAudio';
import Monetico from './media/Monetico';
import MusicGen from './media/MusicGen';
import ootd from './media/ootd';
import QR_Beautify from './media/QR_Beautify';
import redtts from './media/redtts';
import removeWatermark from './media/removeWatermark';
import StableDiffusion from './media/StableDiffusion';
import StableAnimator from './media/StableAnimator';
import TripoSR from './media/TripoSR';
import video_remove_background from './media/video_remove_background';
import Light from './media/Light';
import Video_Trending_Generator from './media/Video_Trending_Generator';
import distribution from './distribution';
import site from './site';
import profile from './profile';
import intro from './intro';
import test from './test';

import { ROUTE_INDEX, ROUTE_SERVICE_INDEX } from './constants';
import { DEFAULT_LOCALE, setI18nLanguage } from '@/i18n';
import { getCookie } from 'typescript-cookie';

const routes = [
  {
    path: '/',
    name: ROUTE_INDEX,
    redirect: {
      name: ROUTE_SERVICE_INDEX
    }
  },
  console,
  auth,
  chatbox,
  chatglm,
  chatglm_plus,
  DeepSeek,
  chatbox_plus,
  AIPPT,
  screenshot2code,
  MetaGPT,
  hoppscotch,
  PDF,
  excalidraw,
  GPT_Word_Revise,
  GPT_Word_Generate,
  PDF_Translate,
  PDF_Miner,
  GPT_Academic,
  VideoLingo,
  ChatTTS,
  CodeFormer,
  VideoBackgroundRemoval,
  FlipSketch,
  HivisionIDPhotos,
  Kolors,
  LTX,
  MagicQuill,
  Midjourney,
  MMAudio,
  Monetico,
  MusicGen,
  ootd,
  QR_Beautify,
  redtts,
  removeWatermark,
  StableDiffusion,
  StableAnimator,
  TripoSR,
  video_remove_background,
  Light,
  Video_Trending_Generator,
  distribution,
  site,
  profile,
  intro,
  test
];

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const locale = getCookie('LOCALE') || DEFAULT_LOCALE;
  await setI18nLanguage(locale);
  return next();
});

export default router;

export * from './constants';
