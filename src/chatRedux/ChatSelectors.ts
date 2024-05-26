import { ChatMessage, ChatState } from "./ChatState";

export function selectMessages(state: ChatState): ChatMessage[] {
  return state.messages;
}

export function selectMessagesFromAuthor(
  state: ChatState,
  nickname: string,
): ChatMessage[] {
  return state.messages.filter((message) => message.nickname === nickname);
}

export function selectMessagesAfterDate(
  state: ChatState,
  date: Date,
): ChatMessage[] {
  return state.messages.filter((message) => new Date(message.date) > date);
}

export function selectStatus(state: ChatState) {
  return state.status;
}

export function selectErrors(state: ChatState) {
  return state.errors;
}

export function selectLastError(state: ChatState) {
  return state.errors.at(-1);
}
