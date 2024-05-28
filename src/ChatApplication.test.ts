import { chatStore, getMessages, sendMessage } from "./ChatStore";
import chatApplication from "./ChatApplication";
import { ChatMessage } from "./chatRedux/ChatState";
import { selectMessages } from "./chatRedux/ChatSelectors";

jest.mock("./ChatStore", () => ({
    chatStore: {
        dispatch: jest.fn(),
        subscribe: jest.fn(),
        getState: jest.fn(),
    },
    getMessages: jest.fn(),
    sendMessage: jest.fn(),
}));

jest.mock("./chatRedux/ChatSelectors", () => ({
    selectMessages: jest.fn(),
}));

describe("chatApplication", () => {
    let rootElement: HTMLElement;

    beforeEach(() => {
        rootElement = document.createElement("div");
        document.body.appendChild(rootElement);
        (chatStore.dispatch as jest.Mock).mockClear();
        (chatStore.subscribe as jest.Mock).mockClear();
        (chatStore.getState as jest.Mock).mockClear();
        (selectMessages as jest.Mock).mockClear();
    });

    afterEach(() => {
        document.body.removeChild(rootElement);
    });

    it("should initialize the chat application", () => {
        chatApplication(rootElement);

        expect(rootElement.innerHTML).toContain("Чат");
        expect(chatStore.subscribe).toHaveBeenCalled();
    });

    it("should start and stop the chat on button click", () => {
        chatApplication(rootElement);
        const startButton = rootElement.querySelector("#start") as HTMLButtonElement;
        const nicknameField = rootElement.querySelector("#username") as HTMLInputElement;
        const messageField = rootElement.querySelector(".send-message") as HTMLInputElement;
        const emojiButton = rootElement.querySelector(".emoji") as HTMLButtonElement;

        startButton.dispatchEvent(new Event("click"));
        expect(chatStore.dispatch).toHaveBeenCalledWith(getMessages());
        expect(startButton.innerHTML).toBe("Стоп");
        expect(nicknameField.readOnly).toBe(true);
        expect(messageField.readOnly).toBe(false);
        expect(emojiButton.disabled).toBe(false);

        startButton.dispatchEvent(new Event("click"));
        expect(startButton.innerHTML).toBe("Старт");
        expect(nicknameField.readOnly).toBe(false);
        expect(messageField.readOnly).toBe(true);
        expect(emojiButton.disabled).toBe(true);
    });

    it("should send a message on Enter key press", () => {
        chatApplication(rootElement);
        const messageField = rootElement.querySelector(".send-message") as HTMLInputElement;
        const nicknameField = rootElement.querySelector("#username") as HTMLInputElement;
        nicknameField.value = "TestUser";
        messageField.value = "Hello";

        const event = new KeyboardEvent("keyup", { key: "Enter" });
        messageField.dispatchEvent(event);

        const expectedMessage: ChatMessage = {
            date: expect.any(String),
            nickname: "TestUser",
            text: "Hello",
        };

        expect(chatStore.dispatch).toHaveBeenCalledWith(sendMessage(expectedMessage));
        expect(messageField.value).toBe("");
    });

    it("shouldn't send a message on another key press", () => {
        chatApplication(rootElement);
        const messageField = rootElement.querySelector(".send-message") as HTMLInputElement;
        const nicknameField = rootElement.querySelector("#username") as HTMLInputElement;
        nicknameField.value = "TestUser";
        messageField.value = "Hello";

        const event = new KeyboardEvent("keyup", { key: "S" });
        messageField.dispatchEvent(event);

        expect(chatStore.dispatch).toHaveBeenCalledTimes(0);
        expect(messageField.value).toBe("Hello");
    });

    it("should open and close emoji menu", () => {
        chatApplication(rootElement);
        const emojiButton = rootElement.querySelector(".emoji") as HTMLButtonElement;
        const emojiWindow = rootElement.querySelector(".emoji-window") as HTMLElement;

        emojiButton.dispatchEvent(new Event("click"));
        expect(emojiWindow.style.display).toBe("block");

        window.dispatchEvent(new MouseEvent("click"));
        expect(emojiWindow.style.display).toBe("none");
    });

    it("should add emoji to message field on emoji click", () => {
        chatApplication(rootElement);
        const emojiButton = rootElement.querySelector(".emoji") as HTMLButtonElement;
        const emojiWindow = rootElement.querySelector(".emoji-window") as HTMLElement;
        const messageField = rootElement.querySelector(".send-message") as HTMLInputElement;

        emojiButton.dispatchEvent(new Event("click"));
        const emoji = emojiWindow.querySelector("h3") as HTMLHeadingElement;
        emoji.click();

        expect(messageField.value).toContain(emoji.innerHTML);
        expect(emojiWindow.style.display).toBe("none");
    });

    it("should do nothingd on emojiWindow click", () => {
        chatApplication(rootElement);
        const emojiButton = rootElement.querySelector(".emoji") as HTMLButtonElement;
        const emojiWindow = rootElement.querySelector(".emoji-window") as HTMLElement;
        const messageField = rootElement.querySelector(".send-message") as HTMLInputElement;

        emojiButton.dispatchEvent(new Event("click"));
        emojiWindow.click();

        expect(messageField.value).toBe("");
        expect(emojiWindow.style.display).toBe("block");
    });

    it("should render messages", () => {
        chatApplication(rootElement);
        const chatWindow = rootElement.querySelector(".chat-window") as HTMLElement;
        const messages = [{ nickname: "TestUser", text: "Hello", date: "2023-01-01T00:00:00Z" }];
        (selectMessages as jest.Mock).mockReturnValue(messages);
        (chatStore.getState as jest.Mock).mockReturnValue({ status: "LOADED" });

        (chatStore.subscribe as jest.Mock).mock.calls[0][0]();
        expect(chatWindow.innerHTML).toContain("Hello");
    });
});
