import { Store, configureStore } from "@reduxjs/toolkit";
import rootChatReducer from "./ChatReducer";
import {
  ChatError,
  ChatMessage,
  ChatState,
  ChatStatus,
  initialState,
} from "./ChatState";
import {
  ChatAction,
  fetchMessagesFailure,
  fetchMessagesRequest,
  fetchMessagesSuccess,
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

  function generateChatMessage(index: number): ChatMessage {
    return {
      nickname: `USER-${index}`,
      text: `It's generated message from USER-${index}`,
      date: new Date().toISOString(),
    };
  }

  function generateChatMessages(size: number): ChatMessage[] {
    return [...Array(size).keys()].map((index) => generateChatMessage(index));
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
    [fetchMessagesRequest()],
    [sendMessageRequest()],
  ])("Check request action for %p", (action) => {
    store.dispatch(action);
    expect(store.getState().status).toBe(ChatStatus.LOADING);
  });

  it.each([
    [fetchMessagesFailure(testError)],
    [sendMessageFailure(testError)],
  ])("Check failure action for %p", (action) => {
    store.dispatch(action);
    expect(store.getState().status).toBe(ChatStatus.ERROR);
    expect(store.getState().errors[0]).toBe(testError);
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
