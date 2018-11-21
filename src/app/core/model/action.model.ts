import { Message } from './message.model';

export class Action {
    params: ActionParam;
    message: Message;
    run: Function;
}

export class ActionParam {

}
