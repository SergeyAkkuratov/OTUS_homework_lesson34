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
  errorAction,
  loadingAction,
  fetchMessagesAction,
  searchMessagesAction,
  sendMessageAction,
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

  it("Check request action for loading", () => {
      store.dispatch(loadingAction());
      expect(store.getState().status).toBe(ChatStatus.LOADING);
    },
  );

  it("Check failure action for error", () => {
      store.dispatch(errorAction(testError));
      expect(store.getState().status).toBe(ChatStatus.ERROR);
      expect(store.getState().errors[0]).toBe(testError);
    },
  );

  it("Check fetch messages action", () => {
    const messages1 = generateChatMessages(5);
    const messages2 = generateChatMessages(5);

    store.dispatch(fetchMessagesAction(messages1));
    expect(store.getState().status).toBe(ChatStatus.READY);
    expect(store.getState().messages).toEqual(messages1);

    store.dispatch(fetchMessagesAction(messages2));
    expect(store.getState().messages).toEqual(messages2);
  });

  it("Check send message action", () => {
    const message1 = generateChatMessage(0);
    const message2 = generateChatMessage(1);

    store.dispatch(sendMessageAction(message1));
    expect(store.getState().status).toBe(ChatStatus.READY);
    expect(store.getState().messages).toEqual([message1]);

    store.dispatch(sendMessageAction(message2));
    expect(store.getState().messages).toEqual([message1, message2]);
  });

  it("Check search messages action", () => {
    const messages = generateChatMessages(5);

    store.dispatch(fetchMessagesAction(messages));
    store.dispatch(searchMessagesAction("USER-0"));
    expect(store.getState().status).toBe(ChatStatus.READY);
    expect(store.getState().messages).toEqual([messages[0]]);
  });
});
