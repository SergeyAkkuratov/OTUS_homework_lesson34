import { Store, configureStore } from "@reduxjs/toolkit";
import { ChatAction } from "./ChatActions";
import rootChatReducer from "./ChatReducer";
import { ChatState, ChatMessage, ChatStatus, ChatError } from "./ChatState";
import { selectErrors, selectLastError, selectMessages, selectMessagesAfterDate, selectMessagesFromAuthor, selectStatus } from "./ChatSelectors";

describe("Checks for ChatStore selectors", () => {
    function generateChatMessage(index: number): ChatMessage {
        return {
            nickname: `USER-${index}`,
            text: `It's generated message from USER-${index}`,
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
        ["selectMessages", selectMessages(store.getState()), store.getState().messages],
        ["selectErrors", selectErrors(store.getState()), store.getState().errors],
        ["selectStatus", selectStatus(store.getState()), store.getState().status],
        ["selectLastError", selectLastError(store.getState()), store.getState().errors.at(-1)],
    ])("Check simple selector %p", (name, recived, expected) => {
        expect(recived).toBe(expected);
    });

    it("Check select message after date", () => {
        const date = new Date();
        date.setUTCHours(0, 0, 0, 0);
        const recived = selectMessagesAfterDate(store.getState(), date);
        const expected = store.getState().messages.filter((message) => new Date(message.date) > date);
        expect(recived).toEqual(expected);
    });

    it("Check select messages from author", () => {
        const { nickname } = store.getState().messages[0];
        const recived = selectMessagesFromAuthor(store.getState(), nickname);
        const expected = [store.getState().messages[0]];

        expect(recived).toEqual(expected);
    });
});
