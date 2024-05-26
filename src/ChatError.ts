export default class ChatError extends Error {
    date: string = new Date().toISOString();

    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, ChatError.prototype);
    }
}
