import { Action } from "@reduxjs/toolkit";
import { ChatError, ChatMessage } from "./ChatState";

export enum ChatActionTypes {
  LOADING = "LOADING",
  FETCH_MESSAGES = "FETCH_MESSAGES",
  SEND_MESSAGE = "SEND_MESSAGE",
  ERROR = "ERROR",
  SEARCH_MESSAGES = "SEARCH_MESSAGES",
}

export interface ChatAction extends Action {
  type: ChatActionTypes;
  payload?: unknown;
}

export function loadingAction(): ChatAction {
  return {
    type: ChatActionTypes.LOADING,
  };
}

export function fetchMessagesAction(messages: ChatMessage[]): ChatAction {
  return {
    type: ChatActionTypes.FETCH_MESSAGES,
    payload: messages,
  };
}

export function errorAction(error: ChatError): ChatAction {
  return {
    type: ChatActionTypes.ERROR,
    payload: error,
  };
}

export function sendMessageAction(message: ChatMessage): ChatAction {
  return {
    type: ChatActionTypes.SEND_MESSAGE,
    payload: message,
  };
}

export function searchMessages(query: string): ChatAction {
  return {
    type: ChatActionTypes.SEARCH_MESSAGES,
    payload: query,
  };
}
