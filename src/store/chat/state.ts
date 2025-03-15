import { IChatState } from './models';
import { Status } from '@/models';

export default (): IChatState => {
  return {
    model: 'gpt-4o-mini',
    application: undefined,
    conversations: undefined,
    service: undefined,
    credential: undefined,
    status: {
      getService: Status.None,
      getApplication: Status.None,
      getConversations: Status.None
    }
  };
};
