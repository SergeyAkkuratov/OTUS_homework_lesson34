import { ChatAction, ChatActionTypes } from "./ChatActions";
import { ChatError, ChatMessage, ChatState, ChatStatus, ChatUser, initialState } from "./ChatState";

// eslint-disable-next-line default-param-last
export default function reducer(state: ChatState = initialState, action: ChatAction): ChatState {
    switch (action.type) {
        case ChatActionTypes.FETCH_MESSAGES_REQUEST:
            return { ...state, status: ChatStatus.LOADING };
        case ChatActionTypes.FETCH_MESSAGES_SUCCESS:
            return { ...state, status: ChatStatus.READY, messages: structuredClone(state.messages).concat(action.payload as ChatMessage[]) };
        case ChatActionTypes.FETCH_MESSAGES_FAILURE:
            return { ...state, errors: structuredClone(state.errors).concat(action.payload as ChatError[]) };
        case ChatActionTypes.FETCH_MESSAGE_REQUEST:
            return { ...state, status: ChatStatus.LOADING };
        case ChatActionTypes.FETCH_MESSAGE_SUCCESS:
            return { ...state, status: ChatStatus.READY, messages: structuredClone(state.messages).concat(action.payload as ChatMessage) };
        case ChatActionTypes.FETCH_MESSAGE_FAILURE:
            return { ...state, errors: structuredClone(state.errors).concat(action.payload as ChatError[]) };
        case ChatActionTypes.SEND_MESSAGE_REQUEST:
            return { ...state, status: ChatStatus.LOADING };
        case ChatActionTypes.SEND_MESSAGE_SUCCESS:
            return { ...state, status: ChatStatus.READY, messages: structuredClone(state.messages).concat(action.payload as ChatMessage) };
        case ChatActionTypes.SEND_MESSAGE_FAILURE:
            return { ...state, errors: structuredClone(state.errors).concat(action.payload as ChatError[]) };
        case ChatActionTypes.SEARCH_MESSAGES:
            return { ...state, messages: structuredClone(state.messages).concat(action.payload as ChatMessage[]) };
        case ChatActionTypes.FETCH_USERS_REQUEST:
            return { ...state, status: ChatStatus.LOADING };
        case ChatActionTypes.FETCH_USERS_SUCCESS:
            return { ...state, status: ChatStatus.READY, users: action.payload as ChatUser[] };
        case ChatActionTypes.FETCH_USERS_FAILURE:
            return { ...state, errors: structuredClone(state.errors).concat(action.payload as ChatError[]) };
        default:
            return state;
    }
}