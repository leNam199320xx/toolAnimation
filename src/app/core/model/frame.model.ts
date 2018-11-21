import { Action } from './action.model';

export class Frame {
    index: number;
    value: number;
    key: string;
    active: boolean;
    action: Action;
}
