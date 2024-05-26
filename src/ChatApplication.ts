import { Dispatch, Store, configureStore } from "@reduxjs/toolkit"
import rootChatReducer from "./chatRedux/ChatReducer"
import { ChatError, ChatMessage, ChatState, initialState } from "./chatRedux/ChatState"
import { ChatAction, fetchMessagesFailure, fetchMessagesRequest, fetchMessagesSuccess, sendMessageFailure, sendMessageRequest, sendMessageSuccess } from "./chatRedux/ChatActions";
import { getMessagesFromFirebase, sendMessageToFirebase } from "./FirebaseApi";

function getMessages() {
    return async (dispatch: Dispatch<ChatAction>) => {
        dispatch(fetchMessagesRequest());
        try{
            const messages = await getMessagesFromFirebase();
            dispatch(fetchMessagesSuccess(messages))
        }catch(error){
            dispatch(fetchMessagesFailure(error as ChatError))
        }
    }
}

function sendMessage(message: ChatMessage) {
    return async (dispatch: Dispatch<ChatAction>) => {
        dispatch(sendMessageRequest());
        try{
            await sendMessageToFirebase(message);
            dispatch(sendMessageSuccess(message));
        }catch(error){
            dispatch(sendMessageFailure(error as ChatError));
        }
    }
}

export default class Chat {
    store: Store<ChatState, ChatAction>;

    constructor(preloadedState: ChatState = initialState) {
        this.store = configureStore({reducer: rootChatReducer, preloadedState});
        this.store.subscribe(this.render);
    }

    render() {

    }
}