/* eslint-disable no-param-reassign */
import Mustache from "mustache";
import { ChatMessage } from "./chatRedux/ChatState";
import { selectMessages } from "./chatRedux/ChatSelectors";
import { chatStore, getMessages, sendMessage } from "./ChatStore";

enum startButtonText {
    START = "Старт",
    STOP = "Стоп",
}

export const CHAT_GET_MESSAGE_INTERVAL = 5000;

export default function chatApplication(rootElement: HTMLElement) {
    rootElement.innerHTML = `<h2>Чат</h2>
    <input type="text" id="username" placeholder="Ваше имя" value="Sergey" /><button id="start">${startButtonText.START}</button>
    <div class="chat-window"></div>
    <button class="emoji" disabled=true>🙂</button>
    <form class="chat-form">
    <input type="text" class="send-message" placeholder="Введите сообщение" readonly="readonly" />
    </form>
    <div class="emoji-window">
    <h3>😃</h3>
    <h3>😊</h3>
    <h3>😢</h3>
    <h3>🤣</h3>
    <h3>😘</h3>
    </div>`;

    const nicknameField: HTMLInputElement = rootElement.querySelector("#username")!;
    const messageField: HTMLInputElement = rootElement.querySelector(".send-message")!;
    const chatForm: HTMLFormElement = rootElement.querySelector(".chat-form")!;
    const startButton: HTMLButtonElement = rootElement.querySelector("#start")!;
    const emojiButton: HTMLButtonElement = rootElement.querySelector(".emoji")!;
    const chatWindow: HTMLElement = rootElement.querySelector(".chat-window")!;
    const emojiWindow: HTMLElement = rootElement.querySelector(".emoji-window")!;
    const emojiElements: HTMLHeadingElement[] = Array.from(emojiWindow.querySelectorAll("h3"));

    const messageWindowTemplate = `
    {{#messages}}
    {{#ownMessage}}
    <div class="container text-right">
        <p>{{nickname}}:</p>
        <p class="message">{{text}}</p>
        <span class="time-right">{{date}}</span>
    </div>
    {{/ownMessage}}
    {{^ownMessage}}
    <div class="container darker">
        <p>{{nickname}}:</p>
        <p class="message">{{text}}</p>
        <span class="time-left">{{date}}</span>
    </div> 
    {{/ownMessage}}
    {{/messages}}
    {{^messages}}
    <h1>В чате нет сообщений</h1>
    {{/messages}}`;

    let interval: NodeJS.Timeout;
    let nickname: string;

    function render() {
        const isAtBottom = chatWindow.scrollHeight - chatWindow.clientHeight <= chatWindow.scrollTop + 1;
        chatWindow.innerHTML = Mustache.render(messageWindowTemplate, {
            messages: selectMessages(chatStore.getState()),
            ownMessage(): boolean {
                return this.nickname === nickname;
            },
        });
        if (isAtBottom) {
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    }

    function onStartClick() {
        if (startButton.innerHTML === startButtonText.START) {
            chatStore.dispatch(getMessages());

            startButton.innerHTML = startButtonText.STOP;
            nickname = nicknameField.value;
            nicknameField.readOnly = true;
            messageField.readOnly = false;
            emojiButton.disabled = false;

            interval = setInterval(() => chatStore.dispatch(getMessages()), CHAT_GET_MESSAGE_INTERVAL);
            messageField.focus();
        } else {
            startButton.innerHTML = startButtonText.START;
            clearInterval(interval);
            nicknameField.readOnly = false;
            messageField.readOnly = true;
            emojiButton.disabled = true;
        }
    }

    function sendMessageByEnter(event: Event) {
        event.preventDefault();
        const message: ChatMessage = {
            date: new Date().toISOString(),
            nickname: nicknameField.value,
            text: messageField.value,
        };
        chatStore.dispatch(sendMessage(message));
        messageField.value = "";
    }

    function emojiMenuClose() {
        emojiWindow.style.display = "none";
        window.removeEventListener("click", emojiMenuClose);
        messageField.focus();
    }

    function emojiMenuOpen(event: MouseEvent) {
        event.stopPropagation();
        emojiWindow.style.display = "block";
        emojiWindow.style.left = `${emojiButton.offsetLeft}px`;
        emojiWindow.style.top = `${emojiButton.offsetTop - emojiWindow.offsetHeight}px`;

        window.addEventListener("click", emojiMenuClose);
    }

    function emojiWindowClick(event: MouseEvent) {
        event.stopPropagation();
        if (event.target instanceof HTMLHeadingElement && emojiElements.includes(event.target)) {
            messageField.value += event.target.innerHTML;
            emojiMenuClose();
            messageField.focus();
        }
    }

    chatStore.subscribe(render);

    render();
    chatForm.addEventListener("submit", sendMessageByEnter);
    startButton.addEventListener("click", onStartClick);
    emojiButton.addEventListener("click", emojiMenuOpen);
    emojiWindow.addEventListener("click", emojiWindowClick);
}
