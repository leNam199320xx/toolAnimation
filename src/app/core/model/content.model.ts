export class Content {
    name: string;
    url: string;
    element: HTMLElement | SVGElement;
    type: ContentType;
}

export enum ContentType {
    image = 1,
    rect = 2,
    text = 3,
    circle = 4,
    line = 5
}
