export class Message {
    value: string;
    code: string;
    status: MessageStatus;
}

export enum MessageStatus {
    success = 1,
    fail = 2,
    running = 3
}

