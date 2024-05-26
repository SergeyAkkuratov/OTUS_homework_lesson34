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

export async function fetchMessages(size: number = 10, error: boolean = false): Promise<ChatMessage[]> {
    return new Promise<ChatMessage[]>((resolve, reject) => {
        if(error) {
            reject(new Error("fetchMessages throw error"));
        } else {
            resolve(generateChatMessages(size));
        }
    });
}

export async function fetchMessage(error: boolean = false): Promise<ChatMessage> {
    return new Promise<ChatMessage>((resolve, reject) => {
        if(error) {
            reject(new Error("fetchMessage throw error"));
        } else {
            resolve(generateChatMessage(1));
        }
    });
}

export async function sendMessage(error: boolean = false): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        if(error){
            reject(new Error("sendMessage throw error"));
        } else {
            setTimeout(resolve, Math.floor(Math.random() * 10) * 100);
        }
    });
}

export async function fetchUsers(size: number = 10, error: boolean = false) {
    return new Promise<ChatUser[]>((resolve, reject) => {
        if(error) {
            reject(new Error("fetchUsers throw error"));
        } else {
            resolve(generateChatUsers(size));
        }
    });
}