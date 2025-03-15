export type IChatModelName = string;

export interface IChatModel {
  name: IChatModelName;
  getDisplayName: () => string;
  getDescription: () => string;
}

interface IError {
  code: string;
  message?: string;
}

export enum IChatMessageState {
  PENDING = 'pending',
  ANSWERING = 'answering',
  FINISHED = 'finished',
  FAILED = 'failed'
}

export interface IChatMessageContentItem {
  type: string;
  text?: string;
  image_url?: { url: string };
}

export interface IChatMessage {
  state?: IChatMessageState;
  content?: string | IChatMessageContentItem[];
  role;
  error?: IError;
}

export interface IChatConversation {
  id: string;
  messages: IChatMessage[];
  title?: string;
  deleting?: boolean;
  editing?: boolean;
  new?: boolean;
  updated_at: number;
}

export interface IChatConversationOptions {
  stream?: (response: IChatConversationResponse) => void;
  token: string;
}

export interface IChatConversationRequest {
  id?: string;
  applications_text?: string;
  question?: string;
  references?: string[];
  stateful?: boolean;
  messages?: IChatMessage[];
  action?: IChatConversationAction;
  model: IChatModelName;
}

export interface IChatConversationResponse {
  answer: string;
  delta_answer: string;
  id?: string;
}

export interface IChatConversationsResponse {
  items: IChatConversation[];
  count: number;
}

export enum IChatConversationAction {
  CHAT = 'chat',
  RETRIEVE = 'retrieve',
  UPDATE = 'update',
  DELETE = 'delete',
  RETRIEVE_BATCH = 'retrieve_batch'
}
