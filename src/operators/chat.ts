import axios, { AxiosProgressEvent, AxiosResponse } from 'axios';
import {
  IChatConversation,
  IChatConversationAction,
  IChatConversationOptions,
  IChatConversationRequest,
  IChatConversationResponse,
  IChatConversationsResponse
} from '@/models';
import { BASE_URL_API } from '@/constants';

class ChatOperator {
  async chatConversation(
    data: IChatConversationRequest,
    options: IChatConversationOptions
  ): Promise<AxiosResponse<IChatConversationResponse>> {
    return await axios.post('/chat/conversations', data, {
      headers: {
        authorization: `Bearer ${options.token}`,
        accept: 'application/x-ndjson',
        'content-type': 'application/json'
      },
      baseURL: BASE_URL_API,
      responseType: 'stream',
      onDownloadProgress: ({ event }: AxiosProgressEvent) => {
        const response = event.target.response;
        const jsonLines = response.split(/\r?\n/).filter((line: string) => line.trim());
        for (const line of jsonLines) {
          try {
            if (line) {
              const jsonData = JSON.parse(line);
              if (options?.stream) {
                options?.stream(jsonData as IChatConversationResponse);
              }
            }
          } catch (e) {
            console.debug('Parsing chunk failed:', e);
          }
        }
      }
    });
  }

  async getConversation(
    id: string | undefined,
    applications: string | undefined,
    options: IChatConversationOptions
  ): Promise<AxiosResponse<IChatConversation>> {
    return await axios.post(
      `/chat/conversations`,
      {
        action: IChatConversationAction.RETRIEVE,
        id: id
      },
      {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${options.token}`,
          'x-record-exempt': 'true'
        },
        baseURL: BASE_URL_API
      }
    );
  }

  async getConversations(
    filter: {
      ids?: string[];
      applicationId?: string;
      service_id?: string;
    },
    options: IChatConversationOptions
  ): Promise<AxiosResponse<IChatConversationsResponse>> {
    return await axios.post(
      `/chat/conversations`,
      {
        action: IChatConversationAction.RETRIEVE_BATCH,
        ...(filter.ids
          ? {
              ids: filter.ids
            }
          : {}),
        ...(filter.applicationId
          ? {
              application_id: filter.applicationId
            }
          : {})
      },
      {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${options.token}`,
          'x-record-exempt': 'true'
        },
        baseURL: BASE_URL_API
      }
    );
  }

  async deleteConversation(
    id: string,
    applications: string,
    options: IChatConversationOptions
  ): Promise<AxiosResponse<IChatConversation>> {
    return await axios.post(
      `/chat/conversations`,
      {
        action: IChatConversationAction.DELETE,
        id: id,
        applications: applications
      },
      {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${options.token}`,
          'x-record-exempt': 'true'
        },
        baseURL: BASE_URL_API
      }
    );
  }

  async updateConversation(
    payload: IChatConversation,
    options: IChatConversationOptions
  ): Promise<AxiosResponse<IChatConversation>> {
    return await axios.post(
      `/chat/conversations`,
      {
        action: IChatConversationAction.UPDATE,
        ...payload
      },
      {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${options.token}`,
          'x-record-exempt': 'true'
        },
        baseURL: BASE_URL_API
      }
    );
  }
}

export const chatOperator = new ChatOperator();

