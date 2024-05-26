import ChatError from "./ChatError";

export enum ChatRole {
  ADMIN,
  USER,
  MODERATOR,
}

export enum ChatStatus {
  READY,
  LOADING,
  ERROR
}

export interface ChatUser {
  login: string;
  name: string;
  email: string;
  role: ChatRole;
}

export interface ChatMessage {
  text: string;
  author: ChatUser;
  date: string;
}

export interface ChatState {
  users: ChatUser[];
  messages: ChatMessage[];
  status: ChatStatus;
  errors: ChatError[];
}

export const initialState: ChatState = {
  users: [],
  messages: [],
  status: ChatStatus.READY,
  errors: [],
};
