import { ChatAction, ChatActionTypes } from "./ChatActions";
import { ChatError, ChatMessage, ChatState, ChatStatus, initialState } from "./ChatState";

export default function rootChatReducer(
    // eslint-disable-next-line default-param-last
    state: ChatState = initialState,
    action: ChatAction
): ChatState {
    switch (action.type) {
        case ChatActionTypes.LOADING:
            return { ...state, status: ChatStatus.LOADING };

        case ChatActionTypes.ERROR: {
            const newErrors = structuredClone(state.errors).concat(action.payload as ChatError[]);
            return { ...state, status: ChatStatus.ERROR, errors: newErrors };
        }
        case ChatActionTypes.FETCH_MESSAGES: {
            return {
                ...state,
                status: ChatStatus.READY,
                messages: action.payload as ChatMessage[],
            };
        }
        case ChatActionTypes.SEND_MESSAGE: {
            const newMessages = structuredClone(state.messages);
            newMessages.push(action.payload as ChatMessage);
            return { ...state, status: ChatStatus.READY, messages: newMessages };
        }
        case ChatActionTypes.SEARCH_MESSAGES: {
            const newMessages = state.messages.filter((message) => message.text.includes(action.payload as string));
            return { ...state, messages: newMessages };
        }
        default:
            return state;
    }
}
