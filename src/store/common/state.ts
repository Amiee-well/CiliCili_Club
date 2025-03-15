import { IRootState } from './models';
import chatState from '../chat/state';

export default (): IRootState => {
  return {
    user: {},
    token: {
      access: undefined,
      refresh: undefined,
      expiration: undefined
    },
    setting: {
      navigationCollapsed: true
    },
    site: {},
    chat: chatState()
  };
};
