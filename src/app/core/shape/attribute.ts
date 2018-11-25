import { NodeModel } from '../model/node.model';
import { Finger } from '../model/finger.model';
import { Circle } from './circle';

export class AttributeSvg {
    x: number;
    y: number;
    r: number;
    d: number;
    name: string;
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
    element: SVGCircleElement | SVGRectElement | SVGImageElement;
    svgParentElement: SVGSVGElement;
    transformString: string;
    transforms: NodeModel[];

    fingers: Finger[] = [];
    minSize = [10, 10];

    updatePosition(_x: number, _y: number) {
        this.x = _x || 0;
        this.y = _y || 0;
    }

    updateSize(_width = this.minSize[0], _height = this.minSize[1]) {
        this.width = _width > this.minSize[0] ? _width : this.minSize[0];
        this.height = _height > this.minSize[1] ? _height : this.minSize[2];
    }

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
        this.element.style.visibility = 'hidden';
    }

    show() {
        this.element.style.visibility = 'visible';
    }
}
