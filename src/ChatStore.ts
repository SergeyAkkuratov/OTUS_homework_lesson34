import { configureStore } from "@reduxjs/toolkit";
import { getMessagesFromFirebase, sendMessageToFirebase } from "./firebaseApi";
import { loadingAction, fetchMessagesAction, errorAction, sendMessageAction } from "./chatRedux/ChatActions";
import rootChatReducer from "./chatRedux/ChatReducer";
import { initialState, ChatError, ChatMessage } from "./chatRedux/ChatState";

export const chatStore = configureStore({
    reducer: rootChatReducer,
    preloadedState: initialState,
});

export function getMessage() {
    return async (dispatch: typeof chatStore.dispatch) => {
        dispatch(loadingAction());
        try {
            const messages = await getMessagesFromFirebase();
            dispatch(fetchMessagesAction(messages));
        } catch (error) {
            dispatch(errorAction(error as ChatError));
        }
    };
}

export function sendMessage(message: ChatMessage) {
    return async (dispatch: typeof chatStore.dispatch) => {
        dispatch(loadingAction());
        try {
            await sendMessageToFirebase(message);
            dispatch(sendMessageAction(message));
        } catch (error) {
            dispatch(errorAction(error as ChatError));
        }
    };
}
