import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import chat from './chat';
import root from './common';
import persistChat from './chat/persist';
import persistRoot from './common/persist';

const store = createStore({
  ...root,
  modules: {
    chat: chat
  },
  plugins: [
    createPersistedState({
      paths: [...persistRoot, ...persistChat]
    })
  ]
});

export default store;
