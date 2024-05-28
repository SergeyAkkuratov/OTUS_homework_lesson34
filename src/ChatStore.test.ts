import { getMessages, sendMessage } from "./ChatStore";
import * as firebaseApi from "./firebaseApi";
import { loadingAction, fetchMessagesAction, errorAction, sendMessageAction } from "./chatRedux/ChatActions";
import { ChatError, ChatMessage } from "./chatRedux/ChatState";

describe("ChatStore", () => {
    const testMessages: ChatMessage[] = [
        { date: new Date().toISOString(), nickname: "User1", text: "TEST TEXT" },
        { date: new Date().toISOString(), nickname: "User2", text: "TEST TEXT" },
        { date: new Date().toISOString(), nickname: "User3", text: "TEST TEXT" },
    ];

    const testError: ChatError = { ...new Error("Test Error"), date: new Date().toISOString() };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("check success during get messages", async () => {
        jest.spyOn(firebaseApi, "getMessagesFromFirebase").mockReturnValueOnce(Promise.resolve(testMessages));
        const dispatch = jest.fn();
        await getMessages()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingAction());
        expect(dispatch).toHaveBeenCalledWith(fetchMessagesAction(testMessages));
    });

    it("check error during get message", async () => {
        jest.spyOn(firebaseApi, "getMessagesFromFirebase").mockReturnValueOnce(Promise.reject(testError));
        const dispatch = jest.fn();
        await getMessages()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingAction());
        expect(dispatch).toHaveBeenCalledWith(errorAction(testError));
    });

    it("check success during send message", async () => {
        jest.spyOn(firebaseApi, "sendMessageToFirebase").mockReturnValueOnce(Promise.resolve("test"));
        const dispatch = jest.fn();
        await sendMessage(testMessages[0])(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingAction());
        expect(dispatch).toHaveBeenCalledWith(sendMessageAction(testMessages[0]));
    });

    it("check error during send message", async () => {
        jest.spyOn(firebaseApi, "sendMessageToFirebase").mockReturnValueOnce(Promise.reject(testError));
        const dispatch = jest.fn();
        await sendMessage(testMessages[0])(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingAction());
        expect(dispatch).toHaveBeenCalledWith(errorAction(testError));
    });
});
