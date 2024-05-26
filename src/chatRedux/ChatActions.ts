import { Action } from "@reduxjs/toolkit";
import { ChatError, ChatMessage } from "./ChatState";

export enum ChatActionTypes {
  FETCH_MESSAGES_REQUEST = "FETCH_MESSAGES_REQUEST",
  FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS",
  FETCH_MESSAGES_FAILURE = "FETCH_MESSAGES_FAILURE",
  SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST",
  SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS",
  SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE",
  SEARCH_MESSAGES = "SEARCH_MESSAGES",
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

export function fetchMessagesFailure(error: ChatError): ChatAction {
  return {
    type: ChatActionTypes.FETCH_MESSAGES_FAILURE,
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

export function sendMessageFailure(error: ChatError): ChatAction {
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