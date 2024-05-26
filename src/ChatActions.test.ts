import { Store, configureStore } from "@reduxjs/toolkit";
import rootChatReducer from "./ChatReducer";
import {
  ChatError,
  ChatMessage,
  ChatState,
  ChatStatus,
  ChatUser,
  initialState,
} from "./ChatState";
import {
  ChatAction,
  fetchMessageFailure,
  fetchMessageRequest,
  fetchMessageSuccess,
  fetchMessagesFailure,
  fetchMessagesRequest,
  fetchMessagesSuccess,
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess,
  searchMessages,
  sendMessageFailure,
  sendMessageRequest,
  sendMessageSuccess,
} from "./ChatActions";

describe("Test for Actions", () => {
  let store: Store<ChatState, ChatAction>;
  const testError: ChatError = {
    date: new Date().toISOString(),
    message: "This is test error record",
  };

  function generateChatUser(index: number): ChatUser {
    return {
      login: `login-${index}`,
      name: `USER-${index}`,
      email: `user${index}@email.com`,
      role: Math.floor(Math.random() * 3),
    };
  }

  function generateChatMessage(index: number): ChatMessage {
    const user = generateChatUser(index);
    return {
      author: user,
      text: `It's generated message from ${user.name}`,
      date: new Date().toISOString(),
    };
  }

  function generateChatMessages(size: number): ChatMessage[] {
    return [...Array(size).keys()].map((index) => generateChatMessage(index));
  }

  function generateChatUsers(size: number): ChatUser[] {
    return [...Array(size).keys()].map((index) => generateChatUser(index));
  }

  beforeEach(() => {
    store = configureStore({
      reducer: rootChatReducer,
      preloadedState: initialState,
    });
  });

  it("Checks for reducer initial state", () => {
    const testState: ChatState = {
      messages: [],
      errors: [],
      users: [],
      status: ChatStatus.ERROR,
    };

    store = configureStore({ reducer: rootChatReducer });
    expect(store.getState()).toEqual(initialState);

    store = configureStore({
      reducer: rootChatReducer,
      preloadedState: testState,
    });
    expect(store.getState()).toEqual(testState);
  });

  it.each([
    [fetchMessageRequest()],
    [fetchMessagesRequest()],
    [fetchUsersRequest()],
    [sendMessageRequest()],
  ])("Check request action for %p", (action) => {
    store.dispatch(action);
    expect(store.getState().status).toBe(ChatStatus.LOADING);
  });

  it.each([
    [fetchMessageFailure(testError)],
    [fetchMessagesFailure(testError)],
    [fetchUsersFailure(testError)],
    [sendMessageFailure(testError)],
  ])("Check failure action for %p", (action) => {
    store.dispatch(action);
    expect(store.getState().status).toBe(ChatStatus.ERROR);
    expect(store.getState().errors[0]).toBe(testError);
  });

  it("Check fetch message action", () => {
    const message1 = generateChatMessage(0);
    const message2 = generateChatMessage(1);

    store.dispatch(fetchMessageSuccess(message1));
    expect(store.getState().status).toBe(ChatStatus.READY);
    expect(store.getState().messages).toEqual([message1]);

    store.dispatch(fetchMessageSuccess(message2));
    expect(store.getState().messages).toEqual([message1, message2]);
  });

  it("Check fetch messages action", () => {
    const message1 = generateChatMessages(5);
    const message2 = generateChatMessages(5);

    store.dispatch(fetchMessagesSuccess(message1));
    expect(store.getState().status).toBe(ChatStatus.READY);
    expect(store.getState().messages).toEqual(message1);

    store.dispatch(fetchMessagesSuccess(message2));
    expect(store.getState().messages).toEqual([...message1, ...message2]);
  });

  it("Check fetch users action", () => {
    const users1 = generateChatUsers(5);
    const users2 = generateChatUsers(5);

    store.dispatch(fetchUsersSuccess(users1));
    expect(store.getState().status).toBe(ChatStatus.READY);
    expect(store.getState().users).toEqual(users1);

    store.dispatch(fetchUsersSuccess(users2));
    expect(store.getState().users).toEqual(users2);
  });

  it("Check send message action", () => {
    const message1 = generateChatMessage(0);
    const message2 = generateChatMessage(1);

    store.dispatch(sendMessageSuccess(message1));
    expect(store.getState().status).toBe(ChatStatus.READY);
    expect(store.getState().messages).toEqual([message1]);

    store.dispatch(sendMessageSuccess(message2));
    expect(store.getState().messages).toEqual([message1, message2]);
  });

  it("Check search messages action", () => {
    const messages = generateChatMessages(5);

    store.dispatch(fetchMessagesSuccess(messages));
    store.dispatch(searchMessages("USER-0"));
    expect(store.getState().status).toBe(ChatStatus.READY);
    expect(store.getState().messages).toEqual([messages[0]]);
  });
});
