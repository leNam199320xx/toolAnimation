export class NodeModel {
    value: string | number | Date;
    text: string;

    constructor(_text: string = '', _value: string | number | Date = 0) {
        this.value = _value;
        this.text = _text;
    }
}
