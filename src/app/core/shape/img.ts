import { Rectangle } from './rectangle';

export class Img extends Rectangle {
    x = 0;
    y = 0;
    height = 40;
    width = 40;
    src = 'assets/temp.jpg';
    transforms = [];
    scale = 1;
    constructor() {
        super();
        this.Create();
    }

    Create() {
        this.element = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        this.element.classList.add('item');
        this.updateLayout();
    }
}
