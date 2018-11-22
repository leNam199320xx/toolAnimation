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
    onSelectShape: BehaviorSubject<ShapeControls> = new BehaviorSubject(null);
    selectedShape: ShapeControls;
    selectedControl: Finger;
    index = 0;
    addElement(_node: NodeModel) {
        this.index++;
        let _shape: Rectangle | Img | Circle;
        if (this.svg) {
            if (_node.text === 'rect') {
                _shape = new Rectangle();
                this.svg.appendChild(_shape.svgElement);
                this.addFingersRect(_shape);
            }

            if (_node.text === 'circle') {
                _shape = new Circle();
                this.svg.appendChild(_shape.svgElement);
                this.addFingersCircle(_shape);
            }

            if (_node.text.indexOf('image') > - 1) {
                _shape = new Img();
                this.svg.appendChild(_shape.svgElement);
                this.addFingersRect(_shape);
            }
            _shape.name = _node.text + '_' + this.index;
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
            if (res) {
                this.onSelectControl.next(res);
                this.onSelectShape.next(shapeControls);
                this.selectedControl = res;
                this.selectedShape = shapeControls;
            }
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
