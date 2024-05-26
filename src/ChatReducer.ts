import { ChatAction, ChatActionTypes, ChatFilter } from "./ChatActions";
import ChatError from "./ChatError";
import {
  ChatMessage,
  ChatState,
  ChatStatus,
  ChatUser,
  initialState,
} from "./ChatState";

export default function rootChatReducer(
  // eslint-disable-next-line default-param-last
  state: ChatState = initialState,
  action: ChatAction,
): ChatState {
  switch (action.type) {
    case ChatActionTypes.FETCH_MESSAGES_REQUEST:
    case ChatActionTypes.FETCH_MESSAGE_REQUEST:
    case ChatActionTypes.SEND_MESSAGE_REQUEST:
    case ChatActionTypes.FETCH_USERS_REQUEST:
      return { ...state, status: ChatStatus.LOADING };

    case ChatActionTypes.FETCH_MESSAGES_FAILURE:
    case ChatActionTypes.FETCH_MESSAGE_FAILURE:
    case ChatActionTypes.SEND_MESSAGE_FAILURE:
    case ChatActionTypes.FETCH_USERS_FAILURE: {
      const newErrors = structuredClone(state.errors).concat(
        action.payload as ChatError[],
      );
      return { ...state, status: ChatStatus.ERROR, errors: newErrors };
    }
    case ChatActionTypes.FETCH_MESSAGES_SUCCESS: {
      const newMessages = structuredClone(state.messages).concat(
        action.payload as ChatMessage[],
      );
      return { ...state, status: ChatStatus.READY, messages: newMessages };
    }
    case ChatActionTypes.FETCH_MESSAGE_SUCCESS: {
      const newMessages = structuredClone(state.messages).concat(
        action.payload as ChatMessage,
      );
      return { ...state, status: ChatStatus.READY, messages: newMessages };
    }
    case ChatActionTypes.SEND_MESSAGE_SUCCESS: {
      const newMessages = structuredClone(state.messages).concat(
        action.payload as ChatMessage,
      );
      return { ...state, status: ChatStatus.READY, messages: newMessages };
    }
    case ChatActionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        status: ChatStatus.READY,
        users: action.payload as ChatUser[],
      };
    case ChatActionTypes.SEARCH_MESSAGES: {
      const filter = action.payload as ChatFilter;
      const newMessages = state.messages.filter(message => filter(message));
      return { ...state, messages: newMessages };
    }
    default:
      return state;
  }
}
