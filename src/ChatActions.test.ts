import { Store, configureStore } from "@reduxjs/toolkit";
import rootChatReducer from "./ChatReducer";
import { ChatState, initialState } from "./ChatState";
import { ChatAction, fetchMessagesFailure, fetchMessagesRequest, fetchMessagesSuccess } from "./ChatActions";
import { fetchMessages, getCurrentMessages } from "./ExternalApiMock";
import { selectMessages } from "./ChatSelectors";

describe("Test for Actions", () => {
    let store: Store<ChatState, ChatAction>;

    const getChatMessages = async (error: boolean = false) => {
        store.dispatch(fetchMessagesRequest());
        fetchMessages(10, error)
        .then(messages => store.dispatch(fetchMessagesSuccess(messages)))
        .catch(er => store.dispatch(fetchMessagesFailure(er)));
    }

    beforeEach(() => {
        store = configureStore({reducer: rootChatReducer, preloadedState: initialState});
    })

    it("Check fetch messages action", async () => {
        await getChatMessages();
        expect(selectMessages(store.getState())).toBe(getCurrentMessages());
    })
})