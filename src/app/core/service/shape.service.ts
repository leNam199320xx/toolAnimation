import { Injectable } from '@angular/core';
import { NodeModel } from '../model/node.model';
import { Circle } from '../shape/circle';
import { Rectangle } from '../shape/rectangle';
import { Img } from '../shape/img';
import { ShapeControls } from '../shape/shapeControls';
import { BehaviorSubject } from 'rxjs';
import { Finger } from '../model/finger.model';
import { Point } from '../model/point.model';
import { ShapeMode } from '../enum/shapeMode';
import { RectCorner } from '../enum/RectCorner';
import { FingerType } from '../enum/FingerType';
import { ControlLeftMode } from '../enum/ControlLeftMode';

@Injectable()
export class ShapeService {
    svg: SVGSVGElement;
    startX = 0;
    startY = 0;
    listShapeControls: ShapeControls[] = [];
    onSelectFinger: BehaviorSubject<Finger> = new BehaviorSubject(null);
    onSelectShape: BehaviorSubject<ShapeControls> = new BehaviorSubject(null);
    selectedShape: ShapeControls;
    selectedFinger: Finger;
    controlLeftMode: ControlLeftMode = ControlLeftMode.move;
    index = 0;
    createShape(_node: NodeModel) {
        this.index++;
        let _shape: Rectangle | Img | Circle;
        if (this.svg) {
            if (_node.text === 'rect') {
                _shape = new Rectangle();
                this.svg.appendChild(_shape.element);
                this.createFingersRect(_shape);
            }

            if (_node.text === 'circle') {
                _shape = new Circle();
                this.svg.appendChild(_shape.element);
                this.createFingersCircle(_shape);
            }

            if (_node.text.indexOf('image') > - 1) {
                _shape = new Img();
                this.svg.appendChild(_shape.element);
                this.createFingersRect(_shape);
            }
            _shape.name = _node.text + '_' + this.index;
        }
    }

    updateShape() {
        if (this.selectedShape) {
            if (this.selectedFinger
                && this.selectedFinger.type === FingerType.control
                && this.controlLeftMode === ControlLeftMode.resize) {
                if (this.selectedShape.mode === ShapeMode.Rect) {
                    if (this.selectedFinger.index === RectCorner.top_left) {
                        this.selectedShape.updateSize(
                            this.selectedShape.shape.width - this.selectedFinger.distanceX,
                            this.selectedShape.shape.height - this.selectedFinger.distanceY
                        );
                        this.selectedShape.updatePosition(
                            this.selectedShape.shape.x + this.selectedFinger.distanceX / 2,
                            this.selectedShape.shape.y + this.selectedFinger.distanceY / 2
                        );
                    }
                }
            } else {
            }
            this.selectedShape.updateLayout();
        }
    }

    deleteShape() { }

    resetAll() { }

    updateControl() {

    }

    private createControls(_item: Rectangle | Circle | Img) {
        const shapeControls = new ShapeControls();
        shapeControls.shape = _item;
        this.listShapeControls.push(shapeControls);
        shapeControls.shape.updatePosition(this.startX, this.startY);
        shapeControls.shape.updateLayout();
        return shapeControls;
    }

    private addShapeToSvg(shapeControls: ShapeControls) {
        shapeControls.controls.forEach(_ct => {
            this.svg.appendChild(_ct.holdElement.element);
        });

        shapeControls.onSelectFinger.subscribe(res => {
            if (res) {
                this.onSelectShape.next(shapeControls);
                this.selectedShape = shapeControls;
                this.onSelectFinger.next(res);
                this.selectedFinger = res;
            }
        });
    }

    private createFingersCircle(_item: Rectangle | Circle | Img) {
        const shapeControls = this.createControls(_item);
        shapeControls.createControlsForCircle();
        shapeControls.mode = ShapeMode.Circle;
        this.addShapeToSvg(shapeControls);
    }

    private createFingersRect(_item: Rectangle | Circle | Img) {
        const shapeControls = this.createControls(_item);
        shapeControls.createControlsForRect();
        shapeControls.mode = ShapeMode.Rect;
        this.addShapeToSvg(shapeControls);
    }
}
