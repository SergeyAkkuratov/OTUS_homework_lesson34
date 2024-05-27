import Mustache from "mustache";
import { ChatMessage, ChatStatus } from "./chatRedux/ChatState";
import "./style.css";
import { selectMessages } from "./chatRedux/ChatSelectors";
import { chatStore, getMessage, sendMessage } from "./ChatStore";

const rootElement = document.querySelector(".main") as HTMLElement;
rootElement.innerHTML = `<h2>Чат</h2>
    <div class="chat-window"></div>
    <input type="text" id="username" placeholder="Ваше имя" value="Sergey" />
    <input type="text" id="message" placeholder="Введите сообщение" />
    <button id="send" type="submit">Отправить</button>
    <br>
    <button id="start">Старт</button>`;

const nicknameField = rootElement.querySelector(
  "#username",
)! as HTMLInputElement;
const messageField = rootElement.querySelector("#message")! as HTMLInputElement;
const sendButton = rootElement.querySelector("#send")! as HTMLButtonElement;
const startButton = rootElement.querySelector("#start")! as HTMLButtonElement;
const chatWindow = rootElement.querySelector(".chat-window")! as HTMLElement;

const messageWindowTemplate = `
{{#messages}}
{{#ownMessage}}
    <div class="container text-right">
        <p class="username">{{nickname}}:</p>
        <p>{{text}}</p>
        <span class="time-right">{{date}}</span>
    </div>
{{/ownMessage}}
{{^ownMessage}}
    <div class="container darker">
        <p class="username">{{nickname}}:</p>
        <p>{{text}}</p>
        <span class="time-left">{{date}}</span>
    </div> 
{{/ownMessage}}
{{/messages}}
{{^messages}}
    <h1>В чате нет сообщений</h1>
{{/messages}}`;

function render() {
  chatWindow.innerHTML = Mustache.render(messageWindowTemplate, {
    messages: selectMessages(chatStore.getState()),
    ownMessage(): boolean {
      return this.nickname === nicknameField.value;
    },
    loading(): boolean {
      return chatStore.getState().status === ChatStatus.LOADING;
    },
  });
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

let interval: NodeJS.Timeout;

function onStartClick() {
  if (startButton.innerText === "Старт") {
    startButton.innerText = "Стоп";
    interval = setInterval(() => chatStore.dispatch(getMessage()), 1000);
  } else {
    startButton.innerText = "Старт";
    clearInterval(interval);
  }
}

function onSendButtonClick() {
  const message: ChatMessage = {
    date: new Date().toISOString(),
    nickname: nicknameField.value,
    text: messageField.value,
  };
  chatStore.dispatch(sendMessage(message));
}

chatStore.subscribe(render);

render();
sendButton.addEventListener("click", onSendButtonClick);
startButton.addEventListener("click", onStartClick);
