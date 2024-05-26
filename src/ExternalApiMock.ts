import { ChatMessage, ChatUser } from "./ChatState";

function generateChatUser(index: number): ChatUser {
    return {
        login: `login-${index}`,
        name: `USER-${index}`,
        email: `user${index}@email.com`,
        role: Math.floor(Math.random() * 3)
    }
};

function generateChatMessage(index: number): ChatMessage {
    const user = generateChatUser(index);
    return {
        author: user,
        text: `It's generated message from ${user.name}`,
        date: new Date()
    }
};

function generateChatMessages(size: number): ChatMessage[] {
    return [...Array(size).keys()].map((index) => generateChatMessage(index));
}

function generateChatUsers(size: number): ChatUser[] {
    return [...Array(size).keys()].map((index) => generateChatUser(index));
}

let currentMessages: ChatMessage[] = generateChatMessages(10);
let currentUsers: ChatUser[] = generateChatUsers(10);
let lastSendMessage: ChatMessage;

export async function fetchMessages(size: number = 10, error: boolean = false): Promise<ChatMessage[]> {
    currentMessages = generateChatMessages(size);
    return new Promise<ChatMessage[]>((resolve, reject) => {
        if(error) {
            reject(new Error("fetchMessages throw error"));
        } else {
            resolve(currentMessages);
        }
    });
}

export async function fetchMessage(error: boolean = false): Promise<ChatMessage> {
    const message = generateChatMessage(1);
    currentMessages.push(message);
    return new Promise<ChatMessage>((resolve, reject) => {
        if(error) {
            reject(new Error("fetchMessage throw error"));
        } else {
            resolve(message);
        }
    });
}

export async function sendMessage(message: ChatMessage, error: boolean = false): Promise<void> {
    lastSendMessage = message;
    return new Promise<void>((resolve, reject) => {
        if(error){
            reject(new Error("sendMessage throw error"));
        } else {
            setTimeout(resolve, Math.floor(Math.random() * 10) * 100);
        }
    });
}

export async function fetchUsers(size: number = 10, error: boolean = false) {
    currentUsers = generateChatUsers(size);
    return new Promise<ChatUser[]>((resolve, reject) => {
        if(error) {
            reject(new Error("fetchUsers throw error"));
        } else {
            resolve(currentUsers);
        }
    });
}

export function getCurrentMessages() {
    return currentMessages;
}

export function getCurrentUsers() {
    return currentUsers;
}

export function getLastSendMEssage() {
    return lastSendMessage;
}