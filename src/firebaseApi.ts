import { ChatMessage } from "./chatRedux/ChatState";

const config = {
    firebaseBaseUrl: "https://otus-js-chat-4ed79-default-rtdb.firebaseio.com",
    firebaseCollection: "messages.json",
};

// /**
//  * @return {Object[]} messagesList
//  */
export async function getMessagesFromFirebase(): Promise<ChatMessage[]> {
    return fetch(`${config.firebaseBaseUrl}/${config.firebaseCollection}?orderBy="date"&limitToLast=100`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => Object.values(data));
}

// /**
//  * @param {Object} data
//  * @param {string} data.nickname
//  * @param {string} data.message
//  * @returns {boolean}
//  */
export async function sendMessageToFirebase(message: ChatMessage): Promise<string> {
    return fetch(`${config.firebaseBaseUrl}/${config.firebaseCollection}`, {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => data.name);
}
