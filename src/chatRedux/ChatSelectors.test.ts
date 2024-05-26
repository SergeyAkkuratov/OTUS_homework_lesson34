import { Store, configureStore } from "@reduxjs/toolkit";
import { ChatAction } from "./ChatActions";
import rootChatReducer from "./ChatReducer";
import {
  ChatState,
  ChatUser,
  ChatMessage,
  ChatStatus,
  ChatError,
} from "./ChatState";
import {
  selectErrors,
  selectLastError,
  selectMessages,
  selectMessagesAfterDate,
  selectMessagesFromAuthor,
  selectStatus,
  selectUsers,
  selectUsersWithNameIncludes,
} from "./ChatSelectors";

describe("Checks for ChatStore selectors", () => {
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
      nickname: user,
      text: `It's generated message from ${user.name}`,
      date: new Date().toISOString(),
    };
  }

  function generateChatError(index: number): ChatError {
    return {
      date: new Date().toISOString(),
      message: `Error number ${index}`,
    };
  }

  const initialState: ChatState = {
    messages: [...Array(10).keys()].map((index) => generateChatMessage(index)),
    status: ChatStatus.READY,
    errors: [...Array(10).keys()].map((index) => generateChatError(index)),
  };

  const store: Store<ChatState, ChatAction> = configureStore({
    reducer: rootChatReducer,
    preloadedState: initialState,
  });

  it.each([
    [
      "selectMessages",
      selectMessages(store.getState()),
      store.getState().messages,
    ],
    ["selectErrors", selectErrors(store.getState()), store.getState().errors],
    ["selectStatus", selectStatus(store.getState()), store.getState().status],
    [
      "selectLastError",
      selectLastError(store.getState()),
      store.getState().errors.at(-1),
    ],
  ])("Check simple selector %p", (name, recived, expected) => {
    expect(recived).toBe(expected);
  });

  it("Check select message after date", () => {
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    const recived = selectMessagesAfterDate(store.getState(), date);
    const expected = store
      .getState()
      .messages.filter((message) => new Date(message.date) > date);
    expect(recived).toEqual(expected);
  });

  it("Check select messages from author", () => {
    const { author } = store.getState().messages[0];
    const recived = selectMessagesFromAuthor(store.getState(), author);
    const expected = [store.getState().messages[0]];

    expect(recived).toEqual(expected);
  });

  it("Check select users with name contains string", () => {
    const recived = selectUsersWithNameIncludes(store.getState(), "USER");
    const expected = store.getState().users;

    expect(recived).toEqual(expected);
  });
});
