import { Injectable } from '@angular/core';
import { NodeModel } from '../model/node.model';
import { Circle } from '../shape/circle';
import { Rectangle } from '../shape/rectangle';
import { Img } from '../shape/img';
import { ShapeControls } from '../shape/shapeControls';
import { BehaviorSubject } from 'rxjs';
import { Finger } from '../model/finger.model';

@Injectable()
export class ShapeService {
    svg: SVGSVGElement;
    startX = 0;
    startY = 0;
    listShapeControls: ShapeControls[] = [];
    onSelectControl: BehaviorSubject<Finger> = new BehaviorSubject(null);
    addElement(_node: NodeModel) {
        if (this.svg) {
            if (_node.text === 'rect') {
                const _re = new Rectangle();
                this.svg.appendChild(_re.svgElement);
                this.addFingersRect(_re);
            }

            if (_node.text === 'circle') {
                const _re = new Circle();
                this.svg.appendChild(_re.svgElement);
                this.addFingersCircle(_re);
            }

            if (_node.text.indexOf('image') > - 1) {
                const _re = new Img();
                this.svg.appendChild(_re.svgElement);
                this.addFingersRect(_re);
            }
        }
    }

    createControls(_item: Rectangle | Circle | Img) {
        const shapeControls = new ShapeControls();
        shapeControls.shape = _item;
        this.listShapeControls.push(shapeControls);

        shapeControls.shape.x = this.startX;
        shapeControls.shape.y = this.startY;
        shapeControls.shape.updateAttributes();
        return shapeControls;
    }

    addToSvg(shapeControls: ShapeControls) {
        shapeControls.controls.forEach(_ct => {
            this.svg.appendChild(_ct.holdElement.svgElement);
        });

        shapeControls.onSelect.subscribe(res => {
            this.onSelectControl.next(res);
        });
    }

    addFingersCircle(_item: Rectangle | Circle | Img) {
        const shapeControls = this.createControls(_item);
        shapeControls.createControlsForCircle();
        this.addToSvg(shapeControls);
    }

    addFingersRect(_item: Rectangle | Circle | Img) {
        const shapeControls = this.createControls(_item);
        shapeControls.createControlsForRect();
        this.addToSvg(shapeControls);
    }
}
