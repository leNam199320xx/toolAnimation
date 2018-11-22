import { NodeModel } from '../model/node.model';
import { Finger } from '../model/finger.model';
import { Circle } from './circle';

export class AttributeSvg {
    x: number;
    y: number;
    r: number;
    d: number;
    scale: number | string;
    skew: number | string;
    deg: number; // rotate value
    src: string;
    opacity: number;
    height: number;
    width: number;
    fontSize: number;
    color: string;
    backgroundColor: string;
    stroke: string;
    strokeWidth: number;
    svgElement: SVGCircleElement | SVGRectElement | SVGImageElement;
    svgParentElement: SVGSVGElement;
    transformString: string;
    transforms: NodeModel[];

    fingers: Finger[] = [];

    setTransform() {
        const _translateNode = new NodeModel('translate', this.x + ' ' + this.y);
        const _rotateNode = new NodeModel('rotate', this.deg);
        const _scaleNode = new NodeModel('scale', this.scale);
        // const _skewNode = new NodeModel('skew', this.skew);
        const x2 = -this.width / 2;
        const y2 = -this.height / 2;
        const _endNode = new NodeModel('translate', (x2 || 0) + ' ' + (y2 || 0));

        this.transforms = [_translateNode, _scaleNode, _rotateNode, _endNode];

        this.transformString = '';
        this.transforms.forEach(_tr => {
            this.transformString += _tr.text + '(' + _tr.value + ') ';
        });
    }

    hide() {
        this.svgElement.style.visibility = 'hidden';
    }

    show() {
        this.svgElement.style.visibility = 'visible';
    }
}
