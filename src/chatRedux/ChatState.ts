export enum ChatStatus {
    READY,
    LOADING,
    ERROR,
}

export interface ChatMessage {
    text: string;
    nickname: string;
    date: string;
}

export interface ChatError {
    date: string;
    message: string;
}

export interface ChatState {
    messages: ChatMessage[];
    status: ChatStatus;
    errors: ChatError[];
}

export const initialState: ChatState = {
    messages: [],
    status: ChatStatus.READY,
    errors: [],
};
