import { ChatMessage, ChatState, ChatUser } from "./ChatState";

export function selectMessages(state: ChatState): ChatMessage[] {
  return state.messages;
}

export function selectMessagesFromAuthor(
  state: ChatState,
  author: ChatUser,
): ChatMessage[] {
  return state.messages.filter((message) => message.author === author);
}

export function selectMessagesAfterDate(
  state: ChatState,
  date: Date = new Date(),
): ChatMessage[] {
  return state.messages.filter((message) => new Date(message.date) > date);
}

export function selectUsers(state: ChatState): ChatUser[] {
  return state.users;
}

export function selectUsersWithNameIncludes(
  state: ChatState,
  name: string,
): ChatUser[] {
  return state.users.filter((user) => user.name.includes(name));
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
