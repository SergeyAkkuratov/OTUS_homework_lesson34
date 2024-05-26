import { Action } from "@reduxjs/toolkit";
import { ChatMessage, ChatUser } from "./ChatState";

export enum ChatActionTypes {
  FETCH_MESSAGES_REQUEST = "FETCH_MESSAGES_REQUEST",
  FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS",
  FETCH_MESSAGES_FAILURE = "FETCH_MESSAGES_FAILURE",
  FETCH_MESSAGE_REQUEST = "FETCH_MESSAGE_REQUEST",
  FETCH_MESSAGE_SUCCESS = "FETCH_MESSAGE_SUCCESS",
  FETCH_MESSAGE_FAILURE = "FETCH_MESSAGE_FAILURE",
  SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST",
  SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS",
  SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE",
  SEARCH_MESSAGES = "SEARCH_MESSAGES",
  FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST",
  FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS",
  FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE",
}

export interface ChatAction extends Action {
  type: ChatActionTypes;
  payload?: unknown;
}

export function fetchMessagesRequest(): ChatAction {
  return {
    type: ChatActionTypes.FETCH_MESSAGES_REQUEST,
  };
}

export function fetchMessagesSuccess(messages: ChatMessage[]): ChatAction {
  return {
    type: ChatActionTypes.FETCH_MESSAGES_SUCCESS,
    payload: messages,
  };
}

export function fetchMessagesFailure(error: string): ChatAction {
  return {
    type: ChatActionTypes.FETCH_MESSAGES_FAILURE,
    payload: error,
  };
}

export function fetchMessageRequest(): ChatAction {
  return {
    type: ChatActionTypes.FETCH_MESSAGE_REQUEST,
  };
}

export function fetchMessageSuccess(messages: ChatMessage): ChatAction {
  return {
    type: ChatActionTypes.FETCH_MESSAGE_SUCCESS,
    payload: messages,
  };
}

export function fetchMessageFailure(error: string): ChatAction {
  return {
    type: ChatActionTypes.FETCH_MESSAGE_FAILURE,
    payload: error,
  };
}

export function fetchUsersRequest(): ChatAction {
  return {
    type: ChatActionTypes.FETCH_USERS_REQUEST,
  };
}

export function fetchUsersSuccess(users: ChatUser[]): ChatAction {
  return {
    type: ChatActionTypes.FETCH_USERS_SUCCESS,
    payload: users,
  };
}

export function fetchUsersFailure(error: string): ChatAction {
  return {
    type: ChatActionTypes.FETCH_USERS_FAILURE,
    payload: error,
  };
}

export function sendMessageRequest(): ChatAction {
  return {
    type: ChatActionTypes.SEND_MESSAGE_REQUEST,
  };
}

export function sendMessageSuccess(message: ChatMessage): ChatAction {
  return {
    type: ChatActionTypes.SEND_MESSAGE_SUCCESS,
    payload: message,
  };
}

export function sendMessageFailure(error: string): ChatAction {
  return {
    type: ChatActionTypes.SEND_MESSAGE_FAILURE,
    payload: error,
  };
}

export function searchMessages(query: string): ChatAction {
  return {
    type: ChatActionTypes.SEARCH_MESSAGES,
    payload: query,
  };
}
